<template>
	<div class="category_mgmt">
		<Navbar></Navbar>
		<div class="g-content">
			<div class="buttons">
				<el-button class="store-button2 add mb-20" @click="add" v-show="isEdited">
					<i class="iconfont icon-tianjia f12"></i>
					<span>添加分类</span>
				</el-button>
				<el-button class="store-button2 remove mb-20" @click="remove" v-show="isEdited">
					<i class="iconfont icon-shanchu f12"></i>
					<span>批量删除</span>
				</el-button>
				<el-button class="store-button2 edit mb-20" @click="edit" v-show="!isEdited">
					<i class="iconfont icon-Rectangle f12"></i>
					<span>编辑分类</span>
				</el-button>
				<el-button class="store-button2 save mb-20" @click="save" v-show="isEdited">
					<i class="iconfont icon-baocun f12"></i>
					<span>保存编辑</span>
				</el-button>
			</div>
			<div class="edit-content">
				<categorySave v-if="!isEdited" :ClassifyList="ClassifyList"></categorySave>
				<categoryEdit v-else="isEdited" :ClassifyList="ClassifyList" @emptyDelt="emptyDelt">
					
				</categoryEdit>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Navbar from "@/components/commodity/Navbar"
	import categorySave from "@/components/commodity/category_save"
	import categoryEdit from "@/components/commodity/category_edit"
	import { getClassifyList, SaveShopClassifyList } from "@/api/commodity"

	export default {
		name: "category_mgmt",
		data() {
			return {
				isEdited: false,
				ClassifyList: [],
				shop_id: "",
				arr: [],
				isEmptyDelt: true,
			}
		},
		created() {
			this.shop_id = this.$store.getters.getShop_id;
			let data = JSON.parse(JSON.stringify(this.$store.getters.getClassifyList)); //还原
			if(data.length == 0) {
				return
			}
			for(let val of data) {
				val.created = false;
				val.isWarn = false;
				val.isActive = false;
				if(val.is_final == 0) {
					for(let v of val.sub) {
						v.created = false;
						v.isWarn = false;
						v.isActive = false;
					}
				}
			};
			this.ClassifyList = data;
		},
		components: {
			Navbar,
			categorySave,
			categoryEdit
		},
		beforeRouteLeave(to, from, next) {
			//点击导航时出现的弹框
			if(this.isEdited) {
				next(false);
				this.$confirm('你有未保存的更改，是否确定保存更改并离开此页面？', '温馨提示', {
					confirmButtonText: '保存更改',
					cancelButtonText: '弃用',
					lockScroll: false
				}).then(() => {
					next(true);
					this.saveMethods()
				}).catch(() => {
					if(event.srcElement.innerText == "弃用") {
						next(true)
					}
				})
			} else {
				next(true);
			}
		},
		methods: {
			emptyDelt(data) {
				this.isEmptyDelt = data
			},
			add() {
				let date = new Date();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				date = date.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
				this.ClassifyList.push({
					created_at: date,
					is_final: 1,
					created: false,
					isWarn: false,
					isActive: false
				})
			},
			remove() {
				if(this.isEmptyDelt === true) {
					this.$message({showClose: true,message: '请选择要删除分类',type: 'error'});																							
					return
				}
				this.$confirm('确认删除所有勾选项,删除后无法恢复', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					let arr = this.ClassifyList;
					for(let i = 0; i < arr.length; i++) {
						if(arr[i].created) {
							arr.splice(i, 1);i--;														
						} else if(arr[i].is_final == 0) {
							let arr2 = arr[i].sub;
							for(let j = 0; j < arr2.length; j++) {
								if(arr2[j].created) {
									arr2.splice(j, 1);
									j--;
								}
							}
						}
					};					
				}).catch(() => {
					if(event.srcElement.innerText == "取消") {
						return;
					}
				})
			},
			edit() {
				this.isEdited = true;
			},
			//保存编辑
			save() {
				this.saveMethods()
			},
			//保存编辑的方法（共用）
			saveMethods() {
				let List = [];
				for(let i in this.ClassifyList) {
					List[i] = {};
					if(!this.ClassifyList[i].shop_category_name) {
						this.ClassifyList[i].isWarn = true;
						return;
					};
					List[i].shop_category_name = this.ClassifyList[i].shop_category_name;
					if(this.ClassifyList[i].id != undefined) {
						List[i].id = this.ClassifyList[i].id;
					};
					if(this.ClassifyList[i].is_final == 0) {
						let arr = this.ClassifyList[i].sub;
						List[i].sub = [];
						let arr2 = List[i].sub;
						for(let j in arr) {
							arr2[j] = {};
							if(!arr[j].shop_category_name) {
								//提示没写名字
								arr[j].isWarn = true;
								return;
							}
							arr2[j].shop_category_name = arr[j].shop_category_name;
							if(arr[j].id != undefined) {
								arr2[j].id = arr[j].id;
							}
						}
					}
				}
				let post = {
					"shop_id": this.shop_id,
					"data": List
				};
				this.saveClassify(post,true)
			},

			saveClassify(data, isSave){
				SaveShopClassifyList(data)
					.then(({data}) => {											
						if(data.length != 0) {
							for(let val of data) {
								val.created = false;
								val.isWarn = false;
								if(val.is_final == 0) {
									for(let v of val.sub) {v.created = false;v.isWarn = false;}																													
								}
							}
						}
						this.ClassifyList = data;
						if(isSave===true){
							this.$message({showClose: true,message: '保存成功!',type: 'success'});	
						};
						if(isSave===false){
							this.$message({showClose: true,message: '删除成功!',type: 'success'});	
						}
						this.isEdited = false;
						this.$store.dispatch("doClassifyList", this.shop_id);
					}).catch(({response: {data}																			
					}) => {
						this.$message.error(data.errorcmt);
					})
			}
		}
	}
</script>

<style lang="scss">
	.category_mgmt {
		margin-top: 110px;
		.category_manage {
			color: #0070C9;
			font-weight: bold;
		}
		>.g-content {
			width: 1200px;
			min-height: 204px;
			border-radius: 4px;
			background: #fff;
			margin: 0 auto;
			padding: 20px;
			>.buttons {
				text-align: left;
				overflow: auto;
				>.el-button {
					width: 92px;
					height: 32px;
					border-radius: 2px;
				}
				>.save {
					background: rgba(0, 112, 201, 1);
					border-color: #0070C9;
					&:hover {
						border-color: #007DE3;
						background: #007DE3;
					}
					&:active {
						border-color: #005396;
						background: #005396;
					}
					span {
						color: #fff;
					}
				}
				>.remove {
					span {
						color: #B4282D;
					}
					&:hover {
						background: #B4282D;
						border-color: #B4282D;
						span {
							color: #FFFFFF;
						}
					}
					&:active {
						background: #821D20;
						border-color: #821D20;
						span {
							color: #FFFFFF;
						}
					}
				}
				>.save,
				>.edit {
					float: right;
				}
			}
			.edit-content {
				width: 1200px;
			}
		}
	}
</style>