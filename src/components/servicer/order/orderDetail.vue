<template>
  <div class="orderDetai clearfix">
    <div class="plate mb-40">
      <div class="small_plate">
        <span class="color-7F f14 display-in">订单编号：</span>
        <em class="color-3 f14 display em">{{checkOrder.split_no}}</em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">订单状态：</span>
        <em class="color-3 f14 display em">
          {{checkOrder.status|tradeStatus}}
        </em>
      </div>     
      <div class="small_plate " 
      	:class="!([1,5,6].includes(checkOrder.status))?'mb-20':''">
        <span class="color-7F f14 display-in">创建时间：</span>
        <em class="color-3 f14 display em">
        	{{checkOrder.created_at}}
        </em>
      </div>
      <!--.............未付款时不显示..............-->
      <div class="small_plate  mb-20" v-if="[1,5,6].includes(checkOrder.status)?false:true">
        <span class="color-7F f14 display-in">付款方式：</span>
        <em class="color-3 f14 display em">
          {{pay_info.pay_type==="weixin"?"微信支付":"余额支付"}}
        </em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">商品合计：</span>
        <em class="color-3 f14 display em">
          {{pay_info.total_product_fee_yuan||0|money}}
        </em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">优惠券：</span>
        <em class="color-3 f14 display em">
          {{pay_info.total_coupon_yuan||0|money}}
        </em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">订单合计：</span>
        <em class="color-3 f14 display em">
          {{pay_info.pay_fee_yuan||0|money}}
        </em>
      </div>
    </div>
    <!--.................订单进度模块.................-->
    <div class="plate mb-40" v-if="type=='订单详情'">
      <p class="color-3 f16 font-b mb-20">订单进度</p>
      <div class="progress clearfix">
        <div class="progress_sec float-l">
          <p class="circleLine ml-20">
            <span class="circle bg-b"></span>
            <b class="line bg-b"></b>
          </p>
          <div class="progress_txt color-b">
            <span class="f14">创建订单</span><br>
            <span class="f14">{{checkOrder.created_at}}</span><br>
          </div>
        </div>
        <div class="progress_sec float-l mr_fu_12">
          <p class="circleLine ml-20">
            <span class="circle bg-b"></span>
            <b class="line" :class="checkOrder.status===1?'bg-9e':'bg-b'" 
            	v-if="!([5,6].includes(checkOrder.status))"></b>
          </p>
          <div class="progress_txt color-b mr_fu_12">
            <span class="f14">            
              {{checkOrder.status|checkStatus}}
            </span><br>
            <span class="f14" v-if="checkOrder.status===1?false:true">
              {{checkOrder.status===5?checkOrder.cancel_time:checkOrder.status===6?
              	checkOrder.close_time:checkOrder.pay_time}}
            </span><br>
          </div>
        </div>
        <div class="progress_sec float-l mr_fu_12" v-if="!([5,6].includes(checkOrder.status))">
          <p class="circleLine ml-20">
            <span class="circle" :class="checkOrder.status===1?'bg-9e':'bg-b'"></span>
            <b class="line" :class="!([1,2].includes(checkOrder.status))?'bg-b':'bg-9e'">  	
            </b>
          </p>
          <div class="progress_txt mr_fu_12">
            <span class="f14" :class="checkOrder.status===1?'color-6':'color-b'">
              	等待卖家服务
            </span><br>
            <span class="f14 color-b " v-if="!([1,2].includes(checkOrder.status))">
              {{checkOrder.shipping_time}}
            </span><br>
          </div>
        </div>
        <div class="progress_sec float-l mr_fu_12" 
        	v-if="!([5,6].includes(checkOrder.status))">
          <p class="circleLine ml-20">
            <span class="circle" :class="!([1,2].includes(checkOrder.status))?'bg-b':'bg-9e'">
            	
            </span>
            <b class="line" :class="checkOrder.status===4?'bg-b':'bg-9e'"></b>
          </p>
          <div class="progress_txt mr_fu_12">
            <span class="f14" 
            	:class="!([1,2].includes(checkOrder.status))?'color-b':'color-6'">
              	等待买家验收
            </span><br>
            <span class="f14 color-b" 
            	v-if="checkOrder.status===4">
              {{checkOrder.confirm_time}}
            </span><br>
          </div>
        </div>
        <div class="progress_sec float-l mr_fu_12" 
        	v-if="!([5,6].includes(checkOrder.status))">
          <p class="circleLine ml-20">
            <span class="circle" :class="checkOrder.status===4?'bg-b':'bg-9e'"></span>
          </p>
          <div class="progress_txt mr_fu_12">
            <span class="f14" 
            	:class="checkOrder.status===4?'color-b':'color-6'">
            	完成订单
            </span><br>
            <span class="f14 color-b" v-if="checkOrder.status===4">
              {{checkOrder.confirm_time}}
            </span><br>
          </div>
        </div>
      </div>
    </div>
    <!--.................买家信息模块.................-->
    <div class="plate  mb-40">
      <p class="color-3 f16 font-b mb-20">买家信息</p>
      <div class="small_plate">
        <span class="color-7F f14 display-in">买&#12288;&#12288;家：</span>
        <em class="color-3 f14 display em">
          {{shipping_info.contact_name}}
        </em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">联系方式：</span>
        <em class="color-3 f14 display em">
          {{shipping_info.contact_phone}}
        </em>
      </div>
      <div class="small_plate" 
      	v-if="checkOrder.distribute_type==='self'?false:true">
        <span class="color-7F f14 display-in">
        	买家地址：
        </span>
        <em class="color-3 f14 display em">
          {{shipping_info.province}}&#12288;{{shipping_info.city}}&#12288;{{shipping_info.area}}
          &#12288;{{shipping_info.address}}
        </em>
      </div>
    </div>
       <!--.................卖家信息模块.................-->
    <div class="plate  mb-40">
      <p class="color-3 f16 font-b mb-20">卖家信息</p>
      <div class="small_plate">
        <span class="color-7F f14 display-in">店铺名称：</span>
        <em class="color-3 f14 display em">
          {{checkOrder.seller_info&&checkOrder.seller_info.shop_name}}
        </em>
      </div>
      <div class="small_plate">
        <span class="color-7F f14 display-in">店&emsp;&emsp;长：</span>
        <em class="color-3 f14 display em">
          {{checkOrder.seller_info&&checkOrder.seller_info.shopkeeper_name}}
        </em>
      </div>
       <div class="small_plate">
        <span class="color-7F f14 display-in">联系方式：</span>
        <em class="color-3 f14 display em">
          {{checkOrder.seller_info&&checkOrder.seller_info.shopkeeper_phone}}
        </em>
      </div>
       <div class="small_plate">
        <span class="color-7F f14 display-in">营业时间：</span>
        <em class="color-3 f14 display em">
          {{checkOrder.seller_info&&checkOrder.seller_info.shop_start}}-{{checkOrder.seller_info&&checkOrder.seller_info.shop_end}}
        </em>
      </div>
         <div class="small_plate">
        <span class="color-7F f14 display-in">门店地址：</span>
        <em class="color-3 f14 display em">
            {{checkOrder.seller_info&&checkOrder.seller_info.province}}&#12288;{{checkOrder.seller_info&&checkOrder.seller_info.city}}&#12288;{{checkOrder.seller_info&&checkOrder.seller_info.area}}
          &#12288;{{checkOrder.seller_info&&checkOrder.seller_info.address}}
        </em>
      </div>
    </div>
    <!--.................商品信息模块（订单详情，发货）.................-->
    <div class="plate">
      <p class="color-3 f16 font-b mb-20">商品信息</p>
      <div v-show="false">{{productRefund}}</div>
     	<productTable 
      	:productMess="checkOrder.order_products"
      	:productRefundList="productRefundList"
      	:type='type' 
      	@select='handleSelectionChange' 
      	:status='checkOrder.status'
        @progress='progress' 
        @closeProgress='closeProgress'
        :clearChoice="clearChoice"
        @InitRefundChoice="InitRefundChoice">
        
      </productTable>
      <div class="float-r btn mt-20" 
      	v-if="type==='订单服务'&&checkOrder.status==2">
        <el-button class="store-button1" @click="sureSetPro">
        	开始服务
        </el-button>
        <el-button class="store-button2" @click="cancelPro">
        	取消
        </el-button>
      </div>
    </div>
    <!--.................请输入退款金额.................-->
    <div class="plate mt-20" v-if="type==='退款'">
    	<p class="color-3 f16 font-b mb-20">请选择退款商品</p>
    	<el-input v-model="refund" class="refundMoney" @change="refundChange">
    		
    	</el-input>
    	<span class="color-7F f12">退款金额不能大于支付金额</span>
    </div>
    <!--.................服务进度(已经发货,已经完成).................-->
    <div class="plate mb-40 mt-20" v-if='progressShow'>
      <p class="color-3 f16 font-b mb-20">服务进度</p>
      <div v-for='(item,index) in progressList' 
      	:key='item.ops_id' 
      	class=' color-7F mb-30 clearfix'>
        <div class='float-l pro_Index' 
        	:class='{complete:item.is_complete==1}'>
        	{{index+1}}
        </div>
        <div>
          <div v-if='item.complete_time'>
          	{{item.complete_time}}
          </div>
          <div class='pro_text clearfix'>
            <span :class='{complete:item.is_complete==1}' class="vertical">
            	{{item.spec_name}}
            </span>
            <span v-if='item.is_complete==1' class='float-r'>
            	服务完成
            </span>
            <el-button v-else 
            	class='float-r store-button3' 
            	@click='finish(item.ops_id,item.order_product_id)'>
            	已完成
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!--.................退款按钮.................-->
    <div v-if="type==='退款'" class="mt-40 clearfix">
    	<el-button 	class='float-r store-button2 ml-20' @click="cancelRefund">                       
        	取消
      </el-button>
    	<el-button 	class='float-r store-button1' @click="partRefund">                       
        	退款 
      </el-button>
    </div>
  </div>
</template>

<script>
  import { complete, getSchedule,setProduct,refundPartlists,applyRefundPart} from "@/api/order"     
  import productTable from "@/components/servicer/order/productTable"
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
	    checkStatus(status){
	    	 let statusAll={
	    	 		5:"买家取消订单",
	    	 		6:"买家未付款订单自动取消",
	    	 		"default":"等待买家付款"
	    	 };
	    	 return statusAll[status]||statusAll["default"]
	    },
  	},
  	components: { productTable},   
    data() {
      return {
        expressMess: [],
        express_code: "",
        order_products: [],
        progressShow: false,
        progressList: [],
        refundInfo: [],
				productRefundList:[],//退款列表
				refund:0,//退款金额
				copyRefund:"",//拷贝一份退款金额，用于判断选择的退款金额与填写金额的大小
				clearChoice:false,//清空退款选项
				isRefund:true,//是否可以退款（当填写金额大于选择的金额时）
      }
    },
    props: {
      //订单信息
      checkOrder: {
        type: Object,
        default: function () {
          return {
          }
        }
      },
      //判断是订单服务还是订单详情弹框
      type: {
        type: String,
        default: function () {
          return ""
        }
      },
      pay_info: {
        type: Object,
        default: function () {
          return {}
        }
      },
      shipping_info: {
        type: Object,
        default: function () {
          return {}
        }
      },
      split_order_id:{//用于退款
      	default: function () {
          return ""
        }
      }
    },
    watch:{
      checkOrder(){
        this.progressShow=false;
      }
    },
    computed:{
    	productRefund(){
    		if(this.type==="退款"){
					this._refundPartlists();
    		}
    	},
    },
    methods: {
    	_refundPartlists(){//退款列表   		
			 	refundPartlists(this.split_order_id)
					.then(({data})=>{
						this.productRefundList=data.products
					})
    	},
    	isRefundDetail(message){
    		if(this.type!=="退款"){
					if(message){
    				return message
    			}		
    		}	
    	},   	
      //开始服务和退款
      handleSelectionChange(val) {
        this.order_products = val;
       	if(this.type!=="退款"){return};//不是退款弹窗就退出(开始服务与退款在一起)
        if(val.length!==0){     	
        	let refundArray=val.map((item)=>item.total_spec_fee_yuan);
					this.refund=refundArray.reduce(this._getRefundTotal);
					this.copyRefund=JSON.parse(JSON.stringify(this.refund))
        }else{
        	this.refund=0;
        }
      },
      _getRefundTotal(total,num){
      	return (total*100+num*100)/100
      },
      refundChange(){//退款金额
      	if(this.refund>this.copyRefund){
      		this.isRefund=false;
      		this.PromptMess("退款金额不能大于支付金额","warning");
      	};
      	this.isRefund=true;
      },
      cancelRefund(){//取消退款按钮
      	this.refund=0;//退款金额初始化
      	this.$emit("closeBox");//关闭弹窗
      	this.clearChoice=true;//控制子集清空退款选择
      },
      InitRefundChoice(){//重置退款中的取消按钮（选择的时候）
      	this.clearChoice=false;
      },
      partRefund(){//退款按钮（部分退款）
      	if(this.isRefund===false){
      		this.PromptMess("退款金额不能大于支付金额","warning");
      		return
      	};
      	this.isRefund=true;
      	let productsArray=this.order_products.map((item)=>
      		({order_product_id:item.order_product_id})
      	);//退款商品数组
      	if(productsArray.length===0){
      		this.PromptMess("请选择退款商品","warning");
      		return
      	};
      	let refundInfo={
      		split_order_id:this.split_order_id,
      		products:productsArray,
					refund_money:this.refund*100
      	};
      	this._APIRefundPart(refundInfo);
      },
      _APIRefundPart(message){//提交部分退款申请API
      	applyRefundPart(message)
      	.then(({data})=>{
      		this.$emit("closeBox", false);
//    		this._refundPartlists();//退款列表   		
      	})
      },
      PromptMess(data, type) {
        this.$message({
          message: data,
          type: type,
          showClose: true
        });
      },    
      sureSetPro() { //开始服务
        //点击时候订单的长度
        let choiceLen = this.order_products.length;
        if (choiceLen.length == 0) {
          this.$message.success("未选中任何商品");
          return;
        }
        //原订单的长度
        let orderLen = this.checkOrder.order_products.length;
        //获取订单商品数组
        let order_products = [];
        if (this.order_products.length === 0) {
          order_products = this.checkOrder.order_products.map(item => ({
            order_product_id: item.order_product_id
          }));
        } else {
          order_products = this.order_products.map(item => ({
            order_product_id: item.order_product_id
          }))
        }
        let setProMess = {
          split_order_id: this.checkOrder.split_order_id,
          order_products
        };
        //开始服务接口 
        setProduct(setProMess)
          .then(({ data }) => {        
            this.$message.success("开始服务")
            this.$emit("closeBox", true)
          }).catch(() => {
            this.$emit("closeBox", false);
          })
      },
      cancelPro() {
        this.$emit("closeBox", false)
      },
      progress(data) {
        this.progressShow = true;
        this.progressList = data;
      },
      closeProgress() {
        this.progressShow = false;
      },
      finish(id, order_id) {
        complete(id).then(() => {
          getSchedule(order_id).then(({data}) => {          
            this.progressList = data;
          })
        })
      }
    }
  }

</script>

<style scoped="scoped" lang='scss'>
  em.em {
    font-style: normal;
  }

  .small_plate span {
    width: 70px;
    text-align: right;
  }

  .small_plate {
    line-height: 20px;
  }

  .progress .circle {
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 60%;
    margin-right: 4px;
  }

  .progress .line {
    display: inline-block;
    height: 2px;
    width: 160px;
    margin-bottom: 3px;
  }

  .progress_txt {
    line-height: 20px;
    width: 86px;
    text-align: center;
  }

  .mr_fu_12 {
    margin-left: -12px;
  }

  .bg-9e {
    background-color: #E9EEF2;
  }

  .color-6 {
    color: #62778C;
  }

  .orderDetai .el-table__row {
    height: 86px;
  }

  .product_name {
    color: #333;
    display: inline-block;
    overflow: hidden;
    width: 84px;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .pro_Index {
    width: 25px;
    height: 25px;
    border: 1px solid #9F9F9F;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    margin: 0 22px;
    border-radius: 50%;

    &.complete {
      border-color: $btn-bg-normal;
      color: $btn-bg-normal;
    }
  }

  .pro_text {
    >span.complete {
      color: #333;
    }
    .vertical{
      vertical-align: -webkit-baseline-middle;
    }
  }

</style>
<style>
  .orderDetai .el-table {
    color: #333;
  }

  .orderDetai th {
    background-color: #F0F4F7;
  }

  .orderDetai .el-table__header-wrapper thead div {
    color: #62778C;
  }

  .orderDetai .el-table__row {
    height: 86px;
  }

  .orderDetai .el-select {
    width: 160px;
  }

  .orderDetai .el-input.expressNum {
    width: 320px;
  }

  .orderDetai .el-select .el-input__inner,
  .orderDetai .el-input.expressNum .el-input__inner {
    height: 32px;
    line-height: 32px;
    border-radius: 2PX;
  }

  .orderDetai .btn .el-button {
    padding-right: 0;
    padding-left: 0;
    width: 72px;
  }
  .orderDetai .refundMoney.el-input {
  	width: 440px;
  }

</style>
