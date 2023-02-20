// Core
import axios, { AxiosResponse } from 'axios';
import { ILoginFormShape } from '../components/Login/config';
import { ISignUp } from '../components/SignUp/config';
import { TASKS_URL, AUTH_URL, TAGS_URL } from './config';


export const api = Object.freeze({
    get token() {
        return localStorage.getItem('token');
    },
    auth: {
        async signup(userInfo: ISignUp): Promise<IToken | IErrorMessage> {
            try {
                const { data } = await axios.post<ISignUp, AxiosResponse<IToken>>(
                    `${AUTH_URL}/registration`,
                    userInfo,
                    {
                        headers: {
                            'Content-type': 'application/json',
                        },
                    });

                return data;
            } catch (error: any) {
                return error.response.data
            }

        },

        async login(credentials: string): Promise<IToken | IErrorMessage> {
            try {
                const { data } = await axios.get<ILoginFormShape, AxiosResponse<IToken>>(
                    `${AUTH_URL}/login`,
                    {
                        headers: {
                            Authorization: `Basic ${credentials}`,
                        },
                    }
                )

                return data;
            } catch (error: any) {
                return error.response.data
            }

        },

        async logout() {
            try {
                await axios.get(
                    `${AUTH_URL}/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${api.token}`,
                        },
                    })
            } catch (error: any) {
                return error.response.data
            }
        }
    },
    tasks: {
        async getTasks(): Promise<ITask[]> {
            const { data } = await axios.get<AxiosResponse<ITask[]>>(TASKS_URL, {
                headers: {
                    Authorization: `Bearer ${api.token}`
                }
            })

            return data?.data
        },
        async create(task: ITaskCreated) {
            const { data } = await axios.post(TASKS_URL,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${api.token}`,
                    },
                });

            return data
        },
        async delete(taskId?: string) {
            await axios.delete(`${TASKS_URL}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${api.token}`
                }
            })
        },
        async update(task: ITaskCreated, id?: string): Promise<void> {
            await axios.put(`${TASKS_URL}/${id}`,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${api.token}`,
                    },
                });
        },
    },
    tags: {
        async getTags(): Promise<ITag[]> {
            const { data } = await axios.get<ITag[]>(TAGS_URL)

            return data
        }
    }
});

export interface IToken {
    data: string;
}

export interface IErrorMessage {
    error: string
    message: string
    statusCode: string
}

export interface ITask {
    id: string
    completed?: boolean,
    title: string,
    description: string,
    deadline: string,
    tag: ITag,
}

export interface ITag {
    id: string,
    name: string,
    color: string,
    bg: string,
}
export interface ITaskCreated {
    completed: boolean,
    title: string,
    description: string,
    deadline: string,
    tag: string
}