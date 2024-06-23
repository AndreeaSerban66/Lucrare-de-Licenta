"use client";

import { useState, useEffect } from "react";
import TemplateList from "@/app/components/templates/TemplateList";
import Container from "@/app/components/Container";
import Banner from "@/app/components/Banner";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch("/api/templates");
      const data = await response.json();
      setTemplates(data);
      console.log(data);
    };
    fetchTemplates();
  }, []);

  return (
    <>
      <Banner title="Tipare" />
      <Container className="p-10 bg-pale_dogwood">
        <TemplateList templates={templates} />
      </Container>
    </>
  );
};

export default Templates;
