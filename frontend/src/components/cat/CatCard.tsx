import {Cat} from "../../Cat.ts";
import {useNavigate} from "react-router-dom";

type CatCardProps = {
    cat: Cat,
}

export default function CatCard(props: Readonly<CatCardProps>) {
    const navigate = useNavigate();

    return (
        <div>
            <h2>{props.cat.name}</h2>
            <button onClick={() => navigate(`/cats/${props.cat.id}`)}>Details</button>
        </div>
    );
}