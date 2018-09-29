<template>
	<div class="allOrder commodity" @click="closeSearch">
		<Navbar></Navbar>
		<!--............弹框左右按钮............-->
		<svg width="30" height="30" class="next" @click="nextProduct">
				<use xlink:href="#right" v-if="dialogVisible&&index!=orderLists.length-1" />
			</svg>
		<svg width="30" height="30" class="prev" @click="prevProduct">
				<use xlink:href="#left" v-if="dialogVisible&&index!=0" />
			</svg>
		<!--..............订单详情弹框..................-->
	  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" class="order" :title="type">
      <svg width="26" height="26" class="closebox cursor" @click="dialogVisible = false">
          <use xlink:href="#close" />
        </svg>
      <!--.................主体内容....................-->
      <orderDetail :checkOrder="onlyOrderMess" :pay_info="pay_info" :shipping_info="shipping_info" :type="type" @closeBox="closeBox">
      </orderDetail>
    </el-dialog>
    <!-- 发票申请 -->
      <el-dialog :visible.sync="InvoiceVisible" :close-on-click-modal="false"  class="order" title="发票申请">
         <el-form  label-width="150px" class='Invoice'>
          <el-form-item label="发票性质：">{{InvoiceData.type==1?'专票':'普票'}}</el-form-item>
          <template v-if='InvoiceData.type==1'>
           <el-form-item label="开户名：">{{InvoiceData.kaihu_name}}</el-form-item>
            <el-form-item label="开户行：">{{InvoiceData.kaihu_bank}}</el-form-item>
            <el-form-item label="电话：">{{InvoiceData.kaihu_phone}}</el-form-item>
            <el-form-item label="账号：">{{InvoiceData.kaihu_account}}</el-form-item>
            <el-form-item label="纳税人识别地址：">{{InvoiceData.kaihu_address}}</el-form-item>
          </template>
          <template v-else>
           <el-form-item label="公司名称：">{{InvoiceData.company_name}}</el-form-item>
            <el-form-item label="税号：">{{InvoiceData.tax_num}}</el-form-item>
          </template>
        </el-form>
      </el-dialog>
    <div class="g-content">
      <!--.....................搜索框........................-->
      <div class="buttons clearfix mb-20">
        <search :search.sync="orderMess.search" @searchMethod="searchMethods" @emptyMthod='searchMethods' ref="isShow" inputSearch='order_search'></search>
      </div>
      <!--........................表格...............-->
      <bought :orderData="orderData" :orderMess="orderMess" @handleCurrent="handleCurrent" :orderLists="orderLists" @Invoice='Invoice' @showOrder="showOrder" v-loading="loading">
      </bought>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/servicer/order/Navbar";
  import bought from "@/components/order/bought"
  import order from "@/utils/order"
  import orderDetail from "@/components/order/orderDetail"
	import {getInvoice} from "@/api/order"

  export default {
    name: "CompletedOrder",
    data() {
      return {
        orderMess: {
          page: 1,
          search: {
            type: 4,
          },
          per_page: 1,
        },
        orderData: {}, //订单全部数据（包括页码）
        orderLists: [{
          status: ""
        }], //订单列表数据
        dialogVisible: false, //弹框显示
        index: 0,
        onlyOrderMess: {}, //订单详情信息
        type: "", //传到子集的标题
        pay_info: {},
        shipping_info: {},
        loading: true,
        InvoiceData:{},
        InvoiceVisible:false
      }
    },
    components: {
      Navbar,
      bought,
      orderDetail
    },
    mixins: [order],
    created() {
      let shop_id = this.$store.getters.getShop_id;
      this.orderMess.search = Object.assign({}, this.orderMess.search, {
        shop_id: shop_id
      })
      this.searchMethods(this.orderMess)
    },
    methods: {
      //分页传过来的事件（每次改变页面调用接口,子集的子集）
      handleCurrent(val) {
        var search = this.orderMess.search;
        this.$set(this.orderMess, "page", val);
        //调用列表接口
        this.orderList(this.orderMess);
      },
      //确定或取消发货时关闭弹窗
      closeBox(data) {
        if(data){
          this.searchMethods(); //发货后重新拉取列表
        }
        this.dialogVisible = false
      },
      //点击商品发货
      setPro() {
        this.type = "订单服务"
      },
      Invoice(id){
        getInvoice(id).then(({data})=>{
          this.InvoiceData=data;
          this.InvoiceVisible=true;
        })
      }
    }
  }
</script>

<style>
  .el-dialog__wrapper.order .el-dialog__title {
    font-size: 20px;
    color: #333;
  }
  .Invoice .el-form-item{
      margin-bottom:0;
  }
</style>
