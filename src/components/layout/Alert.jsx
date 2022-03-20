import React,{useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext'
const Alert = () => {
    const {alert} = useContext(AlertContext)
    return (
        alert!==null && (
            <h1 className='flex items-start mb-4 space-x-2'>
                {alert.type==='error' && <>!!!</>}
                <p className="flex-1 text-base font-semibold leading-7 text-white">{alert.msg}</p>
            </h1>
        )
    )
}

export default Alert