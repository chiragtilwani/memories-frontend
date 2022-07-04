import { makeStyles } from '@mui/styles'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MdLocationOn } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles({
  span: {
    fontSize: '1.2rem',
    color: 'black',
    letterSpacing: '.05rem',
  },
  description: {
    overflowY: 'scroll !important',
    position: 'fixed !important',
    fontSize: '1.2rem !important',
    '&::-webkit-scrollbar': {
      width: '0rem'
    }
  },
  cardActions: {
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important'

  }
})


export default function UserPlacesListItem(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles()


  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
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
              position: 'absolute',
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


  return (
    <Card sx={{wordWrap: 'break-word' }} className={classes.card}>
      <CardMedia
        component="img"
        height="194"
        image={props.url}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className={classes.span}>{props.name}</span> - {props.postDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <div>

          <IconButton aria-label="add to favorites" title="Like">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="location" title="Location">
            <MdLocationOn />
          </IconButton>
          <IconButton aria-label="edit" title="Edit place">
            <AiFillEdit />
          </IconButton>
          <IconButton aria-label="delete" title="Delete place">
            <MdDelete />
          </IconButton>
        </div>
        <Button onClick={handleClickOpen}>
          Description
        </Button>
      </CardActions>
      
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.name}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography style={{wordWrap:'break-word'}}>
              {props.description}
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>
    </Card>
  );
}
