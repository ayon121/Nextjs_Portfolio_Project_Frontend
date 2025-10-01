"use client";

import { useState, ReactNode, JSX } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAddToPhotos, MdLocalPostOffice, MdPostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";

interface MenuItem {
    label: string;
    href: string;
    icon: JSX.Element;
}

interface AdminDashboardLayoutProps {
    children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const session = useSession();

    const menuItems: MenuItem[] = [
        { label: "Dashboard", href: "/dashboard/", icon: <LuLayoutDashboard /> },
        { label: "All Blogs", href: "/dashboard/allblogs", icon: <MdPostAdd /> },
        { label: "Messages", href: "/dashboard/contacts", icon: <MdLocalPostOffice /> },
        { label: "Add Blog", href: "/dashboard/addblog", icon: <MdAddToPhotos /> },
        { label: "Home", href: "/", icon: <FaHome /> },
    ];

    const btnClass =
        "py-2 px-2 w-full my-2 rounded-lg bg-white  text-main hover:bg-gray-100 uppercase text-start flex items-center gap-2 text-sm";

    return (

        <div className="min-h-screen w-full bg-white relative">
            {/*  Diagonal Cross Grid Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                            linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
                            linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
                        `,
                    backgroundSize: "40px 40px",
                }}
            />



            <div className="font-poppins relative z-10">
                {/* Mobile Navbar */}
                <div className="md:hidden flex items-center justify-between bg-main text-white px-4 py-3">
                    <span className="text-lg font-bold">ADMIN</span>
                    <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            {mobileSidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Sidebar */}
                {mobileSidebarOpen && (
                    <div className="md:hidden fixed top-0 left-0 w-52 h-full bg-main text-white shadow-lg z-50 p-5 flex flex-col">
                        <button
                            onClick={() => setMobileSidebarOpen(false)}
                            className="self-end mb-4 text-white hover:text-gray-300"
                        >
                            ✕
                        </button>
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileSidebarOpen(false)}
                            >
                                <div className={btnClass}>
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                        {session.status === "authenticated" && (
                            <button
                                onClick={() => signOut()}
                                className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                            >
                                <IoLogOut className="inline mr-2" />
                                Logout
                            </button>
                        )}
                    </div>
                )}

                {/* Desktop Sidebar */}
                <div className="hidden md:flex h-full fixed flex-col w-52 bg-main text-white pt-5 pb-7 px-3 border-r border-gray-300">
                    <span className="text-xl font-bold mb-5 text-center">ADMIN </span>
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div className={btnClass}>
                                <span className="text-lg ">{item.icon}</span>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    {session.status === "authenticated" && (
                        <button
                            onClick={() => signOut()}
                            className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
                        >
                            <IoLogOut className="inline mr-2" />
                            Logout
                        </button>
                    )}
                </div>

                {/* Main Content */}
                <div className="md:ml-64 p-4">{children}</div>
            </div>

            <ToastContainer />
        </div>
    );
}
