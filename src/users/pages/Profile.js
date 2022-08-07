import { makeStyles } from "@mui/styles";
import {placesList} from '../../SeedData'
import UserPlacesList from '../../places/components/UserPlacesList'

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  cover: {
    width: "100%",
    height: "50vh",
    backgroundSize: "100% 100%",
  },
  profilePic: {
    width: "9rem",
    height: "9rem",
    border: ".2rem solid #1976d2",
    borderRadius: "50%",
    marginLeft: "3rem",
    marginTop: "-5rem",
    zIndex: "2",
    boxShadow: "0 0 3rem .5rem rgba(0, 0, 0,.5)",
    backgroundSize: "100% 100%",
  },
  innerContainer:{
    margin:'0 auto',
    width:'80%',
  },
  posts: {
    marginTop:'5rem'
  }
});

const dummyUser = { id: 'u3', name: 'sid',emai:'stilwani03@gmail.com', posts: 5, url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Mukesh_Ambani.jpg", coverURL: "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/article_images/2020/05/19/2019-09-05T130129Z_141979623_RC19C06F4950_RTRMADP_3_RELIANCE-RETAIL-BRANDS-1569773604-605607076-1586337213.jpg?itok=dC2bju_T", bio: 'fkjajhfkaewbfbflfdgnhlnglhnlsfnghlgfkhjsjgfhjsgjfhljsfghjkgfjh;jsfghjlfgjhljfglshjlgfjhljgfsljhlsgfjhljgfsljhlgfsjlh;jfgljhlsjgflhjsfl;ghjslgfjhlgfjlhjfglhjlsjfghlkjgfljhlgfjhljtglhjrtohojtrohsojtojhbsjhtjostrhusiuhourtsoiuhboiasdgagfdgweahthatrgregargragagagakerbgkbaekrgbkajerbg' };

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${dummyUser.coverURL})` }}
      ></div>
      <div
        className={classes.profilePic}
        style={{ backgroundImage: `url(${dummyUser.url})` }}
      ></div>
      <div className={classes.innerContainer}>
        <h1>{dummyUser.name}</h1>
        <p style={{fontSize:'1.2rem',color:'var(--grey-text)',wordWrap: "break-word"}}>{dummyUser.bio}</p>
        <div className={classes.posts}>
        <h2>POSTS</h2>
        <UserPlacesList placesList={placesList} uid={dummyUser.id} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
