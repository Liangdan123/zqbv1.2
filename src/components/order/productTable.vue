<template>
  <el-table :data="productMess" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if='type=="订单服务"&&status==2'></el-table-column>
    <el-table-column label="商品" width='420'>
      <template slot-scope="scope">
        <div class="float-l mr-10 ">
          <img :src="scope.row.image_url" width="50" height="50" />
        </div>
        <div class="float-l" style="width: 330px;">
          <div class="product_name">
						 <span class='red' v-if='scope.row.already_refund!=0&&!isRefund' >【退款】</span>
            {{scope.row.product_name}}
          </div>
          <div class="spec_name" width='200'>
            <span v-for="item in scope.row.spec_name.split(';')" class="color-7F">
              {{item}}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="单价" prop="total_spec_fee_yuan" v-if='!isRefund'></el-table-column>
    <el-table-column label="单价" prop="refund_spec_fee_yuan" v-else></el-table-column>
    <el-table-column label="查看进度" v-if='(status==3||status==4)'>
      <template slot-scope="scope" v-if='scope.row.already_refund==0'>
        <span class="u-btn" v-if='activeIndex!==scope.$index' @click='checkProgress(scope.row.order_product_id,scope.$index)'>查看进度</span>
        <span class="u-btn" v-else @click='closeProgress'>隐藏进度</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
	import {getSchedule} from "@/api/order"

  export default {
    data() {
      return {
        activeIndex:''
      }
    },
    props: {
      productMess: {
        type: Array,
        default: function () {
          return []
        }
      },
      type: {
        default: ''
			},
			status:{
				default: null
      },
      isRefund:false
    },
    methods: {
      handleSelectionChange(val) {
        this.$emit('select', val)
      },
      checkProgress(id,index){
        getSchedule(id).then(({data})=>{
          this.$emit('progress', data);
          this.activeIndex=index;
        })
      },
      closeProgress(){
         this.$emit('closeProgress');
         this.activeIndex='';
      }
    }
  }

</script>

<style scoped="scoped">
  .el-table__row {
    height: 86px;
  }

  .product_name {
    height: 24px;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }

  .spec_name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spec_name span {
    margin-left: 4px;
  }
	  .red{
    color:#B4282D
  }

</style>
