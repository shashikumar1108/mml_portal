const express = require('express');

require('dotenv').config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/', (req, res)=>{
	const {name} = req.body;
	
	res.send(`Welcome ${name}`);
})

app.listen(PORT, (error) =>{
	console.log("APP Name :",process.env.APP_NAME)
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    }
	else
		console.log("Error occurred, server can't start", error);
	}
);

require('./dataAdapters/connection')

// let appToken = require('crypto').randomBytes(64).toString('hex')
// console.log(appToken)

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(require('./routes/index.route'))