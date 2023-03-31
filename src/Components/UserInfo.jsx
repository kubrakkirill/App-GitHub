import React, {useState} from "react";
import axios from "axios";



export default function UserInfo(){
    const [userInfo, setUserInfo] = useState([])
    const [repoInfo, setRepoInfo] = useState([])
    const [userName, setUserName] = useState('');
    const [err, setErr] = useState('');


    const userChange = (e) =>{
        setUserName(e.target.value)
    }
    const userSubmit = (e) =>{
        e.preventDefault()
        setUserInfo('')
        setRepoInfo([])
        setErr('')
        if (userName === ''){
            setErr("Field is required")
        } else{
            axios.get(`http://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&sort=created`)
                .then(result =>{
                    setUserInfo(result.data)
                    axios.get(`http://api.github.com/users/${userName}/repos?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&sort=created`)
                        .then(result =>{
                            setRepoInfo(result.data)
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    return(
        <div>
            <form onSubmit={userSubmit}>
                <input type="text" placeholder="Type username..." onChange={userChange}/>
                <button onClick={userSubmit}>Search</button>
            </form>
            {
                err ? <h5 className='error'>{err}</h5> : null
            }
            <div>
                {userInfo.id ?
                    <div key={userInfo.id} className='userCard'>
                        <img className='userImage' src={userInfo.avatar_url} alt={userInfo.name}/>
                        <div>
                            <h2>Login - {userInfo.login}</h2>
                            <h2>Name - {userInfo.name}</h2>
                            <h2>Email - {userInfo.email ? userInfo.email : 'no email'}</h2>
                        </div>
                    </div> : null
                }
            </div>
            <ul>
                {
                    repoInfo[0] ? <div>
                        <h1 className='user-repo-title'>User Repositories</h1>
                        {repoInfo.map(repo =>{
                            return(
                                <li key={repo.id}><a href={`https://github.com/${userName}/${repo.name}`} target='_blank' className='repo'>{repo.name}</a></li>
                            )
                        })}
                    </div> : null
                }
            </ul>

        </div>
    )
}