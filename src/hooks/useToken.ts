import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useToken = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    useEffect(()=> {
        if(token) {
            navigate('/task-manager')
        } else {
            navigate('/login')
        }
    }, [])

};