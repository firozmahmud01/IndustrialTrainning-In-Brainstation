import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Card, CardMedia } from '@mui/material';
import { signupuser } from './AllApi';
import SearchBack from '../image/searchback.jpeg'
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    if(localStorage.token)document.location='/'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setPhoneError('');
        // validate email, password, name and phone fields
        if(!email) {
            setEmailError("Email is required.");
            return;
        }
        if(!password) {
            setPasswordError("Password is required.");
            return;
        }
        if(!name) {
            setNameError("Name is required.");
            return;
        }
        if(!phone) {
            setPhoneError("Phone number is required.");
            return;
        }
        
        const jsonRes = await signupuser(email, password, name, phone)
        if (jsonRes.status=='OK') {
            alert(jsonRes.message)
            window.location.href = '/login';
        } else {
            setError(jsonRes.status);
        }
    }

    return (
        <div style={{
            width:'60%'
            ,marginLeft:'50%'
            ,marginTop:'40%',
            transform:'translate(-50%,-100%)'
            
        }}>
            
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    type="text"
                    value={name}
                    sx={{marginTop:'20px'}}
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
                <TextField
                    label="Password"
                    sx={{marginTop:'20px'}}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    error={!!passwordError}
                    helperText={passwordError}
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
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button sx={{marginTop:'20px',marginLeft:'50%',transform:'translateX(-50%)'}} type="submit" variant="contained" color="primary">
                        Signup
                    </Button>
                </form>
                <p style={{marginTop:'20px' ,marginLeft:'50%',transform:'translateX(-35%)'}}>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        );
    }
    
    export default Signup;
    