<template>
  <section>
    <div class="container">
      <form action="">
        <div class="input-container">
          <label for="race_selection">Выберите породу</label>
          <select id="race_selection" v-model="race" @change="got_race">
            <option :value="race" v-for="race in races" :key="race">{{race}}</option>
          </select>
        </div>

        <div class="input-container">
          <label for="name_selection">Выберите кличку</label>
          <select id="name_selection" v-model="name" @change="got_name">
            <option :value="item" v-for="item in names" :key="item">{{item}}</option>
          </select>
        </div>
      </form>
      <Table :columns="columns" :tableData="tableData" v-if="race && name"/>
    </div>
  </section>
</template>

<script>
import Table from '@/components/Table'
const axios = require('axios')

export default {
  name: 'Rings',
  components: {Table},
  data(){
    return{
      races: [],
      names: [],
      race: null,
      name: null,
      columns: ['#', 'Кличка', 'Порода', 'Ринг', 'Клуб', 'Номер в клубе'],
      tableData: [ ],
      ring: 1
    }
  },
  mounted (){
    this.get_races()
  },
  methods: {
    get_races: function(){
      axios.get('http://localhost:5000/get_races').then(response => {
        this.races = response.data.data
      })
    },

    got_race: function(){
      this.name = null
      axios.get('http://localhost:5000/get_names',  
        {params: {race: this.race}})
        .then(response => {
          this.names = response.data.data
        }
      )
    },

    got_name: function(){
      axios.get('http://localhost:5000/get_info', 
        {params: {race: this.race, name: this.name} })
        .then(response => {
          this.tableData = response.data.data
        }
      )
    }
  }
}
</script>

<style>
</style>