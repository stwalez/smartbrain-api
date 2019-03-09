const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const db = knex({
	client:'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: '123$',
		database: 'smart_brain_db'
	}
})
/*db.select('*').from('users').then(data => {
	console.log(data);*/
//})

const app = express();



/*const database = {
	users:[
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}*/
//app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(cors());

/*app.get('/',(req, res) => {
	//res.json(database.users)
	db.select('*').from('users').then(data => {
	console.log(data);
	})
	//db('users').insert({name:'bolarinwa', email:'prof biyi', joined:new Date()})
})*/

app.get('/ann',(req, res) => {
	//res.json(database.users)
	db('users').insert({name:'boala', email:'podyi', joined:new Date()}).then(console.log)
	res.json("success")
	//setTimeout(4000);
	db.select('*').from('users').then(data => {
	console.log(data);})
})

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})	


/*app.post('/register',(req, res) => {
	const { name, email, password } = req.body; 
	database.users.push({
		id: '125',
		name: name,
		email: email,
		//password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
*/
//app.post('/signin',(req, res) => {signin.handleSignin(req, res, db, bcrypt)})
//changed to
app.post('/signin',signin.handleSignin(db, bcrypt))
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res,db)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=>{
	console.log("app is running on port 3000") 
});

/* 
Endpoints
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

