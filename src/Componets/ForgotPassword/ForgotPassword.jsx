

import React, { useContext, useState } from 'react'
import { PasswordContext } from '../../Context/Password.js'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import * as Yup from 'yup'




export default function ForgotPassword() {
  
  let navigate = useNavigate()
  let validationSchema = Yup.object({


    email: Yup.string().required('Email is required').email('invalid email'),
  
  })



 async function forgotPassword(values){

 let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)


console.log(data)



if (data.statusMsg == 'success') {

 navigate('/codeUser')

}



}

    let formik = useFormik({
  
      initialValues: {
        email: ''
      }, 
      validationSchema
      ,

      onSubmit:forgotPassword
  
    })
  
  

  return <>
  
  <div className="container">
      <div className="w-75 mt-5">
        <h2 className='mt-4'>please enter your verification code </h2>
        <form onSubmit={formik.handleSubmit} >

       

          <label htmlFor="email">Email :</label>
          <input  onBlur={formik.handleBlur} onChange={formik.handleChange}  type="email" className="form-control"  value={formik.values.email} id="email" name='email' />
          

          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}


          <button  type='sumbit' className='btn btn-info text-light mt-2'>Verify</button>









        </form>


      </div>




    </div>


  
  </>
}
