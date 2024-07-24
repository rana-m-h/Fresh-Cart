import { useFormik } from 'formik'
import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.js'

export default function ShippingAddress() {

    let { cardId } = useParams()

    let { checkOutSession } = useContext(CartContext)


    async function checkOut(valuse) {


        let { data } = await checkOutSession(cardId, valuse)
        if (data.status == 'success') {
            window.location.href = data.session.url

        }

    }

    let formik = useFormik({

        initialValues: {
            details: '',
            phone: '',
            city: '',

        }, onSubmit: checkOut
    })

    return <>

        <div className="w-75 mx-auto">

            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="details">details</label>
                <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3' />
                <label htmlFor="phone">phone</label>
                <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
                <label htmlFor="city">city</label>
                <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3' />
                <button className='btn bg-main text-main-light' type='submit'>  Checkout</button>

            </form>
        </div>

    </>
}
