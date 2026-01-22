import { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { PrimeDirectivesSection } from './components/PrimeDirectivesSection';
import { EventsSection } from './components/EventsSection';
const AboutUsSection = lazy(() => import('./components/AboutUsSection').then(m => ({ default: m.AboutUsSection })));
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EventDetail } from './components/EventDetail';
import { CustomCursor } from './components/CustomCursor';
import { eventSlugMap } from './data/eventDetails';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DisclaimerTicker } from './components/DisclaimerTicker';

// Lazy load heavy home page sections
//const TimelineSection = lazy(() => import('./components/TimelineSection').then(m => ({ default: m.TimelineSection })));
const CTASection = lazy(() => import('./components/CTASection').then(m => ({ default: m.CTASection })));
const VenueSection = lazy(() => import('./components/VenueSection').then(m => ({ default: m.VenueSection })));


// Lazy load route components
const HackathonDetail = lazy(() => import('./components/HackathonDetail').then(module => ({ default: module.HackathonDetail })));
const ConferenceDetail = lazy(() => import('./components/ConferenceDetail').then(module => ({ default: module.ConferenceDetail })));
const ConferenceApp = lazy(() => import('./components/Conference/ConferenceApp'));

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location.hash]);

  const handleEventSelect = (slug: string) => {
    navigate(`/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleConferenceSelect = () => {
    navigate('/conference-details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden pt-32">
      <HeroSection />
      <PrimeDirectivesSection />
      <div id="events" className="content-visibility-auto">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      {/*<div className="content-visibility-auto">
        <TimelineSection />
      </div>*/}
      <CTASection />
      <div className="content-visibility-auto">
        <AboutUsSection />
        <VenueSection />
      </div>
      <Footer />
    </div>
  );
}

function EventDetailPage() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const navigate = useNavigate();
  const eventData = eventSlug ? eventSlugMap[eventSlug] : null;

  if (!eventData) {
    return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Event not found</div>;
  }

  const handleBackToEvents = () => {
    navigate('/events');
  };

  return (
    <div className="pt-32">
      <EventDetail event={eventData} onBack={handleBackToEvents} />
      <Footer />
    </div>
  );
}

function EventsListPage() {
  const navigate = useNavigate();

  const handleEventSelect = (slug: string) => {
    navigate(`/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleConferenceSelect = () => {
    navigate('/conference-details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden pt-32">
      <div className="container mx-auto px-4 py-12">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <CustomCursor />
      <Navigation />
      <DisclaimerTicker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/conference-details" element={<ConferenceDetail />} />
        <Route path="/conference" element={<ConferenceApp />} />
        <Route path="/hackathon" element={<HackathonDetail />} />
        <Route path="/:eventSlug" element={<EventDetailPage />} />
      </Routes>
    </Suspense>
  );
}