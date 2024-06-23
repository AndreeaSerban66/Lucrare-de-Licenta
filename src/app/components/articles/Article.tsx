import { FC } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface ArticleProps {
  id: number;
  title: string;
  description: string;
  slug: string;
  thumbnail: string | StaticImageData;
  classname?: string;
}

const Article: FC<ArticleProps> = ({
  id,
  title,
  description,
  thumbnail,
  slug,
  classname,
}) => {
  const router = useRouter();

  const handleClick = (slug: string) => () => {
    router.push(`/articles/${slug}`);
  };
  return (
    <div
      key={id}
      className={`border border-black p-10 rounded shadow-sm flex flex-col sm:flex-row bg-white relative w-full ${classname}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        width={200}
        height={200}
        className=" hidden lg:flex object-cover"
      />

      <div className="p-5">
        <h1 className="text-2xl font-poppins font-bold my-2 text-black">
          {title}
        </h1>
        <p className="text-black font-poppinslight text-lg my-2">
          {description}
        </p>
      </div>
      <div className="lg:absolute lg:bottom-3 lg:right-3 flex justify-center items-center">
        <Button
          variant="caribbean"
          text="Spre articol"
          className="border border-black rounded-sm"
          onClick={handleClick(slug)}
        />
      </div>
    </div>
  );
};

export default Article;
