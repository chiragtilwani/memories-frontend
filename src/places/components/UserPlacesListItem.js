import { makeStyles } from "@mui/styles";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from 'react-router-dom'
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios";


const useStyles = makeStyles({
  span: {
    fontSize: "1.2rem",
    color: "black",
    letterSpacing: ".05rem",
  },
  description: {
    overflowY: "scroll !important",
    position: "fixed !important",
    fontSize: "1.2rem !important",
    "&::-webkit-scrollbar": {
      width: "0rem",
    },
  },
  cardActions: {
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "space-between !important",
  },
  hover: {
    "&:hover": {
      transform: "scale(1.5)",
      transition: "all 0.1s"
    },
    "&:active": {
      transform: "scale(.8)",
      transition: "all 0.1s"
    },
  },
  likebtn: {
    "&:hover": {
      color: "#ed5151",
    },
  },
  locationbtn: {
    "&:hover": {
      color: "#28a728;",
    },
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
  close: {
    position: "absolute",
    right: "1.5rem",
    top: "1.5rem",
    fontSize: "1.5rem",
    "&:hover": {
      color: "red",
    },
  },
});

export default function UserPlacesListItem(props) {
  const [open, setOpen] = React.useState(false);
  const [deleteDialogopen, setDeleteDialogOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 

  const classes = useStyles();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;


    

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  function handleClick(evt){
    evt.stopPropagation();
    props.setPlaceToUpdate({...props.place})
  }


  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };
  const handleDeleteDialogclose = () => {
    setDeleteDialogOpen(false);
  };
function handleDelete(){
    handleDeleteDialogclose();
    props.handleDelete(props.place._id);
  }
  return (
    <Card sx={{ wordWrap: "break-word" }} className={classes.card}>
      <CardMedia
        component="img"
        height="194"
        image={props.place.url}
        alt={props.place.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className={classes.span}>{props.place.name}</span> - {props.place.postDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <div>
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
            onClick={handleDeleteDialogOpen}
          >
            <MdDelete />
          </IconButton>
        </div>
        <Button onClick={handleClickOpen}>Description</Button>
      </CardActions>

      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {props.place.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography style={{ wordWrap: "break-word" }}>
              {props.place.description}
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>
      <Dialog
        open={deleteDialogopen}
        onClose={handleDeleteDialogclose}
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
          <Button onClick={handleDeleteDialogclose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}