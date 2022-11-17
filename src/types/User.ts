import IUser from "./IUser";
import ITache from "./ITache";
import {useSelector} from 'react-redux'

export class User implements IUser{
    id?: number;
    name: string;
    email: string;
    phone?: string | undefined;
    password: string;
    taches: any[];

    static USERS_KEY='users';
    static id: any;

    constructor(id:number,name:string, email:string,password:string,taches:[], phone?:string){
        this.id=id;
        this.name = name
        this.email = email
        this.phone = phone
        this.password = password
        this.taches = taches;
    }
    save(){
        const storage = localStorage.getItem(User.USERS_KEY)||"[]";
        const users:any[] = JSON.parse(storage);
        console.log(this.id)
        users.push({
            id: this.id,
            name: this.name,
            email:this.email,
            phone:this.phone,
            password:btoa(this.password),
            taches: this.taches
        })
        localStorage.setItem(User.USERS_KEY,JSON.stringify(users));
        alert('Account created with success')
    }
    static signin(credentials:{email:string,password:string}):User|boolean{
        const storage = localStorage.getItem(User.USERS_KEY)||"[]";
        const users:any[] = JSON.parse(storage);
        const res = users.find((user)=>{
            try{
                return user.email==credentials.email&& atob(user.password)==credentials.password;
            }catch(e){
                return false;
            }
        })
        if(res){
            var user = new User(res.id,res.name,res.email,res.password,res.taches,res.phone);
            localStorage.setItem('user',JSON.stringify(user))
            
            return user
        }else{
            return false;
        }
    }
    
}