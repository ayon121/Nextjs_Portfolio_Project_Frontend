import AboutSlider from "./AboutSlider";




export default async function AboutWebsitePage() {
  let about = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      cache: "force-cache",
    });
    const json = await res.json();
    about = json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching About Me:", error);
  }

  if (!about) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold text-red-500">
          About Me information not found.
        </h2>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-transparent  pt-5">
      <AboutSlider />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div
                className="sticky top-24 bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg"
                style={{ minHeight: 280 }}
              >
                

                <h3 className="text-center text-xl font-semibold text-gray-900 mb-1">
                  {about.name}
                </h3>
                <p className="text-center text-sm text-gray-600 mb-4">{about.location || "Location not set"}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 truncate">{about.email}</p>
                  </div>

                  {about.lasteducation && (
                    <div>
                      <p className="text-xs text-gray-500">Education</p>
                      <p className="text-gray-800">{about.lasteducation}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500">Availability</p>
                    <p className="text-green-600 font-medium">Software Developer at Ufficio Furniture</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {about.socialLinks &&
                    Object.entries(about.socialLinks).map(([k, v], i) =>
                      v ? (
                        <a
                          key={k}
                          href={v as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-main text-white rounded-md text-sm hover:opacity-95 transition"
                          style={{ animation: `fadeUp .5s ease ${i * 75}ms both` }}
                        >
                          {k.charAt(0).toUpperCase() + k.slice(1)}
                        </a>
                      ) : null
                    )}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl p-8 shadow-lg border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Hello — I&apos;m {about.name}</h1>

                <p className="text-gray-700 leading-relaxed mb-6 prose" dangerouslySetInnerHTML={{ __html: about.bio || "" }} />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Skills & Focus</h4>
                    <ul className="flex flex-wrap gap-2">
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">Next.js</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">Tailwind</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">Node.js</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">Mongodb</li>
                      <li className="px-3 py-1 bg-gray-100 rounded-full text-sm">Prisma</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <div className="flex flex-col gap-2">
                      {about.socialLinks?.portfolio && (
                        <a href={about.socialLinks.portfolio} className="text-main hover:underline" target="_blank" rel="noreferrer">Portfolio</a>
                      )}
                      {about.socialLinks?.github && (
                        <a href={about.socialLinks.github} className="text-main hover:underline" target="_blank" rel="noreferrer">GitHub</a>
                      )}
                      {about.socialLinks?.linkedin && (
                        <a href={about.socialLinks.linkedin} className="text-main hover:underline" target="_blank" rel="noreferrer">LinkedIn</a>
                      )}
                    </div>
                  </div>
                </div>

  
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={`mailto:${about.email}`} className="px-6 py-3 bg-main text-white rounded-lg shadow hover:opacity-95 transition">Contact Me</a>
                  {about.socialLinks?.portfolio && (
                    <a href={about.socialLinks.portfolio} target="_blank" rel="noreferrer" className="px-6 py-3 border border-main text-main rounded-lg hover:bg-main/5 transition">View Portfolio</a>
                  )}
                </div>
              </div>

          
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp .6s ease both; }
      `}</style>
    </main>
  );
}
