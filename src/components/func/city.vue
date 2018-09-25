<template lang="html">
  <el-cascader :options="area" v-model="selectedOptions" @change="handleChange" :size="size"></el-cascader>
</template>

<script>
  export default {
    data() {
      return {
        area: [],
      }
    },
    props: {
      size: {
        defalut: 'small'
      },
      type: {
        defalut: '1' //全国
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
          this.areaSelect.splice(0, this.areaSelect.length);
          for (let val of value) {
            this.areaSelect.push(val)
          }
        }
      }
    },
    created() {
      this.area = JSON.parse(JSON.stringify(this.$store.getters.getArea));
      if (this.type != 1) {
        this.area.shift()
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('selectArea', value)
      }
    }
  }

</script>

