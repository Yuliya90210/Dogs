<template>
  <div class="container">
    <form action="">
      <div class="input-container">
        <label for="expert_selection">Выберите эксперта</label>
        <select id="expert_selection" v-model="expert" @change="get_experts_dogs()">
          <option :value="item" v-for="item in experts" :key="item">{{item}}</option>
        </select>
      </div>

      <div class="input-container" v-if="ring && race">
        <p>
          {{expert}} обслуживает ринг номер <b>{{ring}}</b>,
          на котором выступают собаки породы <b>"{{race}}"</b>.
        </p>
      </div>
    </form>
    
    <Table :columns="columns" :tableData="tableData" v-if="expert"/>
  </div>
</template>

<script>
import Table from './Table'
const axios = require('axios')

export default {
  name: 'ExpertsDogs',
  components: { Table },
  data () {return{
    experts: [],
    expert: null,
    columns: ['#','Кличка','Возраст','Клуб'],
    tableData: [],
    race: null,
    ring: null
  }},
  mounted() {
    this.get_experts()
  },
  methods: {
    get_experts: function(){
      axios.get('http://localhost:5000/get_experts')
      .then(response => {
        this.experts = response.data.data
      })
    },
    get_experts_dogs: function(){
      axios.get('http://localhost:5000/get_experts_dogs', {params: {expert: this.expert}})
      .then(response => {
        this.tableData = response.data.data
      })

      axios.get('http://localhost:5000/get_experts_info', {params: {expert: this.expert}})
      .then(response => {
        this.ring = response.data.data.ring
        this.race = response.data.data.race
      })
    }
  }
}
</script>

<style>
  .input-container p{
    text-align: justify;
  }
</style>