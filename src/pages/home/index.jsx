import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
                <Card onClick={() => handleNavigate(e.produto_id)}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Title>{e.titulo}</Card.Title>
                    <Card.Text>{e.introducao}</Card.Text>
                    <Button href={e.link} target="_blank" rel="noopener noreferrer">More infos</Button>
                </Card>
                
            ))}
            
        </div>
    )
}

export default Home;