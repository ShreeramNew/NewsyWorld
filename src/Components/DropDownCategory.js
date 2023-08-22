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
    contextValue[1](event.currentTarget.id)
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
      Categories
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
        <MenuItem onClick={handleClose} id="business">Business</MenuItem>
        <MenuItem onClick={handleClose} id="entertainment">Entertainment</MenuItem>
        <MenuItem onClick={handleClose} id="general">General</MenuItem>
        <MenuItem onClick={handleClose} id="health">Health</MenuItem>
        <MenuItem onClick={handleClose} id="science">Science</MenuItem>
        <MenuItem onClick={handleClose} id="sports">Sports</MenuItem>
        <MenuItem onClick={handleClose} id="technology">Technology</MenuItem>

      </Menu>
    </div>
  );
}