<template>
  <div class="selectType">
    <el-select 
    	v-model="is_company" 
    	placeholder="请选择" 
    	size="small" 
    	@change="select" 
    	v-if="companyShow">
      <el-option v-for="item in options1" 
      	:key="item.value" 
      	:label="item.label" 
      	:value="item.value">
      </el-option>
    </el-select>
    
    <el-select 
    	v-model="type" 
    	placeholder="角色选择" 
    	size="small" 
    	@change="select"  
    	v-if="typeShow">
      <el-option 
      	v-for="item in options2" 
      	:key="item.value" 
      	:label="item.label" 
      	:value="item.value">
      </el-option>
      
    </el-select>
    
    <el-select v-model="business_range" 
    	placeholder="业务范围选择" 
    	size="small" 
    	@change="select" 
    	v-if="businessShow">
      <el-option 
      	v-for="item in options3" 
      	:key="item.value" 
      	:label="item.label" 
      	:value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {getMallClassifyList} from "@/api/platform"
 
  export default {
    props: {
      search: {//搜索条件
        default: () => {
          return {}
        }
      },
      inputType: {
        default: () => {
          return ["is_company", 'type', 'business_range']
        }
      }
    },
    watch: {
      search(val){   	
       	this.type = val['type']||"";      	
       	this.business_range = val['business_range']||"";      	
       	this.is_company = val['is_company']||1;
      }
    },

    data() {
      return {
        options1: [{
            value: 1,
            label: "企业"
          },
          {
            value: 0,
            label: "个人"
          }
        ],
        type: "",
        options2: [{
            value: "",
            label: "全部"
          },
          {
            value: "2",
            label: "服务商"
          },
          {
            value: "3",
            label: "代理商"
          },
          {
            value: "4",
            label: "合伙人"
          }
        ],
        business_range: "",
        options3: [{
          value: "",
          label: "全部"
        }],
        companyShow: true,
        typeShow: true,
        businessShow: true,
        isSearch:true,
        is_company:1,
      }
     
    },
    async created() {
      this.companyShow = this.inputType.includes('is_company');
      this.typeShow = this.inputType.includes('type');
      this.businessShow = this.inputType.includes('business_range');
      if (!this.businessShow) {
        return;
      }
      let arr = [];
      //获取商城分类列表
      let {data} = await getMallClassifyList()     
      arr = data;
      this.options3 = [{
        value: "",
        label: "全部"
      }];
      for (let val of arr) {
        this.options3.push({
          value: val.id,
          label: val.mall_category_name,
        })
      }
    },
    methods: {
      select() {
        if (this.companyShow) {
          this.search.is_company = +this.is_company;
        };
        if (this.typeShow) {       	
          if (this.type) {
            this.search.type = this.type
          } else {
            delete this.search.type
          }
        }
        if (this.businessShow) {      	
          if (this.business_range) {
            this.search.business_range = this.business_range
          } else {
            delete this.search.business_range
          }
        };
        console.log(this.is_company,this.type,this.business_range);
        this.$emit("searchMethod")      
      }
    }
  }

</script>

<style scoped lang="scss">
  .selectType {
    display: inline-block;
    >.el-select{
      width:200px;
      height:32px;
      margin-right:10px;
    }
  }

</style>
