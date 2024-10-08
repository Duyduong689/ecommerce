import FeaturedRoom from "@/components/FeaturedRoom/FeatureRoom"
import Gallery from "@/components/Gallery/Gallery"
import HeroSection from "@/components/HeroSection/HeroSection"
import NewsLetter from "@/components/NewsLetter/NewsLetter"
import PageSearch from "@/components/PageSearch/PageSearch"
import { getFeaturedRoom } from "@/libs/apis"
import React from "react"

const Home = async () => {

  const featuredRoom = await getFeaturedRoom()

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRoom featuredRoom={featuredRoom} />
      <Gallery />
      <NewsLetter />
      {/* Featured Room */}
      {/* Gallery */}
      {/* News letter */}
    </>
  )
}

export default Home