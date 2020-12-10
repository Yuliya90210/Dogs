const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_experts_dogs', async (req, res) => {    
  let data = []

  try {
      var client = new pg.Client(conString);
      await client.connect();


      let resp = await client.query(`
      select 
        name, race, title, age
      from 
        members 
      left join 
        clubs 
      on 
        members.club = clubs.id 
      left join 
        experts 
      on 
        experts.ring = members.ring  
      where 
        full_name = '${req.query.expert}' 
      `)
      let counter = 0
      resp.rows.forEach(row => {
        data.push([
          ++counter,
          row.name,
          row.age,
          row.title,
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