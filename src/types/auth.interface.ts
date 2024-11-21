export interface IAuthForm {
    company: string,
    phone: string,
    code?: string,
    type?: 'admin' | 'user',
    password?: string
}

export interface IUserPersonal {
    id: number,
    phone: string,
    type?: 'admin' | 'user'
}

export interface IUser {
    user: IUserPersonal
}

export interface IAuthResponce {
    accessToken: string,
    user: IUserPersonal
}


export type TypeUserForm = Omit<IUserPersonal, 'id'> & { code?: string }

export type TypeUserUpdateForm = Omit<IUserPersonal, 'id'> & { password?: string }