import { getOrderMess,getShopOrderList} from "@/api/order"

export default{
	methods:{
		closeSearch(){
			this.$refs.isShow.closeSearch()
		},
		searchMethods() {//搜索方法
			if (this.orderMess.page == 1) {
			    //页面在第一页搜索手动调接口获取数据列表
			    this.orderList(this.orderMess);
			} else {
			    //页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
			    this.orderMess.page = 1;
			}				
	    },
	    //获取订单列表
	    orderList(data){
	    	getShopOrderList(data)
	    	.then(({data})=>{
	    		this.orderData=data;//获取订单列表的全部数据；
	    		this.orderLists=data.data;//订单列表中的列表；
	    		this.loading=false;
	    	})
			.catch(({response: {data}})=>{
				this.$message.error(data.errorcmt);
			})	       
	    },
	    nextProduct(){
			if(this.index < this.orderLists.length - 1) {		
				this.index++;
				this.seeOrder(this.index);
			};
		},
		prevProduct(){
			if(this.index > 0) {
				this.index--;
				this.seeOrder(this.index);
			};
		},
		//查看订单详情显示弹框
	    showOrder(data){
	    	this.index=data;//data是列表下标
			this.dialogVisible=true;
			//判断需要传到子集的字符串是什么
			this.type="订单详情";
			this.seeOrder(data);
		},
		//查看订单API(订单详情)
		seeOrder(index){					
			let split_order_id=this.orderLists[index].split_order_id;							
			getOrderMess(split_order_id)
			.then(({data})=>{
				this.onlyOrderMess = data;//订单详情
				this.pay_info=data.pay_info;
				this.shipping_info=data.shipping_info
			})
			.catch(({response: {data}})=>{
				this.$message.error(data.errorcmt);
			})			
		},
		//发货中的(订单详情)
		showSetOrder(data){
			this.index=data;//data是列表下标
			this.dialogVisible=true;
			//判断需要传到子集的字符串是什么
			this.type="订单服务";
			this.seeOrder(data);
		}
	}
}