import { createContext } from "react"
import axios from "axios";








export let ListContext = createContext()


export default function ListContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }


    function addToList(productId) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {


            productId

        }, {
            headers
        })

            .then((response) => response)
            .catch((err) => err)
    }




    function getListItems() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {





            headers
        })

             .then((response) => response)
            .catch((err) => err)
          
    }



    function remove (productId) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {




            headers
            
        })

            .then((response) => response)
            .catch((err) => err)
           
    }

    return <ListContext.Provider value={{ addToList, getListItems , remove}} >

    {props.children}

</ListContext.Provider>


}