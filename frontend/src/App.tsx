import './App.css'
import CatGallery from "./components/cat/CatGallery.tsx";
import {Link, Route, Routes} from "react-router-dom";
import NewCatForm from "./components/cat/NewCatForm.tsx";
import useCats from "./hooks/useCats.ts";
import CatDetails from "./components/cat/CatDetails.tsx";

export default function App() {
    const {cats, saveCat, updateCat, deleteCat} = useCats();

    return (
        <>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/new"}>New Cat</Link></li>
            </ul>
            <Routes>
                <Route path={"/"} element={<CatGallery cats={cats}/>}/>
                <Route path={"/new"} element={<NewCatForm saveCat={saveCat}/>}/>
                <Route path={"/cats/:id"} element={<CatDetails updateCat={updateCat} deleteCat={deleteCat}/>}/>
            </Routes>
        </>
    )
}
