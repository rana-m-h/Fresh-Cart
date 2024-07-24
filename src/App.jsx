import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Componets/Layout/Layout.jsx'
import Home from './Componets/Home/Home.jsx'
import Brands from './Componets/Brands/Brands.jsx'
import Cart from './Componets/Cart/Cart.jsx'
import Login from './Componets/Login/Login.jsx'
import ForgotPassword from './Componets/ForgotPassword/ForgotPassword.jsx'
import Categories from './Componets/Categories/Categories.jsx'
import Products from './Componets/Products/Products.jsx'
import Register from './Componets/Register/Register.jsx'
import Notfound from './Componets/Notfound/Notfound.jsx'
import { UserContext } from './Context/Usercontext.js'
import ProtectedRoute from './Componets/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Componets/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import WishList from './Componets/WishList/WishList.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.js'
import ShippingAddress from './Componets/ShippinAddress/ShippingAddress.jsx'
import CodeUser from './Componets/CodeUser/CodeUser.jsx'
import ResetPassword from './Componets/ResetPassword/ResetPassword.jsx'





export default function App() {

  let routers = createHashRouter([

    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'shippingaddress/:cardId', element: <ProtectedRoute><ShippingAddress/></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: 'codeUser', element: <CodeUser /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> },
        {path: 'wishList' , element:<ProtectedRoute><WishList/></ProtectedRoute> }
      ]
    }


  ])


  let { setUserToken } = useContext(UserContext)

useEffect(()=>{

  if( localStorage.getItem('userToken') ){
    setUserToken(localStorage.getItem('userToken'))
  
  }
  
} , []) 

  return <>

<Provider store={store}>

<RouterProvider router={routers}></RouterProvider>
    <Toaster/>
</Provider>
  

  </>
}
