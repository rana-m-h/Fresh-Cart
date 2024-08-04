import React from 'react'
import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'
import imgae1 from '../../Assets/images/grocery-banner.png'
import imgae2 from '../../Assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2000,
    };
    

  return <>
  <div className="row my-3 gx-0">
    <div className="col-md-9">
   <Slider {...settings}>

<img src={img1} height={400} className='w-100' alt="" />
<img src={img2} height={400} className='w-100' alt="" />
<img src={img3} height={400} className='w-100' alt="" />

   </Slider>
    </div>
    <div className="col-md-3">
        <div className="imges">
            <img src={imgae1}  height={200} className='w-100' alt="" />
            <img src={imgae2}  height={200} className='w-100' alt="" />
        </div>
    </div>
  </div>
  
  </>
}
