import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
      <ul>
        <li className="mb-2">
          <Link href="/backoffice/articles">Manage Articles</Link>
        </li>
        <li className="mb-2">
          <Link href="/backoffice/templates">Manage Templates</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
