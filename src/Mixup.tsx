import Signup from "./Signup";
import Signin from "./Signin";
import * as React from "react";
import {useState} from "react";

interface props{
    setUser: Function
}

const Mixup : React.FC<props> = ({setUser}) => {
    const [signin, setSignin] = useState<boolean|null>(true);
    return (


        <div className="row">

            <section className="container left">
                <div className="button">
                    <a className={'btn btn-lg btn-link' + (signin ? " ac" : "")} onClick={() => {
                        setSignin(true);
                    } }>Connexion</a>
                    <a className={'btn btn-lg btn-link' + (!signin ? " ac" : "")} onClick={() => {
                        setSignin(false);
                    } }>Create account</a>
                </div>
                {signin ? <Signin setUser={setUser}/> : <Signup />}
            </section>

            <section className="right">
                <img src="./background2.jpg" alt="Background" id="img1" />
                <h2 className="title">Connecter vous sur notre platforme pour consulter vos informations</h2>

            </section>
        </div>
    );
}

export default Mixup;