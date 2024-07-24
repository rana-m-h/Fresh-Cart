import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/Usercontext.js'
import { CartContext } from '../../Context/CartContext.js'

export default function Navbar() {

  let { numberOfCartItems, getCartItems, setNumberOfCartItems } = useContext(CartContext)



  let { userToken, setUserToken } = useContext(UserContext)
  async function getcartt() {
    let { data } = await getCartItems()
    setNumberOfCartItems(data.numOfCartItems)

    console.log(data);

  }


  
  useEffect(() => {
    getcartt()


  }, [])


  let navigate = useNavigate()
  function logOut() {

    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')


  }

  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {userToken != null ? <>
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'products'}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'categories'}>Categories</Link>
              </li>
            

              <li className="nav-item">
                <Link className="nav-link" to={'brands'}>Brands</Link>
              </li>

            </> : ""}





          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook me-2'></i>
              <i className='fab mx-2 fa-twitter me-2'></i>
              <i className='fab mx-2 fa-instagram me-2' ></i>
              <i className='fab mx-2 fa-youtube me-2'></i>
              <i className='fab mx-2 fa-tiktok me-2'></i>
            </li>
            {userToken != null ? <>

              <li className="nav-item">
                <Link className="nav-link " to={'cart'}><i className="fa-solid fa-cart-shopping fa-2x"> </i>  </Link>
                <div className="icon">{numberOfCartItems} </div>

              </li>

              <li className="nav-item">
                <Link className="nav-link " to={'wishList'}><i className="fa-solid fa-heart color "></i>  </Link>
              </li>


              <li className="nav-item">
                <span onClick={logOut} className="nav-link cursor-pointer" >Logout</span>
              </li>

            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to={'register'}>Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'login'}>Login</Link>
              </li>


            </>}





          </ul>

        </div>
      </div>
    </nav>

  </>
}
