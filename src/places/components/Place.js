import * as React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react'

import Sizes from "../../styles/Sizes";

const useStyles = makeStyles({
  container: {
    width: "100%",

    display: "flex",
    alignItems: "center",

    [Sizes.down("sm")]: {
      width: "90%",
      flexDirection: "column",
      margin: "2rem auto",
    },
  },
  card: {

    [Sizes.down("md")]: {
      width: "70%",
      maxWidth: "100% !important",
    },
    [Sizes.down("sm")]: {
      margin: "0rem !important",
      width: "100% !important",
      borderRadius: ".5rem .5rem 0 0 !important",
    },
  },
  typography: {
    display: "inline-block",
    fontSize: "1.2rem !important",
    fontWeight: "bold !important",
    letterSpacing: ".1rem !important",
  },
  span: {
    fontSize: "1rem",
    color: "var(--grey-text)",
  },
  nameAndPostedBy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: ".2rem",
    height: "3.3rem",
  },
  box: {
    minWidth: "70%",
    height: "20rem",
    marginRight: "1rem",
    [Sizes.down("md")]: {
      margin: "0rem",
    },
    [Sizes.down("sm")]: {
      width: "100%",
      height: "fit-content",
      borderRadius: "0 0 .5rem .5rem !important",
      zIndex: "2 !important",
    },
  },
  paper: {
    margin: "0rem !important",
    maxWidth: "100% !important",
    padding: "2rem",
    fontSize: "1.5rem !important",
    overflowY: "scroll",
    wordWrap: "break-word",
    height: "auto !important",
    maxHeight: "15rem",
    backgroundColor: "rgb(25 118 210 / 12%) !important",
    textOverflow: 'ellipsis',
    "&::-webkit-scrollbar": {
      width: "0rem",
    },
    [Sizes.down("sm")]: {
      borderRadius: "0 0 .5rem .5rem !important",
      width: "100% !important"
    },
  },
  img: {
    width: "2rem",
    transitionDuration: ".3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  image: {
    width: '100%',
    height: '194px',
    backgroundSize: '100% 100% !important',
  },
  cardActions: {
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "space-between !important",
  },
  hover: {
    transform: "scale(1)",
    "&:hover": {
      transition: 'all .1s',
      transform: "scale(1.5)",
    },
    "&:active": {
      transition: 'all .1s',
      transform: "scale(.8)"
    }
  },
  editbtn: {
    "&:hover": {
      color: "#1976d2",
    },
  },
  deletebtn: {
    "&:hover": {
      color: "red",
    },
  },
  Box: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function Place(props) {
  const classes = useStyles();
  const [creatorName, setCreatorName] = useState()
  let currentUserID, token;
  if (localStorage.getItem('userData')) {
    currentUserID = JSON.parse(localStorage.getItem('userData')).userId
    token = JSON.parse(localStorage.getItem('userData')).token
  }

  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  function handleClick(evt) {
    evt.stopPropagation();
    props.setPlaceToUpdate({ ...props.place })
  }
  function handleDelete() {
    setIsLoading(true)
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/places/${props.place._id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(() => axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/`).then((res) => props.onDelete(res.data.places)))
      .then(() => {
        setIsLoading(false)
        handleClose()
      })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user/${props.place.creatorID}`)
      .then(res => setCreatorName(res.data.name))
  }, [])
  return (
    <>{isLoading && <Box className={classes.Box}>
      <CircularProgress />
    </Box>}
      <div className={classes.container}>
        <Card
          sx={{

            minWidth: '30%',
            display: "inline-block",
            margin: "2rem",
          }}
          className={classes.card}

        >
          <CardActionArea disableRipple="true"
            disableTouchRipple="true">
            <div className={classes.image} style={{ background: `url(${props.place.url.url})` }}>
            </div>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className={classes.nameAndPostedBy}>
                <Typography className={classes.typography}>
                  {props.place.name}
                </Typography>
                <span className={classes.span}>Posted By : {creatorName}</span>
              </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
              {props.place.creatorID === currentUserID ? <div>
                <Link to={`/${props.place._id}/update-place`} onClick={handleClick}>
                  <IconButton
                    aria-label="edit"
                    title="Edit memory"
                    className={`${classes.editbtn} ${classes.hover}`}
                  >
                    <AiFillEdit />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  title="Delete memory"
                  className={`${classes.deletebtn} ${classes.hover}`}
                  onClick={handleClickOpen}
                >
                  <MdDelete />
                </IconButton>
              </div> : ''}

            </CardActions>
          </CardActionArea>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Deleting ${props.place.name}`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete <strong>{props.place.name}</strong> memory ?
                Memory deleted once cannot be recovered.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              minWidth: '70%',
              height: 150,
            },
          }}
          className={classes.box}
        >
          <Paper elevation={3} className={classes.paper}>
            {props.place.description}
          </Paper>
        </Box>
      </div>
    </>
  );
}

export default Place;
