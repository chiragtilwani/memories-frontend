import UsersList from '../components/UsersList'
import {makeStyles} from '@mui/styles'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles= makeStyles({
    loader: {
        display: 'flex',
        width: '100vw',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
    }
})

function AllUsers() {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [loadedUsers, setLoadedUsers] = useState()

    const classes= useStyles()

    useEffect(() => {
        const sendRequest = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:5000/api/users/')
                const responseData = await response.json()
                if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setLoadedUsers(responseData.users)
            }
            catch (e) {
                setError(e.message)
            }
            setIsLoading(false)
        }
        sendRequest()
    }, [])
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(null);
    };
    const action = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );
    return <div >
        {error && <Snackbar
                    style={{ position: 'absolute' }}
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={error}
                    action={action}
                />}
        {isLoading && <Box className={classes.loader}sx={{ display: 'flex' }}>
            <CircularProgress style={{ color: "#1976d2" }} />
        </Box>}
        {!isLoading && loadedUsers && <UsersList UsersList={loadedUsers} />}

    </div>
}

export default AllUsers
