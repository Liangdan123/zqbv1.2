<template>
  <div class="">
    <ul class="table_title">
      <li>商品</li>
      <li>单价</li>
      <li>交易状态</li>
      <li>买家</li>
      <li>实际收款</li>
      <li>操作</li>
    </ul>
    <div v-if="orderLists.length">
      <div class="bought" v-for="(item,index) in orderData.data">
        <div class="boughtHead clearfix">
          <div class="float-l" v-if="isShopName">{{item.shop_name}}</div>
          <div class="float-r">
          	 订单号：
            <span class="orderNumber">
            	{{item.order_no}}
            </span> 
            	创建时间：
            <span>{{item.created_at}}</span>
          </div>
        </div>
        <div class="clearfix pos-r">
          <ul class="clearfix top " v-for="(child,i) in item.order_products">
            <li class="item-1" :class="i===(item.order_products.length-1)?'':'border-b'">
              <div class="v_center">
                <img :src="child.image_url" alt="商品图片">
              </div>
            </li>
            <li class="item-2" :class="i===(item.order_products.length-1)?'':'border-b'">
              <div class="v_center">
                <span class='red' v-if='child.already_refund!=0'>
                	【退款】
                </span>
                {{child.product_name}}<br>
                <span v-for="i in child.spec_name.split(';')">
                  {{i}}
                </span>
              </div>
            </li>
            <li :class="i===(item.order_products.length-1)?'':'border-b'" class='item-3'>
              <div class="v_center">
                {{child.total_spec_price_yuan||0|money}}
              </div>
            </li>
          </ul>
          <!--...............多个订单数量总和............-->
          <ul class="clearfix pos-a ul_right">
            <li>
              <div class="v_center">
                {{item.status|tradeStatus}}
              </div>
            </li>
            <li>
              <div class="v_center">
                {{item.shipping_info.contact_name}}
              </div>
            </li>
            <li>
              <div class="v_center text-c">
                	{{item.pay_info.pay_fee_yuan||0|money}}<br>
                	<span class="color-7F">
                		(优惠券:{{item.pay_info.total_coupon_yuan||0|money}})
                	</span>
              </div>
            </li>
            <li>
              <div class="v_center">
                <el-button class="store-button3 " v-if="item.status===2" 
                	@click="setPro(index)">
                	开始服务 
                </el-button>
                <div class="color-b cursor text-c" @click="checkOrder(index)">
                	查看订单
                </div>
                <div class="color-b cursor text-c" 
                	v-if="item.all_refund===0&&item.finish_status===0&&([2,3,4].includes(item.status))"
                	@click="setPro(index,'退款')">
                	退款
                </div>
                <div class="color-b cursor text-c" 
                	@click="Invoice(item.split_order_id)" 
                	v-if='item.status==4&&item.is_invoice==1'>
                	发票申请
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--.................没有订单的时候..............-->
    <div v-if="orderLists.length?false:true" 
    	class="color-3 f14 text-c non_order">
     	未发现相关的订单
    </div>
    <el-pagination 
    	:total="orderData.total" 
    	:current-page.sync="orderMess.page" 
    	:page-size="orderMess.per_page" 
    	v-if='orderData.total>orderMess.per_page'
      class="mt-20" 
      @current-change="handleCurrent" 
      layout="total, prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
  import {  complete } from "@/api/order"   
  export default {
  	filters:{
  		tradeStatus(num){
				let status={
					1:function(){
						return "未付款"
					},
					2:function(){
						return "未服务"
					},
					3:function(){
						return "服务中"
					},
					4:function(){
						return "交易完成"
					},
					5:function(){
						return "交易已取消"
					},
					6:function(){
						return "交易已关闭"
					},
					"default":function(){
						return "交易已删除"
					}
				}
  			return (status[num]||status["default"])()
  		},
		 	money(value){
        // 金额转换成数字和整数部分
        value = Number(value).toFixed(2).split('.');
        let value_int = value[0].toLocaleString();//转换成金额形式
        return `￥ ${value_int}.${value[1]}`;
	    },
  	},
    data() {
      return {
        split_order_id: "",
      }
    },
    props: {
      orderData: {
        type: Object,
        default: function () {
          return {
            data: []
          }
        }
      },
      orderMess: {
        type: Object,
        default: function () {
          return {}
        }
      },
      orderLists: {
        type: Array,
        default: function () {
          return []
        }
      },
      isShopName: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    methods: {
      //分页传过来的事件
      handleCurrent(val) {
        this.$emit("handleCurrent", val)
      },
      //查看订单
      checkOrder(data) {
        this.$emit("showOrder",data);
      },
      //开始服务
      setPro(data,title) {        
      	this.$emit("showSetOrder",data,title);
      },
      Invoice(id) {
        this.$emit("Invoice", id)
      }
    }
  }

</script>


<style scoped="scoped" lang="scss">
 .table_title {
    width: 1200px;
    height: 40px;
    background: #eef1f6;
    color: #62778C;
    overflow: hidden;

    >li {
      float: left;
      width: 110px;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      color: #333;

      &:first-child {
        width: 300px;
        padding-left: 90px;
      }

      &:nth-child(2) {
        width: 250px;
      }
    }
  }

  .bought {
    box-shadow: 0px -1px 0px 0px #e9eef2, -1px 0px 0px 0px #e9eef2, 1px 0px 0px 0px #e9eef2;
    border-bottom: 1px solid #E9EEF2;
    .boughtHead {
      height: 32px;
      background: #EEF6FD;
      color: #62778C;
      line-height: 32px;
      margin-top: 10px;
      padding-left: 20px;
      padding-right: 20px;
      text-align: right;
      .orderNumber {
        margin-right: 40px;
      }
    }

    ul {
      height: 86px;

      >li {
        float: left;
        width: 110px;
        padding-left: 20px;
        height: 86px;
        position: relative;

        img {
          height: 50px;
          width: 50px;
        }
      }

      >.item-1 {
        width: 50px;
      }

      >.item-2 {
        width: 300px;
      }

      >.item-3 {
        width: 250px;
      }
    }
  }

  .non_order {
    border: 1px solid #E9EEF2;
    height: 70px;
    line-height: 70px;
  }

  .store-button3.el-button {
    padding: 5px;
  }

  .border-b {
    border-bottom: 1px solid #E9EEF2;
  }

  .bought ul.top {
    width: 660px;
  }

  .bought .ul_right {
    top: 0;
    left: 660px;
  }

  .red {
    color: #B4282D
  }

</style>
