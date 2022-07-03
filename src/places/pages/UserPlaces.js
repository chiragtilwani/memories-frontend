import UserPlacesList from '../../places/components/UserPlacesList'
import {placesList} from '../../SeedData'
import {useParams} from 'react-router-dom'

function UserPlaces(){
    let {uid}=useParams()
    return <UserPlacesList placesList={placesList} uid={uid} />
}

export default UserPlaces