import Place from './Place'
import { makeStyles } from '@mui/styles'
import placesNotFound from '../../images/placesNotFound.webp'
import Sizes from '../../styles/Sizes'
import {PlaceContext} from '../../context/PlaceContext'
import {useContext} from 'react'

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

function PlacesList() {
    const classes = useStyles()
    const placesListState=useContext(PlaceContext)
    if (placesListState.length === 0) {
        return <div className={classes.noPlace}>
            <img src={placesNotFound} alt="places not found"/>
        </div>
    } else {
        return (<div className={classes.container}>
            {placesListState.map(place => <Place key={place.id} {...place} />)}
        </div>)
    }
}

export default PlacesList