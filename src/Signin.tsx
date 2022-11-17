import * as React from "react";
import { User } from './types/User';
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {login} from './features/user'

interface props{
    setUser: Function
}

const Signin : React.FC<props> = ({setUser}) => {

    const [email,setEmail]= useState<string|null>(null);
    const [inv,setInv]= useState<string|null>(null);
    const [password,setPassword]= useState<string|null>(null);
    var regEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    const dispatch = useDispatch()
    var invalide:string = ""
    return ( 
        <div className="signin">
            <h1 className="display-4 mb-5">Connectez Vous.</h1>
            {inv==null?'':<p className="text-danger">{inv}</p>}
            <input type="email" placeholder="Entrer votre adresse email" className="form-control" onChange={({target:{value}})=>{
                    if(regEmail.test(value)){
                        setEmail(value)
                        invalide = ''
                    }
                    else{
                        invalide = "Invalid email address!!!"
                    }
                }}/>
            <input type="password" placeholder="Entrer votre mot de passe" className="form-control"  onChange={({target:{value}})=>{
                        if(value.length >= 5){
                            setPassword(value)
                            invalide = ""
                        }
                        else{
                            invalide = "Password must be of at least 5 caracters!!!"
                        }
                    }} />
            <button type="reset" className="btn btn-primary btn-lg" id="submit-btn" onClick={()=>{
                    if(email&&password){
                        setInv(invalide)

                        const res= User.signin({
                            email,
                            password
                        })
                        if(res){
                            dispatch(login(res))
                            setUser(res);
                            // console.log("Connected with success!!!")
                        }
                    }
                    else{
                        setInv("One or more fields are empty!!!")
                    }
                }}
            >Connexion</button>
        </div>
     );
}

export default Signin;