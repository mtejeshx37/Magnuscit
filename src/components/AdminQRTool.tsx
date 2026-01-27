import { useState } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'motion/react';
import { generateQRData, GoogleFormData } from '../utils/qrGenerator';
import { Mail, Check, AlertCircle } from 'lucide-react';

const DUMMY_RESPONSES: GoogleFormData[] = [
    {
        "Timestamp": "1/25/2026 10:00:00",
        "Email Address": "akshayaas1811@gmail.com",
        "Full Name": "Alice Walker",
        "Registration Number": "REG2026001",
        "Department": "Computer Science",
        "Year": "3rd Year",
        "College Name": "CIT Chennai",
        "Phone Number": "9876543210"
    },
    {
        "Timestamp": "1/25/2026 10:05:00",
        "Email Address": "akshayaasasikumar2@gmail.com",
        "Full Name": "Bob Smith",
        "Registration Number": "REG2026002",
        "Department": "Information Technology",
        "Year": "2nd Year",
        "College Name": "Anna University",
        "Phone Number": "9123456789"
    },
    {
        "Timestamp": "1/25/2026 10:15:00",
        "Email Address": "charlie@univ.edu",
        "Full Name": "Charlie Davis",
        "Registration Number": "REG2026003",
        "Department": "ECE",
        "Year": "4th Year",
        "College Name": "IIT Madras",
        "Phone Number": "8877665544"
    }
];

export function AdminQRTool() {
    const [selectedUser, setSelectedUser] = useState<GoogleFormData>(DUMMY_RESPONSES[0]);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSendEmail = async () => {
        setSendingEmail(true);
        setEmailStatus('idle');

        // Simulate API call
        try {
            const qrData = generateQRData(selectedUser);

            // Use a small timeout to simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await fetch('http://localhost:5000/api/email/send-welcome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: selectedUser["Email Address"],
                    name: selectedUser["Full Name"],
                    qrData: qrData
                }),
            });

            if (response.ok) {
                setEmailStatus('success');
            } else {
                setEmailStatus('error');
            }

        } catch (error) {
            console.error("Failed to send email", error);
            setEmailStatus('error');
        } finally {
            setSendingEmail(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-12 px-4 text-white">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl md:text-5xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#D500F9] to-[#7000FF]" style={{ fontFamily: 'VT323, monospace' }}>
                    ADMIN QR GENERATOR
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* User List Panel */}
                    <div className="glass-strong rounded-2xl p-6 border border-[#D500F9]/30">
                        <h2 className="text-2xl mb-4 font-mono text-[#D500F9]">Google Form Responses</h2>
                        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {DUMMY_RESPONSES.map((user, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setEmailStatus('idle');
                                    }}
                                    className={`w-full text-left p-4 rounded-xl transition-all border ${selectedUser["Email Address"] === user["Email Address"]
                                        ? 'bg-[#7000FF]/20 border-[#7000FF]'
                                        : 'bg-white/5 border-transparent hover:bg-white/10'
                                        }`}
                                >
                                    <div className="font-bold font-mono">{user["Full Name"]}</div>
                                    <div className="text-sm text-gray-400">{user["Email Address"]}</div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">{user["College Name"]}</span>
                                        <span className="text-xs bg-[#D500F9]/20 px-2 py-1 rounded text-[#D500F9]">{user["Registration Number"]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                            <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-bold">Google Forms Mode</span>
                            </div>
                            <p className="text-sm text-yellow-200/70">
                                Using dummy data simulating a Google Sheets CSV export.
                            </p>
                        </div>
                    </div>

                    {/* QR Display Panel */}
                    <div className="glass-strong rounded-2xl p-6 border border-[#D500F9]/30 flex flex-col items-center justify-center">
                        <h2 className="text-2xl mb-8 font-mono text-[#D500F9]">QR Code Preview</h2>

                        <motion.div
                            layoutId="qr-container"
                            className="bg-white p-4 rounded-xl mb-8"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key={selectedUser["Email Address"]}
                        >
                            <QRCode
                                value={generateQRData(selectedUser)}
                                size={220}
                                level="M"
                            />
                        </motion.div>

                        <div className="text-center mb-8 space-y-1">
                            <p className="text-2xl font-bold">{selectedUser["Full Name"]}</p>
                            <p className="text-[#D500F9] font-mono text-lg">{selectedUser["Registration Number"]}</p>
                            <p className="text-gray-400">{selectedUser["Department"]} | {selectedUser["Year"]}</p>
                            <p className="text-gray-500 text-sm">{selectedUser["College Name"]}</p>
                        </div>

                        <button
                            onClick={handleSendEmail}
                            disabled={sendingEmail}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all ${emailStatus === 'success'
                                ? 'bg-green-500 text-black'
                                : 'bg-[#D500F9] hover:bg-[#b000d3] text-white'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {sendingEmail ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : emailStatus === 'success' ? (
                                <>
                                    <Check className="w-5 h-5" />
                                    Sent Successfully
                                </>
                            ) : (
                                <>
                                    <Mail className="w-5 h-5" />
                                    Send Welcome Email
                                </>
                            )}
                        </button>

                        {emailStatus === 'error' && (
                            <p className="text-red-500 mt-3 text-sm">Failed to send email. Check console/backend.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
