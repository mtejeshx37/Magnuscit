import { motion, useInView } from 'motion/react';
import { useState, useRef } from 'react';
import { Sparkles, Code, Users, Cpu, Award, Camera, Palette, Feather } from 'lucide-react';

type EventCategory = 'All' | 'Technical' | 'Non-Technical' | 'Workshops' | 'Online' | 'Conference';

interface Event {
  id: number | string;
  title: string;
  category: EventCategory;
  date: string;
  image: string;
  description: string;
  aiRecommended?: boolean;
  icon: typeof Code;
}

interface EventCardProps {
  event: Event;
  index: number;
  onEventSelect: (eventId: number) => void;
  onConferenceSelect: () => void;
}

function EventCard({ event, index, onEventSelect, onConferenceSelect }: EventCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px", // Trigger when center of element hits center of viewport
  });

  // Simple mobile detection
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onClick={() => {
        if (event.id === 'conference') {
          onConferenceSelect();
        } else {
          onEventSelect(event.id as number);
        }
      }}
    >
      {/* AI Recommended Badge */}
      {event.aiRecommended && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-gradient-to-r from-[#7000FF] to-[#9000FF] px-4 py-2 rounded-full border-2 border-[#7000FF] shadow-lg shadow-[#7000FF]/50 flex items-center gap-2 neon-glow">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              AI Pick
            </span>
          </div>
        </div>
      )}

      {/* Folder-Style Card */}
      <div className="relative h-[450px] rounded-2xl overflow-hidden">
        {/* Tab/Folder Cutout - Bottom Right Corner */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
          }}
        >
          {/* Event Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Black Overlay - Expands on Hover (Desktop) or Center View (Mobile) */}
          <div
            className={`absolute inset-0 bg-black/95 transition-transform duration-500 ease-out flex items-center justify-center p-8
              ${(isMobile && isInView) ? 'translate-y-0' : 'translate-y-full'} 
              group-hover:translate-y-0`}
          >
            <div className="text-center">
              <event.icon className="w-12 h-12 text-[#D500F9] mx-auto mb-4" />
              <h3
                className="text-3xl mb-4 text-white"
                style={{ fontFamily: 'VT323, monospace' }}
              >
                {event.title}
              </h3>
              <p className="text-[#94A3B8] text-lg">{event.description}</p>
            </div>
          </div>

          {/* Border Effect */}
          <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-all duration-300 ${event.aiRecommended
            ? 'border-[#7000FF]/50 group-hover:border-[#D500F9]/80'
            : 'border-[#D500F9]/30 group-hover:border-[#D500F9]/80'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
            }}
          />
        </div>

        {/* Folder Tab Corner */}
        <div
          className="absolute bottom-0 right-0 w-12 h-12 bg-[#D500F9]/20 border-t-2 border-l-2 border-[#D500F9]/30"
          style={{
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}

interface EventsSectionProps {
  onEventSelect: (eventId: number) => void;
  onConferenceSelect: () => void;
}

export function EventsSection({ onEventSelect, onConferenceSelect }: EventsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<EventCategory>('All');

  const events: Event[] = [
    {
      id: 'conference',
      title: 'National Conference on AI',
      category: 'Conference',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1080',
      description: 'Explore the future of Artificial Intelligence and its applications',
      icon: Cpu,
      aiRecommended: true,
    },


    {
      id: 7,
      title: 'Prompt Pixel',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1080',
      description: 'AI visuals and creative prompting challenge',
      icon: Sparkles,
    },
    {
      id: 8,
      title: 'Podcast Monologue',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1080',
      description: 'Spontaneous speaking on random tech topics',
      icon: Users,
    },
    {
      id: 9,
      title: 'Techie XO',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1080',
      description: 'Strategic XO game powered by tech trivia',
      icon: Code,
    },
    {
      id: 10,
      title: 'Tech Tamasha',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxxdWl6fGVufDB8fHx8MTc2NTEyMjM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Multi-round tech ecosystem challenge',
      icon: Users,
    },
    {
      id: 11,
      title: 'Logic Rush',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1580541832626-d297a732f63b?q=80&w=1080',
      description: 'Fast-paced aptitude and logic battle',
      icon: Cpu,
    },
    {
      id: 12,
      title: 'Accuracy Arena',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080',
      description: 'Design and optimize ML predictive models',
      icon: Award,
    },
    {
      id: 13,
      title: 'Code Euphoria',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080',
      description: 'Progressively complex coding challenges',
      icon: Code,
    },
    {
      id: 14,
      title: 'Life of Words (Poetry)',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1080',
      description: 'Craft and share original poems',
      icon: Feather, // Using Feather for writing/poetry
    },
    {
      id: 15,
      title: 'Exposure (Photography)',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: 'https://images.unsplash.com/photo-1554048612-387768052bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjYW1lcmF8ZW58MHx8fHwxNzY1MTIyMzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Photography contest on a given theme',
      icon: Camera,
    },
    {
      id: 16,
      title: 'Poster Design',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc2NTEyMjM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Creative poster design competition',
      icon: Palette,
    },
  ];

  const filteredEvents = activeFilter === 'All'
    ? events
    : events.filter(event => event.category === activeFilter);

  const filters: EventCategory[] = ['All', 'Conference', 'Technical', 'Non-Technical', 'Workshops', 'Online'];

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#D500F9]/5 rounded-full blur-3xl" />

      {/* Side Banner Watermark - Left */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        <span
          className="text-9xl opacity-15"
          style={{
            fontFamily: 'VT323, monospace',
            WebkitTextStroke: '2px rgba(213, 0, 249, 0.3)',
            color: 'transparent',
          }}
        >
          MAGNUS 2026
        </span>
      </div>

      {/* Side Banner Watermark - Right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          writingMode: 'vertical-rl',
        }}
      >
        <span
          className="text-9xl opacity-15"
          style={{
            fontFamily: 'VT323, monospace',
            WebkitTextStroke: '2px rgba(213, 0, 249, 0.3)',
            color: 'transparent',
          }}
        >
          MAGNUS 2026
        </span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl mb-4 text-white" style={{ fontFamily: 'VT323, monospace' }}>
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]">Events</span>
          </h2>
          <p className="text-xl text-[#94A3B8]">Deploy your skills in these cutting-edge challenges</p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl transition-all duration-300 ${activeFilter === filter
                ? 'bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] text-black shadow-lg'
                : 'glass border border-[#00D9FF]/20 text-white hover:border-[#00D9FF]/50'
                }`}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                ...(activeFilter === filter && { boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' })
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onEventSelect={onEventSelect}
              onConferenceSelect={onConferenceSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}