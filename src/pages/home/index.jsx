import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import IMG from "../assets/ibge.webp";

function Home() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
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
        <div className="div-page">
            <img src={IMG} alt="Description of the image" />
            <div className="div-input-btn">
                <input className="input-home" placeholder="filtre por materia" type="text" value={search} onChange={handleChange} />

                <Button onClick={handleClick}>Procurar</Button>

            </div>
            <div className="div-map">
                {data.map((e, i) => (
                    <div className="div-card">
                        <Card onClick={() => handleNavigate(e.produto_id)}>
                            <Card.Title className="card-title">{e.titulo}</Card.Title>
                            <Card.Text className="card-text">{e.introducao}</Card.Text>
                            <Button className="btn-card" href={e.link} target="_blank" rel="noopener noreferrer">Abrir Materia Completa no site IBGE</Button>
                        </Card>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Home;