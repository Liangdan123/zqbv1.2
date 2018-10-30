import { onoffBatch, checkProduct, deleteBatch,checkIrrehint } from "@/api/platform"
export default {
	methods: {
		checkPro(product_id,index){//查看商品
			this.index = index;//查看商品的顺序				
			if(product_id){//用于弹框中所需的下架
				this.checkProductID=product_id;
				this._checkPro(product_id);//调用查看商品API方法		
			}else if(!product_id){//用于左右箭头获取商品详情API				
				let id=this.list.data[index].id;
				this.checkProductID=id;
				this._checkPro(id);//调用查看商品API方法		
			}						
		},
		closeEditor(){//编辑中的取消按钮
			this.editProductPage=false;
		},
		seePro(){//编辑中保存之后重新调商品列表接口（以及显示表格页面）
			this.searchMethod();
			this.editProductPage=false;
		},
		_checkPro(product_id,isEdit) {//查看商品API方法
			this.checkIrreList.product_id=product_id			
			checkProduct(product_id)
			.then(({data}) => {	
				console.log("isEdit888:",isEdit)
				if(!isEdit){//isEdit(区分是详情弹框还是编辑页面)
					if(this.dialogVisible == false){//详情弹框
						this.dialogVisible = true;				
					};
					console.log(111111)
					this._checkIrrehint(this.checkIrreList);//调用违规提醒列表API方法
				}else if(isEdit){
					console.log(22222)
					this.editProductPage=true;//如果是点击编辑那么就会显示编辑页面
					if(this.dialogVisible == true){//详情弹框
						this.dialogVisible = false;				
					};
				}
				this.onlyProductMess = data;				
			})
		},
		_checkIrrehint(data){
			checkIrrehint(data)//违规提醒列表
			.then(({data})=>{
				this.irrList=data;
				this.modelLoading=false;
			})	
		},
		editDoods(product_id){//编辑商品
			this._checkPro(product_id,true);
		},
		onlyOffPro(product_id){//表格、弹框的下架（单一）
			this._onOffdelete(product_id,"off")
		},
		onlyOnPro(product_id){//表格、弹框的上架（单一）
			this._onOffdelete(product_id,"on")
		},
		onlyDeletePro(product_id){//表格、弹框单一删除
			this._onOffdelete(product_id,"delete")
		},
		_onOffdelete(product_id,data){//上下架删除
			let onOff= data==="on"?"on":"off";
			let offOnDelte	
			data==="delete"?offOnDelte={products:[{product_id}]}:offOnDelte={products:[{product_id}],status:onOff};
			data==="on"?this._onProduct(offOnDelte):data==="off"?this._offBatch(offOnDelte):this._deletePro(offOnDelte);
		},
		handleSelection(val){//选中列表
			let arr = [];
			for(let item of val) {
				arr.push({product_id: item.id})					
			}
			this.$set(this.choiceOffList, "products", arr);	
		},
		offCommodity(){//下架按钮（批量）
			this._onOfframe("off")
		},
		onCommodity(){//上架按钮（批量）
			this._onOfframe("on")
		},
		deleteProduct(){//删除按钮（批量）
			this._onOfframe("delete")
		},
		_onOfframe(data){//上架下架删除（批量）
			let onOffInof=data==="on"?"请选择要上架的商品":data==="off"?"请选择要下架的商品":"请选择要删除的商品"
			if(this.choiceOffList.products.length===0){
				this.$message({showClose: true,message: onOffInof,type: 'info'});	
				return;
			};
			let onOff=data==="on"?"on":"off";
			let offOnDelte	
			data==="delete"?offOnDelte={products:this.choiceOffList.products}:offOnDelte={products:this.choiceOffList.products,status:onOff};
			data==="on"?this._onProduct(offOnDelte):data==="off"?this._offBatch(offOnDelte):this._deletePro(offOnDelte);
		},	
		_offBatch(data) {//商品下架API
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
									type: 'warning'
								});												
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
						}						
						this.emptyText = "尚未出售任何商品";			
						this.searchMethod();
						//如果是弹框里的下架商品，成功就把弹框关掉
						if(this.dialogVisible === true) {
							this.dialogVisible = false
						}
					})
			}).catch(() => {
				if(event.srcElement.innerText == "取消") {
					return;
				}
			})
		},
		//点击商品名称出现的弹框，一直向右
		nextProduct() {
			if(this.index < this.list.data.length - 1) {
				this.index++;
				this.checkPro(undefined,this.index)
			};
		},
		//点击商品名称出现的弹框，一直向左
		prevProduct() {
			if(this.index > 0) {
				this.index--;
				this.checkPro(undefined,this.index)
			};
		},
		//商品上架API
		_onProduct(data) {
			onoffBatch(data).then(({data}) => {							
				switch(data.status) {
					case "part_success":
						this.$message({
							showClose: true,
							message: '部分商品上架失败',
							type: 'warning'
						});
									
						break;
					case "all_fail":
						this.$message.error('上架失败');
						break;
					default:
						this.$message({
							showClose: true,
							message: '上架成功！可在出售中的商品进行查看',
							type: 'success'
						});
				}
				this.emptyText = "仓库中未发现商品记录";			
				if(this.dialogVisible === true) {
					this.dialogVisible = false
				}
				this.searchMethod();
			})
		},
		//删除商品API
		_deletePro(data) {
			this.$confirm('你是否确定删除此商品，商品删除后将保存在历史商品记录中.历史商品记录里的商品只能查看，不能做任何编辑操作。', '温馨提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				lockScroll: false
			}).then(() => {
				deleteBatch(data).then(({data}) => {									
					switch(data.status) {
						case "part_success":
							this.$message({
								showClose: true,
								message: '部分商品删除失败',
								type: 'warning'
							});
												
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
					}
					this.emptyText = "仓库中未发现商品记录";		
					if(this.dialogVisible === true) {
						this.dialogVisible = false
					}
					this.searchMethod();
				})
			}).catch(() => {
				return;
			})
		},
//		//编辑商品的方法
//		seeProduct(data){
//			return new Promise(function(resolve,reject){
//				checkProduct(data)
//				.then(({data}) => {					
//					resolve(data)
//				}).catch(({response:{data}}) => {
//					reject(data)
//				})
//			})
//		}
	}
}