import UpdatePlaceForm from '../components/UpdatePlaceForm'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100%',
        display: 'flex',
    }
})

function UpdatePlace(props) {
    const classes = useStyles()
    return <div className={classes.container}>
        <UpdatePlaceForm place={props.place} />
    </div>
}

export default UpdatePlace