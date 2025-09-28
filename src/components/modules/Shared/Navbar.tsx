"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Dummy auth state for now
    const isAuthenticated = false

    const session = useSession()
    



    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/blogs", label: "Blogs" },
        { href: "/resume-builder", label: "Resume Builder" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-main">
                    MyPortfolio
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition ${pathname === link.href
                                    ? "text-main"
                                    : "text-gray-700 hover:text-main/80"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Auth Buttons */}
                    {session.status === "authenticated" ? (
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-md">
                    <div className="flex flex-col gap-4 px-6 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`font-medium transition ${pathname === link.href
                                        ? "text-main"
                                        : "text-gray-700 hover:text-main/80"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-main text-white rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
