// src/app/components/articles/ArticlePage.tsx

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import CommentSection from "@/app/components/articles/CommentSection";
import { StaticImageData } from "next/image";
import Banner from "../Banner";
import DOMPurify from "dompurify";

interface ArticleProps {
  id: number;
  title: string;
  content: string;
  description: string;
  thumbnail: string | StaticImageData;
  slug: string;
}

const ArticlePage: FC<ArticleProps> = ({
  id,
  title,
  content,
  description,
  thumbnail,
  slug,
}) => {
  const [article, setArticle] = useState<ArticleProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/articles/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <>
      {" "}
      <Banner title={article.title}></Banner>
      <Container className="bg-pale_dogwood">
        <div className="bg-white p-10 rounded-xl mb-10" key={article.id}>
          <h1 className="font-poppins font-bold text-black text-3xl text-center"></h1>
          <div className="flex items-end">
            <div className="grid grid-cols-2 my-10 items-center">
              <h2 className="text-gray-600 italic font-poppinslight text-sm lg:text-md p-5 col-span-2 lg:col-span-1">
                {article.description}
              </h2>
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={500}
                height={500}
                className="rounded-xl col-span-2 lg:col-span-1 lg:translate-x-56"
              />
            </div>
          </div>
          <div
            className="text-md lg:text-lg text-black font-poppinslight"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
        <CommentSection articleSlug={article.slug} />
      </Container>
    </>
  );
};

export default ArticlePage;
