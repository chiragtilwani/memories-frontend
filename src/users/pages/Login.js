import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import loginSvg from '../../images/login.webp'
import Sizes from '../../styles/Sizes'

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
        [Sizes.down('md')]: {
            display: 'none',
        }
    },
    right: {
        width: '50%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(25 118 210 / 12%)",
        [Sizes.down('md')]: {
            width: '100%'
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

function Login(props) {
    const classes = useStyles()

    const navigate = useNavigate()
    const initialValues = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
    }

    const [initialVal, setInitialVal] = useState(initialValues)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        email: evt.target.email.value,
                        password: evt.target.password.value
                    }
                )
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            props.login(responseData.userId, responseData.token)
            setIsLoading(false)
            navigate('/users')
            window.location.reload();
        } catch (err) {
            setIsLoading(false)
            setError(err.message || "Something went wrong.")
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
                    <img className={classes.img} src={loginSvg} alt="" />
                </div>
                <div className={classes.right}>
                    <form
                        onSubmit={handleSubmit}
                        className={classes.form}
                    >
                        <input type="email"
                            placeholder="Email..."
                            onChange={handleChange}
                            name="email"
                            value={initialVal.email}
                            className={classes.input}
                            required
                        />
                        <input type="password"
                            placeholder="Password..."
                            onChange={handleChange}
                            name="password"
                            value={initialVal.password}
                            className={classes.input}
                            required
                        />
                        <Button type="submit" variant="contained" className={classes.btn}>login</Button>
                        <p style={{ fontWeight: '600', marginTop: '1.5rem' }}>Do not have an account ? <Link to='/signup'>Signup</Link></p>
                    </form>
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
        </div>
    )
}

export default Login