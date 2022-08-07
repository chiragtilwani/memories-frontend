import { makeStyles } from '@mui/styles'
import loginSvg from '../../images/login.webp'
import { useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { DispatchContext } from '../../context/UserContext';
import {useContext} from 'react'
import Sizes from '../../styles/Sizes'
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        [Sizes.down('md')]:{
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
        [Sizes.down('md')]:{
            width: '100%'
        }
    },
    right: {
        width: '50%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [Sizes.down('md')]:{
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
        '&:focus':{
            borderColor:'rgb(25 118 210 / 12%)'
        }
    },
})

function Login() {
    const classes = useStyles()

    const initialValues = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
    }

    const [initialVal, setInitialVal] = useState(initialValues)

    const {login}=useContext(DispatchContext)
    const navigate = useNavigate()
    function handleSubmit(evt) {
        evt.preventDefault();
        login();
        navigate('/')
    }
    function handleChange(evt) {
        setInitialVal({ ...initialVal, [evt.target.name]: evt.target.value })
    }

    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                >
                        <input type="text"
                            placeholder="First Name..."
                            onChange={handleChange}
                            name="email"
                            value={initialVal.email}
                            className={classes.input}
                        />
                        <input type="email"
                            placeholder="Last Name..."
                            onChange={handleChange}
                            name="email"
                            value={initialVal.email}
                            className={classes.input}
                        />
                    <input type="email"
                        placeholder="Email..."
                        onChange={handleChange}
                        name="email"
                        value={initialVal.email}
                        className={classes.input}
                    />
                    <input type="password"
                        placeholder="Password..."
                        onChange={handleChange}
                        name="password"
                        value={initialVal.password}
                        className={classes.input}
                    />
                    <input type="password"
                        placeholder="Confirm Password..."
                        onChange={handleChange}
                        name="cpassword"
                        value={initialVal.cpassword}
                        className={classes.input}
                    />
                    <Button type="submit" variant="contained" style={{ width: "20%", letterSpacing: '.1rem', height: '3.5rem', fontSize: '1.2rem' }}>Signup</Button>
                    <p style={{ fontWeight: '600', marginTop: '1.5rem' }}>Already have an account ? <Link to='/login'>Login</Link></p>
                </form>
            </div>
            <div className={classes.right}>
                <img className={classes.img} src={loginSvg} alt="" />
            </div>
        </div>
    )
}

export default Login