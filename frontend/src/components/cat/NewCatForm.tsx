import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type NewCatFormProps = {
    saveCat: (name: string, color: string) => void
}
export default function NewCatForm(props: Readonly<NewCatFormProps>){
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("");

    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        props.saveCat(name, color);
        setColor("");
        setName("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setName(e.target.value)} placeholder={"Name"}/>
            <input onChange={(e) => setColor(e.target.value)} placeholder={"Color"}/>
            <br/>
            <button>Add Cat</button>
        </form>
    );
}