"use client";

import { JSX, ReactNode } from "react";

import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";

import { MdAddToPhotos, MdLocalPostOffice, MdPostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";

import { IoBagAddOutline, IoLogOut } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";


interface MenuItem {
    label: string;
    href: string;
    icon: JSX.Element;
}

interface AdminDashboardLayoutProps {
    children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {

    const menuItems: MenuItem[] = [
        { label: "Dashboard", href: "/dashboard/", icon: <LuLayoutDashboard /> },
        { label: "All Blogs", href: "/dashboard/blogs", icon: <MdPostAdd /> },
        { label: "Messages", href: "/dashboard/contacts", icon: <MdLocalPostOffice /> },
        { label: "Add Blog", href: "/dashboard/addblog", icon: <MdAddToPhotos /> },
        { label: "Home", href: "/", icon: <FaHome /> },
    ];

    const session = useSession()

    const btnClass =
        "py-2 px-0.5 md:px-4 w-full my-3 rounded-xl bg-white hover:text-main uppercase text-start hover:text-sm duration-150 slide-in-left md:text-base flex flex-row items-center gap-0.5 text-xs";

    return (

        <div className="min-h-screen w-full bg-white relative">
            {/* Noise Texture (Darker Dots) Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#ffffff",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="font-poppins">
                {/* Mobile Nav */}
                <div className="relative z-50 md:hidden">
                    <div className="navbar bg-main">
                        <div className="flex-none">
                            <div className="drawer">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    <label htmlFor="my-drawer" className="btn btn-ghost text-white drawer-button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#FFFFFF"
                                            viewBox="0 0 24 24"
                                            className="inline-block w-5 h-5 stroke-current text-whitecolor hover:text-main"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                    </label>
                                </div>
                                <div className="drawer-side z-50">
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu p-4 w-1/2 min-h-full bg-main text-base-content">
                                        {menuItems.map((item) => (
                                            <Link key={item.href} href={item.href}>
                                                <div className={btnClass}>
                                                    <span className="text-lg pb-0.5">{item.icon}</span>
                                                    {item.label}
                                                </div>
                                            </Link>
                                        ))}
                                        {session.status === "authenticated" && (
                                            <button
                                                onClick={() => signOut()}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                                Logout
                                            </button>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-row gap-1.5 justify-start items-center">
                                <span className="text-xl text-whitecolor font-bold font-Rubik text-white">ADMIN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden h-full overflow-y-scroll fixed px-3 border-r-2 border-sky-300 md:flex flex-col pt-5 justify-start bg-main pb-7">
                    <div className="flex flex-row gap-1.5 justify-center items-center">
                        <span className="text-xl text-whitecolor font-bold font-Rubik text-white">ADMIN</span>
                    </div>
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div className={btnClass}>
                                <span className="text-lg pb-0.5">{item.icon}</span>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    {session.status === "authenticated" && (
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    )}
                </div>

                {/* Main Content */}
                <div className="min-h-screen relative md:ml-52 px-3 z-40 font-nunito">{children}</div>
            </div>
        </div>
    );
}
