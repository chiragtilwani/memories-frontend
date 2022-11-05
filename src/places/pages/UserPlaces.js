import UserPlacesList from '../../places/components/UserPlacesList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    loader: {
        display: 'flex',
        width: '100vw',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
    }
})

function UserPlaces(props) {
    const classes = useStyles()

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    let { uid } = useParams()

    useEffect(() => {
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/users/user/${uid}`).then(res => setUser({ ...user, ...res.data })).catch(err => console.error(err))
        setIsLoading(false)
    }, [uid])
    return <>
        {isLoading && <Box className={classes.loader} >
            <CircularProgress style={{ color: "#1976d2" }} />
        </Box>}
        {user && <UserPlacesList user={user} setPlaceToUpdate={props.setPlaceToUpdate} />}</>
}

export default UserPlaces