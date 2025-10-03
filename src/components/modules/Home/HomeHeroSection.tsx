import Image from "next/image";

const HomeHeroSection = () => {
    return (
        <section className="relative px-6 pt-36">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Profile Image */}
                <div>
                    <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                            width={300}
                            height={300}
                            src="/profile.jpg"
                            alt="Profile Picture"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Hi, I’m <span className="text-main">Ayon Saha</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-lg">
                        A passionate Software Developer who builds scalable SaaS, <br></br>
                        e-commerce platforms, and custom web applications. I focus on
                        performance, security, and delivering client-focused solutions.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                        <a
                            href={"https://www.linkedin.com/in/ayon-saha/"}
                            target="_blank"
                            className="px-6 py-3 bg-main text-white font-medium rounded-lg shadow hover:bg-main/90 transition"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroSection;
