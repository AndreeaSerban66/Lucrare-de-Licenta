"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/backoffice/AdminLayout";
import Link from "next/link";
import Banner from "@/app/components/Banner";
import Button from "@/app/components/Button";

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<{ id: number; title: string }[]>(
    []
  );

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/templates");
        if (!response.ok) {
          throw new Error("Failed to fetch templates");
        }
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleDeleteTemplate = async (id: number) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete template");
      }
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template.id !== id)
      );
      console.log("Template deleted successfully");
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  return (
    <div className="bg-tiffany_blue min-h-screen">
      <Banner title="Dashboard Templates" />
      <AdminLayout>
        <div className="bg-tiffany_blue flex-grow p-5">
          <h1 className="text-2xl font-bold mb-5 text-black font-poppins">
            Manage Templates
          </h1>
          <Link href="/backoffice/templates/create">
            <Button
              variant="tangerine"
              className=" text-black px-4 py-2 rounded mb-5"
            >
              Create New Template
            </Button>
          </Link>
          <ul className="space-y-4">
            {templates.map((template) => (
              <li
                key={template.id}
                className="bg-caribbean_blue p-4 rounded shadow-md flex justify-between items-center"
              >
                <span className="font-semibold">{template.title}</span>
                <Button
                  variant="tangerine"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminTemplates;
