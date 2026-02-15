import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import McpChat from "@/components/mcp/McpChat";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

function App() {
  const { trackPageView } = useVisitorTracking();

  useEffect(() => {
    trackPageView("/");
  }, [trackPageView]);

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <McpChat />
    </Layout>
  );
}

export default App;
