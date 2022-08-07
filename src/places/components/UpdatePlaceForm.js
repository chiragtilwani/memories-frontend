import * as React from "react";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { DispatchContext } from "../../context/PlaceContext";
import { PlaceContext } from "../../context/PlaceContext";
import useToggler from "../../customHooks/useToggler";
import Sizes from "../../styles/Sizes";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { BiImageAdd } from "react-icons/bi";

const useStyles = makeStyles({
  container:{
    display:'flex',
    width:'100%',
    [Sizes.down("md")]: {
      flexDirection:'column',
    },
  },
  sections: {
    width: "50%",
    height: "100vh",
    [Sizes.down("md")]: {
      width: "100%",
    },
  },
  img: {
    width: "100%",
    height: "100%",
    "&:hover": {
      backdrop: {
        display: "block",
      },
    },
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position:'relative'
  },
  right: {
    backgroundColor: "rgb(25 118 210 / 12%) !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [Sizes.down("sm")]: {
      width: "100%",
    },
  },
  form: {
    width: "70%",
    height: "80%",
    marginBottom: "7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  textfield: {
    width: "90%",
  },
  btn: {
    width: "20rem",
    height: "4rem",
    fontSize: "1.5rem !important",
    letterSpacing: ".2rem !important",
  },
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    border: "1px solid",
    padding: "1.2rem 13.5rem",
    fontSize: "1.5rem !important",
    letterSpacing: ".1rem !important",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: ".4rem",
    borderColor: "grey",
    transitionDuration: ".5s",
    "&:hover": {
      backgroundColor: (isImgSelected) => {
        if (isImgSelected) {
          return "transparent";
        } else {
          return "white";
        }
      },
    },
    [Sizes.down("lg")]: {
      padding: "1.2rem 4.3rem",
    },
    [Sizes.down("xs")]: {
      padding: "1.2rem 3rem",
    },
  },
  cameraIcon: {
    marginLeft: "1rem",
    fontSize: "2rem !important",
  },
  backdrop: {
    width:'50%',
    height:'100%',
    position:'absolute !important',
    [Sizes.down('md')]:{
      width:'100%',
    }
  },
  leftImgUpload: {
    fontSize: "3rem",
    color: "var(--grey-text)",
    fontWeight: "bold",
    letterSpacing: ".12rem",
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration:'.5s',
    cursor: "pointer",
    '&:hover':{
      color:"black",
    }
  },
});

export default function NewPlaceForm() {
  let { pid } = useParams();
  const placesListState = useContext(PlaceContext);
  const [foundPlace] = placesListState.filter((place) => pid === place.id);
  const initialValues = {
    name: foundPlace.name,
    description: foundPlace.description,
    address: foundPlace.address,
  };
  const [values, setValues] = useState(initialValues);
  const [url, setUrl] = useState(foundPlace.url);
  const [isImgSelected, toggleIsImgSelected] = useToggler(true);
  const { dispatch } = useContext(DispatchContext);
  const classes = useStyles(isImgSelected);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function handleImageChange(evt) {
    toggleIsImgSelected();
    setUrl(URL.createObjectURL(evt.target.files[0]));
  }

  function handleImgDelete() {
    toggleIsImgSelected();
    setUrl(null);
  }

  function handleSubmit(evt) {
    // will connect this to BACKEND later
    evt.preventDefault();
    dispatch({
      type: "edit",
      id:foundPlace.id,
      editedPlace: {
        ...values,
        id: foundPlace.id,
        postedBy: foundPlace.postedBy,
        creatorID: foundPlace.creatorID,
        liked: foundPlace.liked,
        n_likes: foundPlace.n_likes,
        url: url,
        postDate: foundPlace.postDate,
      },
    });
    navigate("/");
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.left} ${classes.sections}`}>
        <img
          src={isImgSelected ? url : ""}
          alt="svg"
          className={classes.img}
          onMouseEnter={handleOpen}
          style={{ display: isImgSelected ? "block" : "none" }}
        />
        <Backdrop
          sx={{ color: "#fff" }}
          open={open}
          onMouseLeave={handleClose}
          style={{
            display: isImgSelected ? "" : "none",
          }}
          className={classes.backdrop}
        >
          <Button
            variant="contained"
            style={{
              letterSpacing: ".15rem",
              fontSize: "1rem",
              fontWeight: "bold",
              display: isImgSelected ? "block" : "none",
            }}
            onClick={handleImgDelete}
          >
            Remove Image
          </Button>
        </Backdrop>

        <label
          htmlFor="img"
          className={classes.leftImgUpload}
          style={{ display: isImgSelected ? "none" : "flex" }}
        >
          <BiImageAdd style={{ marginRight: "1rem" }} />
          Add Image
        </label>
      </div>
      <div className={`${classes.right} ${classes.sections}`}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="outlined-textarea"
            label="Place Name"
            multiline
            className={`${classes.textfield} ${classes.name}`}
            required
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            className={`${classes.textfield} ${classes.description}`}
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            className={`${classes.textfield} ${classes.address}`}
            name="address"
            value={values.address}
            onChange={handleChange}
          />
          <div>
            <label
              htmlFor="img"
              className={classes.fileInputLabel}
              style={{ color: isImgSelected ? "grey" : "black" }}
            >
              Uplaod Image <AiOutlineCamera className={classes.cameraIcon} />
            </label>
            <input
              type="file"
              id="img"
              name="url"
              value={""}
              accept="image/png, image/jpg, image/jpeg"
              className={classes.fileInput}
              required
              onChange={handleImageChange}
              disabled={isImgSelected ? true : false}
            ></input>
          </div>
          <Button
            variant="contained"
            className={classes.btn}
            type="submit"
            disabled={!isImgSelected ? true : false}
          >
            Update Memory
          </Button>
        </form>
      </div>
    </div>
  );
}
