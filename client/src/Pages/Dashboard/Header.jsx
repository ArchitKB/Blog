import React from 'react';
import axios from 'axios';
import logo from '../../Components/logo.png';
import './Dashboard.css';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
  } from "@mui/icons-material";
  import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
 import { useNavigate } from "react-router-dom";
function Header({user,setUser}){
    const navigate = useNavigate();
    return (
        <div className='header' style={{backgroundColor:'#00ADB5',position:'fixed',width:'100%'}}>
        <Icon />
        <div>blogopedia</div>
        <div>
        <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
        </div>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant="standard" value="aayush">
            <Select
              value="aaus"
              sx={{
                backgroundColor: '#fffde7',
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: '#fffde7',
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value="aayush">
                <Typography>aayush</Typography>
              </MenuItem>
              <MenuItem >Log Out</MenuItem>
            </Select>
          </FormControl>
        </div>
    );
};

function Icon () {
    return( <img className="logo" src={logo} />);
}



export default Header;