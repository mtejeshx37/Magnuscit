import React, { useState } from 'react';
import { Phone, Send } from 'lucide-react';

export const ContactSection = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/email/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                alert('Thank you for contacting us. We will get back to you shortly.');
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                const data = await response.json();
                alert(`Failed to send message: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Conference Contact</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Have questions about the conference? Reach out to our organizing committee.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <p className="text-lg font-semibold text-gray-900 mb-1">Charan Selva Dhanush</p>
                            <p className="text-sm text-gray-500 mb-3">Organizing Committee</p>
                            <a href="tel:+919962524758" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                <Phone className="w-4 h-4" />
                                +91 99625 24758
                            </a>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <p className="text-lg font-semibold text-gray-900 mb-1">Varshha</p>
                            <p className="text-sm text-gray-500 mb-3">Organizing Committee</p>
                            <a href="tel:+918939777852" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                <Phone className="w-4 h-4" />
                                +91 89397 77852
                            </a>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <p className="text-lg font-semibold text-gray-900 mb-1">Latheesh Saran</p>
                            <p className="text-sm text-gray-500 mb-3">Organizing Committee</p>
                            <a href="tel:+916382235520" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                <Phone className="w-4 h-4" />
                                +91 6382235520
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Your Name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Paper Submission Query"
                                value={formState.subject}
                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="How can we help you?"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

