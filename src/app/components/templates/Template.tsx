import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { DocumentArrowDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import Button from "@/app/components/Button";
interface TemplateProps {
  id: number;
  title: string;
  thumbnail: string | StaticImageData;
  pdfFile: string;
}

const Template: FC<TemplateProps> = ({ id, title, thumbnail, pdfFile }) => {
  const handlePreview = () => {
    window.open(pdfFile, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center p-3 rounded-lg bg-tiffany_blue">
      <h1 className="text-xl font-bold text-black font-poppins mb-2 text-center">
        {title}
      </h1>
      <Image
        src={thumbnail}
        alt={title}
        width={100}
        height={100}
        className="object-cover mb-4 w-auto h-auto"
      />

      <Button
        variant="tangerine"
        className="px-4 py-2 flex items-center"
        onClick={handlePreview}
      >
        <DocumentArrowDownIcon className="h-5 w-5" />
        <span className="hidden lg:flex ml-2">Descarcă</span>
      </Button>
    </div>
  );
};

export default Template;
