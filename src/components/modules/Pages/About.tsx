"use client";

import Link from "next/link";

export default function AboutWebsitePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 pt-11">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-main to-main/30 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About This Platform</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl">
          A one-stop platform where users can create their own portfolio, share blogs & projects,
          and even build resumes — all in one place.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">What You Can Do Here</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Portfolio */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-main mb-2">📂 Create Your Portfolio</h3>
            <p className="text-gray-600">
              Showcase your skills, achievements, and experiences in a professional portfolio.
              Your personal space to tell the world who you are and what you do.
            </p>
          </div>

          {/* Blogs */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-main mb-2">✍️ Write & Share Blogs</h3>
            <p className="text-gray-600">
              Share your thoughts, tutorials, and experiences through blogs. Readers can explore and
              engage with your content, helping you grow your online presence.
            </p>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-main mb-2">🚀 Showcase Projects</h3>
            <p className="text-gray-600">
              Display your projects with details, features, and live links. A perfect way to build
              credibility and let others see your real-world work.
            </p>
          </div>

          {/* Resume Builder */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-main mb-2">📄 Build Your Resume</h3>
            <p className="text-gray-600">
              Use our interactive Resume Builder to create a professional resume in minutes. Edit
              your details and download your resume as a PDF instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            This platform is designed to empower individuals, developers, and professionals to build
            their online presence with ease. Whether it’s creating a portfolio, writing blogs,
            showcasing projects, or building resumes, everything is simplified into one seamless
            experience.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-main to-main/30 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Start Building Your Digital Identity</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Sign up today and create your portfolio, publish blogs, showcase projects, and build your
          professional resume — all from one dashboard.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 bg-white text-main font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}
