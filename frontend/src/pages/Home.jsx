import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import QuickActions from "../components/home/QuickActions";
import HospitalList from "../components/home/HospitalList";
import HowItWorks from "../components/home/HowItWorks";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuickActions />
      <HospitalList />
      <HowItWorks />
      <Footer />
    </>
  );
}

export default Home;