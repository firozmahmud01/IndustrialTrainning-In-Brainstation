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
const productsofall=[]
const hostname='http://localhost';




productsofall.push(new productitem('id0','Baby Food',
    Food,
            500,4.2,'Lactozen'));
            productsofall.push(new productitem('id1','Toys',
            Toy,
                    1000,2.8,'Kidiland'));
                    productsofall.push(new productitem('id2','Dol',
            Dol,
                    350,3.7,'RFL'));
                    productsofall.push(new productitem('id3','Baby Dress',
            Dress,
                    700,2.3,'Kids'));
                    productsofall.push(new productitem('id4','Baby Daily Care',
            Meril,
                    500,4.1,'Maril'));
                    productsofall.push(new productitem('id5','Rocking Chair',
            Chair,
                    5000,4.5,'RFL'));
                    productsofall.push(new productitem('id6','Jungle Book',
            Junglebook,
                    100,3.8,'Bangla Bornomala'));
                    productsofall.push(new productitem('id7','Baby Dipars',
            Dipars,
                    40,4.8,'Chu Chu'));


exports.getfoodlist=async(start,end,filter)=>{
    let data={'start':start,'end':end,'filter':filter}
    
    //for now fixed data
    
            //         productsofall.push(new productitem('id8','Pacifier',
            // fakeimage,
            //         100,3.1,'Chicco'));
            //         productsofall.push(new productitem('id9','Doll',
            // fakeimage,
            //         600,3.8,'Barby'));
    return [...productsofall];
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
let data={id:productid}
//for now fixed data
let res=[]
    for(let i=0;i<10;i++){
        let d=new reviewitem('id'+i,'Someone',
        fakeimage,'This product is realy good.');
        res.push(d);
    }

    let id=Number(productid.replace('id',''))
    
return new productdetails(productsofall[id].id,productsofall[id].name,productsofall[id].img,
    productsofall[id].prize,productsofall[id].rating,productsofall[id].brand,res);
}


exports.getbabysitteritem=async(start,end)=>{
let data={'start':start,'end':end}


let res=[];
res.push(new babysitteritem('id'+res.length,'Jahanara Begom',
Baby1,'HSC',2,30,'Female'));
res.push(new babysitteritem('id'+res.length,'Jorina Begom',
Baby2,'HSC',4,35,'Female'));
res.push(new babysitteritem('id'+res.length,'Bably Khatun',
Baby3,'HSC',6,29,'Female'));
res.push(new babysitteritem('id'+res.length,'Sikha Khatun',
Baby4,'HSC',10,20,'Female'));
res.push(new babysitteritem('id'+res.length,'Tania Aktar',
Baby5,'HSC',15,39,'Female'));
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