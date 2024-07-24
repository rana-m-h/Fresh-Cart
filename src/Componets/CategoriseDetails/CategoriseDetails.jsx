



import axios from 'axios'
import React from 'react'


const [details, setDetails] = useState({})
const [loding, setLoding] = useState(true)

let { id } = useParams()



export default  function CategoriseDetails(id) {

 async function get (){
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    console.log(data)
    setDetails(data.data)
    setLoding(false)

}

useEffect(() => {

    get(id)

}, [])


}






return <>

<Helmet>
    <meta charSet="utf-8" />
    <title>{details.title}</title>

  </Helmet>

    
    {/* {loding ?

        <div className="text-center ">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=" d-flex justify-content-center mt-5"
                visible={true}
            />
        </div> :''
        
        } */}


</>
   









