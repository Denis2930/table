<template>
  <table class="loadTable">
    <thead>
      <tr>
        <th>
          <div class="thText">
            Вода
            <img class="theadImg" src="@/assets/drop_icon-icons.com_54400.svg" alt="water">
          </div>
        </th>
        <th>
          <div class="thText">
            Электричесиво
            <img class="theadImg" src="@/assets/lightning_thunderbolt_thunder_icon_185978.png" alt="lightning">
          </div>
        </th>
        <th>
          <div class="thText">
            Газ
            <img class="theadImg" src="@/assets/fire_115156.svg" alt="fire">
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <transition-group name="indicatorTab">
        <tr v-for="indi in indicator" v-if="indicator.length" :key="indicator.id">
          <td>
            <div @input="({target})=>{saveIndicatorWater(target,indi.id)}" :textContent="indi.indicators.water || 0" contenteditable="true"></div>
          </td>
          <td>
            <div @input="({target})=>{saveIndicatorElectricity(target,indi.id)}" :textContent="indi.indicators.electricity || 0" contenteditable="true"></div>
          </td>
          <td>
            <div @input="({target})=>{saveIndicatorGas(target,indi.id)}" :textContent="indi.indicators.gas || 0" contenteditable="true"></div>
          </td>
        </tr>
      </transition-group>
    </tbody>
  </table>
</template>

<script>
export default {
    props: {
        indicator: {
          type: Array,
          require: false
        },
        enterprises: {
          type: Array,
          require: false
        }
    },
    data() {
      return {
        indicatorText: ''
      }
    },
    methods: {
      saveIndicatorWater(target, id) {
        let index = -1
        this.enterprises.reduce((ind, val, i) => { if (val.id === id) index = i }, index)
        this.enterprises[index].indicators.water = Number(target.textContent)
        localStorage.setItem('enterprises', JSON.stringify(this.enterprises))
      },
      saveIndicatorElectricity(target, id) {
        let index = -1
        this.enterprises.reduce((ind, val, i) => { if (val.id === id) index = i }, index)
        this.enterprises[index].indicators.electricity = Number(target.textContent)
        localStorage.setItem('enterprises', JSON.stringify(this.enterprises))
      },
      saveIndicatorGas(target, id) {
        let index = -1
        this.enterprises.reduce((ind, val, i) => { if (val.id === id) index = i }, index)
        this.enterprises[index].indicators.gas = Number(target.textContent)
        localStorage.setItem('enterprises', JSON.stringify(this.enterprises))
      }
    }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  max-height: 250px;
}
table th {
  border-bottom: 1px solid #6F6A6A;
  padding: 8px;
  font-weight: 500;
  font-size: 20px;
}
table th + th {
  border: none;
  border-left: 1px solid #BAAFAF;
  border-bottom: 1px solid #6F6A6A;
}
table tr + tr {
  border: none;
  border-top: 1px solid #BAAFAF;
}
table td + td {
  border: none;
  border-left: 1px solid #BAAFAF;
  border-top: 1px solid #BAAFAF;
}
table td {
  padding: 8px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
}
table td div{
  outline: 2px solid rgb(15, 72, 119);
  padding: 5px;
  border-radius: 5px;
}
.thText {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 51.5px;
}
.theadImg {
  width: 25px;
  height: 32px;
}
.indicatorTab-item {
  display: inline-block;
  margin-right: 10px;
}
.indicatorTab-enter-active,
.indicatorTab-leave-active {
  transition: all 0.4s ease;
}
.indicatorTab-enter-from,
.indicatorTab-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
</style>