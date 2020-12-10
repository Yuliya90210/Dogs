const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.post('/add_expert', async (req, res) => {    
  try {
      var client = new pg.Client(conString);
      await client.connect();
      const querystr = `insert into experts (full_name, club, ring) values ('${req.body.full_name}', '${req.body.club_id}', '${req.body.ring_id}')`;
      
      await client.query(querystr);

      await client.end()
      res.send({error: false})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 