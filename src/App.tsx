import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { PrimeDirectivesSection } from './components/PrimeDirectivesSection';
import { EventsSection } from './components/EventsSection';
import { TimelineSection } from './components/TimelineSection';
import { CTASection } from './components/CTASection';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EventDetail } from './components/EventDetail';
import { CustomCursor } from './components/CustomCursor';
import { MatrixLoader } from './components/MatrixLoader';
import { AboutUsSection } from './components/AboutUsSection';
import { eventDetailsData } from './data/eventDetails';

// Lazy load route components
const HackathonDetail = lazy(() => import('./components/HackathonDetail').then(module => ({ default: module.HackathonDetail })));
const ConferenceDetail = lazy(() => import('./components/ConferenceDetail').then(module => ({ default: module.ConferenceDetail })));
const ConferenceApp = lazy(() => import('./components/Conference/ConferenceApp'));

function Home() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleEventSelect = (eventId: number) => {
    setSelectedEventId(eventId);
    window.scrollTo(0, 0);
  };

  const handleConferenceSelect = () => {
    navigate('/conference');
    window.scrollTo(0, 0);
  };

  const handleBackToEvents = () => {
    setSelectedEventId(null);
    // Scroll to events section
    const eventsSection = document.querySelector('#events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (selectedEventId !== null) {
    const eventData = eventDetailsData[selectedEventId as keyof typeof eventDetailsData];
    return (
      <>
        <MatrixLoader />
        <CustomCursor />
        <Navigation />
        <EventDetail event={eventData} onBack={handleBackToEvents} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <MatrixLoader />
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <PrimeDirectivesSection />
      <div id="events" className="content-visibility-auto">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      <div className="content-visibility-auto">
        <TimelineSection />
      </div>
      <CTASection />
      <div className="content-visibility-auto">
        <AboutUsSection />
        <VenueSection />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<MatrixLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conference" element={<ConferenceDetail />} />
        <Route path="/conference-website" element={<ConferenceApp />} />
        <Route path="/hackathon" element={<HackathonDetail />} />
      </Routes>
    </Suspense>
  );
}