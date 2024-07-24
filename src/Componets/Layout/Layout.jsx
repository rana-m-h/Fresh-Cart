
import React from 'react'


import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";


export default function Layout() {



  return <>

    <Navbar />

<div className="container">


  
<Offline><div className="loading">< h2 >Only shown offline (surprise!)</h2></div></Offline>

<Outlet></Outlet>
</div>
    

    <Footer />
  </>
}
