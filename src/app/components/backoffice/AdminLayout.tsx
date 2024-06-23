import { ReactNode } from "react";
import AdminSidebar from "@/app/components/backoffice/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
};

export default AdminLayout;
