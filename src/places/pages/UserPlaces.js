import UserPlacesList from '../../places/components/UserPlacesList'
import {placesList} from '../../SeedData'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'

function UserPlaces(props){
    const [user,setUser]=useState(null)
    const [isLoading, setIsLoading] = useState(false);
    let {uid}=useParams()

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`http://localhost:5000/api/users/user/${uid}`).then(res=>setUser({...user,...res.data})).catch(err=>console.error(err))
        setIsLoading(false)
    },[])
    return <>{user && <UserPlacesList user={user} setPlaceToUpdate={props.setPlaceToUpdate}/>}</>
}

export default UserPlaces