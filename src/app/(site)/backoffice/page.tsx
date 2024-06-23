"use client";
import { ReactNode } from "react";
import AdminSidebar from "@/app/components/backoffice/AdminSidebar";
import Banner from "@/app/components/Banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (
    status === "unauthenticated" ||
    (session && session.user?.email !== "alolita.as@gmail.com")
  ) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Banner title="Dashboard"></Banner>
      <div className="flex bg-caribbean_blue">
        <AdminSidebar />
        <div className="flex-grow p-5">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
