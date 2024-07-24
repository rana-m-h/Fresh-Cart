import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick';

export default function CategoriseSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };


    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }



    let { data } = useQuery('categories', getCategories)

    return <>
        {/* <div className="row mb-5">
            <Slider {...settings}>

                {data?.data.data.map(categorie => <div key={categorie.id} className="col-md-12">

                    <div className="img">

                        <img src={categorie.image}  height={200}  className='w-100' alt={categorie.name} />
                         <span>{categorie.name}</span>
                    </div>

                </div> )}
              

            </Slider>
        </div> */}



    </>
}
