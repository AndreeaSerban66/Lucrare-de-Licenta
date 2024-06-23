import { FC } from "react";
import Article from "./Article";

interface Article {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

const ArticleList: FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <Article
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          thumbnail={article.thumbnail}
          slug={article.slug}
          classname={"my-5"}
        />
      ))}
    </div>
  );
};

export default ArticleList;
