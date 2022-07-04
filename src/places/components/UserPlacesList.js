import { makeStyles } from '@mui/styles'
import UserPlacesListItem from './UserPlacesListItem'
import placesNotFound from '../../images/placesNotFound.webp'
import Sizes from '../../styles/Sizes'

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
                }else{
                    return null
                }
                })}
        </div>
    }
    return content
}

export default UserPlacesList