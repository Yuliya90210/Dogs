<template>
  <div class="container">
    <form>

      <div class="input-container">
        <label for="expert_name">ФИО эксперта</label>
        <input type="text" id="expert_name" v-model="full_name">
      </div>

      <div class="input-container">
        <label for="club_selection">Выберите клуб</label>
        <select id="club_selection" v-model="club">
          <option :value="item" v-for="item in clubs" :key="item.id">{{item.title}}</option>
        </select>
      </div>

      <div class="input-container">
        <label for="race_selection">Выберите породу</label>
        <select id="race_selection" v-model="ring">
          <option :value="item" v-for="item in rings" :key="item">{{item.race}}</option>
        </select>
      </div>

     <button class="ok-button" v-if="full_name && ring && club" @click="add_expert($event)">Назначить</button>
    </form>
    
    <div id="dark" v-if="success">
      <div id="success">
        <p>Эксперт назначен</p>
        <button class="ok-button" @click="okHandler()">Хорошо</button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ExpertsAdd',
  data () {return{
    success: false,
    clubs: [],
    rings: [],
    club: null,
    ring: null,
    full_name: ''
  }},
  mounted() {
    this.get_clubs()
    this.get_rings()
  },
  methods: {
    get_clubs: function(){
      axios.get('http://localhost:5000/get_clubs')
      .then(response => {
        this.clubs = response.data.data
      })
    },

    get_rings: function(){
      axios.get('http://localhost:5000/get_rings')
      .then(response => {
        this.rings = response.data.data
      })
    },

    add_expert: function(e){
      e.preventDefault()
      let data = {
        full_name: this.full_name,
        club_id: this.club.id,
        ring_id: this.ring.ring
      }
      axios.post('http://localhost:5000/add_expert', data)
      .then(response => {
        if(response.data.error === false){
          this.success = true
        }
      })
    },
    okHandler: function(){
      this.success = false
      this.$emit('refresh', 3)
    }
  }
}
</script>

<style>
  .input-container p{
    text-align: justify;
  }
</style>