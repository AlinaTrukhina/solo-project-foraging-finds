import React, { useEffect, useState } from 'react';
import { useHistory, useParams, HashRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { Button } from '@mui/material';

function MyPins() {
  // declare hooks here
  const dispatch = useDispatch();
  const history = useHistory();

  // redux state for user pins
  const myPins = useSelector(store => store.userPins);
  // fetch pins added by logged in user
  useEffect(() => {
    dispatch({
        type: 'FETCH_USER_PINS'
    })
  }, []);

  // set original open state for the delete dialog window to false
  const [open, setOpen] = useState(false);
  //open the delete diolog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // close the delete dialog
  const handleClose = () => {
    setOpen(false);
  };

  const deletePin = (evt, pin) => {
    evt.preventDefault();
    dispatch({type: 'DELETE_PIN', payload: pin})
    setOpen(false);
  }

  const editPin = (evt, pin) => {
    evt.preventDefault();
    history.push(`/mypins/${pin.id}/edit`);
  }

  return (
    // render pins in a list of Material UI cards
    <>  {myPins.map(pin => (
      <Card key={pin.id}>
        <CardHeader 
        title={pin.title} 
        subheader={format(parseISO(pin.date), 'yyyy-MM-dd')}
        />
        <CardMedia 
        component="img"
        image={pin.img_url}
        alt={pin.title} />
        <CardContent>
          <Typography>
            {pin.latin_name}
          </Typography>
          <Typography paragraph>
            {pin.text_entry}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small" onClick={(evt)=>editPin(evt, pin)}>Edit</Button>
          <Button size="small" onClick={handleClickOpen}>Delete</Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-dialog"
            aria-describedby="delete-dialog-description"
            >
            <DialogTitle id="delete-dialog">
              {"Are you sure you want to delete this?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Are you sure you want to delete this pin? It will be gone forever!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Nope, keep it</Button>
              <Button onClick={(evt)=>deletePin(evt, pin)} autoFocus>
                Yes, delete it
              </Button>
            </DialogActions>
            </Dialog>
        </CardActions>
      </Card>
    ))}
    </>
  )
}

export default MyPins;

