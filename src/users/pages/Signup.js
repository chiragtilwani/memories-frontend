import { makeStyles } from '@mui/styles'
import loginSvg from '../../images/login.webp'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect, useState } from 'react'
import { users } from '../../SeedData'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        width: '50%',
        height: '100vh',
    },
    right: {
        width: '50%',
        height: '100vh',
        border: ".2rem solid red",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    form: {
        // border: '1rem solid red',
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
        paddingLeft:'1rem',
        '&::placeholder': {
            color:'grey',
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
    useEffect(() => {
        ValidatorForm.addValidationRule('isUniqueEmail', (value) => users.every(user => user.email !== value));
    })

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(initialVal)
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
                    <Button type="submit" variant="contained" style={{width:"20%",letterSpacing:'.1rem',height:'3.5rem',fontSize:'1.2rem'}}>Submit</Button>
                    <p style={{fontWeight:'600',marginTop:'1.5rem'}}>Already have an account ? <Link to='/login'>Login</Link></p>
                </form>
            </div>
            <div className={classes.right}>
                <img className={classes.img} src={loginSvg} alt="" />
            </div>
        </div>
    )
}

export default Login