let crypto = require('crypto');
let mysql = require('mysql');
let fs=require("fs")
let {productitem, productdetails, reviewitem, babysitteritem, babysitterdetails}= require('./ClassList')
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  });
  
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS Baby", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      con.query("USE Baby");
    
    con.query("CREATE TABLE IF NOT EXISTS normaluser(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,email TEXT,pass TEXT,phone TEXT,token TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS babyproduct(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,img TEXT,price TEXT,brand TEXT,pointmsg TEXT,details TEXT,rating INTEGER DEFAULT 0);")
    con.query("CREATE TABLE IF NOT EXISTS productreview(uid INTEGER PRIMARY KEY AUTO_INCREMENT,productid INTEGER,reviewername TEXT,rating TEXT,review TEXT,token TEXT);")

    con.query("CREATE TABLE IF NOT EXISTS babysitter(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,profilepic TEXT,phone TEXT,education TEXT,experience TEXT,details TEXT,age TEXT,gender TEXT,email TEXT,pass TEXT,type TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS orderlist(uid INTEGER PRIMARY KEY AUTO_INCREMENT,productid INTEGER,img TEXT,productname TEXT,totalprice TEXT,price TEXT,quantity TEXT,buyeraddress TEXT,buyername TEXT,buyernumber TEXT);")

    
  });

  });


  

async function getData(cmd,arg){
  let p= await new Promise((response,error)=>{
    con.query(cmd,arg, function (err, result, fields) {
      if (err){ error(err); return;}
      response(result);
    });
  })
  return p;
  
}

exports.registerdaycare=async(name, email, education, phone,experience,details,age,gender,type,img)=>{
  const cmd="INSERT INTO babysitter (name, email, education, phone,experience,details,age,gender,type,profilepic) VALUES(?, ?, ?, ?,?,?,?,?,?,?)"
  try{
    let image=await saveimage(img);
    await getData(cmd,[name, email, education, phone,experience,details,age,gender,type,image])
    return "OK"
  }catch(e){
    return ;
  }
}

exports.checktoken=async(token)=>{
  const cmd="SELECT uid,name,email,phone FROM normaluser WHERE token=?;"
  let data=await getData(cmd,[token])
  if(data&&data[0]?.uid){
    return data[0];
  }else{
    return undefined;
  }
}
exports.createUser=async(name,email,pass,phone)=>{
  let upass=crypto.createHash('sha256').update(pass).digest('base64');
  const cmd="SELECT uid FROM normaluser WHERE email=?;"
  let data=await getData(cmd,[email])
  
  if((data&&data[0]?.uid)||data?.uid){
    return "This email already exists.";
  }else{
    await getData("INSERT INTO normaluser (name, email, pass, phone) VALUES (?,?,?,?);",[name,email,upass,phone])
    return "OK"
  }

}
exports.checkauth=async(user,pass)=>{
    let upass=crypto.createHash('sha256').update(pass).digest('base64');
    let salt = crypto.randomBytes(27).toString('hex'); 
    console.log(user,upass)
    const cmd="SELECT uid,name FROM normaluser WHERE email=? AND pass=?;"
    let data=await getData(cmd,[user,upass])
    if((data&&data[0]?.uid)||data?.uid){
      await getData("UPDATE normaluser SET token=? WHERE uid=?;",[salt,data[0].uid])
      return {token:salt,name:data[0].name};
    }else{
      return undefined;
    }

}



exports.getfoodlist=async(start,end)=>{
  let cmd='SELECT uid,name,img,price,brand,rating FROM babyproduct LIMIT ?, ?;';
  let data=await getData(cmd,[Number(start),Number(end)])
  let result=[]
  for(let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new productitem(d.uid,d.name,d.img,d.price,d.rating,d.brand))
  }
  return result;
}
exports.getfooddetails=async(id)=>{
  let cmd=
  'SELECT * FROM babyproduct WHERE uid=?;';
  let data=await getData(cmd,[Number(id)])
  if(data.length>0){
    let reviews=[]
    let rev=await getData('SELECT * FROM productreview WHERE productid=?;',[data[0].uid])
    for (let i=0;i<rev?.length||0;i++){

      reviews.push(new reviewitem(rev[i].uid,rev[i].reviewername,rev[i].review,rev[i].rating))
    }
    return new productdetails(data[0].uid,data[0].name,data[0].img,data[0].price,data[0].rating,data[0].brand,reviews,data[0].pointmsg,data[0].details)
  }
}



exports.getbabysitteritem=async(type)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience FROM babysitter WHERE type=?;'
  let data=await getData(cmd,[type])
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitteritem(d.uid,d.name,d.profilepic,d.education,d.experience,d.age,d.gender))

  }

  return result;

}

exports.getbabysitterdetails=async(id)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience,details FROM babysitter LIMIT ?, ?;'
  let data=await getData(cmd,[+start,+end])
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitterdetails(d.uid,d.name,d.profilepic,d.phone,d.education,d.experience,d.details,d.age,d.gender))

  }

  return result;
}

exports.getsearch=async(q,start,end)=>{

}
async function saveimage(img){
  let base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  let name="image"+Date.now()+".jpg"
  return await new Promise((res,erro)=>{
    fs.writeFile('images/'+name, base64Data, 'base64', function(err) {
      if(err){
        erro(err)
      }else{
        res(name)
      }
    
    });
  })
  
}

exports.uploadfood=async(name,img,prize,brand,pointmsg,details)=>{
  try{  
  let save=await saveimage(img)
  let cmd='INSERT INTO babyproduct(name,img,price,brand,pointmsg,details) VALUES(?,?,?,?,?,?)';
  await getData(cmd,[name,save,prize,brand,pointmsg,details])
    return 'OK'
  }catch(e){
    fs.unlink('images/'+save);
    console.log(e)
  }

}
exports.searchforit=async(keyword,page)=>{

  let cmd='SELECT uid,name,img,price,brand,rating FROM babyproduct WHERE name LIKE ? OR brand like ?;';
  let data=await getData(cmd,["%"+keyword+"%",'%'+keyword+'%'])
  let result=[]
  for(let i=(page-1)*36;i<(36*page)&&i<data.length;i++){
    let d=data[i];
    result.push(new productitem(d.uid,d.name,d.img,d.price,d.rating,d.brand))
  }
  return {totalPages:(data.length/36).toFixed(0),results:result};
}


exports.receiveOrder=async(buyeraddress,list,buyername,buyernumber)=>{
  let data=[]
  for(d of list){
    let p=await getData('SELECT * FROM product')
    data.push({buyeraddress,quantity:d.quantity})
  }
}
exports.loadorderlist=async()=>{
  let cmd='SELECT * FROM orderlist';
  let data=await getData(cmd,[])
  return data;
}


exports.addreview=async(star,comment,personname,productid,token)=>{
  let dada=await getData('SELECT uid FROM productreview WHERE productid=? AND token=?;',[productid,token])
  if(dada.length>0)return;
let cmd='INSERT INTO productreview (productid,reviewername,rating,review,token) VALUES(?,?,?,?,?);'
try{
let res= await getData(cmd,[productid,personname,star,comment,token])
}catch(e){
  return ;
}

let r=await getData('SELECT rating from productreview WHERE productid=?;',[productid])

let total=0;
for (let i=0;i<r.length;i++){
    total+=(+r[i].rating)
  }
  total=total/r.length;

await getData('UPDATE babyproduct SET rating=? WHERE uid=?;',[total,productid])

return 'OK';

}