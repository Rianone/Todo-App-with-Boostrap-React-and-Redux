import { User } from './types/User';
import {useState} from "react";

const Signup: React.FunctionComponent = () => {
    const [name,setName]=useState<string|null>(null);
    const [email,setEmail]=useState<string|null>(null);
    const [inv,setInv]= useState<string|null>(null);
    const [phone,setPhone]=useState<string|undefined>(undefined);
    const [password,setPassword]=useState<string|null>(null);
    var regEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    var regName = /^[a-zA-Z]{1}[a-zA-Zéè 1-9]{2,}$/;
    var regNumber = /^[0-9+ ]{9,}$/;
    var invalide:string = ""

    return ( 
        <div className="signup">
            <h1 className="display-4 mb-5">Create account</h1>
            {inv==null?'':<p className="text-danger">{inv}</p>}
            <input type="text" placeholder="Enter your full name" className="form-control" onChange={({target:{value}})=>{
                    if(regName.test(value)){
                            invalide = ''
                            setName(value)
                    }
                    else{
                        invalide = "Invalid name!!!"
                    }
                }}/>
            <input type="email" placeholder="Enter your email address" className="form-control" onChange={({target:{value}})=>{
                        if(regEmail.test(value)){
                            setEmail(value)
                            invalide = ''
                        }
                        else{
                            invalide = "Invalid email address!!!"
                        }
                    }}/>
            <input type="tel" placeholder="Enter your phone number" className="form-control"  onChange={({target:{value}})=>{
                        if(regNumber.test(value)){
                            invalide = ""
                            setPhone(value)
                        }
                        else{
                            invalide = "Invalid number format!!!"
                        }
                    }}/>
            <input type="password" placeholder="Enter a password" className="form-control"  onChange={({target:{value}})=>{
                        if(value.length >= 5){
                            setPassword(value)
                            invalide = ""
                        }
                        else{
                            invalide = "Password must be of at least 5 caracters!!!"
                        }
                    }} />
            <button type="reset" className="btn btn-primary btn-lg" id="submit-btn"  onClick={()=>{
                    if(name&&email&&password){
                        setInv(invalide)

                        const u = new User(Math.floor(Math.random()*(10000-1+1)+1),name,email,password,[],phone);
                        u.save();
                    }
                    else{
                        setInv('One or more fields are empty!!!')
                    }
                }}>Create account</button>
        </div>
     );
}

export default Signup;