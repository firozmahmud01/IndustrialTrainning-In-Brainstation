//icon,name,cart and login on the top==done
//search with image background==done
//little details about baby food==done
//small list of food website supply==done
//tab system with babysitter profile details==done
//footer==done

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import SearchBack from '../image/searchback.jpeg'
import {InputAdornment, TextField, Typography,Button, Grid, Card, CardMedia, CardContent, IconButton, Fab, Skeleton} from '@mui/material';
import {ArrowBack, ArrowForward, ArrowLeft, Facebook, Google, Search, SettingsSystemDaydreamTwoTone, Twitter, YouTube} from '@mui/icons-material';
import BabyBack from '../image/babyback.jpeg'
import { getbabysitteritem, getfoodlist } from './AllApi';

function SearchBar(){
    const [search,setSearch]=useState('')
    const dosearch=()=>{document.location='/product?q='+search}
    return (
        <div style={{position:'relative',
        boxShadow: '0 0 8px 8px white inset'
        ,width:'100%' ,height:'300px'
        }} >
            <Card sx={{maxWidth:'100%',opacity:0.5}}>
                <CardMedia 
                sx={{height:'300px'}}
                image={SearchBack}/>
            </Card>
            
            
        <Typography variant='h3' 
        style={{
            position:'absolute',
            marginLeft:'15%',
            top:'10px'
        }}
        >Search the best food<br></br>for your baby</Typography>
<div style={{position:'absolute',
        left:'0',
        right:'0',
        margin:'auto',
        width:"70%",
        top:'50%',
        display:'block'
        
    }}>
        <Grid container spacing={1}>
            <Grid item xs={10}>
                <TextField placeholder='Type here'
                onKeyDown={(e)=>{
                    if(e.key=='Enter'){
                        dosearch();
                    }
                }}
                onChange={(e)=>{setSearch(e.target.value)}} value={search}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      </Grid>
<Grid item xs={2}>
    <Button variant='outlined' style={{
        height:'88%',
        position:'absolute',
        top:'4px',
        margin:'auto'
}} onClick={dosearch}>Search</Button>
</Grid>
</Grid>
</div>
            
        </div>
    )
}

function BabyFoodDetails(){
return (
    <div style={{
        
        
        margin:'50px'
    }}>
        <Typography  variant='h3'>Make your baby laugh</Typography>
        <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
            <Grid item xs={6}>
        <ul>
            <li>unsweetened porridge or lower-sugar cereal mixed with whole milk and topped with fruit, such as mashed ripe pear or banana</li>
            <li>wholewheat biscuit cereal (choose lower-sugar options) with whole milk and fruit</li>
            <li>lower-sugar breakfast cereal and unsweetened stewed apple with plain, unsweetened yoghurt</li>
            <li>toast fingers with mashed banana and smooth peanut butter (if possible, choose unsalted and no added sugar varieties)</li>
            <li>toast fingers with a hard-boiled egg and slices of tomato, banana or ripe peach</li>
            <li>toast or muffin fingers with scrambled egg and slices of tomato</li>
        </ul>
        </Grid>
        <Grid item xs={6}>
            <img style={{width:'100%'}} src={BabyBack}></img>
        </Grid>
        </Grid>
    </div>
);
}
function BabyFoodItemSkelton(){
    let d=[]
    for(let i=0;i<8;i++){
        d.push(<Grid item key={"uid"+i} xs={3}>
            
            <Card 
         sx={{ maxWidth: 200,cursor: 'pointer' }}>
            
<CardContent>

    <Grid container>
    <Grid item xs={12}>
        <Skeleton sx={{width:"100%",height:130}} animation="wave"/>
    </Grid>
        <Grid item xs={12}>
        <Skeleton sx={{width:100,height:50}} animation="wave"/>
    </Grid>
    <Grid item xs={6}>
    <Skeleton sx={{width:50}} animation="wave"/>
    </Grid>
    
    </Grid>
</CardContent>
        </Card>
        </Grid>)
    }
    return d;
}
function BabyFoodItem({id,name,prize,rating,img}){
    
    return(
        <Card onClick={()=>{document.location="/product/details?p="+id}}
         sx={{ maxWidth: 250,cursor: 'pointer' }}>
            <CardMedia
            sx={{ height: 130 }}
            image={img}
            title="name"
            
            />
<CardContent>
    <Grid container>
        <Grid item xs={12}>
    <Typography variant='h6'>{name}</Typography>
    </Grid>
    <Grid item xs={6}>
    <Typography variant='body2'>{prize} ৳</Typography>
    </Grid>
    <Grid xs={6} item>
        <Typography sx={{textAlign:'right'}}>{rating} ★</Typography>
    </Grid>
    </Grid>
</CardContent>
        </Card>
    )
}
async function foodloader(setData){
    let data=await getfoodlist(0,8);
    let d=[]
    for(let i=0;i<data.length;i++){
        d.push(<Grid item key={data[i].id} xs={3}>
            <BabyFoodItem id={data[i].id} name={data[i].name}
        rating={data[i].rating} prize={data[i].prize} img={data[i].img}/></Grid>);
    }
    setData(d);
}
function BabyFoodList(){
    const [data,setData]=useState(undefined);
    if(!data){
        foodloader(setData);
    }
return (
    <div style={{margin:"40px"}}>
        <Grid container >
            <Grid item xs={6}>
        <Typography variant='h5' sx={{marginBottom:'30px'}}>Child Acssosories:</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography onClick={()=>{document.location="/product"}} color="blueviolet" style={{textAlign:'right' ,cursor:'pointer'}}>See More</Typography>
        </Grid>
        <Grid item xs={12} container spacing={3}>
        {data==undefined?(<BabyFoodItemSkelton/>):data}
        </Grid>
        </Grid>
    </div>
)

}

function SitterItem({id,name,profilepic,education,experience,age,gender}){
    
    return (
        <div name='scarditem' style={{
        width:'100%',
        position:'absolute',
        top:0,
        left:0,
        transition: 'transform 1s',
        border:'2px solid red'
        }}>
                    <img style={{width:'20%',margin:'30px'}} src={profilepic}/>
            <Grid container>
                <Grid item xs={6} container>
                    <Grid item container sx={{marginLeft:'30px'}}>
                        <Grid item xs={4}>
                            <Typography variant='h6' sx={{fontWeight:'bold'}}>Name:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='h6' >{name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' sx={{fontWeight:'bold'}}>Experience:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='h6' >{experience} {experience<=1?"year":'years'}</Typography>

                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' sx={{fontWeight:'bold'}}>Education:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='h6' >{education}</Typography>
                            
                        </Grid>
                        
                    </Grid>
                </Grid>
                <Grid xs={6} item container>
                    <Grid item xs={3}>
                        <Typography variant='h6' sx={{fontWeight:'bold'}}>Age:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='h6' >{age}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h6' sx={{fontWeight:'bold'}}>Gender:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant='h6' >{gender}</Typography>
                    </Grid>
                </Grid>
<Grid item xs={12}>
    <div style={{margin:'30px'}}>
                 <Button variant='contained' sx={{marginLeft:'100%',
                transform:'translate(-100%)'}}
                // onClick={()=>{document.location="/babysitter/details?q="+id}}
                >Details</Button> 
                </div>
                </Grid>
            </Grid>
        </div>
    )
}
async function loadBabySitterList(setData){
    let data=await getbabysitteritem(0,5);
    let d=[]
    for(let i=0;i<data.length;i++){
        d.push(<SitterItem key={data[i].id} id={data[i].id} name={data[i].name} profilepic={data[i].profilepic} education={data[i].education} experience={data[i].experience} age={data[i].age} gender={data[i].gender}/>)
    }
    setData(<div style={{position:'relative'}}>{d}</div>)

}

function BabySitterList(){
    let curSlide=0;
    const [data,setData]=useState(undefined)
    if(!data){
        loadBabySitterList(setData)
    }
    useEffect(()=>{
        goToSlide(0)
    })
return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <Typography variant='h5' sx={{margin:'40px'}}>Babysitter:</Typography>
        </Grid>
        <Grid item xs={1}>
            <Fab onClick={()=>{
    if (curSlide === 0) {
        const slides = document.getElementsByName('scarditem'); 
      curSlide = slides.length - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    
  }}
            color='primary' sx={{marginLeft:'50%',transform:'translate(-50%)',marginTop:'270%'}}>
                <ArrowBack/>
            </Fab>
        </Grid>
        <Grid item xs={10}>
            { (()=>{
                if(data)return data;
                return (<Skeleton animation="wave"> 
                <SitterItem id='uid' name="Someone" profilepic={BabyBack} education="HSC" experience={10} age={20} gender='Female'/>
             </Skeleton>) })()}
        </Grid>
        <Grid item xs={1}>
            <Fab color='primary' sx={{
                marginLeft:'50%',transform:'translate(-50%)',
                marginTop:'270%'}}
                onClick={()=>{
                    const slides = document.getElementsByName('scarditem'); 
                    if (curSlide === slides.length - 1) {
                      curSlide = 0;
                    } else {
                      curSlide++;
                    }
                
                    goToSlide(curSlide);
                    
                  }}>
                <ArrowForward/>
            </Fab>

        </Grid>

        
        
        
    </Grid>
)
}
function goToSlide(slide) {
    
    const slides = document.getElementsByName('scarditem');  
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${150 * (i - slide)}%)`)
    );
  };




function Footer(){
return (<div style={{display:'block',marginTop:'300px',width:'100%',height:'200px',backgroundColor:'black',position:'relative'}}>
    <div style={{display:'block',top:'50%',position:'absolute',marginLeft:'50%',transform:'translate(-50%,-50%)'}}>
        <Typography variant='h4' sx={{color:'white'}} textAlign="center">Kiddie Corner</Typography>
        <Typography variant='body2' sx={{color:'white'}} textAlign='center'>This website is about<br></br>children food.</Typography>
        <Grid container >
            <Grid item xs={3}>
            <IconButton>
                <Facebook sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <YouTube sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <Google sx={{color:'white'}}/>
            </IconButton>
            </Grid>
            <Grid item xs={3}>
            <IconButton>
                <Twitter sx={{color:'white'}}/>
            </IconButton>
            </Grid>
        </Grid>
    </div>
    <Typography sx={{color:'white',bottom:'15px',left:'15px' ,position:'absolute'}}>Copyright @2023 <a style={{color:'white'}} href="https://bauet.ac.bd/">BAUET</a></Typography>
</div>)
}

export default function Main(){
    return (
        <div>
            <SearchBar/>
            <BabyFoodDetails/>
            <BabyFoodList/>
            <BabySitterList/>
            <Footer/>
        </div>
        )
    }