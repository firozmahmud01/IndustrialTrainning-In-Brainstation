

exports.productitem=class {
    constructor(id,name,img,prize,rating,brand){
        this.id=id;
        this.name=name;
        this.img=img;
        this.prize=prize;
        this.rating=rating;
        this.brand=brand;

    }
}
exports.filteritem=class{
    constructor(pfrom,pto,brand){
        this.pfrom=pfrom;
        this.pto=pto;
        this.brand=brand;
    }
}
exports.reviewitem=class{
    constructor(id,reviewername,review,rating){
        this.id=id;
        this.reviewername=reviewername;
        this.rating=rating;
        this.review=review;
    }
}
exports.productdetails=class{
    constructor(id,name,img,prize,rating,brand,reviews,pointmsg,details){
        this.id=id;
        this.pointmsg=pointmsg;
        this.name=name;
        this.img=img;
        this.prize=prize;
        this.rating=rating;
        this.brand=brand;
        this.reviews=reviews;
        this.details=details
    }
}
exports.babysitteritem=class{
    constructor(id,name,profilepic,education,experience,age,gender){
        this.id=id;
        this.name=name;
        this.profilepic=profilepic;
        this.education=education;
        this.experience=experience;
        this.age=age;
        this.gender=gender;
    }
}
exports.babysitterdetails=class{
    constructor(id,name,profilepic,phone,education,experience,details,age,gender){
        this.id=id;
        this.phone=phone;
        this.name=name;
        this.profilepic=profilepic;
        this.education=education;
        this.details=details;
        this.experience=experience;
        this.details=details;
        this.age=age;
        this.gender=gender;
    }
}
exports.cartitem=class{
    constructor(id,productid,productname,prize,quantity,img){
        this.id=id;
        this.productid=productid;
        this.productname=productname;
        this.prize=prize;
        this.quantity=quantity;
        this.img=img;
    }
}

exports.orderitem=class{
    constructor(productid,quantity){
        this.productid=productid;
        this.quantity=quantity;

    }
}
exports.userdetails=class{
    constructor(id,name,email,phone,address,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.address=address;
        this.password=password;
    }
}




