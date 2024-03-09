import {Cat} from "../../Cat.ts";
import CatCard from "./CatCard.tsx";

type CatGalleryProps = {
    cats: Cat[],
}
export default function CatGallery(props: Readonly<CatGalleryProps>) {
    return (
        <>
            <h1>Cat Gallery</h1>
            {props.cats.map((cat) => {
                return <CatCard cat={cat} key={cat.id}/>
            })}
        </>
    );
}