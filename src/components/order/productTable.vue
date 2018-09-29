<template>
  <el-table :data="productMess" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if='type=="订单服务"'></el-table-column>
    <el-table-column label="商品">
      <template slot-scope="scope">
        <div class="float-l mr-10 ">
          <img :src="scope.row.image_url" width="50" height="50" />
        </div>
        <div class="float-l" style="width: 84px;">
          <div class="product_name">
						 <span class='red' v-if='scope.row.already_refund!=0'>【退款】</span>
            {{scope.row.product_name}}
          </div>
          <div class="spec_name">
            <span v-for="item in scope.row.spec_name.split(';')" class="color-7F">
              {{item}}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="单价" prop="total_spec_fee_yuan"></el-table-column>
    <el-table-column label="查看进度" v-if='(status==3||status==4)'>
        <span slot-scope="scope" class="u-btn" v-if='scope.row.already_refund==0'>查看进度</span>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {}
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
			}
    },
    methods: {
      handleSelectionChange(val) {
        this.$emit('select', val)
      },
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
    width: 84px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }

  .spec_name {
    width: 84px;
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
