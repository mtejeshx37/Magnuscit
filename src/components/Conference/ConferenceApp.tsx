import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CallForPapersSection } from './components/CallForPapersSection';
import { TopicsSection } from './components/TopicsSection';
import { DatesSection } from './components/DatesSection';
import { VenueSection } from './components/VenueSection';
import { CommitteeSection } from './components/CommitteeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './conference-reset.css';

export default function ConferenceApp() {
  return (
    <div className="conference-wrapper min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <CallForPapersSection />
      <TopicsSection />
      <DatesSection />
      <VenueSection />
      <CommitteeSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
