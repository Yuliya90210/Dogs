const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_race_experts', async (req, res) => {    
  let data = []

  try {
      var client = new pg.Client(conString);
      await client.connect();


      let resp = await client.query(`select distinct(ring) ring from members where race = '${req.query.race}' `)
      let ring = resp.rows[0].ring  
      
      resp = await client.query(`select full_name, title from experts left join clubs on experts.club = clubs.id where ring = '${ring}'`)      
      resp.rows.forEach(row => {
        data.push([
          req.query.race,
          row.full_name,
          row.title
        ]);
      })

      await client.end()
      res.send({data})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 