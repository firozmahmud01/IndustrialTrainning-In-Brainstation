import { Add, HorizontalRule } from '@mui/icons-material';
import { Card, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import BabyBack from '../image/babyback.jpeg'
function QuantityDisplay(){
    const [quatity,setQuantity]=useState(1);
return (
    <Grid container>
<Grid item xs={2} sx={{marginTop:'7px'}}>
<Typography>Quantity:</Typography>
</Grid>
<Grid item xs={2}>
<IconButton sx={{marginLeft:'50%'}}
onClick={()=>setQuantity(quatity-1<1?1:quatity-1)}>
    <HorizontalRule/>
</IconButton>
</Grid>
<Grid item xs={2}>
<Typography align='center' sx={{marginTop:'7px'}}>{quatity}</Typography>
</Grid>
<Grid item xs={2}>
<IconButton onClick={()=>setQuantity(quatity+1)}>
    <Add/>
</IconButton>
</Grid>
<Grid item xs={4}/>
</Grid>
)
}
function CartItem({name,prize,id}){
    return(
        <Grid container>
            <Grid item xs={2}>
    <Card sx={{maxWidth:'150px'}}>
        <CardMedia image={BabyBack} sx={{height:'100px'}}/>
    </Card>
    </Grid>
    <Grid item xs={10}>
        <Grid item xs={12}>
            <Typography variant='h5'>{name}</Typography>
        </Grid>
        
        <Grid item xs={12}>
            <Typography variant='h5' sx={{color:'red'}}>৳ {prize}</Typography>
        </Grid>
        
        <Grid item xs={12}>
           <QuantityDisplay/>
        </Grid>
    </Grid>
    </Grid>
    )
}
export default function Main(){
    let d=[]
    for(let i=0;i<10;i++){
        d.push(<div style={{margin:40}}>
            <CartItem name="Product Name" prize={2000}/>
        </div>)
    }
    return (
        <div>
        {d}
        </div>
        )
    }
