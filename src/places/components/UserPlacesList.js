import { makeStyles } from '@mui/styles'
import UserPlacesListItem from './UserPlacesListItem'
import placesNotFound from '../../images/placesNotFound.webp'
import Sizes from '../../styles/Sizes'
import {PlaceContext} from '../../context/PlaceContext'
import {DispatchContext} from '../../context/PlaceContext'
import {useContext} from 'react'

const useStyles = makeStyles({
    noPlace: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width:'100%',
        display:'grid',
        gridTemplateColumns:'repeat(4,1fr)',
        '&::-webkit-scrollbar':{
            width:'0rem !important',
        },
        [Sizes.down('md')]:{
            gridTemplateColumns:'repeat(2,1fr)',
        },
        [Sizes.down('sm')]:{
            gridTemplateColumns:'repeat(1,1fr)',
        }
    }
}
)
function UserPlacesList(props) {
    const classes = useStyles()
    const placesListState=useContext(PlaceContext)
    const { dispatch} =useContext(DispatchContext)
    const userPlaces=placesListState.filter(p=>p.creatorID===props.uid)

    function handleDelete(id){
       dispatch({type:"remove",id:id})
    }

    let content;
    if (userPlaces.length === 0) {

        content = <div className={classes.noPlace}>
            <img src={placesNotFound} alt="places not found" />
        </div>

    } else {
        content = <div className={classes.container}>
               { userPlaces.map(place =><UserPlacesListItem key={place.id} {...place} handleDelete={handleDelete}/>)}
        </div>
    }

    
    return content
}

export default UserPlacesList