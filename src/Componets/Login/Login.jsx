import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/Usercontext.js'



export default function Login() {


  const [loading, setLoading] = useState(false)
  const [apiError, setapiError] = useState(null)
  let navigate = useNavigate()
  let{setUserToken}= useContext(UserContext)


  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        setapiError(error.response.data.message)
        setLoading(false)
      })



    if (data.message == 'success') {
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')

    }


  }

  let validationSchema = Yup.object({


    email: Yup.string().required('Email is required').email('invalid email'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}/, 'invalid Password'),


  })

  let formik = useFormik({

    initialValues: {
      email: '',
      password: '',

    }, validationSchema
    , onSubmit: loginSubmit

  })


  return <>
    <div className="container">
      <div className="w-75 mt-5">
        <h2 className='mt-4'>login Now :</h2>
        <form onSubmit={formik.handleSubmit} >

          {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}

          <label htmlFor="email">Email :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" id="email" name='email' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

          <label htmlFor="password">Password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" id="password" name='password' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}





          {loading ? <button type='button' className='btn btn-info text-light mt-2'>
            <BallTriangle
              height={30}
              width={30}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </button> : <button disabled={!(formik.isValid && formik.dirty)} type='sumbit' className='btn btn-info text-light mt-2'>login</button>}

          <Link className='ps-3 ' to={'/register'}> Register </Link>
          <Link className='ps-3 ' to={'/forgotPassword'}> ForgotPassword ? </Link>
         









        </form>


      </div>




    </div>



  </>
}
