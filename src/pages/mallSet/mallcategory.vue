<template>
	<div class="mallcategory">
		<div class="g-content">
			<div class="buttons">
				<el-button class="store-button2 add mb-20" v-show="isEdited" @click="add">
					<i class="iconfont icon-tianjia f12"></i>
					<span>添加分类</span>
				</el-button>
				<el-button class="store-button2 remove mb-20" v-show="isEdited"  @click="remove" >
					<i class="iconfont icon-shanchu f12"></i>
					<span>批量删除</span>
				</el-button>
				<el-button class="store-button2 edit mb-20"  v-show="!isEdited" @click="edit">
					<i class="iconfont icon-Rectangle f12"></i>
					<span>编辑分类</span>
				</el-button>
				<el-button class="store-button2 save mb-20" v-show="isEdited" @click="save">
					<i class="iconfont icon-baocun f12"></i>
					<span>保存编辑</span>
				</el-button>
			</div>
			<div class="edit-content">
				<mallCategorySave v-if="!isEdited" :ClassifyList="mallClassifyList"></mallCategorySave>
				<mallCategoryEdit v-else="isEdited" :ClassifyList="mallClassifyList"  @emptyDelt="emptyDelt">					
				</mallCategoryEdit>
			</div>
		</div>
	</div>
</template>

<script>
	import mallCategorySave from "@/components/mallSet/mallCategorySave"
	import mallCategoryEdit from "@/components/mallSet/mallCategoryEdit"
	import { existMallClassified } from "@/api/mallSet"
	import {getMallClassifyList} from "@/api/commodity"
	export default{
		components: {mallCategorySave,mallCategoryEdit},								
		data(){
			return{
				isEdited:false,
				mallClassifyList:[],//商城分类数据
				isEmptyDelt: true,
			}
		},
		created(){			
			//获取商城分类列表
			getMallClassifyList()		
			.then(({data})=>{
				this.mallClassifyList = data;
				if(data.length == 0) {return};//没有商城分类则返回
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
			})								
		},
		methods:{
			emptyDelt(data) {
				this.isEmptyDelt = data
			},
			edit(){
				this.isEdited = true;
			},
			add(){
				let date = new Date(); let m = date.getMonth() + 1; let d = date.getDate();								
				date = date.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
				this.mallClassifyList.push({
					created_at: date,
					is_final: 1,
					created: false,
					isWarn: false,
					isActive: false
				})
			},
			save(){
				this.saveMethods()
			},
			remove(){
				if(this.isEmptyDelt === true) {
					this.$message({showClose: true,message: '请选择要删除分类',type: 'error'});																							
					return
				}
				this.$confirm('确认删除所有勾选项,删除后无法恢复', '温馨提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					lockScroll: false
				}).then(() => {
					let arr = this.mallClassifyList;
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
			saveMethods() {//保存编辑的方法（共用）
				let List = [];
				for(let i in this.mallClassifyList) {
					List[i] = {};
					if(!this.mallClassifyList[i].mall_category_name) {
						this.mallClassifyList[i].isWarn = true;
						return;
					}
					List[i].mall_category_name = this.mallClassifyList[i].mall_category_name;
					if(this.mallClassifyList[i].id != undefined) {
						List[i].id = this.mallClassifyList[i].id;
					}
					if(this.mallClassifyList[i].is_final == 0) {
						let arr = this.mallClassifyList[i].sub;
						List[i].sub = [];
						let arr2 = List[i].sub;
						for(let j in arr) {
							arr2[j] = {};
							if(!arr[j].mall_category_name) {							
								arr[j].isWarn = true;//提示没写名字
								return;
							};
							arr2[j].mall_category_name = arr[j].mall_category_name;
							if(!arr[j].image_url){
								arr[j].isWarn = true;//提示没有图片
								this.$message({showClose: true,message: '请上传图片!'});	
								return;
							};
							arr2[j].image_url=arr[j].image_url;
							if(arr[j].id != undefined) {arr2[j].id = arr[j].id;}														
						}
					}
				};
				let post = {"data": List};
				this.saveClassify(post,true)
			},
			saveClassify(post,isSave){
				existMallClassified(post)
					.then(({data}) => {				
						if(data.length != 0) {
							for(let val of data) {
								val.created = false;
								val.isWarn = false;
								if(val.is_final == 0) {
									for(let v of val.sub) {
										v.created = false;
										v.isWarn = false;
									}
								}
							}
						}
						this.mallClassifyList = data;
						if(isSave===true){
							this.$message({showClose: true,message: '保存成功!',type: 'success'});	
						};																																
						this.isEdited = false;
						this.$store.dispatch("doMallClassifyList");
					}).catch(({response: {data}}) => {					
						this.$message.error(data.errorcmt);
					})
			}
		}
	}
</script>

<style lang="scss">
	.mallcategory{
		margin-top: 120px;
		.g-content{			
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
