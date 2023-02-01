let crypto = require('crypto');
let mysql = require('mysql');
let {productitem, productdetails, reviewitem, babysitteritem, babysitterdetails}= require('./ClassList')
let con = mysql.createConnection({
    host: "localhost",
    user:'choityhabiba',
    password:'choity4001',
    database: "MainDatabase"
  });
  

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    con.query("CREATE TABLE IF NOT EXISTS normaluser(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,email TEXT,pass TEXT,phone TEXT,token TEXT);")
    con.query("CREATE TABLE IF NOT EXISTS babyproduct(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,img TEXT,price TEXT,brand TEXT,pointmsg TEXT,details TEXT,rating INTEGER DEFAULT 0);")
    con.query("CREATE TABLE IF NOT EXISTS productreview(uid INTEGER PRIMARY KEY AUTO_INCREMENT,productid INTEGER,reviewername TEXT,rating TEXT,review TEXT);")

    con.query("CREATE TABLE IF NOT EXISTS babysitter(uid INTEGER PRIMARY KEY AUTO_INCREMENT,name TEXT,profilepic TEXT,phone TEXT,education TEXT,experience TEXT,details TEXT,age TEXT,gender TEXT,email TEXT,pass TEXT);")

    
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

exports.checktoken=async(token)=>{
  const cmd="SELECT uid,name,email,phone FROM normaluser WHERE token=?;"
  let data=await getData(cmd,[token])
  if(data?.uid){
    return data;
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
    const cmd="SELECT uid FROM normaluser WHERE email=? AND pass=?;"
    let data=await getData(cmd,[user,upass])
    if((data&&data[0]?.uid)||data?.uid){
      await getData("UPDATE normaluser SET token=? WHERE uid=?;",[salt,data.uid])
      return salt;
    }else{
      return undefined;
    }

}



exports.getfoodlist=async(start,end)=>{
  let cmd='SELECT uid,name,img,price,brand,rating FROM babyproduct OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;';
  let data=await getData(cmd,[start,end])
  let result=[]
  for(let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new productitem(d.uid,d.name,d.img,d.price,d.rating,d.brand))
  }
  return result;
}
exports.getfooddetails=async(id)=>{
  let cmd='SELECT * FROM babyproduct WHERE uid=?;';
  let data=await getData(cmd,id)
  if(data.length>0){
    let reviews=[]
    let rev=await getData('SELECT * FROM productreview WHERE productid=?;',data[0].uid)
    if(rev.length>0){
      reviews.push(new reviewitem(rev[0].uid,rev[0].reviewername,rev[0].review,rev[0].rating))
    }
    return new productdetails(data[0].uid,data[0].name,data[0].img,data[0].price,data[0].rating,data[0].brand,reviews,data[0].pointmsg)
  }
}



exports.getbabysitteritem=async(start,end)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience FROM babysitter  OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;'
  let data=await getData(cmd,start,end)
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitteritem(d.uid,d.name,d.profilepic,d.education,d.experience,d.age,d.gender))

  }

  return result;

}

exports.getbabysitterdetails=async(id)=>{
  let cmd='SELECT uid,profilepic,name,age,gender,education,experience,details FROM babysitter  OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;'
  let data=await getData(cmd,start,end)
  let result=[]
  for (let i=0;i<data.length;i++){
    let d=data[i];
    result.push(new babysitterdetails(d.uid,d.name,d.profilepic,d.phone,d.education,d.experience,d.details,d.age,d.gender))

  }

  return result;
}

exports.getsearch=async(q,start,end)=>{

}