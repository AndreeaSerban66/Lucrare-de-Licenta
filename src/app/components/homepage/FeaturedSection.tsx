import { useEffect, useState } from "react";
import Carousel from "@/app/components/Carousel";

interface Article {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

const FeaturedSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/articles");
      const data = await res.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setArticles(selected);
    };

    fetchArticles();
  }, []);

  return (
    <div className="mt-8 bg-tiffany_blue p-8 rounded-lg">
      <h2 className="text-3xl font-poppins text-black font-bold mb-4">
        Articole prezente pe site
      </h2>
      <Carousel articles={articles} />
    </div>
  );
};

export default FeaturedSection;
