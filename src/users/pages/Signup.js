import { makeStyles } from '@mui/styles'
import loginSvg from '../../images/login.webp'
import { useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserDispatchContext } from '../../context/UserContext';
import { useContext } from 'react'
import Sizes from '../../styles/Sizes'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        [Sizes.down('md')]: {
            flexDirection: 'column',
        }
    },
    left: {
        width: '50%',
        height: '100vh',
        backgroundColor: "rgb(25 118 210 / 12%)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [Sizes.down('md')]: {
            width: '100%'
        }
    },
    right: {
        width: '50%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [Sizes.down('md')]: {
            display: 'none'
        }
    },
    img: {
        width: '100%',
        height: '100%',
    },
    form: {
        width: "100%",
        height: "60%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    input: {
        width: '60%',
        height: '3rem',
        marginBottom: "3rem",
        paddingLeft: '1rem',
        '&::placeholder': {
            color: 'grey',
        },
        '&:focus': {
            borderColor: 'rgb(25 118 210 / 12%)'
        }
    },
    btn: {
        width: "20% !important",
        letterSpacing: '.1rem !important',
        height: '3.5rem !important',
        fontSize: '1.2rem !important'
    },
    loader: {
        display: 'flex',
        width: '100vw',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
    }
})

function Signup(props) {
    const classes = useStyles()

    const initialValues = {
        name: '',
        email: '',
        bio: '',
        password: '',
        cpassword: '',
    }

    const [initialVal, setInitialVal] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()

    // const { login } = useContext(UserDispatchContext)
    const navigate = useNavigate()
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/users/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: evt.target.name.value,
                        email: evt.target.email.value,
                        bio: evt.target.bio.value,
                        password: evt.target.password.value
                    })
                }
            )
            const responseData = await response.json()
            if (!response.ok) {
                setError(responseData.message)
                throw new Error(responseData.message)
            }
            console.log(responseData)
            props.login(responseData.userId, responseData.token)
            navigate('/users')
            window.location.reload();
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError(err.message || 'Something went wrong,Please try again.')
        }

    }
    function handleChange(evt) {
        setInitialVal({ ...initialVal, [evt.target.name]: evt.target.value })
    }

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
    return (
        <div className={classes.container}>
            {isLoading ? <Box className={classes.loader} >
                <CircularProgress style={{ color: "#1976d2" }} />
            </Box> : <>
                <div className={classes.left}>
                    <form
                        onSubmit={handleSubmit}
                        className={classes.form}
                    >
                        <input type="text"
                            placeholder="Name..."
                            onChange={handleChange}
                            name="name"
                            value={initialVal.name}
                            className={classes.input}
                        />
                        <input type="email"
                            placeholder="Email..."
                            onChange={handleChange}
                            name="email"
                            value={initialVal.email}
                            className={classes.input}
                        />
                        <input type="text"
                            placeholder="Bio..."
                            onChange={handleChange}
                            name="bio"
                            value={initialVal.bio}
                            className={classes.input}
                        />
                        <input type="password"
                            placeholder="Password..."
                            onChange={handleChange}
                            name="password"
                            value={initialVal.password}
                            className={classes.input}
                        />
                        <Button type="submit" variant="contained" className={classes.btn}>Signup</Button>
                        <p style={{ fontWeight: '600', marginTop: '1.5rem' }}>Already have an account ? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
                <div className={classes.right}>
                    <img className={classes.img} src={loginSvg} alt="" />
                </div>
                {error ? <Snackbar

                    style={{ position: 'absolute' }}
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={error}
                    action={action}
                /> : null}
            </>}

        </div >
    )
}

export default Signup