const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_experts_info', async (req, res) => {    

  try {
      var client = new pg.Client(conString);
      await client.connect();


      let resp = await client.query(`
      select 
        race, members.ring
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

      let data ={ 
        race: resp.rows[0].race,
        ring: resp.rows[0].ring
      } 
      
      await client.end()
      res.send({data})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 