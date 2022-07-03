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
        [Sizes.down('md')]:{
            width: '100%'
        }
    }
})

function AllPlaces() {
    const classes = useStyles()

    const placesList = [
        { id: 1, name: 'place1', postedBy: 'chirag', description: 'sample place 1', address: 'random address1', url: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/places-to-visit-in-Bangalore-in-June1.jpg", liked: false, n_likes: 12 },
        { id: 2, name: 'place2', postedBy: 'rahul', description: 'sample place 2', address: 'random address2', url: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/02/Bangalore-Palace_14th-feb-400x229.jpg", liked: true, n_likes: 20 },
        { id: 3, name: 'place3', postedBy: 'sid', description: 'sample place 3', address: 'random address3', url: "https://img.traveltriangle.com/blog/wp-content/uploads/2020/02/Tipu-Sultan%E2%80%99s-Summer-Palace_14th-feb-400x229.jpg", liked: false, n_likes: 50 }
    ]


    return <div className={classes.container}>
        <PlacesList placesList={placesList} />
    </div>
}

export default AllPlaces

