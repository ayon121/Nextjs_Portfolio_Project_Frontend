import Image from "next/image";

const experiences = [
    {
        role: "Software Developer",
        company: "Ufficio Furniture",
        companyLogo: "/ufficio.jpg", 
        period: "2024 - Present",
        description:
            "Website & Software Management and Focused on performance, SEO, Marketing  and user experience.",
    },
    {
        role: "Frontend Developer",
        company: "Freelance",
        companyLogo: "/freelance.jpg",
        period: "2022 - 2023",
        description:
            "Delivered modern, responsive websites for clients worldwide. Specialized in React, Tailwind, and clean UI/UX design with optimized SEO.",
    },
    {
        role: "Graphics Designer",
        company: "Freelance",
        companyLogo: "/freelance.jpg",
        period: "2021 - 2022",
        description:
            "Designed creative visual assets for clients, including logos, social media content, and marketing materials. Focused on delivering brand-consistent, eye-catching designs that enhanced client engagement and business visibility.",
    },
];

const ExperienceSection = () => {
    return (
        <section className="py-20 px-6 relative z-40">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Work <span className="text-main">Experience</span>
                </h2>

                {/* Experience List */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-6 bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
                        >
                            {/* Company Logo */}
                            <div className="w-auto h-auto  flex-shrink-0">
                                <Image
                                    src={exp.companyLogo}
                                    alt={exp.company}
                                    width={64}
                                    height={64}
                                    className="rounded-lg object-contain border border-gray-200"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {exp.role}
                                </h3>
                                <p className="text-main font-medium">{exp.company}</p>
                                <p className="text-gray-500 text-sm mb-3">{exp.period}</p>
                                <p className="text-gray-700 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
