import React, {useState} from 'react';
import Mixup from './Mixup';
import Taches from './Taches';
import "./login.css"
import {useSelector, useDispatch} from 'react-redux'
import {login} from './features/user'
import IUser from './types/IUser';
import { userInfo } from 'os';


function App() {
  const dispatch = useDispatch()
  
  // if(localStorage.getItem('user') != null){
  //   // dispatch(login(JSON.parse(localStorage.getItem('user')!)))
  //   console.log('User is present')
  // }
  
  const userInfo = useSelector((state:any) => state.user.value)
  const [user, setUser]=useState(null);


  return (
    <div className="App">
        {userInfo!=null?'':<Mixup  setUser = {setUser}/>}
        
        {userInfo!=null?<Taches/>:''}
        
    </div>
  );
}

export default App;
