import UpdatePlaceForm from '../components/UpdatePlaceForm'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100%',
        display: 'flex',
    }
})

function NewPlace(){
    const classes=useStyles()
    return <div className={classes.container}>
        <UpdatePlaceForm/>
    </div>
}

export default NewPlace