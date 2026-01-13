import { Phone } from 'lucide-react';

export const CommitteeSection = () => {
    const committeeMembers = [
        {
            name: 'Charan Selva Dhanush',
            role: 'Organizing Committee',
            phone: '+91 99625 24758'
        },

        {
            name: 'Varshha',
            role: 'Organizing Committee',
            phone: '+91 89397 77852'
        },
        {
            name: 'Latheesh Saran',
            role: 'Organizing Committee',
            phone: '+91 6382235520'
        },
        {
            name: 'Swetha',
            role: 'Organizing Committee',
            phone: '+91 73974 44395'
        }
    ];

    return (
        <section id="committee" className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Organizing Committee</h2>
            <p className="text-gray-600 mb-12">For specific inquiries, reach out directly to our organizing team members:</p>

            <div className="grid grid-cols-1 gap-6">
                {committeeMembers.map((member, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-gray-500 mb-4">{member.role}</p>
                        <a href={`tel:${member.phone.replace(/ /g, '')}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 w-fit px-4 py-2 rounded-lg">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">{member.phone}</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
