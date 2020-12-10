<template>
  <div class="container">
    <form>
      <div class="input-container">
        <label for="club_selection">Выберите текущий клуб</label>
        <select id="club_selection" v-model="current_club" @change="got_current_club()">
          <option :value="item" v-for="item in clubs" :key="item.id">{{item.title}}</option>
        </select>
      </div>

      <div class="input-container" v-if="current_club">
        <label for="race_selection">Выберите породу</label>
        <select id="race_selection" v-model="race" @change="got_race()">
          <option :value="item" v-for="item in races" :key="item.id">{{item}}</option>
        </select>
      </div>

      <div class="input-container" v-if="race && current_club">
        <label for="name_selection">Выберите кличку</label>
        <select id="name_selection" v-model="name">
          <option :value="item" v-for="item in names" :key="item">{{item}}</option>
        </select>
      </div>

      <div class="input-container"  v-if="race && current_club && name" >
        <label for="new_club_selection">Выберите новый клуб</label>
        <select id="new_club_selection" v-model="new_club">
          <option :value="item" v-for="item in new_clubs" :key="item">{{item.title}}</option>
        </select>
      </div>
      
      <button class="ok-button" @click="change($event)" v-if="race && current_club && name && new_club">Сменить клуб</button>
    </form>

    <div id="dark" v-if="success">
      <div id="success">
        <p>Клуб успешно изменен</p>
        <button class="ok-button" @click="okHandler()">Хорошо</button>
      </div>
    </div>

  </div>
</template>

<script>
import Table from './Table'
const axios = require('axios')

export default {
  name: 'ClubsInfo',
  components: { Table },
  data () {
    return {
      success: false,
      clubs: [],
      new_clubs: [],
      races: [],
      names: [],
      current_club: null,
      new_club: null, 
      race: null,
      name: null
      
    }
  },
  mounted () {
    this.get_clubs()
  },
  methods: {
    get_clubs: function(){
      axios.get('http://localhost:5000/get_clubs')
      .then(response => {
        this.clubs = response.data.data
      })
    },

    got_current_club: function(){
      this.new_clubs = this.clubs.filter(item => item != this.current_club )
      axios.get('http://localhost:5000/get_club_races', 
        {params: {current_club:this.current_club.id}})
        .then(response => {
          this.races = response.data.data
        })
    },

    got_race: function(){
      axios.get('http://localhost:5000/get_club_names', 
        {params: {current_club:this.current_club.id, race:this.race}})
        .then(response => {
          this.names = response.data.data
        })
    },

    change: function(e){  
      e.preventDefault()
      let data = {
        current_club: this.current_club.id,
        new_club: this.new_club.id,
        name: this.name,
        race: this.race
      }
      axios.post('http://localhost:5000/change_club', data)
        .then(response => {
          if(response.data.error === false){
            this.success = true
          }
        }
      )
    },
    okHandler: function(){
      this.success = false
      this.$emit('refresh', 1)
    }
  }
}
</script>

<style>
  form{
    width:900px;
    margin: 0px auto 30px auto;
    border-radius: 10px;
  }
  form h4{
    padding: 20px 30px 0 30px;
    margin: 0 0 10px 0;
    text-align: center;
  }
  form p{
    padding: 10px 30px 10px 30px;
    text-align: justify;
  }
  form ul{
    padding-left: 12px;
    list-style: '•';
  }
  form li{
    padding-left: 10px;

  }
  #prizes{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    width:100%;
    align-items: center;
    border-radius: 10px;
    /* box-shadow: 0 0 10px rgba(0,0,0,.15); */
    margin: 0px auto 10px auto;
    padding: 20px;
  }
  .card{
    width:100px;
    text-align: center;
    margin: 0 20px;
    height: 150px;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    overflow: hidden;
    position: relative;
    border-radius:5px;
  }
  .card .number{
    display: block;
    width:100%;
    color: var(--light);
    font-size: 1.3em;
    text-shadow: 0 0 4px rgba(0,0,0,.5);
    position: absolute;
    bottom: 0;
  }

  .card span{
    font-size:3em;
  }

  .card:nth-child(1) .number{
    background-color: var(--primary);
  }

  .card:nth-child(1) img{
    margin-top:20px;
  }
  
  .card:nth-child(2) .number{
    background-color: gold;
  }

  .card:nth-child(3) .number{
    background-color: silver;
  }

  .card:nth-child(4) .number{
    background-color: #cd7f32;
  }

  .card img{
    width:90%;
    margin:10px 0 5px 0;
  }

  table{
    box-shadow: 0 0 3px rgba(0,0,0,.2);
    overflow: hidden;
    border-radius: 5px;;
    margin: 10px auto;
  }

  .table_heading{
    text-align: center;
    font-size: 1.4em;
    font-weight: 400;
  }
</style>