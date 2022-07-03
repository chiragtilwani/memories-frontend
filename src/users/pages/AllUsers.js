import UsersList from '../components/UsersList'
import {makeStyles} from '@mui/styles'
import Sizes from '../../styles/Sizes'
import {users} from '../../SeedData'

const useStyles =makeStyles({
    container:{
        width:'70%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin:'auto',
        border: '1px solid',
        [Sizes.down('md')]:{
            width:'100%'
        }
    }
})

function AllUsers() {

    const classes =useStyles()

    
    return <div className={classes.tcontainer}>
        <UsersList UsersList={users} />
    </div>
}

export default AllUsers
