const express = require('express')
const app = express()
const cors = require('cors')
const body_parser = require('body-parser');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(body_parser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let username_db = {}; //in real life scenario one would use a database to store all the post info

let user_id = 0;

app.post('/api/users' , (req,res) => {
  const user_input = req.body.username;
  if(username_db[user_input] === undefined){
    username_db[user_input] = user_id;
    user_id = user_id++
    return res.json({username:user_input, _id:user_id})
  }
  else{
    return res.status(400);
  }
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
