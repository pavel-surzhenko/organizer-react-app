// Core
import axios, { AxiosResponse } from 'axios';
import { ISignUp } from '../components/SignUp/config';
import { TASKS_URL, AUTH_URL } from './config';



export const api = Object.freeze({
    get token() {
        return localStorage.getItem('token');
    },
    auth: {
        async signup(userInfo: ISignUp): Promise<ISignUpWithToken> {
            const { data } = await axios.post<ISignUp, AxiosResponse<ISignUpWithToken>>(
                `${AUTH_URL}/registration`,
                userInfo,
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

            return data;
        },
    },
    tasks: {
    }
});

export interface ILogin {
    data: string;
}

export interface ISignUpWithToken {
    data: string;
}

export interface IUpdatePassword {
    data: string;
}
