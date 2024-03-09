import {useEffect, useState} from "react";
import {Cat} from "../Cat.ts";
import axios from "axios";

export default function useCats() {
    const [cats, setCats] = useState<Cat[]>([]);

    function fetchCats() {
        axios.get('/api/cats')
            .then((response) => setCats(response.data))
            .catch((error) => console.error(error));
    }

    function saveCat(name: string, color: string) {
        axios.post("/api/cats", {
            "name": name,
            "color": color
        })
            .then((response) => setCats([...cats, response.data]))
            .catch((error) => console.log(error))
    }

    function updateCat(id: string, name: string, color: string) {
        axios.put(`/api/cats/${id}`, {
            "name": name,
            "color": color,
        })
            .then(() => fetchCats())
            .catch((error) => console.log(error));
    }

    function deleteCat(id: string) {
        axios.delete(`/api/cats/${id}`)
            .then(() => fetchCats())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchCats();
    }, []);

    return {
        cats,
        saveCat,
        updateCat,
        deleteCat
    }
}