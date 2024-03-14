import './App.css'
import CatGallery from "./components/cat/CatGallery.tsx";
import {Link, Route, Routes} from "react-router-dom";
import NewCatForm from "./components/cat/NewCatForm.tsx";
import useCats from "./hooks/useCats.ts";
import CatDetails from "./components/cat/CatDetails.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoutes from "./ProtectedRoutes.tsx";

export default function App() {
    const {cats, saveCat, updateCat, deleteCat} = useCats();

    const [user, setUser] = useState<string | undefined | null>(undefined)

    useEffect(() => {
        getCurrentUser()
    }, []);

    const login = () => {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.host

        window.open(host + "/oauth2/authorization/github", "_self")
    }

    const getCurrentUser = () => {
        axios.get("/api/user/me")
            .then(response => {
                setUser(response.data)
            })
            .catch(() => {
                setUser(null)
            })
    }

    const logout = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    return (
        <>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/new"}>New Cat</Link></li>
                {user === null && <li>
                    <button onClick={login}>Login Github</button>
                </li>}
                {user !== null && <li><p>Hallo {user}</p></li>}
                {user !== null && <li>
                    <button onClick={logout}>Logout</button>
                </li>}
            </ul>
            <Routes>
                {/*All Public Routes*/}
                <Route path={"/"} element={<CatGallery cats={cats}/>}/>
                <Route path={"/cats/:id"} element={<CatDetails updateCat={updateCat} deleteCat={deleteCat}/>}/>

                <Route element={<ProtectedRoutes user={user} />} >
                    <Route path={"/new"} element={<NewCatForm saveCat={saveCat}/>}/>
                    {/*... other Protected Routes*/}
                </Route>
            </Routes>
        </>
    )
}
