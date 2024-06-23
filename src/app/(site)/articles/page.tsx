"use client";
import { useState, useEffect } from "react";
import ArticleList from "@/app/components/articles/ArticleList";
import Banner from "@/app/components/Banner";
import Container from "@/app/components/Container";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Banner title="Articole" />
      <Container className="p-10 bg-pale_dogwood flex justify-center items-center">
        <ArticleList articles={articles} />
      </Container>
    </>
  );
};

export default Articles;
