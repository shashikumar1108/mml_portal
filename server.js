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

app.use(require('./routes/index.route'))
