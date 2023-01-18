const express=require('express');
const { checkauth } = require('./database');
const AllApi =require('./api')
const cors=require('cors');
const app=express();
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())






app.use('/api',AllApi);
app.listen(80);

