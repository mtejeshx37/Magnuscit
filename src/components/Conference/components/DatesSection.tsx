import { Calendar, Clock, CheckCircle } from 'lucide-react';

export const DatesSection = () => {
    const dates = [
        {
            icon: <Calendar className="w-6 h-6 text-blue-600" />,
            title: "Paper Submission",
            date: "January 20, 2026",
            status: "completed"
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
            title: "Confirmation of Paper",
            date: "January 31, 2026",
            status: "upcoming"
        },
        {
            icon: <Clock className="w-6 h-6 text-blue-600" />,
            title: "Conference Date",
            date: "February 02, 2026",
            status: "upcoming"
        }
    ];

    return (
        <section id="dates" className="py-20 px-6 max-w-7xl mx-auto bg-gray-50/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
                <p className="text-gray-600">Mark your calendar for these key deadlines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dates.map((item, index) => {
                    // Determine accent color based on status
                    let accentColor = "border-blue-500";
                    let iconBg = "bg-blue-50";
                    let iconColor = "text-blue-600";

                    if (item.status === 'completed') {
                        accentColor = "border-gray-300";
                        iconBg = "bg-gray-50";
                        iconColor = "text-gray-400";
                    } else if (item.status === 'active') {
                        accentColor = "border-green-500";
                        iconBg = "bg-green-50";
                        iconColor = "text-green-600";
                    } else if (item.title.includes("Conference Dates")) {
                        accentColor = "border-red-500";
                        iconBg = "bg-red-50";
                        iconColor = "text-red-600";
                    }

                    return (
                        <div key={index} className={`bg-white p-6 rounded-xl border-t-4 ${accentColor} shadow-sm hover:shadow-md transition-all border-x border-b border-gray-100`}>
                            <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
                                <div className={iconColor}>{item.icon}</div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mb-1">{item.title}</h3>
                            <p className="text-xl font-bold text-gray-900">{item.date}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
