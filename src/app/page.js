import Hero from "../components/sections/home";
import About from "../components/sections/about";
import Skills from "../components/sections/skills";
import Navbar from "../components/ui/CardNav-JS-CSS";
import BlobCursor from "../components/ui/cursor.js";

export default function Home() {
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
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
      </main>
    </div>
  );
}
