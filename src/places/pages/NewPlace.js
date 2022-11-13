import NewPlaceForm from '../components/NewPlaceForm'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react'
import { UserDispatchContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100%',
        display: 'flex',
    }
})

function NewPlace() {
    const classes = useStyles()
    
    let currentUserID;
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            currentUserID = JSON.parse(localStorage.getItem('userData')).userId
        }
    },[])
    if (currentUserID) {
        return <div className={classes.container}>
            <NewPlaceForm />
        </div>
    } else {
        return <Navigate to='/login' />
    }
}

export default NewPlace