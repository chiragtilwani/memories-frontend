import Place from './Place'
import { makeStyles } from '@mui/styles'
import placesNotFound from '../../images/placesNotFound.webp'
import Sizes from '../../styles/Sizes'

const useStyles = makeStyles({
    container: {
        width: '100%',
        [Sizes.down('md')]:{
            display:'flex',
            flexDirection: 'column',
        },
    },
    noPlace:{
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

function PlacesList(props) {
    const classes = useStyles()

    if (props.placesList.length === 0) {
        return <div className={classes.noPlace}>
            <img src={placesNotFound} alt="places not found"/>
        </div>
    } else {
        return (<div className={classes.container}>
            {props.placesList.map(place => <Place key={place.id} {...place} />)}
        </div>)
    }
}

export default PlacesList