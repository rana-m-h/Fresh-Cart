import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/brandsSlice.js'
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'




export default function Brands() {


  let { brands, isLoading } = useSelector(({ brand }) => brand)

  let dispatch = useDispatch()




  useEffect(() => {

    dispatch(getBrands())

  }, [])


  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title> Brand</title>

    </Helmet>




    {isLoading ? <div className="loading">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=" d-flex justify-content-center mt-5"
        visible={true}
      />
    </div> : <div className="row py-5">


      {brands.map(brand =>
        <div key={brand.id} className="col-md-3">
          <div className="product p-2 ">
            <img src={brand.image} className='w-100' alt={brand.name} />
            <p>{brand.name}</p>
          </div>
        </div>

      )}

    </div>
    }


  </>
}
