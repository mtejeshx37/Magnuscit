import { MapPin, Navigation } from 'lucide-react';

export const VenueSection = () => {
    return (
        <section id="venue" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Info */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Conference Venue</h2>
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Chennai Institute of Technology</h3>
                            <p className="text-gray-600 leading-relaxed max-w-md">
                                Sarathy Nagar, Kundrathur, SH 113, Kundrathur Main Rd,
                                Chennai, Tamil Nadu 600069
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">How to Reach</h4>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-3">
                                    <Navigation className="w-4 h-4 text-blue-600 mt-1" />
                                    <span>15 km from Chennai International Airport (MAA)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Navigation className="w-4 h-4 text-blue-600 mt-1" />
                                    <span>10 km from Tambaram Railway Station</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Navigation className="w-4 h-4 text-blue-600 mt-1" />
                                    <span>Well connected by city buses and taxi services</span>
                                </li>
                            </ul>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/YourMapLinkHere"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
                        >
                            <MapPin className="w-4 h-4" />
                            Get Directions
                        </a>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d80.04049830983612!3d12.971777514838323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f4d07355bab5%3A0xbb6063169c4ed4d9!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1703061234567!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};
