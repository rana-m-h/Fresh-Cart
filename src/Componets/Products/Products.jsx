import React, { useContext } from 'react'
import axio from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'
import { ListContext } from '../../Context/LIstContext.js'
import { Helmet } from 'react-helmet'


export default function Products() {
    let { setNumberOfCartItems } = useContext(CartContext)


    function getProducts() {
        return axio.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }


    let { data, isError, isFetched, isLoading } = useQuery('featuredProuts', getProducts)
 


    let { addToCart } = useContext(CartContext)


    async function postToCart(id) {
        let { data } = await addToCart(id)
        console.log(data.numOfCartItems, "ddddd");
        if (data.status == 'success') {
            setNumberOfCartItems(data.numOfCartItems)

            toast.success(data.message)

        }
    }
    let { addToList } = useContext(ListContext)


    async function postToList(id) {
        let { data } = await addToList(id)
        console.log(data, "dattaaa");
        if (data.status == 'success') {
            console.log(data, "data addtocart");


            toast.success(data.message)

        }
    }


    return <>


        <Helmet>
            <meta charSet="utf-8" />
            <title> Products</title>

        </Helmet>


        {isLoading ?

            <div className="text-center">
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=" d-flex justify-content-center mt-5"
                    visible={true}
                />
            </div>

            : <div className="row gy-4 mt-5">

                {data?.data.data.map(product =>


                    <div key={product.id} className="col-md-2 ">


                        <div className="product p-2">
                            <Link to={`/productdetails/${product.id}`}>
                                <img src={product.imageCover} className='w-100' alt="" />
                                <span className='font-sm text-main'>{product.category.name}</span>
                                <h3 className='h6'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                <div className="d-flex py-3 justify-content-between align-items-center">
                                    <span color='font-sm'>{product.price} EGP</span>
                                    <span> <i className='fas fa-star  rating-color me-1'></i>
                                        {product.ratingsAverage} </span>
                                </div>
                            </Link>
                            <i onClick={() => postToList(product.id)} className="fa-regular fa-heart mb-3 ms-auto cursor-pointer " ></i>

                            <button onClick={() => postToCart(product.id)} className='btn bg-main  text-main-light w-100 btn-sm'>Add To Cart</button>


                        </div>




                    </div>





                )}

            </div>}
    </>
}
