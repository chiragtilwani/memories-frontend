import { makeStyles } from "@mui/styles";
import UserPlacesListItem from "./UserPlacesListItem";
import placesNotFound from "../../images/placesNotFound.webp";
import Sizes from "../../styles/Sizes";
import { DispatchContext } from "../../context/PlaceContext";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios'


const useStyles = makeStyles({
  userInfo: {
    height: "20%",
    width: "100%",
    backgroundColor: "#e3eefa",
    display: "flex",
    alignItems: "center",
    [Sizes.down("md")]: {
      flexDirection: "column",
    },
  },
  userImg: {
    width: "8rem",
    height: "8rem",
    borderRadius: "50%",
    border: ".15rem solid #1976d2",
    display: "inline-block",
    margin: "1rem 3rem 1rem 1rem",
    [Sizes.down("md")]: {
      margin: "1rem 0",
    },
  },
  userInfoContainer: {
    height: "100%",
    width: "100%",
    [Sizes.down("md")]: {
      display: "flex !important",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  userbio: {
    color: "var(--grey-text)",
    fontSize: "1.3rem",
    letterSpacing: ".1rem",
    wordWrap: "break-word",
    [Sizes.down("md")]: {
      width: "95%",
      padding: "1rem",
    },
    [Sizes.up("md")]: {
      paddingRight: "2rem",
    },
  },
  username: {
    fontSize: "2rem",
    textTransform: "capitalize",
    letterSpacing: ".1rem",
    fontWeight: "400",
  },
  noPlace: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  h1: {
    fontSize: '5rem',
    color: '#5801ae',
    margin: '0rem'
  },
  container: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    "&::-webkit-scrollbar": {
      width: "0rem !important",
    },
    [Sizes.down("md")]: {
      gridTemplateColumns: "repeat(2,1fr)",
    },
    [Sizes.down("sm")]: {
      gridTemplateColumns: "repeat(1,1fr)",
    },
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
function UserPlacesList(props) {
  const classes = useStyles();
  const { dispatch } = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userPlacesID, setUserPlacesID] = useState(props.user.posts);
  const [userPlaces, setUserPlaces] = useState([])


  useEffect(() => {
    userPlacesID.forEach(addPost)
    setIsLoading(false)
  }, [])

  function addPost(postID) {
    axios.get(`http://localhost:5000/api/places/${postID}`).then(res => setUserPlaces(prevState => [...prevState, res.data.place]))
  }

  function handleDelete(id) {
    dispatch({ type: "remove", id: id });
  }
console.log(props)
  return <>
    {window.location.pathname === "/profile" ? (
      ""
    ) : (
      <div className={classes.userInfo}>
        <div
          className={classes.userImg}
          style={{
            background: ``,
            backgroundSize: "100% 100%",
          }}
        ></div>
        <div
          className={classes.userInfoContainer}
          style={{ display: "inline-block", height: "100%", width: "100%" }}
        >
          <span className={classes.username}>{ }</span>
          <p className={classes.userbio}>{ }</p>
        </div>
      </div>
    )}

    {!isLoading && userPlaces.length ? <div className={classes.container}>
      {userPlaces.map((place) =>
        <UserPlacesListItem
          key={place._id}
          place={place}
          handleDelete={handleDelete}
          setPlaceToUpdate={props.setPlaceToUpdate}
        />
      )}
    </div> : ''}
    {isLoading && <Box className={classes.loader} >
      <CircularProgress style={{ color: "#1976d2" }} />
    </Box>}
    {!isLoading && !userPlaces.length ?<div className={classes.noPlace}>
      <img src={placesNotFound} alt="Memory not uploaded" />
      <h1 className={classes.h1}>No post yet !</h1>
    </div>:''}

  </>
}


export default UserPlacesList;
