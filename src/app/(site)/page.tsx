"use client";
import type { NextPage } from "next";
import Container from "@/app/components/Container";
import FeaturedSection from "@/app/components/homepage/FeaturedSection";
import HeroSection from "@/app/components/homepage/HeroSection";
import Banner from "@/app/components/Banner";

const Home: NextPage = () => {
  return (
    <>
      <Banner title="Acasă" />
      <Container className="bg-pale_dogwood p-10">
        <HeroSection />
        <FeaturedSection />
      </Container>
    </>
  );
};

export default Home;
