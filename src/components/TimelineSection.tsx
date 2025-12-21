import { useEffect, useRef, useState } from 'react';
import { Play, Zap, Trophy } from 'lucide-react';

interface TimelineItem {
  number: string;
  time: string;
  title: string;
  description: string;
  icon: typeof Play;
  position: 'left' | 'right';
}

export function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const timelineItems: TimelineItem[] = [
    {
      number: '01',
      time: 'TBA',
      title: 'Schedule Update',
      description: 'It will be updated soon',
      icon: Zap,
      position: 'left',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !progressBarRef.current) return;

      const timelineSection = timelineRef.current;
      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress relative to the timeline section
      // Start filling when section enters viewport, finish when it leaves
      const scrollStart = windowHeight - sectionHeight * 0.3;
      const scrollEnd = windowHeight * 0.3;

      let scrollProgress = 0;

      if (sectionTop <= scrollStart && sectionTop >= scrollEnd - sectionHeight) {
        scrollProgress = (scrollStart - sectionTop) / (scrollStart - scrollEnd + sectionHeight);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      } else if (sectionTop < scrollEnd - sectionHeight) {
        scrollProgress = 1;
      }

      // Update progress bar height
      progressBarRef.current.style.height = `${scrollProgress * 100}%`;

      // Calculate which items should be active
      const itemElements = timelineSection.querySelectorAll('.timeline-item');
      const newActiveItems: number[] = [];

      itemElements.forEach((item: Element, index: number) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;

        // Activate when the center of viewport passes the item
        if (itemCenter <= windowHeight / 2) {
          newActiveItems.push(index);
        }
      });

      setActiveItems(newActiveItems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={timelineRef}
      className="relative py-32 overflow-hidden bg-[#050505]"
      id="schedule"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2
            className="text-6xl md:text-8xl mb-4 text-white"
            style={{ fontFamily: 'VT323, monospace' }}
          >
            Execution{' '}
            <span className="text-[#D500F9]">
              Flow
            </span>
          </h2>
          <p
            className="text-xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#00D9FF' }}
          >
            Algorithm-driven schedule for maximum efficiency
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto timeline-container">
          {/* Background Line (Static) */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 timeline-line-bg"
            style={{
              background: 'rgba(100, 100, 100, 0.3)',
            }}
          />

          {/* Progress Line (Dynamic - Fills on Scroll) */}
          <div
            ref={progressBarRef}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 -translate-x-1/2 timeline-line-progress transition-none"
            id="timeline-progressBar"
            style={{
              background: 'linear-gradient(180deg, #D500F9 0%, #7000FF 100%)',
              height: '0%',
              boxShadow: '0 0 10px #D500F9, 0 0 20px #7000FF',
            }}
          />

          {/* Timeline Items */}
          <div className="relative space-y-32">
            {timelineItems.map((item, index) => {
              const isActive = activeItems.includes(index);
              const isLeft = item.position === 'left';

              return (
                <div
                  key={index}
                  className={`timeline-item relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'
                    }`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 pl-12 md:pl-0 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 ' + (isLeft ? '-translate-x-10' : 'translate-x-10')
                      }`}
                  >
                    {/* Phase Badge */}
                    <div className={`flex ${isLeft ? 'justify-start' : 'md:justify-end'} mb-4`}>
                      <div
                        className="inline-block px-6 py-2 rounded-full border border-white/20"
                        style={{
                          background: 'rgba(20, 20, 20, 0.8)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span
                          className="text-white text-sm"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {item.number}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div
                      className={`relative group ${isLeft ? 'text-left' : 'text-left md:text-right'}`}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 ${isActive ? 'opacity-50' : ''
                          }`}
                        style={{
                          background: 'linear-gradient(135deg, #D500F9, #7000FF)',
                        }}
                      />

                      {/* Card */}
                      <div
                        className="relative rounded-2xl p-8 border transition-all duration-500"
                        style={{
                          background: 'rgba(20, 20, 30, 0.6)',
                          backdropFilter: 'blur(20px)',
                          borderColor: isActive ? 'rgba(213, 0, 249, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {/* Time Badge */}
                        <div className={`flex ${isLeft ? 'justify-start' : 'md:justify-end'} mb-4`}>
                          <span
                            className="text-[#D500F9]"
                            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}
                          >
                            {item.time}
                          </span>
                        </div>

                        {/* Title and Icon */}
                        <div className={`flex items-start gap-4 ${isLeft ? '' : 'flex-row md:flex-row-reverse'}`}>
                          {/* Icon */}
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                              background: 'rgba(213, 0, 249, 0.15)',
                              border: '1px solid rgba(213, 0, 249, 0.3)',
                            }}
                          >
                            <item.icon className="w-6 h-6 text-[#D500F9]" />
                          </div>

                          {/* Text Content */}
                          <div className={`flex-1 ${isLeft ? 'text-left' : 'text-left md:text-right'}`}>
                            <h3
                              className="text-2xl md:text-3xl text-white mb-2"
                              style={{ fontFamily: "'VCR OSD Mono', monospace" }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-base text-white/60"
                              style={{ fontFamily: 'JetBrains Mono, monospace' }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Camera Shutter Brackets (Bottom Corners) */}
                      <div
                        className={`absolute bottom-2 w-6 h-6 ${isLeft ? 'right-2' : 'right-2 md:left-2'
                          } transition-opacity duration-500`}
                        style={{
                          opacity: isActive ? 1 : 0.3,
                        }}
                      >
                        <div
                          className={`absolute bottom-0 w-6 h-0.5 ${isLeft ? 'right-0' : 'right-0 md:left-0'
                            }`}
                          style={{ background: '#D500F9' }}
                        />
                        <div
                          className={`absolute bottom-0 w-0.5 h-6 ${isLeft ? 'right-0' : 'right-0 md:left-0'
                            }`}
                          style={{ background: '#D500F9' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Camera Shutter Style) */}
                  <div
                    className={`absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
                      }`}
                  >

                    {/* Outer Glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-xl"
                      style={{
                        background: 'radial-gradient(circle, #D500F9, transparent)',
                        opacity: isActive ? 0.8 : 0.3,
                      }}
                    />

                    {/* Node Circle */}
                    <div
                      className="relative w-12 h-12 rounded-full border-4 flex items-center justify-center"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #D500F9, #7000FF)'
                          : 'rgba(213, 0, 249, 0.2)',
                        borderColor: isActive ? '#D500F9' : 'rgba(213, 0, 249, 0.3)',
                        boxShadow: isActive
                          ? '0 0 20px #D500F9, 0 0 40px #7000FF'
                          : 'none',
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: isActive ? '#000' : '#D500F9',
                        }}
                      />
                    </div>

                    {/* Camera Shutter Brackets (All 4 Corners) */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        opacity: isActive ? 1 : 0.5,
                      }}
                    >
                      {/* Top Left */}
                      <div className="absolute -top-3 -left-3 w-6 h-6">
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-[#D500F9]" />
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-[#D500F9]" />
                      </div>
                      {/* Top Right */}
                      <div className="absolute -top-3 -right-3 w-6 h-6">
                        <div className="absolute top-0 right-0 w-full h-0.5 bg-[#D500F9]" />
                        <div className="absolute top-0 right-0 w-0.5 h-full bg-[#D500F9]" />
                      </div>
                      {/* Bottom Left */}
                      <div className="absolute -bottom-3 -left-3 w-6 h-6">
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D500F9]" />
                        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#D500F9]" />
                      </div>
                      {/* Bottom Right */}
                      <div className="absolute -bottom-3 -right-3 w-6 h-6">
                        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#D500F9]" />
                        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-[#D500F9]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End Trophy */}
          <div className="flex justify-center mt-32">
            <div className="relative">
              {/* Outer Pulsing Glow (Purple) */}
              <div
                className="absolute inset-0 rounded-full blur-[100px] animate-pulse"
                style={{
                  background: 'radial-gradient(circle, #D500F9, transparent)',
                  opacity: 0.8,
                  width: '300px',
                  height: '300px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Targeting Brackets (Camera Focus) */}
              <div className="absolute inset-0 pointer-events-none" style={{ width: '200px', height: '200px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                {/* Top Left */}
                <div className="absolute -top-4 -left-4 w-8 h-8">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                </div>
                {/* Top Right */}
                <div className="absolute -top-4 -right-4 w-8 h-8">
                  <div className="absolute top-0 right-0 w-full h-1 bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                  <div className="absolute top-0 right-0 w-1 h-full bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                </div>
                {/* Bottom Left */}
                <div className="absolute -bottom-4 -left-4 w-8 h-8">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                  <div className="absolute bottom-0 left-0 w-1 h-full bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                </div>
                {/* Bottom Right */}
                <div className="absolute -bottom-4 -right-4 w-8 h-8">
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                  <div className="absolute bottom-0 right-0 w-1 h-full bg-[#D500F9]" style={{ boxShadow: '0 0 10px #D500F9' }} />
                </div>
              </div>

              {/* Outermost Ring (Translucent) */}
              <div
                className="absolute rounded-full border-2"
                style={{
                  width: '180px',
                  height: '180px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: 'rgba(213, 0, 249, 0.3)',
                  boxShadow: '0 0 20px rgba(213, 0, 249, 0.3)',
                }}
              />

              {/* Middle Ring */}
              <div
                className="absolute rounded-full border-2"
                style={{
                  width: '140px',
                  height: '140px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderColor: 'rgba(213, 0, 249, 0.5)',
                  boxShadow: '0 0 30px rgba(213, 0, 249, 0.5)',
                }}
              />

              {/* Inner Glow Ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: '100px',
                  height: '100px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(213, 0, 249, 0.4), transparent)',
                  boxShadow: '0 0 40px rgba(213, 0, 249, 0.6), inset 0 0 40px rgba(213, 0, 249, 0.4)',
                }}
              />

              {/* Trophy Container (Center Circle) */}
              <div
                className="relative rounded-full flex items-center justify-center border-4"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #D500F9, #7000FF)',
                  borderColor: '#D500F9',
                  boxShadow: '0 0 50px #D500F9, 0 0 80px #7000FF, inset 0 0 20px rgba(0, 0, 0, 0.5)',
                  margin: '60px',
                }}
              >
                <Trophy className="w-10 h-10 text-black" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}