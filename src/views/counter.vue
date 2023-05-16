<template>
  <div>
    <modal-window v-model:show="modalVisible">
      <add-dialog
        @create="createEnterprise"
      />
    </modal-window>
    <div style="display: flex;">
      <div class="header">
        <div class="logo">
          <h1>Счётчик</h1>
          <img src="@/assets/settingsfilter_121137.svg" alt="logo">
        </div>
        <div class="settingsButton">
          <input 
          v-model="searchQuery"
          @input="search"
          class="input" 
          type="text" 
          placeholder="Поиск..."
          >
          <button class="add" @click="showModal">
            Добавить клиента
          </button>
        </div>
      </div>
      <div v-for="indicator in indicator" class="metersData">
        Показания счётчиков:<span>{{ indicator.name }}</span>
      </div>
    </div>
    <div class="tables">
      <table class="mainTable">
        <thead>
          <tr>
            <th class="checkbox">
              Ok?
            </th>
            <th>
              <div class="thText" @click="sortByName">
                Наименование
                <img class="name" src="@/assets/sorting_icon-icons.com_61034.svg" alt="sort-icon">
              </div>
            </th>
            <th>
              <div class="thText" @click="sortByAdress">
                Адрес
                <img class="adress" src="@/assets/sorting_icon-icons.com_61034.svg" alt="sort-icon">
              </div>
            </th>
            <th>
              <div class="thText" @click="sortByDate">
                Дата
                <img class="adress" src="@/assets/sorting_icon-icons.com_61034.svg" alt="sort-icon">
                <img title="Последнее обновление указаний счётчиков" class="infoSvg" src="@/assets/information-svgrepo-com.svg" alt="information">
              </div>
            </th>
            <th class="refresh" @click="refreshBtn">
              <img src="@/assets/arrow_counter_clockwise_icon_175473.svg" alt="refresh">
            </th>
          </tr>
        </thead>
        <tbody>
          <transition-group name="enterpriseTab">
            <tr v-for="enterprise in enterprises" :key="enterprise.id">
              <td class="checkbox">
                <button 
                  class="remove"
                  @click="removeEnterprise(enterprise)"
                >
                  Удалить
                </button>
              </td>
              <td>
                {{ enterprise.name }}
              </td>
              <td>
                {{ enterprise.adress }}
              </td>
              <td>
                {{ enterprise.update }}
              </td>
              <td class="arrowRight" @click="showIndicator(enterprise)">
                <img src="@/assets/uparrow_78484.svg" alt="arrow-right">
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
      <load-table :indicator="indicator" :enterprises="enterprises"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AddDialog from '@/components/AddDialog.vue';
import loadTable from '@/components/loadTable.vue';

export default {
  components: {
    AddDialog, loadTable
  },
  data() {
    return {
      modalVisible: false,
      searchQuery: '',
      sorted: false,
      indicator: [],
    }
  },
  methods: {
    createEnterprise(enterprise) {
      this.enterprises.push(enterprise)
      localStorage.setItem('enterprises', JSON.stringify(this.enterprises))
      this.modalVisible = false;
    },
    removeEnterprise(enterprise) {
      const newEnterprises = this.enterprises.filter(e => e.id !== enterprise.id)
      this.enterprises.length = 0
      this.enterprises.push(...newEnterprises)
      localStorage.setItem('enterprises', JSON.stringify(this.enterprises))
    },
    showModal() {
      this.modalVisible = true;
    },
    sortByName() {
      if (this.sorted) {
        this.sorted = false
        this.enterprises.sort((a, b) => b.name.localeCompare(a.name))
      } else {
        this.sorted = true
        this.enterprises.sort((a, b) => a.name.localeCompare(b.name))
      }
    },
    sortByAdress() {
      if (this.sorted) {
        this.sorted = false
        this.enterprises.sort((a, b) => b.adress.localeCompare(a.adress))
      } else {
        this.sorted = true
        this.enterprises.sort((a, b) => a.adress.localeCompare(b.adress))
      }
    },
    sortByDate() {
      if (this.sorted) {
        this.sorted = false
        this.enterprises.sort((a, b) => b.update.localeCompare(a.update))
      } else {
        this.sorted = true
        this.enterprises.sort((a, b) => a.update.localeCompare(b.update))
      }
    },
    showIndicator(enterprise) {
      if (this.indicator.length) {
        this.indicator.length = 0
      }
      this.indicator.push(enterprise)
    },
    search() {
      this.enterprises.length = 0
      this.enterprises.push(...JSON.parse(localStorage.getItem('enterprises')))
      const past = this.enterprises.filter(enterprise => enterprise.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      this.enterprises.length = 0
      this.enterprises.push(...past)
    },
    refreshBtn() {
      this.enterprises.length = 0
      this.enterprises.push(...JSON.parse(localStorage.getItem('enterprises')))
    }
  },
  computed: {
    ...mapState({
      enterprises: state => state.enterprise.enterprises
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-left: 17px;
  margin-bottom: 15px;
  margin-right: 39px;
}
.logo {
  display: flex;
  margin-right: 96px;
  align-items: center;
  cursor: pointer;
}
.logo img {
  width: 36px;
  height: 36px;
}
.logo h1 {
    margin: 0 14px 5px 0;
}
.tables {
  display: flex;
}
.remove {
  font-family: 'Montserrat', sans-serif;
  background: #C4605A;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 20px;
  width: 254px;
  height: 50px;
  cursor: pointer;
}
.add {
  font-family: 'Montserrat', sans-serif;
  background: #9AC259;
  border-radius: 10px;
  border: none;
  font-weight: 500;
  font-size: 20px;
  width: 254px;
  height: 50px;
  cursor: pointer;
}
.mainTable {
  background: #C9C0C0;
  border-radius: 15px;
  margin-right: 25px;
  min-width: 835px;
}
.loadTable {
  background: #C9C0C0;
  border-radius: 15px;
  min-width: 510px;
}
.name{
  height: 26px;
  width: 26px;
  margin-left: 5px;
}
.adress{
  height: 26px;
  width: 26px;
  margin-left: 5px;
}
.refresh img {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
.arrowRight img {
  cursor: pointer;
  width: 26px;
  height: 26px;
  transform: rotate(90deg);
}
table {
  border-collapse: collapse;
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
.thText {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theadImg {
  width: 25px;
  height: 32px;
}
.metersData {
  margin-top: 10px;
  font-weight: 600;
  font-size: 25px;
  display: flex;
  flex-wrap: wrap;
}
.metersData span {
  font-weight: 500;
  font-size: 25px;
}
.settingsButton {
  display: flex;
}
.infoSvg {
  margin: 25px;
  height: 25px;
  margin: 0;
}
.input {
  font-family: 'Montserrat', sans-serif;
  border-radius: 15px;
  font-weight: 500;
  font-size: 20px;
  width: 245px;
  cursor: pointer;
  margin-right: 20px;
}
.enterpriseTab-item {
  display: inline-block;
  margin-right: 10px;
}
.enterpriseTab-enter-active,
.enterpriseTab-leave-active {
  transition: all 0.4s ease;
}
.enterpriseTab-enter-from,
.enterpriseTab-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.enterpriseTab-move {
  transition: transform 0.4s ease;
}
</style>