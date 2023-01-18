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