import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { loadOrderList } from "./AllApi";

function OrderItem({productid,productname,buyername,totalprice,quantity,img,price,buyernumber,buyeraddress}){
    return (
        <Grid container>
        <Grid xs={2}>
                    <Card sx={{maxWidth:'100px'}}>
                        <CardMedia image={img} sx={{maxHeight:'50px'}}>
                        </CardMedia>
                    </Card>
                    </Grid>
                    <Grid item xs={10} container>
                        <Grid item xs={12}>
                            <Typography>{productname}</Typography>
                        </Grid>
                        <Grid xs={4} item>
                                <Typography>Price:{price}</Typography>
                            </Grid>
                            <Grid xs={4} item>
                                <Typography>Total Price:{totalprice}</Typography>
                            </Grid>
                            <Grid xs={4} item>
                                <Typography>Quantity:{quantity}</Typography>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography>Buyer Name:{buyername}</Typography>
                            </Grid>
                            <Grid xs={6} item>
                                <Typography>Buyer Number:{buyernumber}</Typography>
                            </Grid>
                            <Grid xs={6} item>
                                <Typography>Buyer Address:{buyeraddress}</Typography>
                            </Grid>
                    </Grid>
                    </Grid>
    )
}

async function loadList(setList,username,password){
    let data=await loadOrderList(username,password);
    let res=[]
    if(data.status=='OK'){
        for(let item of data){
            res.push(
                <Grid item xs={12} key={item.id}>
                    

                </Grid>
            )
        }
    }else{
        alert(data.status);
    }

}




export default function Main(){
    const [list,setList]=useState()

    if(!list){
        let user=prompt("Admin\'s Username");
        let pass=prompt('Admin\'s Password');
        loadList(setList,user,pass);
        return <div></div>
    }
}