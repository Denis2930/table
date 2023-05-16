<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'custom-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    font-family: 'Montserrat', sans-serif;
    width: calc(100% - 40px);
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
    border-radius: 5px;
}
</style>
