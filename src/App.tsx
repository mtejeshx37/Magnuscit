import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { TimelineSection } from './components/TimelineSection';
import { CTASection } from './components/CTASection';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EventDetail } from './components/EventDetail';
import { CustomCursor } from './components/CustomCursor';
import { eventDetailsData } from './data/eventDetails';
import ConferenceApp from './components/Conference/ConferenceApp';

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
        <CustomCursor />
        <Navigation />
        <EventDetail event={eventData} onBack={handleBackToEvents} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <div id="events">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      <TimelineSection />
      <CTASection />
      <VenueSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/conference" element={<ConferenceApp />} />
    </Routes>
  );
}