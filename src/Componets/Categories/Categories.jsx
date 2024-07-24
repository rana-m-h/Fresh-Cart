import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Helmet } from "react-helmet";
import { BallTriangle } from 'react-loader-spinner';

export default function Categories() {


    const [loading , setLoading] = useState(true)

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { data } = useQuery('categories', getCategories)



   

    return <>

<Helmet>
        <meta charSet="utf-8" />
        <title> categories</title>

      </Helmet>


 
{/* {loading ? <div className="loading">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=" d-flex justify-content-center mt-5"
          visible={true}
    />
</div>: */}

        <div className="row gy-4 mt-4  mb-3  ">

            {data?.data.data.map(categorie => <div key={categorie.id} className="col-md-4">
                <div className="">
                    <div className="img  ">

                        <img src={categorie.image} height={300} className='w-100 styleImg  ' alt={categorie.name} />

                    </div>
                    <div className="text-center pt-3 shadow pb-3 text-main style">
                        <span >{categorie.name}</span>
                    </div>
                </div>
            </div>
            )}


      
      
</div>
</>
}
