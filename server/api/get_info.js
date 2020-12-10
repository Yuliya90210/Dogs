const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_info', async (req, res) => {    
  let theme = req.query.theme
  try {
      var client = new pg.Client(conString);
      var response = [];
      await client.connect();

      let resp = await client.query(`select name, race, ring, number, title from members left join clubs on members.club = clubs.id where race = '${req.query.race}' and name = '${req.query.name}' `)

      let counter = 0
      console.log(resp.rows)
      resp.rows.forEach(row => {
        response.push([
          ++counter,
          row.name,
          row.race,
          row.ring,
          row.title,
          row.number
        ]
        )
      })

      await client.end()
      res.send({data: response})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 