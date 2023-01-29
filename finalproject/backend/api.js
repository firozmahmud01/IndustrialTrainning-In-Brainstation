const express=require('express');
const { checkauth, createUser } = require('./database');
const r=express.Router()
module.exports= r;


r.post('/login',async(req,res)=>{
    let {email,password}=req.body;
    if(!email||!password){
        res.json({status:"Failed to get data."})
        return ;
    }

    let data=await checkauth(email,password);
    if(data){
        res.json({token:data});
    }else{
        res.json({status:"Wrong email or password."});
    }

})
r.post('/signup',async(req,res)=>{
    let {email,password,name,phone}=req.body;
    if(!email||!password||!name||!phone){
        res.json({status:"Failed to get data."})
        return ;
    }

    let data=await createUser(name,email,password,phone);
    if(data=='OK'){
        res.json({status:data,message:'You can now login with your data'});
    }else{
        res.json({status:data});
    }
})


    r.get('/foodlist',async(req,res)=>{
        let {start,end}=req.params
        if(!start||!end){
            res.json({status:'Something is missing'})
            return 
        }

        
    })

    r.get('/productdetails',async(req,res)=>{
        let {id}=req.params
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }

        
    })

    r.get('/babysitteritem',async(req,res)=>{
        let {start,end}=req.params
        if(!start||end){
            res.json({status:'Something is missing'})
            return 
        }

        
    })

    r.get('/babysitterdetails',async(req,res)=>{
        let {id}=req.params
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }

        
    })


    r.get('/search',async(req,res)=>{
        let {q}=req.params
        if(!q){
            res.json({status:'Something is missing'})
            return 
        }

        
    })

    r.post('/search',async(req,res)=>{
        let {star,comment,reviewertoken}=req.body
        if(!star||!comment||!reviewertoken){
            res.json({status:'Something is missing'})
            return 
        }

        
    })