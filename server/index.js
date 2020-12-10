const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const get_races = require('./api/get_races')
const get_names = require('./api/get_names')
const get_info = require('./api/get_info')
const get_race_experts = require('./api/get_race_experts')
const get_experts = require('./api/get_experts')
const get_experts_dogs = require('./api/get_experts_dogs')
const get_experts_info = require('./api/get_experts_info')
const get_clubs = require('./api/get_clubs')
const get_rings = require('./api/get_rings')
const get_report = require('./api/get_report')
const get_club_races = require('./api/get_club_races')
const get_club_names = require('./api/get_club_names')
const get_reference = require('./api/get_reference')
const get_numbers = require('./api/get_numbers')


const remove_expert = require('./api/remove_expert')
const add_expert = require('./api/add_expert')
const change_club = require('./api/change_club')

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8080'
}));

app.get('/', (req, res) => {
  res.send('<h3>Welcome to DOG SHOW API<h3>')
})

app.get('/get_races', get_races);
app.get('/get_names', get_names);
app.get('/get_info', get_info);
app.get('/get_race_experts', get_race_experts);
app.get('/get_experts', get_experts);
app.get('/get_experts_dogs', get_experts_dogs);
app.get('/get_experts_info', get_experts_info);
app.get('/get_clubs', get_clubs);
app.get('/get_rings', get_rings);
app.get('/get_report', get_report);
app.get('/get_club_races', get_club_races);
app.get('/get_club_names', get_club_names);
app.get('/get_reference', get_reference);
app.get('/get_numbers', get_numbers);

app.post('/remove_expert', remove_expert);
app.post('/add_expert', add_expert);
app.post('/change_club', change_club);


app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
