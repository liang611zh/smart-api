const express =require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'liangzhao',
    password : '',
    database : 'smart-brain'
  }
});

console.log(db.select('*').from('users'));

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const database={
//     users: [
//         {
//             id:"123",
//             name: "victor",
//             password:"12345",
//             email:"zhaoliangbz@gmail.com",
//             entries:0,
//             joined:new Date(),
//         },
//         {
//             id:"124",
//             name: "hugh",
//             password:"12345",
//             email:"hugh@gmail.com",
//             entries:0,
//             joined:new Date(),
//         }  
//     ],
//     login:[
//         {
//             id:"987",
//             hash:"",
//             email:"zhaoliangbz@gmail.com"
//         }
//     ]
// }

app.get('/',(request,response) => {
    response.send(database.users)
});

//register
app.post('/register',(request,response) => {register.handleRegister(request,response,db,bcrypt)});

//sign in
app.post('/signin',(request,response) => {signin.handleSignin(request,response,db,bcrypt)});

//get user by id
app.get('/profile/:id',(request,response) => {profile.handleProfile(request,response,db)});

//get entries
app.put('/image',(request,response) => {entries.handleEntries(request,response,db)});

//get image url
app.post('/imageurl',(request,response) => {entries.handleApiCall(request,response)});

app.listen(3000,()=>{
    console.log('server is running on 3000 port')
});

