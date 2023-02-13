

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Typography, Grid, CardMedia, Card, IconButton, Button, FormControl, Rating, FormHelperText, TextField, cardActionAreaClasses} from '@mui/material';
import {Add, ArrowBack, HorizontalRule} from '@mui/icons-material';
import BabyBack from '../image/babyback.jpeg'
import { getfooddetails, hostname, submitProductReview } from './AllApi';
import { cartitem } from './ClassList';

async function loadDetails(setData,id){
    let data=await getfooddetails(id);
    
    setData(data);
}
function QuantityDisplay({quantity,setQuantity}){
    
return (
    <Grid container>
<Grid item xs={2} sx={{marginTop:'7px'}}>
<Typography>Quantity:</Typography>
</Grid>
<Grid item xs={2}>
<IconButton sx={{marginLeft:'50%'}}
onClick={()=>setQuantity(quantity-1<1?1:quantity-1)}>
    <HorizontalRule/>
</IconButton>
</Grid>
<Grid item xs={2}>
<Typography align='center' sx={{marginTop:'7px'}}>{quantity}</Typography>
</Grid>
<Grid item xs={2}>
<IconButton onClick={()=>setQuantity(quantity+1)}>
    <Add/>
</IconButton>
</Grid>
<Grid item xs={4}/>
</Grid>
)
}


function RightOfImage({id,img,name,rating,brand,prize,pointmsg,review}){
    const [quantity,setQuantity]=useState(1)
    console.log(quantity)
    return (
        <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'>{name}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop:'10px'}}>
                            <Typography sx={{color:'blue'}}>{rating} ★ ({review?.length} ratings)</Typography>
                    </Grid>
                    <Grid item xs={12} >
                            <Typography>Brand: {brand}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <PointSection pointmsg={pointmsg}/>
                    </Grid>
                    <Grid sx={{marginTop:'20px',marginBottom:'20px'}} item xs={12} >
                        <Typography variant='h4' sx={{marginLeft:'30px'}} color="red" >৳ {prize}</Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <QuantityDisplay quantity={quantity} setQuantity={setQuantity}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={(e)=>{
                            let cart=new cartitem(id,name,prize,quantity,img)
                            let allitem=JSON.parse(localStorage.getItem('cartitem')||"{}")
                            allitem[id]=cart
                            localStorage.setItem('cartitem',JSON.stringify(allitem))
                            alert("This item add to your cart successfully!")
                            document.location='/';
                        }}
                         sx={{marginTop:'20px',marginRight:'30px'}} variant="contained">Add To Cart</Button>
                    </Grid>
                </Grid>
    )
}

function PointSection({pointmsg}){
    return (<ul>
        {(()=>{
            let da=pointmsg.split(',')


            let res=[]
            for(let i=0;i<da.length;i++){
                res.push(<li key={"key"+i}><Typography>{da[i]}</Typography></li>)
            }
            return res;
        })()}
        
    </ul>);
}

function Upperside({id,img,rating,name,review,prize,pointmsg,brand}){
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
                <RightOfImage img={img} id={id} rating={rating} name={name} review={review} prize={prize} brand={brand} pointmsg={pointmsg}/>
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
function ReviewSection({reviews}){
    
    let d=[]
    for (let i=0;i<reviews.length;i++){
        let review=reviews[i]
        d.push(<ReviewItem key={review.id} name={review.reviewername} rating={review.rating}
        review={review.review}/>)
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
        return <h1></h1>
    }
    return (
        <div>
            <Upperside id={data?.id||0} img={(data?.img)?hostname+'/images/'+data?.img:''} review={data?.reviews||[]} rating={data?.rating||'0'} brand={data?.brand||''} name={data?.name||''} prize={data?.prize||""} pointmsg={data?.pointmsg||''}/>
            <hr style={{marginTop:'60px'}}></hr>
            <Typography style={{margin:'30px'}} fullWidth>{data?.details}</Typography>
            <hr style={{marginTop:'60px'}}></hr>
            <SimpleRating productid={pid}/>
            {(()=>{
                if(data?.reviews&&data?.reviews.length>0){
                    return <ReviewSection pid={pid} reviews={data?.reviews||[]}/>
                }
            })()}
            
        </div>
)
    
    
    }



    function SimpleRating({productid}) {
        const [starValue, setStarValue] = useState(0);
        const [starError, setStarError] = useState(false);
        const [starHelperText, setStarHelperText] = useState('');
        const [commentValue, setCommentValue] =useState('');
        const [commentError, setCommentError] =useState(false);
        const [commentHelperText, setCommentHelperText] =useState('');
        
      
        
        const handleStar = (event, newValue) => {
            
          if (newValue === 0) {
            setStarError(true);
            setStarHelperText("Please select at least one star");
          } else {
            setStarError(false);
            setStarHelperText("");
            setStarValue(newValue);
          }
        };
      
        const handleSubmit = async (event) => {
          event.preventDefault();
          if (starValue === 0) {
            setStarError(true);
            setStarHelperText("Please select at least one star");
          }
          if (commentValue.length < 5) {
            setCommentError(true);
            setCommentHelperText("Comment should be at least 5 characters long");
          }
          if (starValue !== 0 && commentValue.length >= 10) {
            
            console.log("Star rating: ", starValue);
            console.log("Comment: ", commentValue);
            let data=await submitProductReview(starValue,commentValue,productid);
            if(data.status=='OK'){
                document.location.reload();
            }else{
                alert(data.status)
            }
          }
        };
      
        const handleEnter = event => {
          if (event.key === 'Enter') {
            handleSubmit(event);
          }
        };
      
        return (
            <div style={{margin:'32px'}}>
                <Typography sx={{marginBottom:'10px'}} variant="h5">Submit your review:</Typography>
          <form onSubmit={handleSubmit}>
            <div >
              <FormControl error={starError}>
                <Rating
                  name="simple-controlled"
                  value={starValue}
                  onChange={handleStar}
                />
                <FormHelperText>{starHelperText}</FormHelperText>
        </FormControl>
      </div>
      
      <FormControl sx={{width:'80%',marginTop:'20px'}} error={commentError}>
        <TextField
          id="outlined-multiline-static"
          label="Type here"
          multiline
          
          rows={4}
          variant="outlined"
          value={commentValue}
          onChange={(e)=>{
            setCommentValue(e.target.value)
          }}
          onKeyPress={handleEnter}
          helperText={commentHelperText}
        />
      </FormControl>
      <Button variant="contained" sx={{marginLeft:'10px',marginTop:'20px'}} color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
    </div>
  );
}
