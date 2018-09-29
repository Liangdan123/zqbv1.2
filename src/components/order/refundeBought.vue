<template>
  <div class="refundBought">
    <!--...................拒绝退款弹框...........-->
    <el-dialog title="温馨提示" :visible.sync="dialogDisagree" :close-on-click-modal="false">
      <span class="color-3 f14 display-b">你是否确定拒绝本次退款申请？</span>
      <span class="color-7F f14 display-b">确定拒绝后，订单会恢复成原来状态继续进行交易</span>
      <div class="clearfix mt-10">
        <el-button class="store-button2 float-r" @click="lastCancel">取消</el-button>
        <el-button class="store-button1 float-r mr-10" @click="lastSure">确定</el-button>
      </div>
    </el-dialog>
    <!--...................搜素...........-->
		<search :search.sync="orderMess.search" @searchMethod="searchMthod" @emptyMthod='searchMthod' ref="isShow" inputSearch='order_search'></search>
    <ul class="table_title mt-20">
      <li>商品信息</li>
      <li></li>
      <li>买家</li>
      <li>退款方式</li>
      <li>退款状态</li>
      <li>退款金额</li>
      <li>操作</li>
    </ul>
    <div v-if="orderLists.length">
      <div class="bought" v-for="(item,index) in orderData.data">
        <p class="boughtHead text-r">
          退款编号: <span class="orderNumber">{{item.refund_order_no}}</span>
          申请时间：<span>{{item.created_at}}</span>
        </p>
        <div class="clearfix pos-r">
          <ul class="clearfix top " v-for="(child,i) in item.order_products">
            <li class="item-1" :class="i===(item.order_products.length-1)?'':'border-b'">
              <div class="v_center">
                <img :src="child.image_url" alt="商品图片">
              </div>
            </li>
            <li class="item-2" :class="i===(item.order_products.length-1)?'':'border-b'">
              <div class="v_center">
                {{child.product_name}}<br>
                <span v-for="i in  child.spec_name.split(';')">
                  {{i}}
                </span>
              </div>
            </li>
            <li :class="i===(item.order_products.length-1)?'':'border-b'">
              <div class="v_center">
               {{child.refund_spec_fee_yuan}}
              </div>
            </li>
          </ul>
          <!--...............多个订单数量总和............-->
          <ul class="clearfix pos-a ul_right">
            <li>
              <div class="v_center">
                {{item.contact_name}}
              </div>
            </li>
            <li>
              <div class="v_center">
                仅退款
              </div>
            </li>
            <li>
              <div class="v_center text-c" >
                {{item.refund_status===1?"等待商家确认":item.refund_status===2?"买家撤销退款":item.refund_status===3?
                "商家已拒绝":item.refund_status===4?"等待退款":item.refund_status===5?"已退款":"退款失败"}}
              </div>
            </li>
            <li>
              <div class="v_center">
                <span style="color: #B4282D;">￥{{item.refund_fee_yuan}}</span><br>
              </div>
            </li>
            <li>
              <div class="v_center btn">
                <div class="clearfix mb-10" v-if="item.refund_status===1">
                  <el-button class="store-button1 float-l" @click="agree(item)">同意</el-button>
                  <el-button class="store-button2 float-l" @click="disAgress(item)">拒绝</el-button>
                </div>
                <span class=" color-b cursor" @click="checkOrder(index)">查看退款详情</span>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </div>
    <!--.................没有订单的时候..............-->
    <div v-if="orderLists.length?false:true" class="color-3 f14 text-c non_order">
      未发现相关的订单
    </div>

  </div>
</template>

<script>
  import {
    refundAgree,
    refundDisagree,
  } from "@/api/order"
  import {
    setUnion
  } from "@/api/script"
  export default {
    data() {
      return {
        dialogDisagree: false,
        refund_order_id: "",
        refund: "",
        refundPro: "",
        refund_type: [],
        shipment: "",
        receipt: "",
        account: "",
        shipping_time: "",
        refundInfo: {
          data: []
        },
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
      }
    },
    methods: {
      //同意退款
      agree(data) {
        let refund_order_id = data.refund_order_id
        //调用同意退款接口(接口未好)
        refundAgree(refund_order_id)
          .then(({
            data
          }) => {
            this.$emit("againList")
          })
      },
      //拒绝退款
      disAgress(data) {
        this.refund_order_id = data.refund_order_id;
        this.dialogDisagree = true;
      },
      //拒绝退款弹框的取消
      lastCancel() {
        this.dialogDisagree = false;
      },
      //拒绝退款弹框的确定
      lastSure() {
        let refund_order_id = this.refund_order_id
        //调用拒绝退款接口(接口未好)
        refundDisagree(refund_order_id)
          .then(({
            data
          }) => {
            this.dialogDisagree = false;
            this.$emit("searchMthod")
          })
      },
      //查看退款详情
      checkOrder(data) {
        this.$emit("showOrder", data);
      },
      //筛选订单的确定按钮
      searchMthod(data) {
        this.$emit("searchMthod");
      },
      //关闭搜索弹框
      closeSearch() {
        this.$refs.isShow.closeSearch()
      },
      //退货退款或者退款
      distri(data) {
        //调用差集并集方法
        setUnion(data, this.refund_type);
        //搜索的信息并且传给父集子集与父集的名字一样
        if (this.refund_type.length === 1) {
          this.$set(this.orderMess.search, "refund_type", this.refund_type[0]);
        } else if (this.refund_type.length === 2) {
          this.$set(this.orderMess.search, "refund_type", 0);
        } else {
          delete this.orderMess.search.refund_type
        };
      }
    }
  }

</script>


<style scoped="scoped" lang='scss'>
  .refundBought {
    .table_title {
      width: 1200px;
      height: 40px;
      background: #eef1f6;
      color: #62778C;
      overflow: hidden;

      >li {
        float: left;
        width: 116px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        color: #333;

        &:first-child {
          width: 200px;
          padding-left: 90px;
        }

        &:last-child {
          margin-left: 20px;
        }
      }
    }

  }
  .non_order {
    border: 1px solid #E9EEF2;
    height: 70px;
    line-height: 70px;
  }

    .bought {
      border: 1px solid #E9EEF2;
      border-top: none;

      .boughtHead {
				height: 32px;
				text-align: right;
        background: #EEF6FD;
        color: #62778C;
        line-height: 32px;
        margin-top: 10px;
        padding-left: 20px;

        .orderNumber {
          margin-right: 40px;
        }
      }

      ul {
        height: 86px;

        >li {
          float: left;
          width: 100px;
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
          width: 200px;
        }

        >.item-3 {
          width: 118px;
        }
      }
    }
  .border-b {
    border-bottom: 1px solid #E9EEF2;
  }

  .bought ul.top {
    width: 410px;
  }

  .bought .ul_right {
    top: 0;
    left: 410px;
  }

  .bought .ul_right li {
    width: 104px;
    padding-left: 34px;
  }

  .v_center.btn {
    width: 140px;
  }

</style>
