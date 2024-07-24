import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function ProductDetails() {

    let { addToCart } = useContext(CartContext)

    async function postToCart(id) {
        let { data } = await addToCart(id)
        if (data.status == 'success') {

            toast.success(data.message)

        }
    }



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


    const [details, setDetails] = useState({})
    const [loding, setLoding] = useState(true)

    let { id } = useParams()



    async function getProductsDetails(id) {

        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setDetails(data.data)
        setLoding(false)

    }

    useEffect(() => {

        getProductsDetails(id)

    }, [])

    return <>


        {loding ?

            <div className="text-center ">
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=" d-flex justify-content-center mt-5"
                    visible={true}
                />
            </div> :
        <>
           <Helmet>
        <meta charSet="utf-8" />
        <title>{details.title}</title>

      </Helmet>

    <div className="container">

<div className="row align-items-center">
                <div className="col-md-4 mt-5">
                    <Slider {...settings}>
       
                        {details.images.map(image => <img src={image} key={details.id} className= 'w-100' alt={details.title} />)}

                    </Slider>

                </div>
                <div className="col-md-6">
                    <div className="details">
                        <h3 className='h6'>{details.title}</h3>
                        <p className='py-3'>{details.description}</p>
                        <span className='font-sm text-main'>{details.category.name}</span>
                        <div className="d-flex py-3 justify-content-between align-items-center">

                            <span color='font-sm'>{details.price} EGP</span>
                            <span> <i className='fas fa-star  rating-color me-1'></i>
                                {details.ratingsAverage} </span>
                        </div>
                        <button onClick={() => postToCart(details.id)} className='btn bg-main  text-main-light w-100 btn-sm'>Add To Cart</button>

</div>
                </div>
            </div>

        </div>
      
        </>
          
        }


    </>
}
