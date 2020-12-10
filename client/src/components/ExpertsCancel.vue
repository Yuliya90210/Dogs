<template>
  <div class="container">
    <form action="">
      <div class="input-container">
        <label for="expert_selection">Выберите эксперта</label>
        <select id="expert_selection" v-model="expert">
          <option :value="item" v-for="item in experts" :key="item">{{item}}</option>
        </select>
      </div>

     <button class="ok-button" v-if="expert" @click="remove_expert($event)">Снять с судейства</button>
    </form>
    
    <div id="dark" v-if="success">
      <div id="success">
        <p>Эксперт снят с судейства</p>
        <button class="ok-button" @click="okHandler()">Хорошо</button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ExpertsCancel',
  data () {return{
    success: false,
    experts: [],
    expert: null,
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
    remove_expert: function(e){
      e.preventDefault()
      axios.post('http://localhost:5000/remove_expert', {full_name: this.expert})
      .then(response => {
        if(response.data.error === false){
          this.success = true
        }
      })
    },
    okHandler: function(){
      this.success = false
      this.$emit('refresh', 2)
    }
  }
}
</script>

<style>
  .input-container p{
    text-align: justify;
  }
</style>