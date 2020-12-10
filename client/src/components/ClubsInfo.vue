<template>
  <div class="container">
    <form>
      <div class="input-container">
        <label for="club_selection">Выберите клуб</label>
        <select id="club_selection" v-model="club" @change="get_report()">
          <option :value="item" v-for="item in clubs" :key="item.id">{{item.title}}</option>
        </select>
      </div>
    </form>
    <form v-if="members || races.length > 0">
      <h4>Информация о клубе</h4>
      <p>
        <b>
          Количество участников: {{members}}
        </b>
      </p>
      <p>
        <b>
        Породы: 
        <ul>
          <li v-for="race in races" :key="race">{{race}}</li>
        </ul>
        </b>
      </p>
    </form>


    <form v-if="all">
      <h4 >Награды</h4>
      <div id="prizes">
        <div class="card">
          <img src="@/assets/Group_1_3.svg" alt="all">
          <div class="number">{{all}}</div>
        </div>
        <div class="card">
          <img src="@/assets/gold.svg" alt="gold">
          <div class="number">{{gold}}</div>
        </div>
        <div class="card">
          <img src="@/assets/silver.svg" alt="silver">
          <div class="number">{{silver}}</div>
        </div>
        <div class="card">
          <img src="@/assets/bronze.svg" alt="bronze">
          <div class="number">{{bronze}}</div>
        </div>
      </div>
    </form>

    <form v-for="(table, counter) in tables" :key="counter">
      <div class="table_heading">{{table.title}}</div>
      <Table :columns="columns" :tableData="table.tableData"/>
    </form>

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
      clubs: [],
      club: null,
      all: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      tables:[],
      columns: ['#','Кличка','Возраст','Отец','Мать','Номер в клубе','Ринг','Занятое место'],
      members: null,
      races: []
      
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
    get_report: function(){
      axios.get('http://localhost:5000/get_report', {params: {club: this.club.id}})
      .then(response => {
        this.tables = response.data.tables
        this.gold = response.data.gold
        this.silver = response.data.silver
        this.bronze = response.data.bronze
        this.all = this.gold + this.silver + this.bronze
        this.members = response.data.members
        this.races = response.data.races
      })
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