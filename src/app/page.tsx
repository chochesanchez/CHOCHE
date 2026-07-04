import Hero from "@/components/hero/Hero";
import NavBar from "@/components/nav/NavBar";
import Myself from "@/components/sections/Myself";
import Work from "@/components/sections/Work";
import Projects from "@/components/sections/Projects";
import WorldMap from "@/components/sections/WorldMap";
import Info from "@/components/sections/Info";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        {/* Content rides above the fixed canvas (z-20 > z-10). */}
        <div className="relative z-20 bg-white">
          <Myself />
          <Work />
          <Projects />
          <WorldMap />
          <Info />
        </div>
      </main>
    </>
  );
}
