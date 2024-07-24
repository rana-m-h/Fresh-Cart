import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


export default function Cart() {


  let { getCartItems, deleteCartItems, UpdataCartItems } = useContext(CartContext)

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getItems() {
    let { data } = await getCartItems()

    setCart(data)
    setLoading(false)
  }
  async function deleteItems(id) {
    setLoading(true)
    let { data } = await deleteCartItems(id)


    setCart(data)
    setLoading(false)
  }


  async function updataItems(id, count) {

    if (count < 1) {

      let { data } = await deleteCartItems(id)
      setCart(data)
    } else {
      let { data } = await UpdataCartItems(id, count)
      setCart(data)
    }

  }



  useEffect(() => {

    getItems()


  }, [])



  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title> Cart</title>

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
      </div> : cart ? <>

        <h2>Shop Cart :</h2>
        <p className='text-main ' >   numOfCartItems :  {cart.numOfCartItems}  </p>
        <p className='text-main'>   totalCartPrice :  {cart.data.totalCartPrice}  EGP </p>
        {cart.data.products.map(product => <div key={product.product.id} className="row align-items-center p-2 border-1 m-0 border-bottom">
          <div className="col-md-1">
            <div className="img">
              <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
            </div>
          </div>

          <div className="col-md-10">
            <div className="item ">
              <h3 className='h5 fw-bold '>{product.product.title.split(' ').slice(0, 4).join(' ')}</h3>
              <p className='text-main fw-bold'> price : {product.price} EGP </p>
              <button onClick={() => deleteItems(product.product.id)} className='btn'> <i className='fas fa-trash-can text-danger '></i> Remove </button>
            </div>
          </div>

          <div className="col-md-1">
            <div className="count ">

              <button onClick={() => updataItems(product.product.id, product.count + 1)} className='btn bord pb-1 pt-1 ps-2 pe-2'>+</button>
              <span className='mx-2'> {product.count}</span>
              <button onClick={() => updataItems(product.product.id, product.count - 1)} className='btn bord pb-1 pt-1 ps-2 pe-2'>-</button>
            </div>
          </div>
        </div>
        )}

        <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-main-light m-3'> online Payment</Link>


      </> : <h2>cart is empty......</h2>}


    </div>
  </>
}


