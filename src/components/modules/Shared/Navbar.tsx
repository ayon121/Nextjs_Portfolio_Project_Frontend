"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/providers/AuthProviders";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuth();




    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Me" },
        { href: "/allprojects", label: "Projects" },
        { href: "/allblogs", label: "Blogs" },
    ];

    return (
        <nav className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-main">
                    AYON SAHA
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
                    <div>
                        {user ? (
                            <Link href={"/dashboard"}>
                                <button className="border-2 bg-main hover:bg-white text-white hover:text-main rounded-md px-4 py-3 uppercase flex flex-row items-center justify-center   text-xs">
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button className="border-2 bg-main hover:bg-white text-white hover:text-main rounded-md px-4 py-3 uppercase flex flex-row items-center justify-center   text-xs">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
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

                        {<div>
                            {user ? (
                                <Link href={"/dashboard"}>
                                    <button className="border-2 bg-main hover:bg-white text-white hover:text-main rounded-md px-4 py-3 uppercase flex flex-row items-center justify-center   text-xs">
                                        Dashboard
                                    </button>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <button className="border-2 bg-main hover:bg-white text-white hover:text-main rounded-md px-4 py-3 uppercase flex flex-row items-center justify-center   text-xs">
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>}

                    </div>
                </div>
            )}
        </nav>
    );
}
