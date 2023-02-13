const { productitem, productdetails, reviewitem, babysitteritem, babysitterdetails } = require("./ClassList");
const fakeimage='http://admission.bauet.ac.bd/img/logo.png';
const Toy =require( '../image/tmpimage/toy.jpeg')
const Chair =require( '../image/tmpimage/chair.jpeg')
const Dipars =require( '../image/tmpimage/dipars.jpeg')
const Dol =require( '../image/tmpimage/dol.png')
const Dress =require( '../image/tmpimage/dress.jpeg')
const Food =require( '../image/tmpimage/food.jpeg')
const Junglebook =require( '../image/tmpimage/junglebook.jpeg')
const Meril =require( '../image/tmpimage/merilbabylotion.jpg')
const Baby1 =require( '../image/tmpimage/baby1.jpeg')
const Baby2 =require( '../image/tmpimage/baby2.jpeg')
const Baby3 =require( '../image/tmpimage/baby3.jpeg')
const Baby4 =require( '../image/tmpimage/baby4.jpeg')
const Baby5 =require( '../image/tmpimage/baby5.jpeg')



const hostname='http://localhost:8080';

exports.hostname=hostname;


exports.uploadbabyfood=async(da,setIsLoading)=>{
    da.username=prompt("Input Admin's Username:")
    da.password=prompt('Input Admin\'s Password:');
        const res = await fetch(hostname+'/api/uploadfood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(da),
        });
        if (!res.ok) throw new Error(res.statusText);
        setIsLoading(false);
        let data=await res.json();
        if(data?.status||0=='OK'){
            document.location='/';
        }else{
            alert(data.status)
        }
      
}


exports.getfoodlist=async(start,end)=>{
    
    
    let res=await fetch(hostname+'/api/foodlist?start='+start+"&end="+end);
    
    let r=await res.json()
    if((r?.data?.length||0)>0){
        return r.data
    }

    return [];
    
}

exports.loginuser=async(email,password)=>{
    let res=await fetch(hostname+'/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return await res.json();
}
exports.signupuser=async(email, password, name, phone)=>{
    let res=await fetch(hostname+'/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone }),
    });
    return await res.json();
}

exports.getfooddetails=async(productid)=>{


let r=await fetch (hostname+'/api/productdetails?id='+productid)
let data=await r.json()
if(data.status=='OK'){
    return data.data
}else{
    return 'Something went wrong'
}

}


exports.getbabysitteritem=async(start,end)=>{


    let res=await fetch (hostname+'/api/babysitteritem?start='+start+"&end="+end)
    let da=await res.json();
    if(da.status=="OK"){
        return da.data
    }
    return []
}



exports.getbabysitterdetails=async(id)=>{
    
    let res=await fetch(hostname+'/api/babysitterdetails?id='+id)
    let d=await res.json()
    if(d.status=='OK'){
        return d.data;
    }
    
}


exports.getsearch=async(q,page)=>{
    const apiUrl = `/api/search?q=${q}&page=${page}`;
    let res= await fetch(hostname+apiUrl)
    let d=await res.json()
    if(d.status=='OK'){
        return d.data
    }else {
        alert(d.status)
    }

}


exports.submitProductReview=async (star,comment,productid)=>{
    if(!localStorage.getItem('token')){
        alert('Login first.');
        return ;
    }
    let res=await fetch(hostname+'/api/addreview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ star, comment ,reviewertoken:localStorage.getItem('token'),productid}),
    });
    return await res.json();
}