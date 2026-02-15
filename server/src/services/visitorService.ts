import { createHash } from "crypto";
import _UAParser from "ua-parser-js";

// ua-parser-js v2 has complex export types; cast to the constructor form we need
const UAParser = _UAParser as unknown as new (ua: string) => {
  getResult(): {
    device: { type?: string };
    browser: { name?: string };
    os: { name?: string };
  };
};
import { prisma } from "../config/database";
import { env } from "../config/env";

interface TrackVisitInput {
  ip: string;
  userAgent?: string;
  referrer?: string;
  path: string;
}

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
}

export class VisitorService {
  /**
   * Hash an IP address with a server-side salt for privacy.
   */
  private hashIp(ip: string): string {
    return createHash("sha256")
      .update(`${env.IP_HASH_SALT}:${ip}`)
      .digest("hex");
  }

  /**
   * Parse a user agent string into structured data.
   */
  private parseUserAgent(ua?: string) {
    if (!ua) return {};
    const parser = new UAParser(ua);
    const result = parser.getResult();
    return {
      device: result.device.type || "desktop",
      browser: result.browser.name || undefined,
      os: result.os.name || undefined,
    };
  }

  /**
   * Track a page visit. Upserts the visitor and creates a page view record.
   */
  async trackVisit(input: TrackVisitInput): Promise<VisitorStats> {
    const ipHash = this.hashIp(input.ip);
    const { device, browser, os } = this.parseUserAgent(input.userAgent);

    // Upsert visitor
    await prisma.visitor.upsert({
      where: { ipHash },
      create: {
        ipHash,
        userAgent: input.userAgent,
        referrer: input.referrer,
        device,
        browser,
        os,
        pageViews: {
          create: {
            path: input.path,
          },
        },
      },
      update: {
        lastVisit: new Date(),
        visitCount: { increment: 1 },
        pageViews: {
          create: {
            path: input.path,
          },
        },
      },
    });

    return this.getVisitorStats();
  }

  /**
   * Get aggregate visitor statistics.
   */
  async getVisitorStats(): Promise<VisitorStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalVisitors, todayVisitors] = await Promise.all([
      prisma.visitor.count(),
      prisma.visitor.count({
        where: {
          lastVisit: { gte: today },
        },
      }),
    ]);

    return { totalVisitors, todayVisitors };
  }

  /**
   * Update the duration of the most recent page view.
   */
  async updateDuration(path: string, duration: number): Promise<void> {
    // Find the most recent page view for this path and update its duration.
    // This is a best-effort operation (from sendBeacon), so we don't throw on failure.
    const recentPageView = await prisma.pageView.findFirst({
      where: { path },
      orderBy: { timestamp: "desc" },
    });

    if (recentPageView) {
      await prisma.pageView.update({
        where: { id: recentPageView.id },
        data: { duration },
      });
    }
  }
}
