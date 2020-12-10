const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.post('/change_club', async (req, res) => {    
  try {
      var client = new pg.Client(conString);
      await client.connect();

      let resp = await client.query(`select number from members where club =  '${req.body.new_club}' order by number ASC `);

      let number = null
      for (let i = 0; i < resp.rows.length; i++){
        if(resp.rows[i].number != (i+1)){
          number = i+1
          break
        }
      }
      if (!number) number = resp.rows.length+1
      
      const querystr = `update members set club = '${req.body.new_club}', number = '${number}' where 
      club = '${req.body.current_club}' and
      name ='${req.body.name}' and
      race = '${req.body.race}'`;
      
      await client.query(querystr);

      await client.end()
      res.send({error: false})
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 