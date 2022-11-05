import { makeStyles } from '@mui/styles'
import PlacesList from '../components/PlacesList'
import Sizes from '../../styles/Sizes'

const useStyles = makeStyles({
    container: {
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        [Sizes.down('md')]: {
            width: '100%'
        }
    }
})

function AllPlaces(props) {
    const classes = useStyles()

    return <div className={classes.container}>
        <PlacesList setPlaceToUpdate={props.setPlaceToUpdate} />
    </div>
}

export default AllPlaces