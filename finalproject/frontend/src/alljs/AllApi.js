const { productitem, productdetails, reviewitem, babysitteritem, babysitterdetails } = require("./ClassList")

const fakeimage='http://admission.bauet.ac.bd/img/logo.png'
exports.getfoodlist=async(start,end,filter)=>{
    let data={'start':start,'end':end,'filter':filter}
    
    //for now fixed data
    let res=[]
    for(let i=0;i<end-start;i++){
        let d=new productitem('id'+i,'Temp Product',
fakeimage,
        120,3.2,'Baby Brand')
        res.push(d);
    }
    return res;
}

exports.getfooddetails=async(productid)=>{
let data={id:productid}
//for now fixed data
let res=[]
    for(let i=0;i<10;i++){
        let d=new reviewitem('id'+i,'Someone',
        fakeimage,'This product is realy good.');
        res.push(d);
    }
return new productdetails('unicid','Temp Product',fakeimage,
    120,3.2,'Baby Brand',res);
}


exports.getbabysitteritem=async(start,end)=>{
let data={'start':start,'end':end}


let res=[]
    for(let i=0;i<end-start;i++){
        let d=new babysitteritem('id'+i,'Temp Name',
fakeimage,'HSC',10,20,'Female')
        res.push(d);
    }
    return res;
}

exports.getbabysitterdetails=async(id)=>{
    let data={'id':id}


    let imgs=[]
for(let i=0;i<10;i++){
    imgs.push(fakeimage);
}

    return new babysitterdetails('unicid','Someone',
    fakeimage,'01700000000',
    imgs,'HSC',10,"Some details about babysitter");
}
exports.submitorder=async(orderitem)=>{

    return 'ok';
}

exports.signup=async(userdetails)=>{
    return 'ok'
}
exports.getsearch=async(query,filter)=>{

}
exports.login=async(username,password)=>{
    let data={user:username,pass:password}
    return 'faketoken';
}