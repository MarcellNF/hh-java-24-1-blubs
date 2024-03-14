import './App.css'
import CatGallery from "./components/cat/CatGallery.tsx";
import {Link, Route, Routes} from "react-router-dom";
import NewCatForm from "./components/cat/NewCatForm.tsx";
import useCats from "./hooks/useCats.ts";
import CatDetails from "./components/cat/CatDetails.tsx";
import axios from "axios";

export default function App() {
    const {cats, saveCat, updateCat, deleteCat} = useCats();

    const login = () => {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host

        window.open(host + "/oauth2/authorization/github", "_self")
    }

    const me = () => {
        axios.get("/api/user/me").then(response => {
            console.log(response.data)
        })
    }

    return (
        <>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/new"}>New Cat</Link></li>
                <li><button onClick={login}>Login Github</button></li>
                <li><button onClick={me}>Me</button></li>
            </ul>
            <Routes>
                <Route path={"/"} element={<CatGallery cats={cats}/>}/>
                <Route path={"/new"} element={<NewCatForm saveCat={saveCat}/>}/>
                <Route path={"/cats/:id"} element={<CatDetails updateCat={updateCat} deleteCat={deleteCat}/>}/>
            </Routes>
        </>
    )
}
