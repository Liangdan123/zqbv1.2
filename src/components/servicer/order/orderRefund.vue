<template>
  <div class="orderRefund">
    <!--.................退货退款或仅退款标题.................-->
    <div class="orderTitle clearfix bg-fo">   	   	
      <div :class="[([2,3].includes(checkOrder.refund_status))?'width_50':'width_33']">
        <a>1.买家申请退款</a>
      </div>
      <div v-if="checkOrder.refund_status===2" class="bg-color width_50 ">
        <a>2.用户撤销退款</a>
      </div>
      <div v-if="checkOrder.refund_status===3" class="bg-color width_50 ">
        <a>2.商家确认不通过</a>
      </div>
      <template v-else>     	
        <div :class="[([1,4].includes(checkOrder.refund_status))?'bg-color':'']" class='width_33'>
          <a>2.卖家处理退款申请</a>
        </div>
        
        <div class="width_33" 
        	:class="checkOrder.refund_status===5?'bg-color':''">
          <a>3.退款完成</a>
        </div>
      </template>
    </div>
    <div class="orderCon">
      <!--.................退款详情.................-->
      <div class="plate mt-40">
        <p class="color-3 f16 mb-20">退款详情</p>
        <div class="small_plate">
          <span class="color-7F f14 display-in">买&#12288;&#12288;家：</span>
          <em class="color-3 f14 display em">{{checkOrder.contact_name}}</em>
        </div>
        <div class="small_plate">
          <span class="color-7F f14 display-in">退款编号：</span>
          <em class="color-3 f14 display em">{{checkOrder.refund_order_no}}</em>
        </div>
        <div class="small_plate">
          <span class="color-7F f14 display-in">申请时间：</span>
          <em class="color-3 f14 display em">{{checkOrder.created_at}}</em>
        </div>
        <div class="small_plate">
          <span class="color-7F f14 display-in">退款方式：</span>
          <em class="color-3 f14 display em">仅退款 </em>
        </div>
        <div class="small_plate">
          <span class="color-7F f14 display-in">退款状态：</span>
          <em class="color-3 f14 display em" >           
            {{checkOrder.refund_status|refundStatus}}
          </em>
        </div>
        <div class="small_plate">
          <span class="color-7F f14 display-in">退款金额：</span>
          <em class="color-3 f14 display em">{{checkOrder.refund_fee_yuan|money}}</em>
        </div>
      </div>
      <!--.................退款商品.................-->
      <div class="plate mt-40">
        <p class="color-3 f16 mb-20">退款原因</p>
        <div class="small_plate remark scrollbar">
          {{checkOrder.refund_remark}}
        </div>
      </div>
      <!--.................退款原因.................-->
      <div class="plate mt-40">
        <p class="color-3 f16 mb-20">退款商品</p>
        <productTable :productMess="checkOrder.products" :isRefund="true"></productTable>
      </div>
      <div class="clearfix mt-20" v-if="checkOrder.refund_status===1">
        <el-button class="store-button2 float-r ml-10" @click="disAgress">拒绝</el-button>
        <el-button class="store-button1 float-r" @click="agree">同意</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import productTable from "@/components/servicer/order/productTable";
  import {refundAgree,refundDisagree } from "@/api/order" 
  export default {
  	filters:{
  		refundStatus(status){  			 			
  			let statusAll={
  				1:"等待商家确认",
  				2:"买家撤销退款",
  				3:"商家已拒绝",
  				4:"等待退款到账",
  				5:"已退款",
  				"defalut":"退款失败",
  			};
  			return statusAll[status]||statusAll["defalut"]
  		},
  		money(value){
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = value[0].toLocaleString();//转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
	    },
  	},
    data() {
      return {};
    },
    props: {
      //退款订单信息
      checkOrder: {
        type: Object,
        default: function () {
          return {};
        }
      },
      refundInfo: {
        type: Object,
        default: function () {}
      }
    },
    components: {
      productTable
    },
    methods: {
      //同意退款
      agree() {
        let refund_order_id = this.checkOrder.refund_order_id;
        //调用同意退款接口(接口未好)
        refundAgree(refund_order_id).then(({
          data
        }) => {
					this.$message.success('操作成功')
          this.$emit("DisAgreeAPI");
        });
      },
      //不同意退款
      disAgress() {
        let refund_order_id = this.checkOrder.refund_order_id;
        //调用拒绝退款接口(接口未好)
        refundDisagree(refund_order_id).then(({
          data
        }) => {
					this.$message.success('操作成功')
          this.$emit("DisAgreeAPI");
        });
      }
    }
  };

</script>

<style scoped="scoped" lang='scss'>
  .orderTitle {
    height: 40px;
    line-height: 40px;

    >div {
      float: left;
      height: 100%;

      a {
        text-decoration: none;
        padding-left: 70px;
        float: left;
      }

      span {
        border: 20px solid transparent;
        border-left: 15px solid #F0F4F7;
        float: right;
        position: relative;
      }

      em {
        border: 20px solid transparent;
        border-left: 15px solid #F0F4F7;
        float: right;
        position: absolute;
        top: -20px;
        left: -15px;
        z-index: 1;
      }
    }
  }

  .width_33 {
    width: 33.33%;
  }

  .width_50 {
    width: 50%;
  }

  .width_33,
  .width_50 {
    text-align: center;
    color: #62778c;
  }

  .orderTitle div.bg-color {
    background-color: #0070c9;

    a {
      color: #fff;
    }

    span {
      border-color: #F0F4F7;
    }

    em {
      border-left-color: #0070c9;
    }
  }

  .small_plate span {
    width: 70px;
    text-align: right;
  }

  .small_plate {
    line-height: 24px;
  }

  em.em {
    font-style: normal;
  }

  .small_plate.remark {
    height: 100px;
    background-color: #fafafa;
    padding: 10px;
    color: #333333;
  }

</style>
<style>
  .orderRefund .el-table {
    color: #333;
  }

  .orderRefund th {
    background-color: #f0f4f7;
  }

  .orderRefund .el-table__header-wrapper thead div {
    color: #62778c;
  }

  .orderRefund .el-table__row {
    height: 86px;
  }

  .orderRefund .btn .el-button {
    padding-right: 0;
    padding-left: 0;
    width: 72px;
  }

</style>
