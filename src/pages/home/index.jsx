import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Home() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const navigate = useNavigate ()
    const params = useParams()


    useEffect(() => {
        async function fetchAPI() {
            const req = await axios.get(`https://servicodados.ibge.gov.br/api/v3/noticias/`)
            const res = req.data.items
            setData(res)
        }
        fetchAPI()

    }, [])

    function handleChange(event) {
      const value = event.target.value
      setSearch(value)
    }

    function handleClick() {
        const searchFilter = data.filter((e, i) => e.titulo.toLowerCase().includes(search))
        setData(searchFilter)
    }

    function handleNavigate(id) {
        navigate(`/singlenews/${id}`)
    }


    return (
        <div>

            <input type="text" value={search} onChange={handleChange} />

            <button onClick={handleClick}>Search</button>

            {data.map((e, i) => (
                <div onClick={() => handleNavigate(e.produto_id)}>
                    <h2>{e.titulo}</h2>
                    <p>{e.introducao}</p>
                    <a href={e.link} target="_blank" rel="noopener noreferrer">More infos</a>
                </div>
            ))}
        </div>
    )
}

export default Home;