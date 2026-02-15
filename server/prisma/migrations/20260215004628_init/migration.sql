-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "user_agent" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "city" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "first_visit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_visit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visit_count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "duration" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcp_conversations" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mcp_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcp_messages" (
    "id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mcp_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_stats" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "unique_visitors" INTEGER NOT NULL DEFAULT 0,
    "total_page_views" INTEGER NOT NULL DEFAULT 0,
    "mcp_chats" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_ip_hash_key" ON "visitors"("ip_hash");

-- CreateIndex
CREATE INDEX "page_views_visitor_id_idx" ON "page_views"("visitor_id");

-- CreateIndex
CREATE INDEX "page_views_timestamp_idx" ON "page_views"("timestamp");

-- CreateIndex
CREATE INDEX "mcp_messages_conversation_id_idx" ON "mcp_messages"("conversation_id");

-- CreateIndex
CREATE UNIQUE INDEX "daily_stats_date_key" ON "daily_stats"("date");

-- AddForeignKey
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcp_messages" ADD CONSTRAINT "mcp_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "mcp_conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
