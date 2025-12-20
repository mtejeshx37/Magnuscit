import { MapPin, Building2, Navigation as NavigationIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function VenueSection() {
  return (
    <section className="relative bg-[#050505] py-20 px-4 overflow-hidden border-t border-[#D500F9]/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(213,0,249,0.05),transparent_70%)]" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#D500F9 1px, transparent 1px), linear-gradient(90deg, #D500F9 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-5xl md:text-7xl mb-4 text-white relative inline-block"
            style={{ fontFamily: 'VT323, monospace' }}
          >
            <span className="relative">
              CONFERENCE VENUE
              <div className="absolute inset-0 bg-gradient-to-r from-[#D500F9] to-[#00F0FF] opacity-20 blur-xl" />
            </span>
          </h2>
          <p 
            className="text-white/60 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Join us at Chennai Institute of Technology's state-of-the-art campus
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Map Container with Cyberpunk Border */}
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D500F9] via-[#00F0FF] to-[#D500F9] rounded-2xl opacity-50 blur group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Map Frame */}
              <div className="relative bg-[#050505] rounded-2xl overflow-hidden border-2 border-[#D500F9]/30">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00F0FF] z-10" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00F0FF] z-10" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00F0FF] z-10" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00F0FF] z-10" />
                
                {/* Google Map Embed */}
                <div className="relative aspect-[4/3] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0823744284777!2d80.04914707507624!3d12.837176787466794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f73ed570ca77%3A0x38a9f4f2f17b1b7c!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(20%) brightness(0.9) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  
                  {/* Overlay gradient for cyberpunk effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none opacity-40" />
                </div>

                {/* "View larger map" button overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <a
                    href="https://maps.google.com/?q=Chennai+Institute+of+Technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target px-4 py-2 bg-[#D500F9]/90 backdrop-blur-sm text-white rounded-lg text-sm hover:bg-[#D500F9] transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(213,0,249,0.4)]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    <MapPin className="w-4 h-4" />
                    View larger map
                  </a>
                </div>
              </div>

              {/* Navigate to Campus Card */}
              <div className="mt-6 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F0FF] to-[#D500F9] rounded-xl opacity-30 blur" />
                <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-xl p-6 border border-[#00F0FF]/30">
                  <h3 
                    className="text-xl text-white mb-2 flex items-center gap-2"
                    style={{ fontFamily: 'VT323, monospace' }}
                  >
                    <NavigationIcon className="w-5 h-5 text-[#00F0FF]" />
                    NAVIGATE TO CAMPUS
                  </h3>
                  <p 
                    className="text-white/60 text-sm mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Click the button below to get directions from your current location
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Chennai+Institute+of+Technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#0080FF] text-black rounded-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <NavigationIcon className="w-5 h-5" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venue Info Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* About the Venue */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D500F9] to-[#00F0FF] rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-xl p-8 border border-[#D500F9]/30">
                <h3 
                  className="text-3xl text-white mb-4"
                  style={{ fontFamily: 'VT323, monospace' }}
                >
                  ABOUT THE VENUE
                </h3>
                <p 
                  className="text-white/70 mb-4 leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Chennai Institute of Technology is a premier educational institution located in the southern part of Chennai. The campus features modern conference facilities, advanced research labs, and excellent accommodation options for attendees.
                </p>
                <p 
                  className="text-white/70 leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  The conference will be held in our state-of-the-art auditorium with capacity for 500+ attendees, equipped with the latest audio-visual technology and simultaneous breakout rooms for parallel sessions.
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-[#D500F9] rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-xl p-6 border border-[#D500F9]/30 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D500F9]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#D500F9]" />
                    </div>
                    <div>
                      <h4 
                        className="text-lg text-white mb-2"
                        style={{ fontFamily: 'VT323, monospace' }}
                      >
                        ADDRESS
                      </h4>
                      <p 
                        className="text-white/60 text-sm leading-relaxed"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Kundrathur, Sarathy Nagar<br />
                        Chennai - 600069<br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-[#00F0FF] rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-xl p-6 border border-[#00F0FF]/30 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <h4 
                        className="text-lg text-white mb-2"
                        style={{ fontFamily: 'VT323, monospace' }}
                      >
                        CAMPUS
                      </h4>
                      <p 
                        className="text-white/60 text-sm leading-relaxed"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        50-acre campus with modern facilities and green environment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting There Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D500F9] to-[#00F0FF] rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-xl p-8 border border-white/10">
                <h3 
                  className="text-2xl text-white mb-4"
                  style={{ fontFamily: 'VT323, monospace' }}
                >
                  GETTING THERE
                </h3>
                <div className="space-y-3">
                  <p 
                    className="text-white/60 text-sm mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Located 25 km from Chennai International Airport and well-connected by public transport
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 flex-shrink-0" />
                      <p 
                        className="text-white/70 text-sm"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Direct bus services from Chennai Central
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 flex-shrink-0" />
                      <p 
                        className="text-white/70 text-sm"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Taxi and ride-sharing services available
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] mt-2 flex-shrink-0" />
                      <p 
                        className="text-white/70 text-sm"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        Parking facilities available on campus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#D500F9] to-transparent opacity-50" />
    </section>
  );
}
