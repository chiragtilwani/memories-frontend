import { makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'

import UserPlacesList from '../../places/components/UserPlacesList'

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
    overflow: "hidden",
    position: 'relative'
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
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  span: {
    color: 'white',
    fontSize: '1.2rem',
    letterSpacing: '.1rem'
  },
  img: {
    width: '100%',
    height: '100%'
  }
});


function Profile() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState()
  const currentUserID = JSON.parse(localStorage.getItem('userData')).userId
  const token = JSON.parse(localStorage.getItem('userData')).token
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user/${currentUserID}`)
      .then(res => setCurrentUser(res.data))
      .catch(err => {
        navigate('/')
      });
    setIsLoading(false)
  }, [])

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  async function handleImgChange(evt) {
    setIsLoading(true)
    const fileName = evt.target.files[0].name
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      //TO DO
      const file = evt.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUrl(reader.result)
      }
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUserID}`,
        { url: url }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
      )
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
    setIsLoading(false)
  }
  return (
    <>
      {isLoading && <Box className={classes.loader} >
        <CircularProgress style={{ color: "#1976d2" }} />
      </Box>}
      {currentUser && <div className={classes.container}>
        <div className={classes.profileName} style={{ backgroundColor: '#e3eefa', paddingBottom: '2rem' }}>
          <label htmlFor="profileImg">
            <div className={classes.profilePic}>
              <div className={classes.backdrop} style={{
                backgroundColor: open ? 'rgba(0,0,0,.5)' : '',
              }} onMouseEnter={handleOpen} onMouseLeave={handleClose}>{open ? <span className={classes.span}>update</span> : ''}</div>
              <img className={classes.img} src={currentUser.url.url.length > 0 ? `${currentUser.url.url}` : `https://joeschmoe.io/api/v1/${currentUser.name}`} alt={currentUser.name} />
            </div>
          </label>

          <div>
            <h1 style={{ textTransform: 'capitalize' }}>{currentUser.name}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--grey-text)', wordWrap: "break-word" }}>{currentUser.bio}</p>
          </div>
        </div>
        <input type="file" id="profileImg" value={""} style={{ display: 'none' }} accept="image/png image/jpeg image/jpg" onChange={handleImgChange}></input>
        <div className={classes.innerContainer}>
          <div className={classes.posts}>
            {currentUser.posts.length !== 0 && <h2>POSTS</h2>}
            <UserPlacesList user={currentUser} />
          </div>
        </div></div>}
    </>
  );
}

export default Profile;
