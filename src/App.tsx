import Preloader from "./components/preloader/Preloader";
import CustomCursor from "./components/shared/CustomCursor";
import Navbar from "./components/nav/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Activities from "./components/activities/Activities";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import ScrollProgress from "./components/shared/ScrollProgress";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Activities />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
