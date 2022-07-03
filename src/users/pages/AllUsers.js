import UsersList from '../components/UsersList'
import {makeStyles} from '@mui/styles'
import Sizes from '../../styles/Sizes'

const useStyles =makeStyles({
    container:{
        width:'70%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin:'auto',
        border: '1px solid',
        [Sizes.down('md')]:{
            width:'100%'
        }
    }
})

function AllUsers() {

    const classes =useStyles()

    const users = [ { id: 1, name: 'gldfshglhfsd gh', posts: 3, url: "https://cdn.vox-cdn.com/thumbor/YcVLI8UM9mTyIlDQkodM8dPZ6A4=/0x86:706x557/1220x813/filters:focal(0x86:706x557):format(webp)/cdn.vox-cdn.com/assets/738480/stevejobs.png",bio:'i am MERN stack develop and this is dummmy bio' }, { id: 2, name: 'rahul', posts: 10, url: "https://pi.tedcdn.com/r/ted-conferences-speaker-photos-production.s3.amazonaws.com/yoa4pm3vyerco6hqbhjxly3bf41d?w=255",bio:'fkjajhfkaewbfbakerbggragragahthgahghgfhatethaattrathtakbaargagagarekrgbkajerbg' }, { id: 3, name: 'sid', posts: 5, url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Mukesh_Ambani.jpg",bio:'fkjajhfkaewbfbflfdgnhlnglhnlsfnghlgfkhjsjgfhjsgjfhljsfghjkgfjh;jsfghjlfgjhljfglshjlgfjhljgfsljhlsgfjhljgfsljhlgfsjlh;jfgljhlsjgflhjsfl;ghjslgfjhlgfjlhjfglhjlsjfghlkjgfljhlgfjhljtglhjrtohojtrohsojtojhbsjhtjostrhusiuhourtsoiuhboiasdgagfdgweahthatrgregargragagagakerbgkbaekrgbkajerbg' }]
    return <div className={classes.tcontainer}>
        <UsersList UsersList={users} />
    </div>
}

export default AllUsers
