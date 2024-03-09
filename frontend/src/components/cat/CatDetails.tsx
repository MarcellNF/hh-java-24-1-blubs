import {useEffect, useState} from "react";
import {Cat} from "../../Cat.ts";
import axios from "axios";
import {Navigate, useNavigate, useParams} from "react-router-dom";

type CatDetailsProps = {
    deleteCat: (id: string) => void,
    updateCat: (id: string, name: string, color: string) => void,
}

export default function CatDetails(props: Readonly<CatDetailsProps>) {
    const [cat, setCat] = useState<Cat | null | undefined>(undefined);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    if (!id) {
        navigate("/");
        console.log("Id undefined!");
    }

    function fetchCat() {
        axios.get(`/api/cats/${id}`)
            .then((response) => {
                setCat(response.data);
                setName(response.data.name);
                setColor(response.data.color);
            })
            .catch(() => {
                setCat(null);
            });
    }


    useEffect(() => {
        fetchCat();
    }, []);

    if (cat === undefined) {
        return <p>Loading...</p>
    }

    if (cat === null) {
        console.log("Cat not found or server error");
        return <Navigate to={"/"}/>
    }

    function deleteCat() {
        if (cat) {
            props.deleteCat(cat.id)
            navigate("/")
        }
    }

    function editCat() {
        if (cat) {
            props.updateCat(cat.id, name, color);
            setIsEditMode(false);
            fetchCat()
        }
    }

    return (
        <div>
            {
                isEditMode ?
                    <>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={"Name"}/>
                        <input value={color} onChange={(e) => setColor(e.target.value)} placeholder={"Color"}/>
                    </>
                    :
                    <>
                        <h1>{cat.name}</h1>
                        <p>{cat.color}</p>
                    </>
            }

            <button onClick={deleteCat}>Delete Cat</button>
            {
                isEditMode ?
                    <button onClick={editCat}>Update Cat</button> :
                    <button onClick={() => setIsEditMode(true)}>Edit Cat</button>
            }

        </div>
    );
}