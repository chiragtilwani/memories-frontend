import { makeStyles } from '@mui/styles'

import User from './User'
import noUserFound from '../../images/noUserFound.webp'

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    noUser: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img: {
        width: '40%',
    },
    h1: {
        fontSize: '5rem',
        color: '#6b76c1',
        margin: '0rem'
    }
})

function UsersList(props) {

    const classes = useStyles()
    const content = props.UsersList.length !== 0 ? <div className={classes.container}>
        {props.UsersList.map(user => <User key={user._id} uid={user._id} name={user.name} posts={user.posts.length} url={user.url} bio={user.bio} />)}
    </div> : <div className={classes.noUser}>
        <img className={classes.img} src={noUserFound} alt="no user found" />
        <h1 className={classes.h1}>404 : No User Found !</h1>
    </div>
    return content
}

export default UsersList