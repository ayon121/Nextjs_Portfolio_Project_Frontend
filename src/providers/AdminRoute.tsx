"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProviders";



interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute =({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role !== "SUPER_ADMIN") {
   
        router.replace("/"); 
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user || user.role !== "SUPER_ADMIN") {
    return null;
  }

  return children;
};

export default AdminRoute;