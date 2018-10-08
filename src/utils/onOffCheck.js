import { onoffBatch, checkProduct, deleteBatch,checkIrrehint } from "@/api/platform"
export default {
	methods: {
		checkPro(product_id){//查看商品
			this.checkProductID=product_id;
			this._checkPro(product_id);//调用查看商品API方法					
		},
		closeEditor(){//编辑中的取消按钮
			this.editProductPage=false;
		},
		seePro(){//编辑中保存之后重新调商品列表接口（以及显示表格页面）
			this.searchMethod();
			this.editProductPage=false;
		},
		_checkPro(product_id,isEdit) {	//查看商品API方法
			this.checkIrreList.product_id=product_id			
			checkProduct(product_id)
			.then(({data}) => {	
				if(!isEdit){//isEdit(区分是详情弹框还是编辑页面)
					if(this.dialogVisible == false){//详情弹框
						this.dialogVisible = true;				
					};
				}else if(isEdit){
					this.editProductPage=true;//如果是点击编辑那么就会显示编辑页面
				}

				this.onlyProductMess = data;
				this._checkIrrehint(this.checkIrreList);//调用违规提醒列表API方法
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
		tableOnlyOffPro(product_id){//表格中的下架
			this._onlyOffPro(product_id)
		},
		modelOnlyOffPro(){//弹框中的下架
			this._onlyOffPro(this.checkProductID)
		},
		_onlyOffPro(product_id){//下架商品
			let offPro = {
				products: product_id,					
				status: "off"
			};
			this._offBatch(offPro);
		},	
		tableOnlyDeletePro(product_id){//表格中的单一删除
			this._onlyDeletePro(product_id)
		},
		modelOnlyDeletePro(){//弹框中的删除商品
			this._onlyDeletePro(this.checkProductID)
		},
		_onlyDeletePro(product_id){//删除商品
			let deletePro = {
				products: [{product_id}]
			};				
			this._deletePro(deletePro);
		},
		handleSelection(val){//选中列表
			let arr = [];
			for(let item of val) {
				arr.push({product_id: item.id})					
			}
			this.$set(this.choiceOffList, "products", arr);	
		},
		offCommodity(){//下架按钮（批量）
			if(this.choiceOffList.products.length===0){
				this.$message({showClose: true,message: '请选择要下架的商品',type: 'info'});	
				return;
			};
			let offList={
				products:this.choiceOffList.products,
				status:"off"
			}
			this._offBatch(offList)
		},
		deleteProduct(){//删除按钮（批量）
			if(this.choiceOffList.products.length===0){
				this.$message({showClose: true,message: '请选择要删除的商品',type: 'info'});	
				return;
			}
			this._deletePro(this.choiceOffList)
		},		
		_offBatch(data) {//商品下架API
			this.$confirm('你是否确定下架此商品', '温馨提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				lockScroll: false
			}).then(() => {
				onoffBatch(data)
					.then(({data}) => {		
						console.log("data:",data)
						switch(data.status) {
							case "part_success":
								this.$message({
									showClose: true,
									message: '部分商品下架失败',
									type: 'warning'
								});
								this.emptyText = "尚未出售任何商品";
								
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
			onoffBatch(data).then(({data}) => {							
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
							this.emptyText = "仓库中未发现商品记录";
							
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
					}
					if(this.dialogVisible === true) {
						this.dialogVisible = false
					}
					this.searchMethod();
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