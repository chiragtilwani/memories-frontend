import * as React from "react";
import { useState } from 'react'
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { MdCancel } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import svgImg from "../../images/NewPlaceForm.png";
import useToggler from "../../customHooks/useToggler";
import Sizes from '../../styles/Sizes'

const useStyles = makeStyles({
  sections: {
    width: "50%",
    height: "100vh",
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: 'relative',
    [Sizes.down('sm')]: {
      display: 'none'
    }
  },
  svgContainer: {
    position: "relative",
  },
  h1: {
    position: "absolute",
    top: "61%",
    left: "22%",
    color: "#b37053",
    fontWeight: "bolder",
    fontSize: "3rem",
    textShadow: "2px -2px 2px #7d311a",
    letterSpacing: ".3rem",
    cursor: "pointer",
    transitionDuration: ".5s",
    "&:hover": {
      textShadow: "2px -2px 2px rgba(255,255,255,0.5)",
    },

    [Sizes.up('md')]: {
      top: '60%',
      left: '19%',
      fontSize: '2.4rem'
    }, [Sizes.up('lg')]: {
      top: '62%',
      left: '20%',
      fontSize: '3rem'
    },
    [Sizes.up('xl')]: {
      top: '68%',
      left: '25%',
      fontSize: '2.4rem'
    },
    [Sizes.down('md')]: {
      top: '56%',
      left: '13%',
      fontSize: '2.4rem'
    }
  },
  img: {
    marginLeft: "-5%",
    width: "100%",
  },
  right: {
    backgroundColor: "#e3eefa !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [Sizes.down('sm')]: {
      width: '100%'
    }
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
    borderColor: 'grey',
    transitionDuration: '.5s',
    '&:hover': {
      backgroundColor: isImgSelected => {
        if (isImgSelected) {
          return 'transparent'
        } else {
          return 'white'
        }
      }
    },
    [Sizes.down('lg')]: {
      padding: "1.2rem 4.3rem",
    },
    [Sizes.down('xs')]: {
      padding: "1.2rem 3rem",
    }
  },
  cameraIcon: {
    marginLeft: "1rem",
    fontSize: "2rem !important",
  },
  imgContainer: {
    display: "flex",
  },
  imgPreview: {
    width: '10rem',
    margin: '1rem',
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

const initialValues = {
  name: '',
  description: '',
  address: '',
}

export default function NewPlaceForm() {
  const [values, setValues] = useState(initialValues);
  const [url, setUrl] = useState(null)
  const [isImgSelected, toggleIsImgSelected] = useToggler(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const currentUserID = JSON.parse(localStorage.getItem('userData')).userId
  const token = JSON.parse(localStorage.getItem('userData')).token
  const classes = useStyles(isImgSelected);

  const navigate = useNavigate();

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  function handleImageChange(evt) {
    toggleIsImgSelected()
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

  }

  function handleImgDelete() {
    toggleIsImgSelected()
    setUrl(null)
  }
  async function handleSubmit(evt) {
    evt.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/places`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({
          name: evt.target.name.value,
          description: evt.target.description.value,
          address: evt.target.address.value,
          url: url,
          creatorID: currentUserID
        })
      })
      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };
  const action = (
    <>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      {error && <Snackbar
        style={{ position: 'absolute' }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={action}
      />}
      {isLoading ? <Box className={classes.loader} >
        <CircularProgress style={{ color: "#1976d2" }} />
      </Box> : <><div className={`${classes.left} ${classes.sections}`}>
        <div className={classes.svgContainer}>
          <h1 className={classes.h1}>Add A Memory</h1>
          <img src={svgImg} alt="svg" className={classes.img} />
        </div>
      </div>
        <div className={`${classes.right} ${classes.sections}`}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="outlined-textarea"
              label="Memory Name"
              multiline
              className={`${classes.textfield} ${classes.name}`}
              autoFocus
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
              <div className={classes.imgContainer}>
                <MdCancel style={{ fontSize: '2rem', display: isImgSelected === true ? 'inline-block' : 'none' }} onClick={handleImgDelete} />
                <img src={url} alt="preview" className={classes.imgPreview} style={{ display: isImgSelected === true ? 'inline-block' : 'none' }} />
              </div>
              <label htmlFor="img" className={classes.fileInputLabel} style={{ color: isImgSelected ? 'grey' : 'black' }}>
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
            <Button variant="contained" className={classes.btn} type="submit" disabled={!isImgSelected ? true : false}>
              Add Memory
            </Button>
          </form>
        </div>
      </>}
    </>
  );
}
