import React, { useState, useRef, useCallback, useEffect } from "react";
import {Marker} from 'react-map-gl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Typography, Button, Dialog} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { makeStyles } from '@mui/styles';
import pinimg from './pinimg.png'
import Geocode from "react-geocode";
import { css } from "@emotion/react";
import RingLoader from 'react-spinners/RingLoader'
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

const override = css`
  display: flex;
  border-color: #971d1d;
`;
    function Pins(props) {
      const [coordinate,setCoordinate] = useState([]);
      Geocode.setApiKey("AIzaSyD7vSdUKsQRZcZ6tfi7EPFXuiDWSWtLZ7A");
      Geocode.setLanguage("zh-TW");
      Geocode.setLocationType("ROOFTOP");
      Geocode.enableDebug();
      const Getcoordinate = (address)=>{
        Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              let tempcoordinate = [];
              tempcoordinate.push(lat);
              tempcoordinate.push(lng);
              setCoordinate(tempcoordinate)
              console.log(coordinate)
              console.log(tempcoordinate)
            },
            (error) => {
              console.error(error);
            }
        );
    }
    const {info} = props;
    console.log(info);
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      const loadData = async () => {
        await new Promise((r) => setTimeout(r, 2000))
        setLoading((loading) => !loading)
      }
      Getcoordinate(info.address)
      loadData()
    },[])
    return loading ? (
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <RingLoader color="#971d1d" css={override} size={100} />
      </div>) :(
      <>
        <Marker  longitude={coordinate[1]} latitude={coordinate[0]}>
        <img 
          onClick={() => handleOpen(info.id)}
          src={pinimg} height="40" width="40"
          alt =""
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
        <DialogContent>
          <Typography variant="body2" className={classes.wrapIcon}>
            <PlaceIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.type}
          </Typography><br/>
          <Typography variant="body2" className={classes.wrapIcon}>
            <DateRangeIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.cost}
          </Typography><br/>
          <Typography variant="body2" className={classes.wrapIcon}>
            <ArrowForwardOutlinedIcon fontSize="small" color="disabled" style={{marginRight: "6px"}}/>
            {info.address}
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