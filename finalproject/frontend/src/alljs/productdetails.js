//get the value of p as get request parameter==done
//get product details using p value
//show some point about this product==done
//show an image of the product on top==done
//show name beside image==done
//show rating and brand name bellow the name==done
//prize==done
//quatity==done
//add to cart==done
//details bellow the image==done
//review section==

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Typography, Grid, CardMedia, Card, IconButton, Button} from '@mui/material';
import {Add, ArrowBack, HorizontalRule} from '@mui/icons-material';
import BabyBack from '../image/babyback.jpeg'
import { getfooddetails } from './AllApi';

async function loadDetails(setData,id){
    let data=await getfooddetails(id);
    console.log(data);
    setData(data);
}
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


function RightOfImage({name,rating,brand,prize}){
    
    return (
        <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'>{name}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:'10px'}}>
                            <Typography sx={{color:'blue'}}>{rating} ★ (30 ratings)</Typography>
                    </Grid>
                    <Grid item xs={12} >
                            <Typography>Brand: {brand}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <PointSection/>
                    </Grid>
                    <Grid sx={{marginTop:'20px',marginBottom:'20px'}} item xs={12} >
                        <Typography variant='h4' sx={{marginLeft:'30px'}} color="red" >৳ {prize}</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <QuantityDisplay/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth sx={{marginTop:'20px',marginRight:'30px'}} variant="contained">Add To Cart</Button>
                    </Grid>
                </Grid>
    )
}

function PointSection(){
    return (<ul>
        {(()=>{
            let da=[]
            for(let i=0;i<5;i++){
                da.push("This product is good.")
            }


            let res=[]
            for(let i=0;i<da.length;i++){
                res.push(<li key={"key"+i}><Typography>{da[i]}</Typography></li>)
            }
            return res;
        })()}
        
    </ul>);
}

function Upperside({img,rating,name,review,prize}){
    return (
        <div style={{margin:'30px'}}>
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <Card sx={{maxWidth:'100%'}}>
                    <CardMedia 
                    sx={{ height: '430px' }}
                    image={img}
                    />
                    
                </Card>
            </Grid>
            <Grid item xs={6}>
                <RightOfImage rating={rating}name={name}review={review} prize={prize}/>
            </Grid>
        
        </Grid>
        </div>
        )
}
function ReviewItem({rating,name,review}){
    return (
    <div style={{marginTop:'10px'}}>
        <Grid container>
            <Grid item xs={12}>
               
                <Typography sx={{color:'red'}}>{(()=>{
                    let star=rating;
                    let res=""
                    for(let i=0;i<star;i++){
                        res+="★ "
                    }
                    return res;
                })()}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>by <b>{name}</b></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{margin:'10px'}}>{review}</Typography>
            </Grid>
        </Grid>
    </div>)
}
function ReviewSection(){
    let d=[]
    for (let i=0;i<10;i++){
        d.push(<ReviewItem key={"key"+i} name="Someone Reviewer" rating={i%5==0?1:i%5}
        review={"This product is realy good.I have been using it since my child birt."}/>)
    }
    return (<div style={{margin:50}}>
        {d}
    </div>)

}

export default function Main(){
    const [data,setData]=useState(undefined)
    const up = new URLSearchParams(document.location.search);
    const pid=up.get('p');
    if(!pid){
        document.location='/productnotfound';
        return <h1>Sorry...</h1>
    }

    if(!data){
        loadDetails(setData,pid);
        console.log(data);
    }
    return (
        <div>
            <Upperside img={data?.img||''} rating={data?.rating||''} name={data?.name||''} review={data?.review||'' } prize={data?.prize||""} />
            <hr style={{marginTop:'60px'}}></hr>
            <Typography style={{margin:'30px'}} fullWidth>BAUET started its journey when the Honorable Prime Minister of the People's Republic of Bangladesh, Sheikh Hasina planned to establish institutions of higher learning governed by the armed forces (primarily, the army) in the rural areas of Bangladesh to impart quality tertiary education within reasonable cost. As planned, the Prime Minister gave necessary directions to initiate the establishment of three universities in Saidpur, Natore and Cumilla. Accordingly, the foundation plaque of BAUET was unveiled on 15 August 2014 by Zunaid Ahmed Palak, the Member of Parliament (MP) from Natore-3 constituency and Minister of State for Information and Communication Technology Division, Bangladesh.</Typography>
            <hr style={{marginTop:'60px'}}></hr>
            <ReviewSection pid={pid}/>
        </div>
)
    
    
    }