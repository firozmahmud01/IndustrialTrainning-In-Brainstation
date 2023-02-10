import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Card, CardMedia } from '@mui/material';
import { loginuser } from './AllApi';
import SearchBack from '../image/searchback.jpeg'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    if(localStorage.token)document.location='/'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        // validate email and password fields
        if(!email) {
            setEmailError("Email is required.");
            return;
        }
        if(!password) {
            setPasswordError("Password is required.");
            return;
        }
        
        const jsonRes =await loginuser(email,password);
        if (jsonRes.token) {
            localStorage.setItem('token', jsonRes.token);
            localStorage.setItem('user',jsonRes.name)
            alert('Welcome back '+jsonRes.name+"!")
            window.location.href = '/';
        } else {
            setError(jsonRes.status);
        }
    }

    return (
        <div style={{
            width:'60%'
            ,marginLeft:'50%'
            ,marginTop:'25%',
            transform:'translate(-50%,-50%)'
            
        }}>
            
            <form onSubmit={handleSubmit}>
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
                    type="password"
                    sx={{marginTop:'20px'}}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button sx={{marginTop:'20px',marginLeft:'50%',transform:'translateX(-50%)'}} type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
            <div style={{marginTop:'20px' ,marginLeft:'50%',transform:'translateX(-24%)'}}>
            <p>New user? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;
