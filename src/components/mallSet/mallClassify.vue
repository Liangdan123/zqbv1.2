<template>
<div class="productClassify">
  <div class="Classify">
    <div v-if="Classify.length!=0?true:false"> 
        <label class="display-b store_label" v-for="(item,index) in Classify" :key="index">       	
            <input type="radio" name="mall" @click="RadioIndex(index)" :checked="item.checked"
              :disabled="(item.level==1&&item.is_final==0)?true:false"  class="display-n"/>
            <em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
              :class="item.level===2? 'ml-20' : ''"></em>
            {{item.mall_category_name}}
        </label>  
    </div>
    <div v-else class="color-6 f18" style="text-align: center;line-height: 380px;">
      	尚未添加分类
    </div>
  </div>
	<slot></slot>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
	props: ["Classify"],

  methods: {
    RadioIndex(index) {   	
    	let mall_id={mall_category_id:this.Classify[index].id};    	
    	this.$emit("onlyMallCategorys",mall_id);
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.categorylabel {
    min-height: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #E9EEF2;
    line-height: 29px;
    > .label_item {
        display: inline-block;
        width: 74px;
        height: 24px;
        background: rgba(240,244,247,1);
        line-height: 24px;
        border-radius: 2px;
        margin-right: 10px;
        text-align: center;
    }
}

.store-button1,
.store-button2 {
    padding-left: 24px;
    padding-right: 24px;
}

.Classify {
    min-height: 384px;
    overflow-y: auto;
    padding-left: 20px;
}

.Classify::-webkit-scrollbar {
    width: 0;
}

</style>
