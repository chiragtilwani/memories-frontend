import * as React from "react";
import { useState, useContext } from 'react'
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import svgImg from "../../images/NewPlaceForm.png";
import Button from "@mui/material/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { DispatchContext } from '../../context/PlaceContext'
import useToggler from "../../customHooks/useToggler";
import { MdCancel } from 'react-icons/md'
import Sizes from '../../styles/Sizes'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  sections: {
    width: "50%",
    height: "100vh",
  },
  left: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
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
    backgroundColor: "rgb(25 118 210 / 12%) !important",
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
  const { dispatch } = useContext(DispatchContext)
  const classes = useStyles(isImgSelected);

  const navigate = useNavigate();

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  function handleImageChange(evt) {
    toggleIsImgSelected()
    setUrl(URL.createObjectURL(evt.target.files[0]))
  }

  function handleImgDelete() {
    toggleIsImgSelected()
    setUrl(null)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    let date = new Date();
    let dateToday = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    dispatch({ type: 'add', place: { id: uuidv4(), ...values, postedBy: 'chirag', creatorID: 'u1', liked: false, n_likes: 0, url: url, postDate: dateToday } })
    navigate('/')
  }

  return (
    <>
      <div className={`${classes.left} ${classes.sections}`}>
        <div className={classes.svgContainer}>
          <h1 className={classes.h1}>Add A Memory</h1>
          <img src={svgImg} alt="svg" className={classes.img} />
        </div>
      </div>
      <div className={`${classes.right} ${classes.sections}`}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="outlined-textarea"
            label="Place Name"
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
    </>
  );
}
