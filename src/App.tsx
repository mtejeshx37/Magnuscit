import { Suspense, lazy, useLayoutEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';

import { HeroSection } from './components/HeroSection';
import { PrimeDirectivesSection } from './components/PrimeDirectivesSection';
import { EventsSection } from './components/EventsSection';
import { TitleSponsorSection } from './components/TitleSponsorSection';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { EventDetail } from './components/EventDetail';
import TargetCursor from './components/TargetCursor';
import { eventSlugMap } from './data/eventDetails';
import { PremiumLoader } from './components/PremiumLoader';
import { DisclaimerTicker } from './components/DisclaimerTicker';
import { SponsorTicker } from './components/SponsorTicker';

// Lazy-loaded sections
const AboutUsSection = lazy(() =>
  import('./components/AboutUsSection').then(m => ({ default: m.AboutUsSection }))
);
const CTASection = lazy(() =>
  import('./components/CTASection').then(m => ({ default: m.CTASection }))
);
const VenueSection = lazy(() =>
  import('./components/VenueSection').then(m => ({ default: m.VenueSection }))
);

// Lazy-loaded routes
const HackathonDetail = lazy(() =>
  import('./components/HackathonDetail').then(m => ({ default: m.HackathonDetail }))
);
const ConferenceDetail = lazy(() =>
  import('./components/ConferenceDetail').then(m => ({ default: m.ConferenceDetail }))
);
const ConferenceApp = lazy(() => import('./components/Conference/ConferenceApp'));
const AdminQRTool = lazy(() =>
  import('./components/AdminQRTool').then(m => ({ default: m.AdminQRTool }))
);

function Home() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const lastEvent = sessionStorage.getItem('lastClickedEvent');
    if (lastEvent) {
      const element = document.getElementById(lastEvent);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto', block: 'center' });
          sessionStorage.removeItem('lastClickedEvent');
        }, 50);
      }
    }
  }, []);

  const handleEventSelect = (slug: string) => {
    sessionStorage.setItem('lastClickedEvent', slug);
    navigate(`/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleConferenceSelect = () => {
    navigate('/conference-details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden pt-[90px]">
      <DisclaimerTicker />
      <HeroSection />
      <TitleSponsorSection />
      <PrimeDirectivesSection />
      <div id="events" className="content-visibility-auto scroll-mt-[130px]">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      <SponsorTicker />
      <CTASection />
      <div className="content-visibility-auto">
        <AboutUsSection />
        <VenueSection />
      </div>
      <Footer />
    </div >
  );
}

function EventDetailPage() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const navigate = useNavigate();
  const eventData = eventSlug ? eventSlugMap[eventSlug] : null;

  if (!eventData) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        Event not found
      </div>
    );
  }

  return (
    <div>
      <EventDetail event={eventData} onBack={() => navigate(-1)} />
      <Footer />
    </div>
  );
}

function EventsListPage() {
  const navigate = useNavigate();

  const handleEventSelect = (slug: string) => {
    sessionStorage.setItem('lastClickedEvent', slug);
    navigate(`/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleConferenceSelect = () => {
    navigate('/conference-details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden pt-24">
      <div className="container mx-auto px-4 pb-12">
        <EventsSection
          onEventSelect={handleEventSelect}
          onConferenceSelect={handleConferenceSelect}
        />
      </div>
      <Footer />
    </div>
  );
}

// Cursor wrapper
function CursorWrapper() {
  const location = useLocation();

  return (
    <TargetCursor
      key={location.pathname}
      spinDuration={2}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.2}
    />
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      {isLoading ? (
        <PremiumLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <CursorWrapper />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsListPage />} />
            <Route path="/conference-details" element={<ConferenceDetail />} />
            <Route path="/conference" element={<ConferenceApp />} />
            <Route path="/hackathon" element={<HackathonDetail />} />
            <Route path="/admin/qr" element={<AdminQRTool />} />
            <Route path="/:eventSlug" element={<EventDetailPage />} />
          </Routes>
        </>
      )}
    </Suspense>
  );
}
