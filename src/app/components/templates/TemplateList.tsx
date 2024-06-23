import { FC } from "react";
import Template from "@/app/components/templates/Template";
import { StaticImageData } from "next/image";

interface TemplateProps {
  id: number;
  title: string;
  thumbnail: string | StaticImageData;
  pdfFile: string;
}

const TemplateList: FC<{ templates: TemplateProps[] }> = ({ templates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Template
          key={template.id}
          id={template.id}
          title={template.title}
          thumbnail={template.thumbnail}
          pdfFile={template.pdfFile}
        />
      ))}
    </div>
  );
};

export default TemplateList;
