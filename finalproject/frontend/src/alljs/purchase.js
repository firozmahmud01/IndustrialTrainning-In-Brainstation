import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { submitOrder } from './AllApi';




export default function PurchaseForm() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [desable,setDisable]=useState(false)

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit=async ()=>{
    if(!address){
        alert('Type your address')
        return ;
    }
    setDisable(true);
    let data=await submitOrder(address);
    if(data.status=='OK'){
        alert("We have received your order!")
        localStorage.setItem('cartitem',"{}")
    }else{
        alert(data.status);
    }
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div style={{width:'60%',marginLeft:'50%',marginTop:'25%',height:'300px',transform:'translate(-50%,-50%)'}}>
    <form>
    <Typography>You product will be delivared within {(()=>{
        let date=new Date()
        date.setDate(date.getDate() + 10);
        return ""+date
    })()}</Typography>
    <br></br>
    <Typography>Please give use your details:</Typography>
    <FormLabel component="legend">Product receive address</FormLabel>
      <TextField
        label="Address"
        value={address}
        onChange={handleAddressChange}
        fullWidth
        margin="normal"
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          aria-label="Payment Method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel
            value="Cash on Delivery"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>
      <br></br>
      <Button onClick={handleSubmit} disabled={desable} variant="contained" color="primary">
        Confirm Purchase
      </Button>
    </form>
    </div>
  );
}
