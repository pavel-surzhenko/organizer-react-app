import { api } from "../api";
import { ILoginFormShape } from "../components/Login/config";

export const useLogin = async (data: ILoginFormShape) => {
    const token = await api.auth.login(
        window.btoa(`${data?.email}:${data?.password}`)
    );

    return token;
};