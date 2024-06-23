import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  articles: {
    id: number;
    title: string;
    description: string;
    slug: string;
    thumbnail: string;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ articles }) => {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/articles/${slug}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-4"
          onClick={() => handleClick(article.slug)}
        >
          <div className="article-card bg-white p-4 rounded shadow cursor-pointer">
            <img
              src={article.thumbnail}
              alt="logo"
              className="w-full h-40 object-cover rounded-t"
            />
            <h3 className="text-2xl font-bold mt-2 text-black font-poppins">
              {article.title}
            </h3>
            <p className="text-gray-600 font-poppinslight">
              {article.description}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
