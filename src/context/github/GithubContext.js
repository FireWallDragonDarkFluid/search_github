import {createContext,useReducer} from 'react'
import githubReducer from './GithubReducer'
const GithubContext = createContext()
const GITHUB_URL = 'https://api.github.com/users'
const GITHUB_TOKEN = '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'

export const GithubProvider = ({children}) => {
    const initialState = {
        users:[],
        user:{},
        loading:false
    }
    const [state,dispatch] = useReducer(githubReducer,initialState)
    const searchUsers = async (text) => {
        dispatch({
            type:'SET_LOADING',
        })
        const params = new URLSearchParams({
            q:text
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })

        const {items} = await response.json()
        dispatch({
            type:'GET_USERS',
            payload:items
        })
    }

    const getUser = async (login) => {
        dispatch({type:'SET_LOADING'})
        const response = await fetch(`https://api.github.com/users/${login}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })

        if(response.status===404){
            window.location = '/notfound'
        }else{
            const data = await response.json()
            dispatch({
                type:"GET_USER",
                payload:data
            })
        }
    }

    const clearUsers = () => dispatch({type:'CLEAR_USERS'})

    return <GithubContext.Provider value={{
        users:state.users,
        loading:state.loading,
        user:state.user,
        searchUsers,
        clearUsers,
        getUser
    }}
    >
        {children}
    </GithubContext.Provider>
}

export default GithubContext

