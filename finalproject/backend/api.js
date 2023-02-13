const express=require('express');
const { checkauth, createUser, getfoodlist, getfooddetails, getbabysitterdetails, getbabysitteritem, uploadfood, addreview, checktoken, searchforit } = require('./database');
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
        res.json(data);
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
        let {start,end}=req.query
        if(!start||!end){
            res.json({status:'Something is missing'})
            return 
        }
        let data=await getfoodlist(start,end)
        if(data){
            res.json({status:"OK",data})
        }else{
            res.json({status:'No product found!!!'})
        }
        
    })

    r.get('/productdetails',async(req,res)=>{
        let {id}=req.query
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }

        let data=await getfooddetails(id);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No product found with this id!!!'})
        }

        
    })

    r.get('/babysitteritem',async(req,res)=>{
        let {start,end}=req.query
        if(!start||!end){
            res.json({status:'Something is missing'})
            return 
        }
        let data=await getbabysitteritem(start,end);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No babysitter found for now'})
        }
        
    })

    r.get('/babysitterdetails',async(req,res)=>{
        let {id}=req.query
        if(!id){
            res.json({status:'Something is missing'})
            return 
        }


        let data=await getbabysitterdetails(id);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'No babysitter found with this id!!!'})
        }

        
    })


   

    r.post('/addreview',async(req,res)=>{
        let {star,comment,reviewertoken,productid}=req.body
        if(!star||!comment||!reviewertoken||!productid){
            res.json({status:'Something is missing'})
            return 
        }
        let user=await checktoken(reviewertoken)
        if(user?.name){
            let data=await addreview(star,comment,user.name,productid,user.uid);
            if(data){
                res.json({status:'OK'})
            }else{
                res.json({status:'You can not submit review anymore.'})
            }
        }else{
            res.json({status:'User is not verified!'})
        }
    })
    r.post('/uploadfood',async(req,res)=>{
        let {name,img,prize,brand,pointmsg,details,username,password}=req.body
        if(!name||!img||!prize||!brand||!pointmsg||!details||!username||!password){
            res.json({status:'You missied something'})
            return 
        }
        if(username=='admin'&&password=='admin'){

        let data=await uploadfood(name,img,prize,brand,pointmsg,details)
        if(data){
            res.json({status:'OK'})
        }else{
            res.json({status:'Failed to upload'})
        }
    }else{
        res.json({status:'Wrong username or password'})
    }

    })


    r.get('/search',async(req,res)=>{
        const {q,page}=req.query
        
        if(!q||!page){
            res.json({status:'Something missing'})
            return ;
        }

        let data=await searchforit(q,+page);
        if(data){
            res.json({status:'OK',data})
        }else{
            res.json({status:'Failed to search!'})
        }

    })
  