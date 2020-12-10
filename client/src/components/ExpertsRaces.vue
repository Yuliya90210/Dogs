<template>
  <div class="container">
    <form action="">
      <div class="input-container">
        <label for="race_selection">Выберите породу</label>
        <select id="race_selection" v-model="race" @change="get_race_experts">
          <option :value="race" v-for="race in races" :key="race">{{race}}</option>
        </select>
      </div>
    </form>
    
    <Table :columns="columns" :tableData="tableData" v-if="race"/>
  </div>
</template>

<script>
import Table from './Table'
const axios = require('axios')

export default {
  name: 'ExpertsRaces',
  components: {Table},
  data () { return {
    race: null,
    races: [],
    columns: ['Порода', 'Эксперт', 'Клуб эксперта'],
    tableData: [],
  }},
  mounted:  function(){
    this.get_races()
  },
  methods: {
    get_races: function(){
      axios.get('http://localhost:5000/get_races').then(response => {
        this.races = response.data.data
      })
    },

    get_race_experts: function(){
      axios.get('http://localhost:5000/get_race_experts', {params: {race: this.race}}).then(response => {
        this.tableData = response.data.data
      })
    }
  }

}
</script>

<style>

</style>