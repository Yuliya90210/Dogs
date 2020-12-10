const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_numbers', async (req, res) => {    
  try {
    let data = []
    var client = new pg.Client(conString);
    await client.connect();
    const querystr = `select number from members where club = '${req.query.current_club}' and name = '${req.query.name}' and race = '${req.query.race}'`;

    let resp = await client.query(querystr)
    resp.rows.forEach( row => {
      data.push(row.number)
    })
    
    await client.end()
    res.send(data)
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 