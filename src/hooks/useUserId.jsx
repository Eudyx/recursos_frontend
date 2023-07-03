import { useContext } from "react";
import IdContext from "../context/IdProvider";

const useUserId = () => {
    return useContext(IdContext);
}

export default useUserId;