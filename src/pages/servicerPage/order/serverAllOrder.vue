<template>
  <div class="allOrder commodity" @click="closeSearch">
    <Navbar></Navbar>
    <!--..............订单详情弹框..................-->
    <el-dialog :visible.sync="dialogVisible" 
    	:close-on-click-modal="false" 
    	:show-close="false" 
    	class="order" 
    	:title="type">
      <svg width="26" height="26"
      	class="closebox cursor" 
      	@click="dialogVisible = false">
          <use xlink:href="#close" />
        </svg>
      <el-button class="productSet"
      	 v-if="type==='订单详情'&&orderLists[index].status===2" 
      	 @click="setPro">
      	 <i class="iconfont icon-kaishifuwu f12">  </i>    	 	
      	 开始服务
      </el-button>
      <!--.................主体内容....................-->
      <orderDetail 
      	:checkOrder="onlyOrderMess" 
      	:pay_info="pay_info" 
      	:shipping_info="shipping_info"
      	:type="type" 
      	@closeBox="closeBox">
      	
      </orderDetail>
    </el-dialog>
    <!-- 发票申请 -->
	  <el-dialog 
	  	:visible.sync="InvoiceVisible" 
	  	:close-on-click-modal="false"  
	  	class="order" 
	  	title="发票申请">
	    <InvoiceApply :InvoiceData="InvoiceData">	    	
	    </InvoiceApply>
	  </el-dialog>
	  
    <div class="g-content">
      <!--.....................搜索框........................-->
      <div class="buttons clearfix mb-20">
        <search :search.sync="orderMess.search" 
        	@searchMethod="searchMethods" 
        	@emptyMthod='searchMethods' ref="isShow" 
        	inputSearch='order_search'>
        </search>
      </div>
      <!--........................表格...............-->
      <bought :orderData="orderData" :orderMess="orderMess" 
      	@handleCurrent="handleCurrent" :orderLists="orderLists" 
      	@showOrder="showOrder"  
      	@showSetOrder="showSetOrder" 
      	@Invoice='Invoice' 
      	v-loading="loading">
      	
      </bought>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/servicer/order/Navbar";
  import bought from "@/components/servicer/order/bought"
  import order from "@/utils/order"
  import orderDetail from "@/components/servicer/order/orderDetail"
  import InvoiceApply from "@/components/servicer/order/InvoiceApply"
  import {getInvoice} from "@/api/order"
  export default {
    name: "serverAllOrder",
    data() {
      return {
        orderMess:{
          page: 1,
          search: {
            type: 0,
          },
          per_page:20,
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
    components: { Navbar, bought,orderDetail,InvoiceApply},                   
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
<style scoped="scoped">
  .productSet {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
<style>
  .el-dialog__wrapper.order .el-dialog__title {
    font-size: 20px;
    color: #333;
  }
</style>
