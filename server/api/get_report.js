const pg = require('pg');
const express = require('express')
const conString = "postgres://postgres:password@localhost:5432/exh";
const router = express.Router()

router.get('/get_report', async (req, res) => {    
  let data = {
    tables: [],
    gold: 0,
    silver: 0,
    bronze: 0,
    members: 0,
    races: []
  }

  try {
      var client = new pg.Client(conString);
      await client.connect();
      const querystr = `
        select * from members where club = ${req.query.club}
      `;
      
      var resp = await client.query(querystr);
      data.members = resp.rows.length
      resp.rows.forEach(row => {
          if(data.races.indexOf(row.race) < 0){
            data.races.push(row.race)
          }
          switch(row.prize){
            case 1:
              data.gold++
              break;
            case 2:
              data.silver++
              break;
            case 3:
              data.bronze++
              break;
            default: break;
          }
          ////////////////////////////////
      });


      data.races.forEach(item => {
        let table = {
          title: '',
          tableData: []
        }
        table.title = `${item}`
        let counter = 0
        let tableObject = []
        for (let i = 0; i < resp.rows.length; i++) {
          if(item == resp.rows[i].race){
            tableObject.push(++counter)
            tableObject.push(resp.rows[i].name)
            tableObject.push(resp.rows[i].age)
            tableObject.push(resp.rows[i].father)
            tableObject.push(resp.rows[i].mother)
            tableObject.push(resp.rows[i].number)
            tableObject.push(resp.rows[i].ring)
            if(resp.rows[i].prize){
              tableObject.push(resp.rows[i].prize)
            }else{
              tableObject.push('---');
            }
            
            table.tableData.push(tableObject)
            tableObject = []
          }          
        }
        data.tables.push(table)
      })
      
      await client.end()
      res.send(data)
  }
  catch(e){
      console.log(`error - ${e}`)
  }
})

module.exports = router 