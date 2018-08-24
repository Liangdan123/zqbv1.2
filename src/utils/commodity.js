import { getProductList } from "@/api/platform"

export default {
	//删除空对象
	methods: {
		//批量清空
		clear(arr,Object){
			for(var prop in Object){
				if(arr.includes(prop)){
					Object[prop]=""
				}
			}
		},
		capitalize(value) { //保留两位小数
			if(value == "") {
				return ""
			}
			return Math.round(parseFloat(value) * 100) / 100;
		},
		format(date) { //格式化时间
			let m = date.getMonth() + 1;
			let d = date.getDate();
			date = date.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
			return date
		},
		NumberMenthods(maxNum,minNum,val,data){
			let max=this.searchMess[maxNum];
			let min=this.searchMess[minNum];
			if(max!=="" && min!==""){
				if(min > max) {
					this.$message.error(data);
					this.isEmptyError=true
				} else {
					this.searchCon[val] = {
						"min": min,
						"max": max
					};
				}
			};
			if(max=== "" && min !==""){
				this.searchCon[val] = {
					"min": min,
				}
			};
			if(max!== "" && min===""){
				this.searchCon[val] = {
					"max": max,
				}
			};
			if(max=== "" && min===""){
				delete this.searchCon[val]
			}
		},
		timeMenthods(attrMIn,attrMax,val,data){				
			if(this.searchMess[attrMIn]!==""&& this.searchMess[attrMax]!==""){
				if(this.searchMess[attrMIn].getTime() > this.searchMess[attrMax].getTime()){
					this.$message.error(data);
					this.isEmptyError=true
					return;
				}else{
					this.searchCon[val]={
						"min": this.format(this.searchMess[attrMIn]),
						"max": this.format(this.searchMess[attrMax])
					}
					this.isEmptyError = false;
				}
			};
			if(this.searchMess[attrMIn]!==""&& this.searchMess[attrMax]===""){
				this.searchCon[val]={
					"min": this.format(this.searchMess[attrMIn]),					
				}
			};
			if(this.searchMess[attrMIn]===""&& this.searchMess[attrMax]!==""){
				this.searchCon[val]={
					"max": this.format(this.searchMess[attrMax])					
				}
			};
			if(this.searchMess[attrMIn]===""&& this.searchMess[attrMax]!==""){
				delete this.searchCon[val]
			}
		},
		handleCurrentChange(val) {
			this.$set(this.shopMess, "page", val);
			//调用没有搜索条件的方法，点击了搜索后自动会把搜索条件加上
			this.productList(this.shopMess);
		},
		//商品排序
		sortChange(column,prop,order){
			//用于清空样式（点击搜索，清空时）
			this.order=column;
			switch(true){
				case column.prop==="product_price_yuan.min"&&column.order==="descending":				
					this.sortCommon({product_price:"desc"})
					break;
				case column.prop==="product_price_yuan.min"&&column.order==="ascending":				
					this.sortCommon({product_price:"asc"})
					break;
				case column.prop==="product_store"&&column.order==="descending":				
					this.sortCommon({product_store:"desc"})
					break;
				case column.prop==="product_store"&&column.order==="ascending":				
					this.sortCommon({product_store:"asc"})
					break;
				case column.prop==="statistics_product.sell_num"&&column.order==="descending":				
					this.sortCommon({sell_num:"desc"})
					break;
				case column.prop==="statistics_product.sell_num"&&column.order==="ascending":				
					this.sortCommon({sell_num:"asc"})
					break;
				case column.prop==="created_at"&&column.order==="descending":				
					this.sortCommon({create_time:"desc"})
					break;
				case column.prop==="created_at"&&column.order==="ascending":				
					this.sortCommon({create_time:"asc"})
					break;
				case column.prop==="onoff_time"&&column.order==="descending":				
					this.sortCommon({onoff_time:"desc"})
					break;
				case column.prop==="onoff_time"&&column.order==="ascending":				
					this.sortCommon({onoff_time:"asc"})
					break;
			}
		},
		sortCommon(data){
			this.$set(this.shopMess,"orderby",data);
			this.searchMethods()
		},
		searchMethods() { //搜索方法
			if(this.shopMess.page == 1) {
				//页面在第一页搜索手动调接口获取数据列表
				this.productList(this.shopMess)
			} else {
				//页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
				this.shopMess.page = 1;
			}
		},
		productList(data) {
			getProductList(data)
				.then(({data}) => {
					this.total = Number(data.total);
					this.perPage = Number(data.per_page);
					this.list = data.data; //数据中的列表
					//sale_commodit页面所需要的字段名
					this.categoryList=Object.assign({},data); //获取的全部数据
					if(this.dialogTitle == "批量分类"){
						this.$message("稍后更新或者是刷新")
					};
					if(this.shopMess.orderby!==undefined){
						delete this.shopMess.orderby
					};
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
					if(this.shopMess.orderby!==undefined){
						delete this.shopMess.orderby
					}
				})	
		},

	}
}