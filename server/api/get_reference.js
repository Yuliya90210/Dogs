const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_reference', async (req, res) => {    
  try {
    let data = {}
    var client = new pg.Client(conString);
    await client.connect();
    const querystr = `
      select * from members where club = '${req.query.club}' and name = '${req.query.name}' and race = '${req.query.race}' and number = '${req.query.number}'
    `;
      
    let resp = await client.query(querystr)
    resp.rows.forEach( row => {
      data.prize = row.prize ? row.prize : 'Нет'  
      data.mother = row.mother
      data.father = row.father
      data.age = row.age
      data.ring = row.ring
    })
    
    await client.end()
    res.send(data)
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 