export type TUserSignUp ={
    name:string;
    email:string;
    phone:string;
    password:string;
    conPassword:string;
}
export type TUserLogin = {
    email:string;
    password:string;
}
export type TUserData = {
    id:string;
    name:string;
    phone:string;
    email:string;
}

export type TLoginResult = {
    user : TUserData;
    accessToken:string;
}
export type TResponseType ={
     success: boolean;
     message :string;
}