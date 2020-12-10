<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.name">
          {{column}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!tableData.length">
        <td :colspan="columns.length" align="center">
          Нет ииформации по данному запросу
        </td>
      </tr>
      <tr v-for="(row, index) in tableData" :key="index">
        <td v-for="(val, counter) in row" :key="index+'.'+counter">
          {{val}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['columns', 'tableData']
}
</script>