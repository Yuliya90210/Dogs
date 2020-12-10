<template>
  <div class="container">
    <form>
      <h4>Выберите необходимую информацию</h4>

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
        <select id="name_selection" v-model="name" @change="got_name()">
          <option :value="item" v-for="item in names" :key="item">{{item}}</option>
        </select>
      </div>

      <div class="input-container" v-if="race && current_club && name">
        <label for="number_selection">Выберите номер собаки в клубе</label>
        <select id="number_selection" v-model="number">
          <option :value="item" v-for="item in numbers" :key="item">{{item}}</option>
        </select>
      </div>

      <button class="ok-button" @click="get_reference($event)" v-if="race && current_club && name && number">Получить справку</button>
    </form>

    <form>
        <h4>Справка</h4>
      <div v-if="show">
        <p>
          Выдана собаке с кличкой {{name}} о том, что она является участником выставки собак.
        </p>
        <p>
          Порода: {{race}} 
        </p>
        <p>
          Возраст: {{age}} 
        </p>
        <p>
          Мать: {{mother}} 
        </p>
        <p>
          Отец: {{father}} 
        </p>
        <p>
          Ринг: {{ring}} 
        </p>
        <p>
          Клуб: {{current_club.title}} 
        </p>
        <p>
          Номер в клубе: {{number}} 
        </p>
        <p>
          Призовое место: {{prize}}
        </p>
      </div>
      
      <div class="lds-ellipsis" v-if="!show"><div></div><div></div><div></div><div></div></div>
    </form>

  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'Ref',
  data () {
    return {
      show: false,
      success: false,
      clubs: [],
      races: [],
      names: [],
      numbers: [],
      number: null,
      current_club: null,
      race: null,
      name: null,
      prize: null,
      mother: null,
      father: null,
      ring: null,
      age: null
      
    }
  },
  mounted () {
    this.get_clubs()
  },
  methods: {
    get_clubs: function(){
      this.show = false
      axios.get('http://localhost:5000/get_clubs')
      .then(response => {
        this.clubs = response.data.data
      })
    },

    got_current_club: function(){
      this.show = false
      this.new_clubs = this.clubs.filter(item => item != this.current_club )
      this.names = []
      this.races = []
      this.name = null
      this.race = null
      axios.get('http://localhost:5000/get_club_races', 
        {params: {current_club:this.current_club.id}})
        .then(response => {
          this.races = response.data.data
        })
    },

    got_race: function(){
      this.name = null
      this.show = false
      axios.get('http://localhost:5000/get_club_names', 
        {params: {current_club:this.current_club.id, race:this.race}})
        .then(response => {
          this.names = response.data.data
        })
    },

    got_name: function(){
      this.show = false
      axios.get('http://localhost:5000/get_numbers', 
        {params: {current_club:this.current_club.id, race:this.race, name: this.name}})
        .then(response => {
          this.numbers = response.data
        })
    },

    get_reference: function(e){  
      e.preventDefault()
      let data = {
        club: this.current_club.id,
        name: this.name,
        race: this.race,
        number: this.number
      }
      axios.get('http://localhost:5000/get_reference', {params: data})
        .then(response => {
          this.prize = response.data.prize
          this.mother = response.data.mother
          this.father = response.data.father
          this.age = response.data.age
          this.ring = response.data.ring
          this.show = true
        }
      )
    }
  }
}
</script>

<style scoped>
  .container{
    display: grid;
    grid-template-areas: 'form ref';
    align-items: flex-start;
  }

  form{
    width:700px;
    margin: 0px auto 30px auto;
    border-radius: 10px;
  }

  form:first-child{
    grid-area: form;
  }


  form:last-child{
    grid-area: ref
  }
  form h4{
    padding: 20px 30px 0 30px;
    margin: 0 0 10px 0;
    text-align: center;
  }
  form p{
    padding: 10px 30px 10px 30px;
    text-align: justify;
    text-indent: 40px;
    line-height: 32px;
  }

  form p:last-child{
    margin-bottom: 20px;
  }


  form ul{
    padding-left: 12px;
    list-style: '•';
  }
  form li{
    padding-left: 10px;

  }

  .input-container{
    width:650px;
  }


/* ............................ */

.lds-ellipsis {
  margin: 10px auto;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--primary);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}



  
</style>