<template>
  <section>
    <nav>
      <div class="nav-button" 
        @click="currentTab = counter"
        v-for="(tab, counter) in tabs"
        :class="{ active: currentTab === counter }" 
        :key="counter">
          {{tab.title}}
      </div> 
    </nav>

    <component :is="tabs[currentTab].name" @refresh="refreshComp"></component>
  </section>
</template>

<script>
import ClubsInfo from './ClubsInfo'
import ClubsChange from './ClubsChange'

export default {
  name: 'Clubs',
  components: {
    ClubsInfo,
    ClubsChange
  },
  data () { return {
    tabs: [
      {title: 'Информация о клубах', name: 'ClubsInfo'},
      {title: 'Сменить клуб', name: 'ClubsChange'},
    ],
    currentTab: 0
  }},
  methods: {
    refreshComp: function(t){
      console.log(t)
      this.currentTab = 0
      setTimeout(() => {
        this.currentTab = t
      });
    }
  }
}
</script>