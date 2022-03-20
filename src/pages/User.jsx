import React,{useContext,useEffect} from 'react'
import GithubContext from '../context/github/GithubContext'
import { useParams } from 'react-router-dom'

const User = () => {
    const {getUser,user,loading} = useContext(GithubContext)
    const params = useParams()
    useEffect(()=>{
        getUser(params.login)
    },[])
    if(loading) return <h3>Loading...</h3>
    return (
    <div>{user.login}</div>
    )
}

export default User