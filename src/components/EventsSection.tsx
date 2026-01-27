import { motion, useInView } from 'motion/react';
import logicRushImg from '../assets/logic_rush.webp';
import exposureImg from '../assets/exposure.webp';
import posterDesignImg from '../assets/poster_design.webp';
import promptPixelImg from '../assets/prompt_pixel.webp';
import podcastMonologueImg from '../assets/podcast_monologue.webp';
import techieXoImg from '../assets/techie_xo.webp';
import techTamashaImg from '../assets/tech_tamasha.webp';
import accuracyArenaImg from '../assets/accuracy_arena.webp';
import codeEuphoriaImg from '../assets/code_euphoria.webp';
import lifeOfWordsImg from '../assets/life_of_words.webp';
import protoPitchImg from '../assets/protopitch.webp';
import gallery1Img from '../assets/gallery_1.webp';
import gallery4Img from '../assets/gallery_4.webp';
import blockchainImg from '../assets/blockchain_new.webp';
import cloudQuestImg from '../assets/cloud_quest_new.webp';
import agenticAiImg from '../assets/agentic_ai_new.webp';
import ideathonImg from '../assets/ideathon.webp';
import adyaAiImg from '../assets/adya_ai.webp';
import techTradeWarsImg from '../assets/tech_trade_wars_auction.png';
import { useState, useRef } from 'react';
import { Sparkles, Code, Users, Cpu, Award, Camera, Palette, Feather, Eye, Link, Cloud, ShieldAlert, Bot, Trophy, TrendingUp } from 'lucide-react';

type EventCategory = 'All' | 'Technical' | 'Workshops' | 'Online';

interface Event {
  id: number | string;
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  image: string;
  description: string;
  price?: string;
  priceNote?: string;
  aiRecommended?: boolean;
  icon: typeof Code;
  rewards?: {
    winner?: string;
    runner?: string;
    first?: string;
    second?: string;
    third?: string;
    internship?: string;
  };
}

interface EventCardProps {
  event: Event;
  index: number;
  onEventSelect: (slug: string) => void;
  onConferenceSelect: () => void;
}

function EventCard({ event, index, onEventSelect, onConferenceSelect }: EventCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px", // Trigger when center of element hits center of viewport
  });

  // Simple mobile detection
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <motion.div
      id={event.slug}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onClick={() => {
        if (event.id === 'conference') {
          onConferenceSelect();
        } else {
          onEventSelect(event.slug);
        }
      }}
    >
      {/* AI Recommended Badge */}
      {event.aiRecommended && event.category !== 'Technical' && event.category !== 'Online' && (
        <div className="absolute -top-3 -right-3 z-20">
          {/* <div className="bg-gradient-to-r from-[#7000FF] to-[#9000FF] px-4 py-2 rounded-full border-2 border-[#7000FF] shadow-lg shadow-[#7000FF]/50 flex items-center gap-2 neon-glow">
            <span className="text-white text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              FREE
            </span>
          </div> */}
        </div>
      )}

      {/* Folder-Style Card */}
      <div className="relative h-[450px] rounded-2xl overflow-hidden bg-[#1A1A1A]">
        {/* Loading Shimmer */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer animate-shimmer" />
        )}

        {/* Tab/Folder Cutout - Bottom Right Corner */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
          }}
        >
          {/* Event Image */}
          <motion.img
            src={event.image}
            alt={event.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
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
              <p className="text-[#94A3B8] text-lg mb-6">{event.description}</p>
              {event.priceNote && (
                <p className="text-[#D500F9] text-sm font-bold mb-4 uppercase tracking-wider neon-text">
                  {event.priceNote}
                </p>
              )}

              {/* Rewards Display */}
              {event.rewards && (
                <div className="flex flex-col gap-2 items-center">
                  {event.rewards.internship && (
                    <div className="flex items-center gap-2 text-[#00D9FF] font-medium bg-[#00D9FF]/10 px-3 py-1.5 rounded-lg border border-[#00D9FF]/20 text-center">
                      <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-[11px] sm:text-sm uppercase tracking-tight leading-tight whitespace-normal max-w-[220px]">
                        Exclusive Internship Opportunity for Top Performers
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {event.rewards.winner && (
                      <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20">
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm font-bold">Winner: {event.rewards.winner}</span>
                      </div>
                    )}
                    {event.rewards.first && (
                      <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20">
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm font-bold">1st: {event.rewards.first}</span>
                      </div>
                    )}
                    {event.rewards.runner && (
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-300/10 px-3 py-1 rounded-lg border border-slate-300/20">
                        <span className="text-sm font-bold">Runner: {event.rewards.runner}</span>
                      </div>
                    )}
                    {event.rewards.second && (
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-300/10 px-3 py-1 rounded-lg border border-slate-300/20">
                        <span className="text-sm font-bold">2nd: {event.rewards.second}</span>
                      </div>
                    )}
                    {event.rewards.third && (
                      <div className="flex items-center gap-2 text-amber-700 bg-amber-700/10 px-3 py-1 rounded-lg border border-amber-700/20">
                        <span className="text-sm font-bold">3rd: {event.rewards.third}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
  onEventSelect: (slug: string) => void;
  onConferenceSelect: () => void;
}

export function EventsSection({ onEventSelect, onConferenceSelect }: EventsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<EventCategory>('All');

  const events: Event[] = [



    {
      id: 12,
      slug: 'accuracyarena',
      title: 'Accuracy Arena',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: accuracyArenaImg,
      description: 'Design and optimize ML predictive models',
      icon: Award,
      rewards: {
        internship: 'Exclusive Internship Opportunity for Top Performers',
        winner: '₹2000',
        runner: '₹1500'
      }
    },
    {
      id: 13,
      slug: 'codeeuphoria',
      title: 'Code Euphoria',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: codeEuphoriaImg,
      description: 'Progressively complex coding challenges',
      icon: Code,
      rewards: {
        internship: 'Exclusive Internship Opportunity for Top Performers',
        winner: '₹2000',
        runner: '₹1500'
      }
    },
    {
      id: 23,
      slug: 'ideathon',
      title: 'Ideathon',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: ideathonImg,
      description: 'Ideate, innovate, and inspire solutions',
      icon: Sparkles,
      rewards: {
        internship: 'Exclusive Internship Opportunity for Top Performers',
        first: '₹2500',
        second: '₹1500',
        third: '₹750'
      }
    },
    {
      id: 17,
      slug: 'protopitch',
      title: 'ProtoPitch',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: protoPitchImg,
      description: 'UI/UX design sprint and prototype pitching battle',
      icon: Palette,
      rewards: {
        first: '₹1500',
        second: '₹1000',
        third: '₹750'
      }
    },
    {
      id: 11,
      slug: 'logicrush',
      title: 'Logic Rush',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: logicRushImg,
      description: 'Fast-paced aptitude and logic battle',
      icon: Cpu,
      rewards: {
        winner: '₹2000',
        runner: '₹1500'
      }
    },
    {
      id: 8,
      slug: 'podcastmonologue',
      title: 'Podcast Monologue',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: podcastMonologueImg,
      description: 'Spontaneous speaking on random tech topics',
      icon: Users,
      rewards: {
        winner: '₹1500',
        runner: '₹1000'
      }
    },
    {
      id: 7,
      slug: 'promptpixel',
      title: 'Prompt Pixel',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: promptPixelImg,
      description: 'AI visuals and creative prompting challenge',
      icon: Sparkles,
      rewards: {
        first: '₹1500',
        second: '₹1000',
        third: '₹750'
      }
    },
    {
      id: 10,
      slug: 'techtamasha',
      title: 'Tech Tamasha',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: techTamashaImg,
      description: 'Multi-round tech ecosystem challenge',
      icon: Users,
      rewards: {
        first: '₹1500',
        second: '₹1000',
        third: '₹750'
      }
    },
    {
      id: 9,
      slug: 'techiexo',
      title: 'Techie XO',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: techieXoImg,
      description: 'Strategic XO game powered by tech trivia',
      icon: Code,
      rewards: {
        first: '₹1500',
        second: '₹1000',
        third: '₹750'
      }
    },
    {
      id: 24,
      slug: 'techtradewars',
      title: 'Tech Trade Wars',
      category: 'Technical',
      date: 'Jan 16, 2026',
      image: techTradeWarsImg,
      description: 'Strategic battle of technical knowledge and trading',
      icon: TrendingUp,
      rewards: {
        winner: '₹1500',
        runner: '₹1000'
      }
    },
    {
      id: 18,
      slug: 'cvworkshop',
      title: 'CV (Computer Vision) Workshop',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: gallery1Img,
      description: 'Build vision models from scratch',
      icon: Eye,
    },
    {
      id: 19,
      slug: 'blockchain',
      title: 'Inside a Blockchain',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: blockchainImg,
      description: 'Understand transactions, blocks & hashes',
      icon: Link,
    },
    {
      id: 20,
      slug: 'cloudquest',
      title: 'Cloud Quest Azure',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: cloudQuestImg,
      description: 'Beginner-friendly Azure/AWS workshop',
      price: '₹50',
      priceNote: '',
      icon: Cloud,
    },
    {
      id: 21,
      slug: 'hackinggpt',
      title: 'Hacking GPT',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: gallery4Img,
      description: 'How LLMs can be broken & manipulated',
      icon: ShieldAlert,
    },
    {
      id: 22,
      slug: 'agenticai',
      title: 'Agentic AI',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: agenticAiImg,
      description: 'Build an AI that can act, not just chat',
      icon: Bot,
    },
    {
      id: 25,
      slug: 'adyaai',
      title: 'ADYA AI',
      category: 'Workshops',
      date: 'Jan 17, 2026',
      image: adyaAiImg,
      description: 'The all-in-one no-code AI development platform',
      icon: Bot,
      aiRecommended: true,
    },
    {
      id: 14,
      slug: 'lifeofwords',
      title: 'Life of Words (Poetry)',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: lifeOfWordsImg,
      description: 'Craft and share original poems',
      icon: Feather, // Using Feather for writing/poetry
    },
    {
      id: 15,
      slug: 'exposure',
      title: 'Exposure (Photography)',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: exposureImg,
      description: 'Photography contest on a given theme',
      icon: Camera,
    },
    {
      id: 16,
      slug: 'posterdesign',
      title: 'Poster Design',
      category: 'Online',
      date: 'Jan 17, 2026',
      image: posterDesignImg,
      description: 'Creative poster design competition',
      icon: Palette,
    },
  ];

  const filteredEvents = activeFilter === 'All'
    ? events
    : events.filter(event => event.category === activeFilter);

  const filters: EventCategory[] = ['All', 'Technical', 'Workshops', 'Online'];

  return (
    <div className="py-10 relative overflow-hidden">
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