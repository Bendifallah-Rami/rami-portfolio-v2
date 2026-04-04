import Hero from "../components/sections/home";
import About from "../components/sections/about";
import Experience from "../components/sections/experience";
import Training from "../components/sections/training";
import Skills from "../components/sections/skills";
import Services from "../components/sections/services";
import Projects from "../components/sections/projects";
import Contact from "../components/sections/contact";
import Footer from "../components/sections/footer";
import StaggeredMenu from "../components/ui/StaggeredMenu";
import BlobCursor from "../components/ui/cursor.js";
import { links as navLinks, socialLinks } from "../data/navitems";

export default function Home() {
  const menuItems = navLinks.map((item) => ({
    label: item.label,
    link: item.href,
    ariaLabel: `Go to ${item.label}`,
  }));

  const menuSocialItems = socialLinks.map((item) => ({
    label: item.label,
    link: item.href,
  }));

  return (
    <div className="relative">
      <BlobCursor
        blobType="circle"
        fillColor="var(--color-accent)"
        trailCount={2}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />
      <StaggeredMenu
        isFixed
        position="right"
        logoUrl="/logo.png"
        items={menuItems}
        socialItems={menuSocialItems}
        displaySocials
        displayItemNumbering
        colors={["rgba(189,250,92,0.12)", "rgba(26,28,39,0.88)", "rgba(18,20,29,0.98)"]}
        accentColor="var(--color-accent)"
        menuButtonColor="var(--color-white)"
        openMenuButtonColor="var(--color-white)"
        panelWidth="clamp(340px, 44vw, 580px)"
        panelHeight="100dvh"
      />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Services />
        <Projects />
        <Training />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
