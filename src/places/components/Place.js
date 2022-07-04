import { makeStyles } from "@mui/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import liked from "../../images/liked.jpeg";
import notLiked from "../../images/notLiked.jpeg";
import Sizes from "../../styles/Sizes"

const useStyles = makeStyles({
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [Sizes.down('sm')]:{
      width:'90%',
      flexDirection: 'column',
      margin:'2rem auto'
    }
  },
  card:{
    [Sizes.down('md')]:{
      width: "70%",
      maxWidth: "100% !important",
    },
    [Sizes.down('sm')]:{
      margin:'0rem !important',
      width: "100% !important",
      borderRadius:'.5rem .5rem 0 0 !important'
    }
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
    width: "70%",
    height:'20rem',
    marginRight: "1rem",
    [Sizes.down('md')]:{
      margin:'0rem',
    },
    [Sizes.down('sm')]:{
      width: '100%',
      height:'fit-content',
      borderRadius:'0 0 .5rem .5rem !important',
      zIndex:'2 !important',
    },
    
  },
  paper: {
    margin: '0rem !important',
    width: "100% !important",
    padding: "2rem",
    fontSize: "1.5rem !important",
    overflowY: "scroll",
    wordWrap: "break-word",
    height:"auto !important",
    maxHeight:'25rem',
    backgroundColor:'rgb(25 118 210 / 12%) !important',
    "&::-webkit-scrollbar": {
      width: "0rem",
    },
    [Sizes.down('sm')]:{
      borderRadius:'0 0 .5rem .5rem !important',
    },
    
  },
  likes: {
    display: "flex",
    flexDirection: "column",
    height: "4rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: "2rem",
    transitionDuration: ".3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
});

function Place(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card sx={{width:'25rem', maxWidth: 345, display: "inline-block", margin: "2rem" }} className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.url}
            alt="green iguana"
          />
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={classes.nameAndPostedBy}>
              <Typography className={classes.typography}>
                {props.name}
              </Typography>
              <span className={classes.span}>Posted By : {props.postedBy}</span>
            </div>
            <div className={classes.likes}>
              <img
                src={props.liked ? liked : notLiked}
                className={classes.img}
                alt=""
              />
              <span style={{ fontSize: "1.2rem"}}>{props.n_likes}</span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 150,
          },
        }}
        className={classes.box}
      >
        <Paper elevation={3} className={classes.paper}>
          {props.description}
        </Paper>
      </Box>
    </div>
  );
}

export default Place;
