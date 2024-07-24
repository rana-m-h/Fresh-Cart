

import React, { useContext, useEffect, useState } from 'react'

import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { ListContext } from '../../Context/LIstContext.js'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext.js'


export default function WishList() {



    let { getListItems, remove } = useContext(ListContext)

    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(true)

    async function getItems() {
        let { data } = await getListItems()
        console.log(data)

        setList(data)
        setLoading(false)
    }
    async function deleteWishListItems(id) {
        setLoading(true)
        let { data } = await remove(id)
        console.log(data)
        if (data.status == 'success') {
                getItems()
            // setList(data)
            // setLoading(false)
        }
    }


    useEffect(() => {

        getItems()


    }, [])
    let { addToCart } = useContext(CartContext)

    async function postToCart(id) {
        let { data } = await addToCart(id)
        if (data.status == 'success') {

            toast.success(data.message)

        }
    }



    return <>


        <Helmet>
            <meta charSet="utf-8" />
            <title> Wish List</title>

        </Helmet>


        <div className="bg-main-light p-2 mt-5">

            {loading ? <div className="loading">
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=" d-flex justify-content-center mt-5"
                    visible={true}
                />
            </div> : <>

                <h2 className='mt-2'>My wish List :</h2>
                {list?.data.map(product => <div key={product.id} className="row align-items-center p-2 border-1 m-0 border-bottom mt-5 pb-4">
                    <div className="col-md-1">
                        <div className="img">
                            <img src={product.imageCover} className='w-100' alt={product.title} />
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="item ">
                            <h3 className='h5 fw-bold '>{product?.title}</h3>
                            <p className='text-main fw-bold'> price : {product.price} EGP </p>
                            <button onClick={() => deleteWishListItems(product.id)} className='btn ' ><i className='fas fa-trash-can text-danger '></i>Remove</button>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <button onClick={() => postToCart(product.id)} className='btn bg-main pt-1 ps-3 pe-3 text-main-light'>Add To Cart</button>
                    </div>
                </div>
                )}

            </>}


        </div>
    </>
}
