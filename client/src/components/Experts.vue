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
import ExpertsRaces from './ExpertsRaces'
import ExpertsDogs from './ExpertsDogs'
import ExpertsCancel from './ExpertsCancel'
import ExpertsNew from './ExpertsNew'

// 'Собаки экспертов', 'Снятие с судейства', 'Назначение на судейство'
export default {
  name: 'Experts',
  components: {
    ExpertsRaces,
    ExpertsDogs,
    ExpertsCancel,
    ExpertsNew
  },
  data () { return {
    tabs: [
      {title: 'Обслуживание породы', name: 'ExpertsRaces'},
      {title: 'Собаки экспертов', name: 'ExpertsDogs'},
      {title: 'Снятие с судейства', name: 'ExpertsCancel'},
      {title: 'Назначение на судейство', name: 'ExpertsNew'}
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