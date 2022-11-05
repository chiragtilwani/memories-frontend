import NewPlaceForm from '../components/NewPlaceForm'
import { makeStyles } from '@mui/styles'
import { useContext } from 'react'
import { DispatchContext } from '../../context/UserContext'
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
    const { isLoggedIn } = useContext(DispatchContext)
    if (isLoggedIn) {
        return <div className={classes.container}>
            <NewPlaceForm />
        </div>
    } else {
        return <Navigate to='/login' />
    }
}

export default NewPlace