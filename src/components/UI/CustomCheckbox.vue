<template>
    <input 
    @input="(event) => $emit('update:checked', event.target.checked)"
    :id="id" 
    type="checkbox" 
    :checked="checked"
    />
    <label 
    @click="select"
    :for="id">
    </label>
</template>

<script>
export default {
    name: 'custom-checkbox',
    props: {
        id: {
            type: Number,
            require: true
        },
        label: Number,
        checked: {
            type: Boolean,
        },
    },
    methods: {
        select({ target }) {
            if (target.style.background) {
                target.style.background = ''
            } else {
                target.style.background = 'center no-repeat blue'
                target.style.backgroundSize = 'cover';
            }
        }
    }
}
</script>

<style scoped>
input {
  display: none;
}
label {
  cursor: pointer;
  display: inline-block;
  width: 26px;
  height: 26px;
  border: 3px solid black;
  border-radius: 8px;
}
input[name=checked] ~ label {
    background: center no-repeat url(@/assets/anydo_104098.png);
    background-size: cover;
}
</style>