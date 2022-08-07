import { makeStyles } from '@mui/styles'
import loginSvg from '../../images/login.webp'
import { useState,useContext } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { DispatchContext } from '../../context/UserContext';
import {useNavigate} from 'react-router-dom'
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
        [Sizes.down('md')]:{
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
        [Sizes.down('md')]:{
            width:'100%'
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
})

function Login() {
    const classes = useStyles()

    const {login}=useContext(DispatchContext)
    const navigate=useNavigate()
    const initialValues = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
    }

    const [initialVal, setInitialVal] = useState(initialValues)

    function handleSubmit(evt) {
        evt.preventDefault();
        login()
        navigate('/')
    }
    function handleChange(evt) {
        setInitialVal({ ...initialVal, [evt.target.name]: evt.target.value })
    }

    return (
        <div className={classes.container}>
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
                    <Button type="submit" variant="contained" style={{ width: "20%", letterSpacing: '.1rem', height: '3.5rem', fontSize: '1.2rem' }}>login</Button>
                    <p style={{ fontWeight: '600', marginTop: '1.5rem' }}>Do not have an account ? <Link to='/signup'>Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login