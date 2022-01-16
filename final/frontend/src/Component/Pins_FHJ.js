import React, { useState, useRef, useCallback, useEffect } from "react";
import {Marker} from 'react-map-gl';
import pinimg from '../img/pin.png'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Typography, Button, Dialog} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { makeStyles } from '@mui/styles';

const SIZE=50
const useStyles = makeStyles(theme => ({
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex'
  },
  customizeToolbar: {
    minHeight: 40,
    width: '100%', 
  }
}));


function Pins(props) {
    const {info} = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
      <>
        <Marker key={info.id} longitude={info.longitude} latitude={info.latitude}>
        <img 
          onClick={() => handleOpen(info.id)}
          src={pinimg} height="40" width="40"
          style={{
          cursor: 'pointer',
          fill: '#d00',
          stroke: 'none',
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
        }}></img>
        </Marker>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold' }}>
          {info.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" className={classes.wrapIcon}>
            <PlaceIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.locations}
          </Typography><br/>
          <Typography variant="body2" className={classes.wrapIcon}>
            <DateRangeIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.time}
          </Typography><br/>
          <Typography variant="body2" className={classes.wrapIcon}>
            <ArrowForwardOutlinedIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.game}
          </Typography><br/>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
    )
}    
export default React.memo(Pins);