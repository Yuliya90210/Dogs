const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_experts', async (req, res) => {    
  let data = []

  try {
      var client = new pg.Client(conString);
      await client.connect();


      let resp = await client.query(`select full_name from experts`)    
      resp.rows.forEach(row => {
        data.push(
          row.full_name
        );
      })

      await client.end()
      res.send({data})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 