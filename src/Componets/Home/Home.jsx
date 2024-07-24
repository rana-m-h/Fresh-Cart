import React from 'react'
import FeaturedProuts from '../FeaturedProduts/FeaturedProuts.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import CategoriseSlider from '../CategorisSlider/CategoriseSlider.jsx'
import { Helmet } from "react-helmet";

export default function Home() {
  return <>

    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>

      </Helmet>
    
    </div>

    <MainSlider />

    <CategoriseSlider />
    <FeaturedProuts />
  </>

}
