

import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'



export default function ResetPassword() {

    let navigate = useNavigate()

    let validationSchema = Yup.object({


        email: Yup.string().required('Email is required').email('invalid email'),
        newPassword: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}/, 'invalid Password'),


    })



 async function resetPassword(values){


    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)


    console.log(data)
    
    if(data.token){

navigate('/login')

    }


}

 
let formik = useFormik({

    initialValues: {
        email: '',
        newPassword: '',

    }, validationSchema
    , onSubmit: resetPassword

})


    return <>


        <div className="container">
            <div className="w-75 mt-5">
                <h2 className='mt-4'>reset your account password</h2>
                <form onSubmit={formik.handleSubmit} >


                    <label htmlFor="email">Email :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" id="email" name='email' />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

                    <label htmlFor="newPassword">newPassword :</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" id="newPassword" name='newPassword' />
                    {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger py-2">{formik.errors.newPassword}</div> : null}



                    <button disabled={!(formik.isValid && formik.dirty)} type='sumbit' className='btn btn-info text-light mt-2'>Reset Password</button>










                </form>


            </div>




        </div>




    </>
}
