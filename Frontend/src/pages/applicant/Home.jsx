import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/applicant/Hero";
import JobSection from "../../components/applicant/JobSection";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <JobSection />

      <Footer />
    </>
  );
}