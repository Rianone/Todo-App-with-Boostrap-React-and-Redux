import ITache from "./ITache";

export default interface IUser{
    id?:number,
    name: string,
    email: string,
    phone? : string,
    password: string,
    taches: ITache[]
}