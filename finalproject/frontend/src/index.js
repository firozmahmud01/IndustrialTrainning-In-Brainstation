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
import RatingPage from './alljs/rating'
import ProducttrackingPage from './alljs/producttracking'
import NotFound from './alljs/NotFound'
import AdminUpload from './alljs/adminupload'
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material'
import IconImage from './image/icon.png'
import {ShoppingCart} from '@mui/icons-material';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
        
        <ShoppingCart color='secondary'/>
        
      </IconButton>

      {(()=>{
        if(!localStorage.getItem('token')){
          return <Button onClick={()=>document.location="/login"} color="inherit" style={{marginLeft:'12px'}}>Login</Button>
      }
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
  <Route path='/worker/login' element={<WorkerLoginPage/>}>

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
  <Route path='/product-tracking' element={<ProducttrackingPage></ProducttrackingPage>}>

  </Route>
  
  <Route path="*" element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  </div>
);
