import React from "react"
import HeroSection from "./HeroSection"
import FeatureProducts from "./FeatureProducts"

import iPhone14Pro from "../../assets/iphone-14-pro.webp"
import mac from "../../assets/mac-system-cut.jfif"

const HomePage = () => {
  return (
    <div>
    <HeroSection 
        title="Buy iPhone 14 Pro"
        subtitle="Experience the power of the latest iPhone 14 with our most
         Pro camera ever"
        link = "/product/676d1daa533b9763dd0d1ffe"
        image={iPhone14Pro}
      />
      <FeatureProducts/>
      <HeroSection 
      title="Build the ultimate setup"
      subtitle="You can add Studio Display and colour-matched Magic
      accessories to your bag after you configured your Mac mini."
      link = "/product/676d1daa533b9763dd0d2006"
      image={mac}
    />
  </div>

  )
}
export default HomePage