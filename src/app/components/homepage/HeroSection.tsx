import { useEffect, useState } from "react";
import Image from "next/image";
import imagePlaceholder from "@/app/images/image-placeholder.png";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface Article {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  slug: string;
}

const HeroSection = () => {
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const res = await fetch("/api/articles/latest");
        const data = await res.json();
        console.log("Fetched article:", data);
        setLatestArticle(data);
      } catch (error) {
        console.error("Error fetching the latest article:", error);
      }
    };

    fetchLatestArticle();
  }, []);

  const router = useRouter();

  const handleClick = (slug: string) => () => {
    router.push(`/articles/${slug}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-atomic_tangerine text-white p-8 rounded-lg">
      <div className="grid grid-cols-2">
        <div className="col-span-2 lg:col-span-1 p-5">
          <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <h1 className="text-4xl font-bold text-center lg:mb-10 font-poppins">
              Descoperă Arta Croitoriei: Tipare și Articole Inspirate
            </h1>
            <p className="text-xl mt-2 font-poppinslight">
              Bine ai venit la Croitoresele Fericite, locul unde pasiunea pentru
              croitorie prinde viață. Explorează colecția noastră de articole și
              tipare de croitorie, create special pentru a te inspira și a-ți
              îmbunătăți abilitățile. Indiferent dacă ești începător sau expert,
              vei găsi resurse valoroase care să te ajute să creezi piese unice
              și să-ți transformi visele în realitate.
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 p-5 bg-tiffany_blue rounded-md">
          <h1 className="text-2xl lg:text-4xl font-poppins text-black font-bold text-center lg:mb-10">
            Ultimul articol publicat
          </h1>
          {latestArticle && (
            <div className="grid grid-cols-2 text-black gap-5">
              <div className="col-span-2 lg:col-span-1">
                <h1 className="text-2xl lg:text-4xl font-bold mt-2 text-center lg:text-left font-poppins">
                  {latestArticle.title}
                </h1>
                <p className="text-gray-600 font-poppinslight">
                  {latestArticle.description}
                </p>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="p-1">
                  <Image
                    src={latestArticle.thumbnail || imagePlaceholder}
                    alt={latestArticle.title || "Placeholder image"}
                    className="rounded-md"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="p-1">
                  <Button
                    text="Spre articol"
                    variant="tangerine"
                    className="rounded-md"
                    onClick={handleClick(latestArticle.slug)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
