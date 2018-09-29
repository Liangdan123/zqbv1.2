<template>
  <div class="allOrder commodity" @click="closeSearch">
    <Navbar></Navbar>
    <!--..............订单详情弹框..................-->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" class="order" :title="type">
      <svg width="26" height="26" class="closebox cursor" @click="dialogVisible = false">
          <use xlink:href="#close" />
        </svg>
      <el-button class="productSet" v-if="type==='订单详情'&&orderLists[index].status===2" @click="setPro"><i class="iconfont icon-kaishifuwu f12"></i> 开始服务</el-button>
      <!--.................主体内容....................-->
      <orderDetail :checkOrder="onlyOrderMess" :pay_info="pay_info" :shipping_info="shipping_info" :type="type" @closeBox="closeBox" :logisticsInfo="logisticsInfo">
      </orderDetail>
    </el-dialog>
    <div class="g-content">
      <!--.....................搜索框........................-->
      <div class="buttons clearfix mb-20">
        <search :search.sync="orderMess.search" @searchMethod="searchMethods" @emptyMthod='emptyMthod' ref="isShow" inputSearch='order_search'></search>
      </div>
      <!--........................表格...............-->
      <bought :orderData="orderData" :orderMess="orderMess" @handleCurrent="handleCurrent" :orderLists="orderLists" @showOrder="showOrder" @showlogist="showlogist" @showSetOrder="showSetOrder" v-loading="loading">
      </bought>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/servicer/order/Navbar";
  import bought from "@/components/order/bought"
  import order from "@/utils/order"
  import orderDetail from "@/components/order/orderDetail"
  export default {
    name: "allOrder",
    data() {
      return {
        orderMess: {
          page: 1,
          search: {
            type: 0,
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
        logisticsInfo: {},
        loading: true,
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
      //查看订单时的物流信息
      showlogist(data) {
        this.logisticsInfo = data;
      },
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
      //搜索条件按照条件获取订单列表
      searchMthod(data) {
        if (data !== undefined) {
          this.$set(this.orderMess.search, "create_time", data);
        } else if (data === undefined) {
          delete this.orderMess.search.create_time;
        }
        //调用订单列表API的方法
        this.searchMethods()
      },
      //搜索里的输入框搜索
      inputSearch(data) {
        if (data === "") {
          //当值为空的时候全部显示出列表
          if (this.orderMess.search.order_search !== undefined) {
            delete this.orderMess.search.order_search
          }
        } else {
          this.$set(this.orderMess.search, "order_search", data);
        }
        this.searchMethods()
      },
      emptyMthod() {
        if (this.orderMess.search.create_time != undefined) {
          delete this.orderMess.search.create_time
        }
        this.searchMethods()
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
