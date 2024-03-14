import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    user: string | undefined | null
}

export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {

    if (props.user === undefined) {
        return <div>Loading...</div>
    }


    return props.user ? <Outlet /> : <Navigate to={"/"}/>
}
