<template>
<div class="storeLink_nav clearfix">
  <div class="search-input float-r">
    <input type="text" v-model="searchValue" :placeholder="placeholder" v-if="placeholder"/>
    <input type="text" v-model="searchValue" placeholder="输入商品相关信息进行搜索"  @keyup.enter="inputName" v-else />
    <el-button class="store-button1" @click="inputName">
      <svg width="16" height="16"><use xlink:href="#seacher"/></svg>
    </el-button>
  </div>
  <div class="float-r filter pos-r mr-10">
    <div class="filter-vis"   @click.stop="switchShow=!switchShow">
      <svg height="12px" width="12px"><use xlink:href="#shaixuan"/></svg>
      <span class="color-3" v-if="">筛选商品</span>
      <img src="../../assets/image/xiala.png" width="12">
    </div>
    <transition name="el-zoom-in-top">
      <div class="filter-switch pos-a" v-if="switchShow" @click.stop="">
        <p class="color-3" >筛选条件</p>
        <slot></slot>
        <div class="search-select">
          <el-button class="store-button1" @click="Search">搜索</el-button>
          <el-button class="store-button2" @click="Empty">清空条件</el-button>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return{
      searchValue: "",
      switchShow: false,
    }
  },
  props:['placeholder'],
  methods: {
    inputName(){
      //商品名称搜索
      if(this.searchValue!==""){
      	var product_name=this.searchValue;
        var search={
          product_name
        };
      };
      this.$emit("searchCondition",search)
    },
    Search(){
       this.$emit("searchMthod");
       this.closeSearch();
    },
    Empty(){   	
      this.$emit("emptyMthod");
    },
    closeSearch(){
    	this.switchShow=false;
    }
  }
}
</script>

<style scoped lang="scss">
.storeLink_nav .filter {
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    cursor: pointer;
}
.search-input {
    height: 32px;
    line-height: 32px;
    width: 260px;
    background: #FFFFFF;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    input {
        width: 206px;
        padding-left: 10px;
        display: block;
        height: 100%;
        border: none;
        outline: none;
        float: left;
    }
    button {
        width: 44px;
        float: right;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
    }
}
.filter-vis {
    padding-left: 10px;
    padding-right: 8px;
}
.filter-switch {
    top: 40px;
    left: 0;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
    border-radius: 2px;
    padding: 20px;
    min-width: 267px;
}

.search-select {
    text-align: right;
    margin-top: 16px;
    .store-button1,
    .store-button2 {
        padding:0;
        text-align: center;
        height: 24px;
        line-height: 8px;
        width: 60px;
    }
}
.filter-switch {
  z-index: 50;
}
</style>
<style>
.filter-switch .classify .el-select .el-input__inner {
  width:184px;
  height: 24px;
  line-height: 24px;
  border-radius: 2px;
  font-size: 12px;
  border: 1px solid #D6D6D6
}

.filter-switch .classify .el-select .el-input__inner:focus {
  border: 1px solid #0070C9;
}

.search-select .store-button1.el-button span,
.search-select .store-button2.el-button span {
  font-size: 12px;
}

.search-input .store-button1.el-button span {
  display: block;
  text-align: center;
  width: 44px;
  height: 100%;
}
</style>
