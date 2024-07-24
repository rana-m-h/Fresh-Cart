

import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CodeUser() {

    let navigate = useNavigate()

    async function SendCode(values){

        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , values)
       
       
       console.log(data)



       if (data.status == "Success") {

        navigate('/resetPassword')
       
       }
       

       
       }
       

    



       let formik = useFormik({
  
        initialValues: {
            resetCode: ''
        }, 
     
        onSubmit:SendCode
    
      })
    
    

  return <>
  
  
  <div className="container">
      <div className="w-75 mt-5">
        <h2 className='mt-4'>please enter your verification code </h2>
        <form onSubmit={formik.handleSubmit} >

       

          <label htmlFor="resetCode">resetCode :</label>
          <input   onChange={formik.handleChange}    value={formik.values.resetCode}   type="text" className="form-control" id="resetCode" name='resetCode' />
          

        

          <button  type='sumbit' className='btn btn-info text-light mt-2'>Send Code</button>









        </form>


      </div>




    </div>


  
  </>
}
