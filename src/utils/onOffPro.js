import { onoffBatch, checkProduct, deleteBatch,getShippingTem } from "@/api/commodity"
export default {
	methods: {
		//商品下架API
		offBatch(data) {
			this.$confirm('你是否确定下架此商品', '温馨提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				lockScroll: false
			}).then(() => {
				onoffBatch(data)
					.then(({data}) => {					
						switch(data.status) {
							case "part_success":
								this.$message({
									showClose: true,
									message: '部分商品下架失败',
									type: 'warn'
								});
								this.emptyText = "尚未出售任何商品";
								this.searchMethods();
								break;
							case "all_fail":
								this.$message.error('下架失败');
								break;
							default:
								this.$message({
									showClose: true,
									message: '下架成功！可在仓库中的商品进行查看',
									type: 'success'
								});
								this.searchMethods();
						}
						//如果是弹框里的下架商品，成功就把弹框关掉
						if(this.dialogVisible === true) {
							this.dialogVisible = false
						}
					}).catch(({response: {data}})=>{
						this.$message.error(data.errorcmt);
					})	
			}).catch(() => {
				if(event.srcElement.innerText == "取消") {
					return;
				}
			})
		},
		//查看商品API
		checkPro(index) {
			this.index = index;
			if(this.$route.path==="zxh/commodityPage/sale_commodity"){
				this.listLength = this.categoryList.data.length;
			}			
			let list = this.categoryList.data;
			//原先的id变成了product_id
			let product_id = list[index].id;
			checkProduct(product_id)
			.then(({data}) => {				
				if(this.dialogVisible == false){
					this.dialogVisible = true;				
				};				
				let mall_id = this.$store.getters.getMall_id;
				let shop_id = this.$store.getters.getShop_id;
				let freightList={
					mall_id,shop_id					
				};
				//调用默认运费物流API
				this.onlyProductMess = data;
			}).catch(({response: {data}})=>{
				this.$message.error(data.errorcmt);
			})	
		},
		//点击商品名称出现的弹框，一直向右
		nextProduct() {
			if(this.index < this.categoryList.data.length - 1) {
				this.index++;
				this.checkPro(this.index)
			};
		},
		//点击商品名称出现的弹框，一直向左
		prevProduct() {
			if(this.index > 0) {
				this.index--;
				this.checkPro(this.index)
			};
		},
		//商品上架API
		onProduct(data) {
			onoffBatch(data).then(({
				data
			}) => {
				if(data.status == "all_success") {
					this.$message({
						showClose: true,
						message: '上架成功！可在出售中的商品中进行查看',
						type: 'success'
					});
				} else {
					this.$confirm('商品库存不足！请先添加库存后再次进行上架操作?', '温馨提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
					})
				}
				this.emptyText = "仓库中未发现商品记录";
				if(this.dialogVisible === true) {
					this.dialogVisible = false
				}
				this.searchMethods();
			}).catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
			})	
		},
		//删除商品API
		deletePro(data) {
			this.$confirm('你是否确定删除此商品，商品删除后将保存在历史商品记录中.历史商品记录里的商品只能查看，不能做任何编辑操作。', '温馨提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				lockScroll: false
			}).then(() => {
				deleteBatch(data).then(({
					data
				}) => {
					switch(data.status) {
						case "part_success":
							this.$message({
								showClose: true,
								message: '部分商品删除失败',
								type: 'warn'
							});
							this.emptyText = "仓库中未发现商品记录";
							this.searchMethods();
							break;
						case "all_fail":
							this.$message.error('删除失败');
							break;
						default:
							this.$message({
								showClose: true,
								message: '删除成功！可在历史商品记录中进行查看',
								type: 'success'
							});
							this.emptyText = "仓库中未发现商品记录";
							this.searchMethods();
							if(this.dialogVisible === true) {
								this.dialogVisible = false
							}
					}
				}).catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})	
			}).catch(() => {
				return;
			})
		},
		//编辑商品的方法
		seeProduct(data){
			return new Promise(function(resolve,reject){
				checkProduct(data)
				.then(({data}) => {					
					resolve(data)
				}).catch(({response:{data}}) => {
					reject(data)
				})
			})
		}
	}
}