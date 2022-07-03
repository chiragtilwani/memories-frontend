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
    [Sizes.down('md')]:{
      flexDirection: 'column',
      margin:'2rem 0rem'
    }
  },
  card:{
    [Sizes.down('md')]:{
      width: "70%",
      maxWidth: "100% !important",
      margin:'2rem 0rem 0rem 0rem !important',
    },
    [Sizes.down('sm')]:{
      width: "100%",
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
    minHeight: "17rem",
    marginRight: "1rem",
    [Sizes.down('md')]:{
      margin:'0rem',
      width: '70%',
    },
    [Sizes.down('sm')]:{
      width: '100%',
    },
  },
  paper: {
    width: "100% !important",
    padding: "2rem",
    fontSize: "1.5rem !important",
    overflowY: "scroll",
    wordWrap: "break-word",
    "&::-webkit-scrollbar": {
      width: "0rem",
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
      <Card sx={{ maxWidth: 345, display: "inline-block", margin: "2rem" }} className={classes.card}>
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
