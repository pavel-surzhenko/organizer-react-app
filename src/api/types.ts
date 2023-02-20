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