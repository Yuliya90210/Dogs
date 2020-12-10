const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.post('/remove_expert', async (req, res) => {    
  try {
      var client = new pg.Client(conString);
      await client.connect();
      const querystr = `delete from experts where full_name = '${req.body.full_name}'`;
      
      await client.query(querystr);

      await client.end()
      res.send({error: false})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 