// Core
import axios, { AxiosResponse } from 'axios';
import { ILoginFormShape } from '../components/Login/config';
import { ISignUp } from '../components/SignUp/config';
import { TASKS_URL, AUTH_URL, TAGS_URL } from './config';
import { IErrorMessage, ITag, ITask, ITaskCreated, IToken } from './types';


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
                return error.response.data || { message: 'Unknown error occurred' }
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
                return error.response.data || { message: 'Unknown error occurred' }
            }

        },

        async logout(): Promise<void | IErrorMessage> {
            try {
                await axios.get(
                    `${AUTH_URL}/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${api.token}`,
                        },
                    })
            } catch (error: any) {
                return error.response.data || { message: 'Unknown error occurred' }
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

        async create(task: ITaskCreated): Promise<ITask | IErrorMessage> {
            try {
                const { data } = await axios.post<ITaskCreated, AxiosResponse<ITask | IErrorMessage>>(TASKS_URL,
                    task,
                    {
                        headers: {
                            Authorization: `Bearer ${api.token}`,
                        },
                    });

                return data
            } catch (error: any) {
                return error.response.data || { message: 'Unknown error occurred' }
            }

        },
        async delete(taskId?: string): Promise<void | IErrorMessage> {
            try {
                await axios.delete<void>(`${TASKS_URL}/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${api.token}`
                    }
                })
            } catch (error: any) {
                return error.response.data || { message: 'Unknown error occurred' }
            }

        },

        async update(task: ITaskCreated, id?: string): Promise<ITask | IErrorMessage> {
            try {
                const { data } = await axios.put<ITaskCreated, AxiosResponse<ITask | IErrorMessage>>(`${TASKS_URL}/${id}`,
                    task,
                    {
                        headers: {
                            Authorization: `Bearer ${api.token}`,
                        },
                    });

                return data
            } catch (error: any) {
                return error.response.data || { message: 'Unknown error occurred' }
            }

        },
    },
    tags: {
        async getTags(): Promise<ITag[]> {
            const { data } = await axios.get<ITag[]>(TAGS_URL)

            return data
        }
    }
});
