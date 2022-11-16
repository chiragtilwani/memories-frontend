import { makeStyles } from '@mui/styles'
import { Navigate } from 'react-router-dom'

import NewPlaceForm from '../components/NewPlaceForm'

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100%',
        display: 'flex',
    }
})

function NewPlace() {
    const classes = useStyles()


    if (localStorage.getItem('userData')) {
        return <div className={classes.container}>
            <NewPlaceForm />
        </div>
    } else {
        return <Navigate to='/login' />
    }
}

export default NewPlace