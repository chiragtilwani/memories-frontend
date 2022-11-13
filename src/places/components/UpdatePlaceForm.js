import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { AiOutlineCamera } from "react-icons/ai";
import useToggler from "../../customHooks/useToggler";
import Sizes from "../../styles/Sizes";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { UserDispatchContext } from '../../context/UserContext'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
    [Sizes.down("md")]: {
      flexDirection: 'column',
    },
  },
  sections: {
    width: "50%",
    height: "100vh",
    [Sizes.down("md")]: {
      width: "100%",
      height: "50vh",
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
    position: 'relative'
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
    width: '100%',
    height: '100%',
    position: 'absolute !important',
    [Sizes.down('md')]: {
      width: '100%',
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
    transitionDuration: '.5s',
    cursor: "pointer",
    '&:hover': {
      color: "black",
    }
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

export default function UpdatePlaceForm(props) {
  const [foundPlace, setFoundPlace] = useState()
  const [url, setUrl] = useState();
  const [isImgSelected, toggleIsImgSelected] = useToggler(true);
  const classes = useStyles(isImgSelected);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const { pid } = useParams()
  const token = JSON.parse(localStorage.getItem('userData')).token

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/places/${pid}`)
      .then(res => {
        setFoundPlace(res.data.place)
        setUrl(res.data.place.url.url)
        const initialValues = {
          name: res.data.place.name,
          description: res.data.place.description,
          address: res.data.place.address,
        };
        setValues(initialValues)
      })
    setIsLoading(false)

  }, [])

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function handleImageChange(evt) {
    setIsLoading(true)
    toggleIsImgSelected();
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
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
    setIsLoading(false)
  }

  function handleImgDelete() {
    toggleIsImgSelected();
    setUrl(null);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const res = await axios.patch(`http://localhost:5000/api/places/${foundPlace._id}`, {
      name: evt.target.name.value,
      description: evt.target.description.value,
      address: evt.target.address.value,
      url: url
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    navigate(-1);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <>
    {isLoading && <Box className={classes.loader} >
      <CircularProgress style={{ color: "#1976d2" }} />
    </Box>}
    {foundPlace && !isLoading ? <><div className={classes.container}>
      <div className={`${classes.left} ${classes.sections}`}>
        <img
          src={isImgSelected ? url : ""}
          alt={props.name}
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
    </> : ''}</>
}
