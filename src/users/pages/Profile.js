import { makeStyles } from "@mui/styles";
import UserPlacesList from '../../places/components/UserPlacesList'
import { useContext, useEffect, useState } from 'react'
import { DispatchContext } from '../../context/UserContext'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    width: "100%",
    marginBottom: '2rem'
  },
  profileName: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: "9rem",
    height: "9rem",
    border: ".2rem solid #1976d2",
    borderRadius: "50%",
    marginLeft: "3rem",
    marginRight: "3rem",
    marginTop: "2rem",
    zIndex: "2",
    boxShadow: "0 0 3rem .5rem rgba(0, 0, 0,.5)",
    backgroundSize: "100% 100%",
  },
  innerContainer: {
    margin: '0 auto',
    width: '80%',
  },
  posts: {
    marginTop: '5rem'
  },
  loader: {
    display: 'flex',
    width: '100vw',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
  }
});


function Profile() {
  const classes = useStyles();
  const { currentUserID } = useContext(DispatchContext)
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {

    axios.get(`http://localhost:5000/api/users/user/${currentUserID}`)
      .then(res => setCurrentUser(res.data))
      .catch(err => {
        console.log(err)
        navigate('/')
      });
    setIsLoading(false)
  }, [])

  return (

    <>
      {isLoading && <Box className={classes.loader} >
        <CircularProgress style={{ color: "#1976d2" }} />
      </Box>}
      {currentUser && <div className={classes.container}>
        <div className={classes.profileName}>

          <div
            className={classes.profilePic}
            style={{ backgroundImage: currentUser.url ? `url(${currentUser.url})` : `url(https://joeschmoe.io/api/v1/${currentUser.name})` }}
          ></div>
          <div>
            <h1>{currentUser.name}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--grey-text)', wordWrap: "break-word" }}>{currentUser.bio}</p>
          </div>
        </div>
        <div className={classes.innerContainer}>
          <div className={classes.posts}>
            <h2>POSTS</h2>
            <UserPlacesList user={currentUser} />
          </div>
        </div></div>}
    </>
  );
}

export default Profile;
