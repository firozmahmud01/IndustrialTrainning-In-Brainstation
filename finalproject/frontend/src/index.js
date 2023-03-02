import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

//all file should be linked here with a path
import Homepage from './alljs/homepage'
import WorkerProfilePage from './alljs/workerprofile'
import WorkerLoginPage from './alljs/workerlogin'
import ProductPage from './alljs/product'
import LoginPage from './alljs/login'
import SignupPage from './alljs/signuppage'
import BabysitterPage from './alljs/babysitter'
import ProductdetailsPage from './alljs/productdetails'
import BabysitterDetailsPage from './alljs/babysitterdetails'
import CartPage from './alljs/cart'
import PurchasePage from './alljs/purchase'
import OrderList from './alljs/orderlist'
import RatingPage from './alljs/rating'
import NotFound from './alljs/NotFound'
import AdminUpload from './alljs/adminupload'
import {AppBar, Avatar, Badge, Button, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import IconImage from './image/icon.png'
import {Logout, Settings, ShoppingCart} from '@mui/icons-material';
import { purple } from '@mui/material/colors';

const root = ReactDOM.createRoot(document.getElementById('root'));

function AvatarFunction(){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
    <IconButton
    onClick={handleClick}
    size="small"
    sx={{ ml: 2 }}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
  >
  <Avatar color="primary" sx={{ bgcolor: purple[500] }}>{(()=>{let x='';let name=localStorage.getItem('user').split(' ');for(let i=0;i<name.length&&i<2;i++){x+=name[i][0]}return x;})()}</Avatar>
  </IconButton>

<Menu
  anchorEl={anchorEl}
  id="account-menu"
  open={open}
  onClose={handleClose}
  onClick={handleClose}
  PaperProps={{
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  }}
  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>

  <MenuItem onClick={()=>{handleClose();localStorage.removeItem('token');localStorage.removeItem('user');document.location.reload()}}>
    <ListItemIcon>
      <Logout fontSize="small" />
    </ListItemIcon>
    Logout
  </MenuItem>
</Menu>
</div>

  )



}


root.render(
<div>
<div>
  <AppBar position="static">
    <Toolbar >
      <IconButton onClick={()=>document.location='/'}>
        <img style={{height:'50px',marginTop:'5px',marginBottom:'5px'}} src={IconImage}></img>
      </IconButton>
      
      <Typography sx={{cursor: 'pointer' }} onClick={()=>document.location='/'} variant='h6' color={"inherit"}>Kiddie Corner</Typography>

      <IconButton onClick={()=>document.location='/cart'} edge="end" style={{marginLeft:'auto'}}>
      <Badge color='success' badgeContent={Object.keys(JSON.parse(localStorage.getItem('cartitem')||"{}")).length}>
        
        <ShoppingCart color='secondary'/>
        
      </Badge>
      </IconButton>
      {(()=>{
        if(!localStorage.getItem('token')){
          return <Button onClick={()=>document.location="/login"} color="inherit" style={{marginLeft:'12px'}}>Login</Button>
      }else {
        return (<AvatarFunction/>)
      }})()}
      {(()=>{
        if(localStorage.getItem('user'))return <Typography>Welcome back {localStorage.getItem('user')}</Typography>
      })()}
    </Toolbar>
  </AppBar>
</div>

  <BrowserRouter>

  <Routes>
  <Route path='/login' element={<LoginPage></LoginPage>}>
  </Route>

  <Route path='/signup' element={<SignupPage></SignupPage>}>
  </Route>


  <Route path='/' element={<Homepage></Homepage>}>

  </Route>
  <Route path='/worker/profile' element={<WorkerProfilePage />}>

  </Route>
  <Route path='/worker/create' element={<WorkerLoginPage/>}>

  </Route>
  <Route path='/product' element={<ProductPage></ProductPage>}>

  </Route>
  <Route path='/babysitter' element={<BabysitterPage></BabysitterPage>}>

  </Route>
  <Route path='/product/details' element={<ProductdetailsPage></ProductdetailsPage>}>

  </Route>
  <Route path='/babysitter/details' element={<BabysitterDetailsPage></BabysitterDetailsPage>}>

  </Route>
  <Route path='/cart' element={<CartPage></CartPage>}>
    
  </Route>
  <Route path='/purchase' element={<PurchasePage></PurchasePage>}>

  </Route>
  <Route path='/rating' element={<RatingPage></RatingPage>}>

  </Route>
  
  <Route path='/admin/upload' element={<AdminUpload/>}>

  </Route>
  <Route path='/admin/orderlist' element={<OrderList/>}>

  </Route>
  
  <Route path="*" element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  </div>
);
