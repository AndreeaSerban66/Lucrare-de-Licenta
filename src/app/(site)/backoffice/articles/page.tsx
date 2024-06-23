"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/app/components/backoffice/AdminLayout";
import Link from "next/link";
import Banner from "@/app/components/Banner";
import Button from "@/app/components/Button";

const AdminArticles = () => {
  const [articles, setArticles] = useState<{ slug: string; title: string }[]>(
    []
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleDeleteArticle = async (slug: string) => {
    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.slug !== slug)
      );
      console.log("Article deleted successfully");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div className="bg-tiffany_blue min-h-screen">
      <Banner title="Dashboard Articole" />
      <AdminLayout>
        <div className="bg-tiffany_blue flex-grow p-5">
          <h1 className="text-2xl font-bold mb-5 text-black font-poppins">
            Manage Articles
          </h1>
          <Link href="/backoffice/articles/create">
            <Button
              variant="tangerine"
              className=" text-black px-4 py-2 rounded mb-5"
            >
              Create New Article
            </Button>
          </Link>
          <ul className="space-y-4">
            {articles.map((article) => (
              <li
                key={article.slug}
                className="bg-caribbean_blue p-4 rounded shadow-md flex justify-between items-center"
              >
                <span className="font-semibold">{article.title}</span>
                <Button
                  variant="tangerine"
                  onClick={() => handleDeleteArticle(article.slug)}
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

export default AdminArticles;
