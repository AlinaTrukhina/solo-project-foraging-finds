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
import Typography from '@mui/material/Typography';

function MyPins() {
    // declare hooks here
    const dispatch = useDispatch();

    // fetch pins added by logged in user
    useEffect(() => {
        
    }, []);

    return (
        // render pins in a list of Material UI cards
        <>
        </>
    )
}

export default MyPins;