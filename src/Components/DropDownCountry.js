import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { CategoryContext } from '../Context/Category';
import { useContext } from 'react';

export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const contextValue=useContext(CategoryContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);

    contextValue[3](event.currentTarget.id!==""?event.currentTarget.id:"us")
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color:'rgb(14, 50, 155)',
          textAlign:'center',
          paddingTop:'9px',
          textTransform:'capitalize',
          fontSize:'1.1rem',
          fontWeight:'initial'
        }
          
        }
      >
      Country
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose} id="us">USA</MenuItem>
        <MenuItem onClick={handleClose} id="in">India</MenuItem>
        <MenuItem onClick={handleClose} id="ae">UAE</MenuItem>
        <MenuItem onClick={handleClose} id="au">Australia</MenuItem>
        <MenuItem onClick={handleClose} id="ca">Canada</MenuItem>
        <MenuItem onClick={handleClose} id="cn">China</MenuItem>
        <MenuItem onClick={handleClose} id="sg">Singapore</MenuItem>
        <MenuItem onClick={handleClose} id="jp">Japan</MenuItem>
        <MenuItem onClick={handleClose} id="it">Italy</MenuItem>



      </Menu>
    </div>
  );
}

