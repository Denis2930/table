<template>
    <form @submit.prevent>
        <h4>Добавить плательщика</h4>
        <custom-input
            v-model="enterprise.name"
            type="text"
            placeholder="Наименование"
        />
        <custom-input
            v-model="enterprise.adress"
            type="text"
            placeholder="Адрес"
        />
        <button class="add" @click="createEnterprise">Добавить</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            enterprise: {
                name: '',
                adress: ''
            }
        }
    },
    methods: {
    createEnterprise() {
      const newEnterprise = {
        id: Date.now(),
        name: this.enterprise.name,
        adress: this.enterprise.adress,
        update: new Date().toLocaleString(),
        indicators: {
            electricity:'',
            gas:'',
            water:''
        }
      }
      this.enterprise.name = '',
      this.enterprise.adress = '',
      this.$emit('create', newEnterprise)
    }
  },
}
</script>

<style scoped>
form {
    border-radius: 10px;
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
  margin-top: 15px;
}
h4 {
    margin: 0;
}
</style>