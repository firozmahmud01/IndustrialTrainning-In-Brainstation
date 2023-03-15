import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Card, CardMedia, MenuItem, Select, Typography } from '@mui/material';
import { registerbabysitter, signupuser } from './AllApi';
import SearchBack from '../image/searchback.jpeg'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [education,setEducation]=useState('')
    const [experience,setExperience]=useState('')
    const [details,setDetails]=useState('')
    const [age,setAge]=useState('')
    const [gender,setGender]=useState('')
    const [type,setType]=useState('housetutor')
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [productImage,setProductImage]=useState()
    const [imagefile,setImageFile]=useState()
    if(localStorage.token)document.location='/';


    const toBase64 = (url) =>{
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                resolve(fileLoadedEvent.target.result)
            }
            fileReader.readAsDataURL(url);
        })};

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setPhoneError('');
        // validate email, password, name and phone fields
        let img=await toBase64(imagefile)
        
        const jsonRes = await registerbabysitter(name, email, education, phone,experience,details,age,gender,type,img)
        if (jsonRes.status=='OK') {
            alert("Thank you for resiger!")
            document.location="/";
        } else {
            alert("Failed to register!")
        }
    }

    return (
        <div style={{
            width:'60%'
            ,marginLeft:'50%'
            ,marginTop:'64px',
            transform:'translateX(-50%)'
            
        }}>
            
            <form onSubmit={handleSubmit}>
            <Typography>{type=='daycare'?'Your Institute':"Your"} Image:</Typography>
            <TextField
                fullWidth
                value={productImage}
                type='file'
                accept='image/*'
                onChange={(e) => {
                    setImageFile(e.target.files[0])
                    setProductImage(e.target.value)
                }}
                
            />
            <br></br>
            <Select sx={{marginTop:'20px'}} value={type} onChange={e=>{setType(e.target.value)}}>
                        <MenuItem value="housetutor">House Tutor</MenuItem>
                        <MenuItem value="daycare">Day Care</MenuItem>
                        <MenuItem value="babysitter">Baby Sitter</MenuItem>
                    </Select>
                    <br></br>
                    <br></br>
                <TextField
                    label={type=='daycare'?'Address':"Name"}
                    type="text"
                    value={name}
                    
                    onChange={e => setName(e.target.value)}
                    fullWidth
                    error={!!nameError}
                    helperText={nameError}
                />
                <br />
                <TextField
                    label="Email"
                    type="email"
                    sx={{marginTop:'20px'}}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    error={!!emailError}
                    helperText={emailError}
                />
                <br />
                {type!='daycare'&&(<div>
                <TextField
                    label="Education"
                    sx={{marginTop:'20px'}}
                    
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    fullWidth
                    
                />
                <br />


                <TextField
                    label="Phone Number"
                    type="tel"
                    sx={{marginTop:'20px'}}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    fullWidth
                    error={!!phoneError}
                        helperText={phoneError}

                    />
                    <TextField
                    label="Experience"
                    
                    sx={{marginTop:'20px'}}
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    fullWidth
                   

                    />
                    </div>)}


                    <TextField
                    label="Details"
                    sx={{marginTop:'20px'}}
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    fullWidth
                    

                    />

                    {type!='daycare'&&(<div>
                    <TextField
                    label="Age"
                    sx={{marginTop:'20px'}}
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    fullWidth
                    

                    />
                    <TextField
                    label="Gender"
                    
                    sx={{marginTop:'20px'}}
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    fullWidth
                   

                    />
                    </div>)}
                    
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button sx={{marginTop:'20px',marginLeft:'50%',transform:'translateX(-50%)'}} type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </form>
                
            </div>
        );
    }
    
    export default Signup;
    