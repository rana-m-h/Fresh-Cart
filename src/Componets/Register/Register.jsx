
import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'




export default function Register() {

    const [loading, setLoading] = useState(false)
    const [apiError, setapiError] = useState(null)
    let navigate = useNavigate()


    async function registerSubmit(values) {
        setLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .catch((error) => {
                setapiError(error.response.data.message)
                setLoading(false)
            })
        console.log(data);


        if (data.message == 'success') {
            setLoading(false)
            navigate('/login')

        }


    }

    let validationSchema = Yup.object({

        name: Yup.string().required('Name is required').min(3, 'min lenght is 3').max(10, 'max lenght is 10'),
        email: Yup.string().required('Email is required').email('invalid email'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}/, 'invalid Password'),
        rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Password and rePassword dont match'),
        phone: Yup.string().required('phon is required').matches(/^01[0125][0-9]{8}$/, 'we need egyptain number'),

    })

    let formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema
        , onSubmit: registerSubmit

    })


    return <>
        <div className="container">
            <div className="w-75 mt-5">
                <h2 className='mt-4'>Register Now :</h2>
                <form onSubmit={formik.handleSubmit} >

                    {apiError ? <div className="alert alert-danger">{apiError}</div> : ''}


                    <label htmlFor="name">Name :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" id="name" name='name' />
                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name}</div> : null}

                    <label htmlFor="email">Email :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" id="email" name='email' />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

                    <label htmlFor="password">Password :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" id="password" name='password' />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}



                    <label htmlFor="rePassword">Repassword :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" id="rePassword" name='rePassword' />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : null}


                    <label htmlFor="phone">Phone :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className="form-control" id="phone" name='phone' />
                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone}</div> : null}


                    {loading ? <button type='button' className='btn btn-info text-light mt-2 '>
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
                    </button> : <button disabled={!(formik.isValid && formik.dirty)} type='sumbit' className='btn btn-info text-light mt-2'>Register</button>}
                    <Link className='ps-3 ' to={'/login'}> Login </Link>








                </form>


            </div>




        </div>



    </>
}
