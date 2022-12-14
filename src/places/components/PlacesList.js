import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Place from './Place'
import placesNotFound from '../../images/placesNotFound.webp'
import Sizes from '../../styles/Sizes'

const useStyles = makeStyles({
    container: {
        width: '100%',
        [Sizes.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    noPlace: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    Box: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        fontSize: '5rem',
        color: '#5801ae',
        margin: '0rem',
        [Sizes.down('md')]: {
            fontSize: '3rem',
            textAlign: 'center',
        },
    }
})

function PlacesList(props) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(true)
    const [placesList, setPlacesList] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/`)
            .then(res => {
                if (localStorage.getItem('userData')) {
                    setPlacesList(res.data.places.filter(place => place.creatorID !== localStorage.getItem('userData').userId))
                } else {
                    setPlacesList(res.data.places)
                }
            })
            .catch(err => console.log(err))
        setIsLoading(false)
    }, [])

    function onDelete(placeList) {
        setPlacesList(placeList)
    }

    if (!isLoading && placesList) {
        if (placesList.length === 0) {
            return <div className={classes.noPlace}>
                <img src={placesNotFound} alt="places not found" style={{ width: '100%' }} />
                <h1 className={classes.h1}>No places found !</h1>
            </div>
        } else {
            return (<div className={classes.container}>
                {placesList.map(place => <Place key={place._id} place={place} setPlaceToUpdate={props.setPlaceToUpdate} onDelete={onDelete} />)}
            </div>)
        }
    } else {
        return <Box className={classes.Box}>
            <CircularProgress />
        </Box>
    }
}

export default PlacesList