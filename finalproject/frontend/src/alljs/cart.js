import { Add, Cancel, Clear, HorizontalRule } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import BabyBack from '../image/babyback.jpeg'



function QuantityDisplay({carts,quatity,setCarts,id}){
    
return (
    <Grid container>
<Grid item xs={2} sx={{marginTop:'7px'}}>
<Typography>Quantity:</Typography>
</Grid>
<Grid item xs={2}>
<IconButton sx={{marginLeft:'50%'}}
onClick={()=>{
    let newquan=(quatity-1<1?1:quatity-1)
    carts[id].quantity=newquan
    localStorage.setItem('cartitem',JSON.stringify(carts))
    setCarts({...carts})
    }}>
    <HorizontalRule/>
</IconButton>
</Grid>
<Grid item xs={2}>
<Typography align='center' sx={{marginTop:'7px'}}>{quatity}</Typography>
</Grid>
<Grid item xs={2}>
<IconButton onClick={()=>{
    let newquan=(quatity+1)
    carts[id].quantity=newquan
    localStorage.setItem('cartitem',JSON.stringify(carts))
    setCarts({...carts})

    }}>
    <Add/>
</IconButton>
</Grid>
<Grid item xs={4}/>
</Grid>
)
}
function CartItem({carts,name,prize,id,img,quantity,setCarts}){
    
    return(
        <div>
        <Grid sx={{width:'100%'}} container>
            <Grid item xs={2}>
    <Card sx={{maxWidth:'150px'}}>
        <CardMedia image={img} sx={{height:'100px'}}/>
    </Card>
    </Grid>
    <Grid item xs={10}>
        <Grid container item xs={12}>
            <Grid xs={11} item>
            <Typography variant='h5'>{name}</Typography>
            </Grid>
            <Grid xs={1} item>
                <IconButton onClick={(e)=>{
                    delete carts[id];
                    localStorage.setItem('cartitem',JSON.stringify(carts))

                    setCarts({...carts})
                    document.location.reload()
                }}>
                    <Clear/>
                </IconButton>
            </Grid>
        </Grid>
        
        <Grid item xs={12}>
            <Typography variant='h5' sx={{color:'red'}}>৳ {prize}</Typography>
        </Grid>
        
        <Grid item xs={12}>
           <QuantityDisplay carts={carts} quatity={quantity} setCarts={setCarts} id={id}/>
        </Grid>
    </Grid>
    </Grid>
    <hr style={{width:'100%'}}></hr>
    </div>
    )
}







export default function Main(){
    const [carts,setCarts]=useState(JSON.parse(localStorage.getItem('cartitem')||"{}"));
    
    let keys=Object.keys(carts)
    let totalprice=0;
    let itemofall=[]
    


    if(keys.length>0){
        itemofall=keys.map(k=>{
            totalprice+=carts[k].prize*carts[k].quantity;
        return (<Grid item key={carts[k].id} xs={12}><CartItem carts={carts} setCarts={setCarts} name={carts[k].productname} prize={carts[k].prize} id={carts[k].id} img={carts[k].img} quantity={carts[k].quantity}/></Grid>)})
        
        return (
                <div>
            <Grid sx={{marginTop:'16px'}} container>

                {itemofall}
            </Grid>
            
            <Card sx={{position:'fixed', width:'100%',bottom:'0',left:'0',right:'0',backgroundColor:'lightcoral'}}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                    <Typography>Product Price:</Typography>
                    </Grid>
                    <Grid item xs={10}><Typography>{totalprice}</Typography></Grid>
                    <Grid item xs={2}>
                    <Typography>Delivary Cost:</Typography>
                    </Grid>
                    <Grid item xs={10}><Typography>{99}</Typography></Grid>
                    <Grid item xs={2}>
                    <Typography>Total Cost:</Typography>
                    </Grid>
                    <Grid item xs={10}><Typography>{totalprice+99}</Typography></Grid>
                    
                    </Grid>
                    <Button onClick={(e)=>{
                            if(localStorage.getItem('token')){
                                document.location="/purchase"
                            }else{
                                document.location ='/login'
                            }
                    }
                        } color='primary' variant='contained' sx={{marginLeft:'100%',transform:'translateX(-100%);'}}>Confirm</Button>

                </CardContent>
            </Card>

            </div>
        )
    }else{
        return (<div>
            <Typography sx={{marginLeft:"50%",transform:'translateX(-50%)'}} variant={"h4"}>No item added in your cart!</Typography>
        </div>)
    }
        
         
    }
