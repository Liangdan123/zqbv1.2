<template>
  <area-cascader type='text' v-model='selectedOptions' :data="pca" @change="handleChange" :size="size" :placeholder="placeholder"></area-cascader>
</template>

<script>
  import {
    pca
  } from 'area-data'; // v5 or higher
  export default {
    data() {
      return {
        pca: pca
      }
    },
    props: {
      placeholder:{
        defalut: ''
      },
      size: {
        defalut: 'small'
      },
      areaSelect: {
        default: () => {
          return []
        }
      }
    },
    computed: {
      selectedOptions: {
        get() {
          return this.areaSelect;
        },
        set(value) {
          this.areaSelect.splice(0,this.areaSelect.length)
          for(let val of value){
             this.areaSelect.push(val)
           }
        }
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('selectArea', value)
      }
    }
  }

</script>

<style >
.area-cascader-wrap{
  line-height: normal;
  width: 100%;
}
.cascader-menu-list .cascader-menu-option.selected{
  color:#20a0ff;
}
</style>
