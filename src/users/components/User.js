import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Sizes from "../../styles/Sizes";

const useStyles = makeStyles({
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    margin: "1rem auto",
    height: "10vh",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: " rgb(80 144 207 / 43%)",
    },
    [Sizes.down("md")]: {
      width: "70%",
    },
    [Sizes.down("sm")]: {
      width: "100%",
    },
  },
  innerContainer: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    [Sizes.down("lg")]: {
      width: "35%",
    },
    [Sizes.down("md")]: {
      width: "50%",
    },
  },
  avatar: {
    margin: "2rem",
    border: ".2rem solid #1976d2",
    boxShadow: "0 0 .5rem black"
  },
  nameAndPosts: {
    height: "5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
  },
  paragraph: {
    fontSize: "1.2rem",
    fontWeight: "bolder",
    letterSpacing: ".1rem",
    cursor: "default",
    margin: "0rem !important",
    wordWrap: "break-word",
    width: "100%",
  },
  span: {
    cursor: "default",
    color: 'var(--grey-text)'
  },
  divider: {
    border: "1px solid",
    backgroundColor: "black",
    height: "4rem",
    borderRadius: "50%",
    marginLeft: "1rem",
  },
});

function User(props) {
  const classes = useStyles();
  return (
    <Link to={`/${props.uid}/places`} style={{ textDecoration: "none" }}>
      <Paper className={classes.container}>
        <div className={classes.innerContainer}>
          <Avatar src={props.url.url.length>0 ? props.url.url : `https://joeschmoe.io/api/v1/${props.name}`} className={classes.avatar} />
          <div className={classes.nameAndPosts}>
            <p className={classes.paragraph}>{props.name}</p>
            <span className={classes.span}>Posts : {props.posts}</span>
          </div>
        </div>
      </Paper>
    </Link>
  );
}

export default User;
