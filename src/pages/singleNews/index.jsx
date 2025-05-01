import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleNews() {

   const params = useParams()
   const [news, setNews] = useState([])

    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get(`https://servicodados.ibge.gov.br/api/v3/noticias/?idproduto=${params.code}`)
            const res = req.data.items
            setNews(res[0])
            console.log(res[0])
            
        }

        fetchAPI();
    }, [])

    
        return(
           <div>
             <h2>{news.titulo}</h2>
            
           </div>
        )
    

}

export default SingleNews;