import React, { useEffect, useState } from 'react';
import { useHistory, useParams, HashRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

function MyPins(props) {
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  //open the delete diolog
  const handleClickOpen = () => {
    setDeleteOpen(true);
  };
  // close the delete dialog
  const handleClose = () => {
    setDeleteOpen(false);
  };

  const goToDeteails = (evt, pin) => {
    evt.preventDefault();
    history.push(`/details/${pin.id}`);
  }

  const deletePin = (evt, pin) => {
    evt.preventDefault();
    dispatch({type: 'DELETE_PIN', payload: pin})
    setDeleteOpen(false);
  }

  const editPin = (evt, pin) => {
    evt.preventDefault();
    dispatch({type: 'RESET_SELECTED_PIN'})
    history.push(`/mypins/${pin.id}/edit`);
  }

  // expand more content 
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // end expand more


  // swipable drawer
  const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
      theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));

  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const drawerBleeding = 50;

  const { window } = props;
  const [swipableOpen, setSwipeableOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setSwipeableOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  // end swipable drawer


  return (
    // render pins in a list of Material UI cards
    <>  
    <Container sx={{margin: '80px 0 30px 0'}} >
      <Typography component="h1" variant="h5" align="center" marginBottom="10px">
          My Pins
      </Typography>
      <Typography align="center" marginBottom="5px">
          Click pin title to focus map on pin
      </Typography>
    
    {/* <Root> */}
    {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
      <Button onClick={toggleDrawer(true)}>Open</Button>
    </Box> */}
    {/* <SwipeableDrawer
      disableBackdropTransition
      sx={{marginTop: '80px'}}
      styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          height: `calc(80% - ${drawerBleeding}px)`,
          maxWidth: '80px',
          overflow: 'visible',
        },
      }}
      container={container}
      anchor="top"
      open={swipableOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    > */}
        
      {myPins.map(pin => (
      <Card key={pin.id}
        width="80%"
        >
        <CardHeader 
        onClick={()=>dispatch({type: 'SET_SELECTED_PIN', payload: pin})}
        title={pin.title} 
        subheader={format(parseISO(pin.date), 'yyyy-MM-dd')}
        />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto">
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
        </Collapse>
        <CardActions>
          <Button size="small" onClick={(evt)=>goToDeteails(evt, pin)}>Details</Button>
          <Button size="small" disabled>Share</Button>
          <Button size="small" onClick={(evt)=>editPin(evt, pin)}>Edit</Button>
          <Button size="small" onClick={handleClickOpen}>Delete</Button>
            <Dialog
            open={deleteOpen}
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
        {/* <Puller />
      </SwipeableDrawer>
    </Root> */}
    </Container>
    </>
  )
}

export default MyPins;

