import React, {useEffect, useState} from 'react';
import { JsxChild } from 'typescript';
import ITache from './types/ITache';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { User } from './types/User';
import {login} from './features/user'
import {setTask} from './features/task'
 
 
function Taches(){

    const [desc,setDesc] = useState<string|null>("")
    const [inv,setInv] = useState<boolean|null>(true)
    const [finish,setFinish] = useState<boolean>(false)
    const [nom,setNom] = useState<string|null>("")
    const [ne,setNew] = useState<boolean>(false)
    const [reset,setReset] = useState<string>("")
    const [pending,setPending] = useState<boolean>(false)
    const [addtask,setAddtask] = useState<boolean>(false)
    const [newnom,setNewnom] = useState<string|null>(null)
    const [newdesc,setNewdesc] = useState<string|null>(null)
    
    const userInfo = useSelector((state:any) => state.user.value)
    const taskInfo = useSelector((state:any) => state.task.value)
    const dispatch = useDispatch()
    const [taches,setTaches] = useState<[]|null>(userInfo.taches)
    const [nbr,setNbr] = useState<number>(userInfo.taches.length)
    const [taskid, setTaskid] = useState<number|null>(null)
    const [actStorage, setActStorage] = useState<any|null>(null)
    

    var actclass:string = ""

  
       return(
        <div className='big'>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="#">{userInfo.name}</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <div className="nbr">{nbr}</div>
                        </ul>
                        <button className='btn btn-primary btn-lg' style={{marginRight:'7px'}} onClick={()=>{
                            setAddtask(!addtask)
                        }}>Add new Task</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={() => {
                            dispatch(login(null))
                            localStorage.setItem('user', '')
                        }}>Deconnexion</button>
                    </div>
                </nav>
        {addtask?
        <div className="Taches">
            <div className='tache'>
            <h1 className="display-4 mb-5">TODO App.</h1>
            
            {inv?"":<p className="text-danger">One or more fields are empty!!!</p>}
            <input type="text" placeholder="Enter the task name" className="form-control" onChange={(e)=>{setNom(e.target.value)}}/>
            <textarea placeholder="Enter the task description" className="form-control" onChange={(e)=>(setDesc(e.target.value))}></textarea>
            <button className="btn btn-primary btn-lg" onClick={()=>{
                if(nom?.trim() != ""){
                    setNbr(nbr+1)
                    setInv(true)
                    setTaches(function(prevState):any {
                        return [...prevState!, { id:Math.floor(Math.random()*(10000-1+1)+1),name: nom, description: desc, status: "new" }];
                    })

                    var value = JSON.parse(localStorage.getItem(User.USERS_KEY)||'[]');
                    setActStorage(value)

                    
                    for(let i:number = 0;i<actStorage!.length; i++){
                        if(actStorage![i].email == userInfo.email && actStorage![i].id == userInfo.id){
                            // console.log(actStorage[i])
                            actStorage![i].taches.push({id:Math.floor(Math.random()*(10000-1+1)+1),name:nom,description:desc,status:"new"})
                            setTaches(actStorage![i].taches)
                        }
                    }
                    localStorage.setItem(User.USERS_KEY,JSON.stringify(actStorage));
                    alert('New task added with success')
                }
                else{
                    setInv(false)
                }
            }}>Add Task</button>

            </div>
        </div>
    : null}

        <div className='tasks-global-container'>
        <div className="tasklist">
            {/* <h2>Sort By: </h2>
            <br/>
        <ul>
            <li>
                <p className="lead">New: </p>
                <label className="switch">
                    <input type="checkbox" checked={ne} onClick={()=>{
                        setNew(!ne)

                        if(ne){
                            var newStore = actStorage.filter((com:ITache)=>{
                                return com.status == "new"
                            })
                            setActStorage(newStore)
                        }
                    }}/>
                    <div className="slider"></div>
                </label>
            </li>
            <li>
                <p className="lead">Pending: </p>
                <label className="switch">
                    <input type="checkbox" checked={pending} onClick={()=>{setPending(prev=>!prev)}}/>
                    <div className="slider"></div>
                </label>
            </li>
            <li>
                <p className="lead">Finished: </p>
                <label className="switch">
                    <input type="checkbox" checked={finish} onClick={()=>{setFinish(prev=>!prev)}}/>
                    <div className="slider"></div>
                </label>
            </li>
        </ul> */}

        <h2 className="text-center">Tasklist</h2>
            <div className="taskbox">
                <ul id="myUL">
                    {
                    taches!.map((t:ITache)=>{
                        
                        if(t.status == "pending"){
                            actclass = "pending"
                        }
                        else if(t.status == "finished"){
                            actclass = "finished"
                        }
                        else{
                            actclass =""
                        }
                        
                        return <li className={actclass}
                        > {t.name} - {t.description}
                        <span className="task-btns">
                            <button className="btn btn-primary ml-2"
                            style={{margin:'1rem'}}  
                            onClick={()=>{
                                var value = localStorage.getItem(User.USERS_KEY)||'[]';
                                var actStorage:any[] = JSON.parse(value);
                        
                                for(let i:number = 0;i<actStorage.length; i++){
                                    if(actStorage[i].id == userInfo.id){
                                         var elm = actStorage[i]
                                         for(let x:number=0; x<elm.taches.length; x++){
                                             if(elm.taches[x].id == t.id){
                                                 elm.taches[x].status = 'pending'
                                                 setTaches(elm.taches)
                                             }
                                         }
                                    }
                                }
                                localStorage.setItem(User.USERS_KEY,JSON.stringify(actStorage));
                            }} 
                            > Ongoing</button>

                           <button className="btn btn-primary"
                            onClick={()=>{
                                var value = localStorage.getItem(User.USERS_KEY)||'[]';
                                var actStorage:any[] = JSON.parse(value);
                        
                                for(let i:number = 0;i<actStorage.length; i++){
                                    if(actStorage[i].id == userInfo.id){
                                         var elm = actStorage[i]
                                         for(let x:number=0; x<elm.taches.length; x++){
                                             if(elm.taches[x].id == t.id){
                                                 elm.taches[x].status = 'finished'
                                                 setTaches(elm.taches)
                                             }
                                         }
                                    }
                                }
                                localStorage.setItem(User.USERS_KEY,JSON.stringify(actStorage));
                            }}
                            >Done</button>


                            <button className="close"
                            onClick={()=>{
                                var value = localStorage.getItem(User.USERS_KEY)||'[]';
                                var actStorage:any[] = JSON.parse(value);
                        
                                for(let i:number = 0;i<actStorage.length; i++){
                                    if(actStorage[i].id == userInfo.id){
                                         var elm = actStorage[i]
                                         for(let x:number=0; x<elm.taches.length; x++){
                                             if(elm.taches[x].id == t.id){
                                                 elm.taches.pop(elm.taches[x])
                                                 setTaches(elm.taches)
                                                 alert('Task deleted with success')
                                                 setNbr(nbr-1)
                                             }
                                         }
                                    }
                                }
                                localStorage.setItem(User.USERS_KEY,JSON.stringify(actStorage));
                            }}  
                            ><i className="fa fa-trash" aria-hidden="true"></i></button>

                            <a className="close" id="edit" data-toggle="modal" data-target="#my-modal" onClick={()=>{dispatch(setTask(t.id))}}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                        </span>

                     </li> 
                     })
                     }
                 </ul>
            </div>
        </div>

        </div>
            

        <div id="my-modal" className="modal fade" tabIndex={-1} role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">Edit task here </div>
                                            <div className="modal-body">
                                            <input className="form-control" type="text" placeholder='Enter the new task name' onChange={(e)=>{setNewnom(e.target.value)}}/>
                                            <textarea placeholder='Enter the new description' className="form-control" onChange={(e)=>{setNewdesc(e.target.value)}}></textarea>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-primary" type="button" data-dismiss="modal" data-target="my-modal" id="modif_image"
                                                     onClick={()=>{
                                                        //  console.log(t.id)
                                                        if(newnom){
                                                            var value = localStorage.getItem(User.USERS_KEY)||'[]';
                                                            var actStorage:any[] = JSON.parse(value);
                                                    
                                                            for(let i:number = 0;i<actStorage.length; i++){
                                                                if(actStorage[i].id == userInfo.id){
                                                                     var elm = actStorage[i]
                                                                     for(let x:number=0; x<elm.taches.length; x++){
                                                                         if(elm.taches[x].id == taskInfo){
                                                                             elm.taches[x].name = newnom
                                                                             elm.taches[x].description = newdesc
                                                                             setTaches(elm.taches)
                                                                             alert('Task edited with success')
                                                                         }
                                                                     }
                                                                }
                                                            }
                                                            localStorage.setItem(User.USERS_KEY,JSON.stringify(actStorage));
                                                        }
                                                        else{
                                                            alert("One or more fields are empty")
                                                        }
                                                    }}
                                            >Save changes</button>
                                        </div>
                                     </div>
                                </div>
                        </div>

        </div>
       );
    
}
 
export default Taches;