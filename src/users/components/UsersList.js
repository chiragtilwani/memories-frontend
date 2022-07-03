import User from './User'
import {makeStyles} from '@mui/styles'
import noUserFound from '../../images/noUserFound.webp'
const useStyles =makeStyles({
    container:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    noUser:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function UsersList(props){

    const classes =useStyles()
    const content=props.UsersList.length!==0?<div className={classes.container}>
    {props.UsersList.map(user =><User key={user.id} id={user.id} name={user.name} posts={user.posts} url={user.url} bio={user.bio}/>)}
</div> : <div className={classes.noUser}>
    <img className={classes.img}src={noUserFound} alt="no user found"/>
</div>
    return content
}

export default UsersList