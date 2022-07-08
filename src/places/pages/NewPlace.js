import NewPlaceForm from '../components/NewPlaceForm'
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
        <NewPlaceForm/>
    </div>
}

export default NewPlace