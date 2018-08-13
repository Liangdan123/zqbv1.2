<template>
	<el-table :data="ClassifyList" style="width: 100%" empty-text="尚未添加分类" class="table_edit" :row-class-name="className" 
		@selection-change="handleSelectionChange">
		<el-table-column type="selection" width="36"> </el-table-column>
		<el-table-column type="expand" width="23">
			<template slot-scope="props">
				<!--.......................下拉数据...................-->
				<div v-for="(value,index) in props.row.sub" class="expanded-box" :class="{active:value.isActive}">
					<div class="expanded">
						<el-checkbox v-model="value.created" @change="SelectionChildChange(props.row,value,props.$index)"></el-checkbox>
					</div>
					<div class="expanded">
						<svg width="24" height="24">
							<use xlink:href="#Rectangle" />
						</svg>
						<el-input v-model.trim='value.mall_category_name' class="input-child-name" :class="{warn:value.isWarn}" @change="verify(value)" 
							placeholder="请输入分类名称">							
						</el-input>
						<imageUpload :imageUrl="value.image_url" :imageType="'mall'" :index="index"
							 @getImageUrl="upImg($event,props.$index)" :class="{warn:value.isWarn}">							
							
						</imageUpload>
						<div class="txt" :class="{warn:value.isWarn}">
							<span class="txtCon">图片尺寸建议100×100格式支持png、jpg</span>
						</div>					
					</div>
					<div class="expanded">
						{{value.created_at }}
					</div>
					<div class="expanded">
						<el-button @click="up(index, props.row.sub)" type="text" size="small">
							<i class="iconfont icon-shangyi f12"></i>
						</el-button>
						<el-button @click="down(index, props.row.sub)" type="text" size="small">
							<i class="iconfont icon-xiayi f12"></i>
						</el-button>
					</div>					
					<div class="expanded">
						<el-button @click="deleteRow(index, props.row.sub)" type="text" size="small" class="btn-delete">
							删除
						</el-button>
					</div>
				</div>
				<div class="addChild">
					<svg width="24" height="24">
						<use xlink:href="#Rectangle" />
					</svg>
					<el-button class="store-button2 add-child" @click="addChild(props.row)">
						<i class="iconfont icon-tianjia f12"></i>
						<span>添加子分类 </span>
					</el-button>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="分类名称" width="540">
			<template slot-scope="props">
				<el-input v-model.trim="props.row.mall_category_name" class="input-name" :class="{warn:props.row.isWarn}" 
					@blur="verify(props.row)" placeholder="请输入分类名称"></el-input>
			</template>
		</el-table-column>
		<el-table-column prop="created_at" label="创建时间" width="203">
		</el-table-column>
		<el-table-column label="排序" width="277">
			<template slot-scope="scope">
				<el-button @click="top(scope.$index, ClassifyList)" type="text" size="small">
					<i class="iconfont icon-zhiding f12"></i>
				</el-button>
				<el-button @click="up(scope.$index, ClassifyList)" type="text" size="small">
					<i class="iconfont icon-shangyi f12"></i>
				</el-button>
				<el-button @click="down(scope.$index, ClassifyList)" type="text" size="small">
					<i class="iconfont icon-xiayi f12"></i>
				</el-button>
				<el-button @click="bottom(scope.$index, ClassifyList)" type="text" size="small">
					<i class="iconfont icon-zhidi f12"></i>
				</el-button>
			</template>
		</el-table-column>
		<el-table-column label="操作" width="116">
			<template slot-scope="scope">
				<el-button @click="deleteRow(scope.$index, ClassifyList)" type="text" size="small" class="btn-delete">
					删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
	import imageUpload from "@/components/func/imageUpload"
	export default {
		components:{imageUpload},
		data() {
			return {
				className: function(row, index) {
					if(row.isActive) {
						return "active"
					}
				}
			}
		},
		props: ['ClassifyList'],
		methods: {
			upImg(data,index){//上传图片事件
				let choiceRow=this.ClassifyList[index];				
				choiceRow.sub[data.index].image_url = data.new_url;
				this.$set(choiceRow,"sub",choiceRow.sub);//层级太多脱钩，那么需要重新绑定（逆向思维）
				this.$set(this.ClassifyList,index,choiceRow);	
			},
			addChild(parent) {
				let date = new Date(); let m = date.getMonth() + 1;let d = date.getDate();								
				date = date.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
				if(parent.is_final == 0) {
					parent.sub.push({
						created_at: date,
						created: false,
						isWarn: false,
						isActive: false
					})
				} else {
					this.$set(parent, 'sub', [{
						created_at: date,
						created: false,
						isWarn: false,
						isActive: false
					}])
					parent.is_final = 0;
				}
			},
			//删除整个分类
			deleteRow(index, arr) {
				if(arr[0].level == 1) {
					this.$confirm('你是否确定删除该分类，删除后该分类内的子分类都将被删除', '温馨提示', {
						lockScroll: false
					}).then(() => {
						arr.splice(index, 1);
						this.$message({type: 'success',message: '删除成功!'});																				
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					arr.splice(index, 1);
				}
			},
			active(arr, index) {//公共方法
				for(let val of this.ClassifyList) {
					val.isActive = false;
					if(val.is_final == 0) {
						for(let v of val.sub) {
							v.isActive = false;
						}
					}
				}
				arr[index].isActive = true;
			},
			top(index, arr) {
				if(index == 0) {
					return;
				}
				arr.unshift(arr.splice(index, 1)[0]);
				this.active(arr, 0)
			},
			bottom(index, arr) {
				if(index == arr.length - 1) {
					return;
				}
				arr.push(arr.splice(index, 1)[0]);
				this.active(arr, arr.length - 1)
			},
			swapItems(arr, index1, index2) {
				arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				this.active(arr, index2)
				return arr;
			},
			up(index, arr) {
				if(index == 0) {
					return;
				}
				this.swapItems(arr, index, index - 1);
			},
			down(index, arr) {
				if(index == arr.length - 1) {
					return;
				}
				this.swapItems(arr, index, index + 1);
			},

			handleSelectionChange(arr) {//select(选择需要删除的商城分类)
				var emptyDelt=false;
				if(arr.length===0){
					emptyDelt=true
				}
				this.$emit("emptyDelt",emptyDelt);
				
		    let created = true;
		    if (arr.length == 0) {
		      created = false;
		    }
				for(let val of arr){
					val.created = created;
					if (val.is_final == 0) {
		        for (let v of val.sub) {
		          v.created = created;
		        }
		      }
				}
			},
			SelectionChildChange(parent, child, index) {
				let parent_created = true;
				for(let val of parent.sub) {
					if(val.created == false) {
						parent_created = false;
					}
				}
			},
			verify(arr) {
				if(arr.mall_category_name) {
					arr.isWarn = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.mallcategory{
		.table_edit {
			
			border: 0;
			font-size: 12px;
			
			&:before {
				height: 0;
			}
			&:after {
				width: 0;
			}
			.el-table__empty-block {
				border-bottom: 1px solid #dfe6ec;
			}
			.cell:first-child {
				text-overflow: clip;
			}
			.addChild:hover,.el-table__body .el-table__row:hover>td,			
			.expanded-box:hover {
				background: #F8FAFC !important;
			}
			.el-table__row.active {
				background: #EEF6FD;
			}
			.el-button.add-child {
				width: 96px;
				height: 24px;
				line-height: 24px;
				padding: 0;
			}
			.el-checkbox__input.is-checked .el-checkbox__inner {
				border-color: #0070C9;
				background: #0070C9;
			}
			.el-checkbox__inner {
				width: 16px;
				height: 16px;
				border-radius: 2px;
				&:hover {
					border-color: #7F7F7F;
				}
			}
			td {
				box-sizing: border-box;
				height:60px;
			}
			th>.cell {
				color: #62778C;
			}
			td>div {
				color: #333;
			}
			.cell,
			th>div {
				padding-left: 10px;
				text-align: left;
			}
			.el-table__expand-icon {
				height: 31px;
			}
			.el-icon-arrow-right {
				border: 6px solid transparent;
				border-left-color: #333;
				&:before {
					content: "";
				}
			}
			.el-input__inner {
				height: 32px;
				border-radius: 2px;
			}
			.input-name {
				width: 280px;
				line-height: 60px;
			}
			.input-child-name {
				display: inline-block;
				width: 250px;
			}
			.el-table__expanded-cell {
				padding: 0;
				background: #fff;
				box-shadow: none;
				&:hover {
					background: #fff;
				}
				.expanded-box.active {
					background: #EEF6FD;
				}
				.expanded-box:not(:last-child) {
					overflow: hidden;
					border-bottom: 1px solid #dfe6ec;
				}
				.addChild {
					padding-left: 73px;
					height: 60px;
					text-align: left;
					line-height: 60px;
				}
				.expanded {
					box-sizing: border-box;
					float: left;
					height: 60px;
					line-height: 60px;
					padding-left: 10px;
					text-align: left;
					.txt{
						position: relative;
						top: 10px;
						width: 120px;
						display:inline-block;
						line-height: 20px;	
						margin-left:10px;
						.txtCon{
							
							display: block;
							color: #7F7F7F;
							font-size: 12px;
													
						}
					}

					&:nth-child(2) {
						margin-left: 37px;
						width: 540px;
					}
					&:nth-child(3) {
						width: 201px;
					}
					&:nth-child(4) {
						width: 277px;
					}
				}
				svg {
					vertical-align: middle;
				}
			}
			.el-button--text {
				color: #7F7F7F;
				&:hover {
					color: #0070C9;
				}
				&:active {
					color: #005396;
				}
				&.btn-delete {
					color: #0070C9;
					&:hover {
						text-decoration: underline;
					}
					&:active {
						text-decoration: underline;
					}
				}
			}
			.iconfont {
				vertical-align: middle;
			}
			.warn {
				input {
					border-color: #EE6827;
					&::-webkit-input-placeholder {
						color: #EE6827;
					}
					&::-moz-placeholder {
						color: #EE6827;
					}
					&:-moz-placeholder {
						color: #EE6827;
					}
					&:-ms-input-placeholder {
						color: #EE6827;
					}
				}
			}
		}
	}

</style>
<style>
	.mallcategory .el-table th,
	.mallcategory .el-table__footer-wrapper thead div,
	.mallcategory .el-table__header-wrapper thead div {
		background: #F0F4F7;
	}	
	.mallcategory .el-table--enable-row-hover .el-table__body tr:hover>td,
	.mallcategory .el-table__expanded-cell:hover {
		background: #fff !important;
	}
	.mallcategory .el-table__body, .el-table__footer, .el-table__header{
		table-layout:auto;
	}	
	.mallcategory .el-table__row .el-table_1_column_6{
		width:540px;
		display: inline-block;
	}
	.mallcategory .el-table__row .el-table_1_column_7{
		width: 201px;
	}
	.mallcategory .el-table__row .el-table_1_column_8{
		display: inline-block;
		width: 277px;
	}
	.mallcategory .el-table_1_column_8 .cell{
		line-height: 60px;
	}
	.mallcategory .imageUpload{
		height: 40px;
		width: 40px;
		vertical-align: middle;
		display: inline-block;
		margin-left: 10px;
	}
	.mallcategory .imageUpload .icon-jiahao{
		font-size: 12px;
	}
	.mallcategory .imageUpload .imageUpload_con{
		height: 40px;
		width: 40px;
		text-align: center;
		line-height: 40px;
		margin-top:-20px;
		margin-left:-20px;
	}
	.mallcategory .imageUpload img{
		margin-top: -20px;
	}
	.mallcategory .imageUpload.warn{
		border: 1px dashed #EE6827;
	}
	.mallcategory .imageUpload.warn .icon-jiahao{
		color:#EE6827;
	}
	.mallcategory .txt.warn{
		color:#EE6827;
	} 
</style>