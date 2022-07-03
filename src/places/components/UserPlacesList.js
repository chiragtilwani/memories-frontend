import { makeStyles } from '@mui/styles'
import UserPlacesListItem from './UserPlacesListItem'
import placesNotFound from '../../images/placesNotFound.webp'

const useStyles = makeStyles({
    noPlace: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width:'100vw',
        height:'85vh',
        display:'flex'
    }
}
)
function UserPlacesList(props) {
    const classes = useStyles()
    let content;
    if (props.placesList.length === 0) {

        content = <div className={classes.noPlace}>
            <img src={placesNotFound} alt="places not found" />
        </div>

    } else {
        content = <div className={classes.container}>
            {props.placesList.map(place => {
                if(place.creatorID===props.uid){
                   return <UserPlacesListItem key={place.id} {...place}/>
                }})}
        </div>
    }
    return content
}

export default UserPlacesList