<template>
	<div class="specification clearfix mt-30">  
		<el-button class="store-button2 mb-10 pl-10 pr-10" v-if="spec.length>0?true:false" @click="editSpec">
			编辑规格
		</el-button>
		<el-table :data= "spec" border style="width: 100%"  v-if="spec.length===0?true:false">
			<div slot="empty">
				<p class="color-3 f12 mt-10 mb-10">未添加商品规格，请先添加商品规格</p>
				<el-button type="text" @click="dialogVisible = true" class="store-button1 mb-20">添加商品规格</el-button>
			</div>
			 <el-table-column>				
			 </el-table-column>			 
		</el-table>
		
		<table v-else  border bordercolor="#D6D6D6" cellspacing="0" width="100%"  class="tableList">
			<thead>
				<tr style="color: #62778C;background-color: #F0F4F7;">
					<th v-for="item in boxTitle" >{{item}}</th>
					<th width="200" >价格</th>
					<th  width="200">库存</th>
					<th width="200">图片</th>
				</tr>
			</thead>
			<tbody >			
				<tr v-for="(item,index) in spec">	
					<td v-for="child in rowsCon[index]" class="text-c" >
						{{child}} 
					</td>					
					<td width="200">
						<input type="number"  v-model.lazy.trim.number="item.spec_price_yuan" class="text-c"/>
					</td>
					<td width="200">
						<input type="number" v-model.lazy.trim.number="item.spec_store"   class="text-c"/>
					</td>
					<td width="200">			
						<imgUpload :imageType="imageType" :imageUrl="item.spec_url" @getImageUrl="getPath" :index="index" 
							class="middle">
							
						</imgUpload>
					</td>
				</tr>			
			</tbody>
		</table>		
		<!--弹框表格-->
		<el-dialog :visible.sync="dialogVisible" title="商品规格" class="text-l specify" default-expand-all="true">
			<div class="productProp">
				<el-table  :data="spec_items" style="width: 100%" class="box-table">
					<div slot="empty" height="0"></div>
		    		<el-table-column   type="expand" >
		    			<template slot-scope="props">
							<div v-for="(item,index) in props.row.sub" class="clearfix border-e9-b">
								<svg width="24" height="24" class="float-l"><use xlink:href="#Rectangle"/></svg>
								<el-input v-model.trim="item.item_name" placeholder="请输入规格属性名称">
			    					
			    				</el-input>
			    				<el-button class="txtbtn" @click="onlyDelet(props.row.sub,index)">删除</el-button>
							</div>
							<div class="addprops">		
								<svg width="24" height="24" class="float-l" v-if="addOnlyShow"><use xlink:href="#Rectangle"/></svg>
								<el-button @click="addOnly(props.row)" class="addOnly" v-if="addOnlyShow">
									添加规格属性
								</el-button>
							</div>
		    			</template>		    			
		    		</el-table-column>
		    		<el-table-column label="规格名称" prop="spec_name" >
		    			<template slot-scope="props">
		    				<el-input v-model.trim="props.row.spec_name" placeholder="请输入规格名称">
		    					
		    				</el-input>
		    			</template>
		    		</el-table-column>
		    		<el-table-column label="操作">
		    			<template  slot-scope="props">
		    				<el-button class="txtbtn" @click="moreDelet(props.$index, props.row)">删除</el-button>
		    			</template>
		    		</el-table-column>
				</el-table>
				<div class="w-100 border-f4 addproduct" v-if="spec_items.length>3?false:true">
					<el-button class="txtbtn" @click="addMore">
						<b>+</b> 添加商品规格（{{spec_items.length}}/4）
					</el-button>
				</div>
			</div>
			<div class="sureSpec clearfix">
				<div class="float-l">
					<p class="color-7F f12">请先设置并确认好商品规格后再进行设置商品价格/库存等操作</p>
					<p  class="color-7F f12">若设置好商品价格/库存后再进行更改商品规格，之前设置的商品价格/库存数据会被清空</p>
				</div>
				<div class="float-r">
					<el-button class="store-button1" @click="exist">
						保存
					</el-button>
					<el-button class="store-button2" @click="cancel">
						取消
					</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import shareMth from '@/utils/shareMth'
	import {packedArray} from "@/api/script"
	import imgUpload from "@/components/func/imageUpload"
	import { editspef } from "@/api/commodity"
	export default{
		data(){
			return{
				dialogVisible:false,
				spec_items:[],
				addOnlyShow:true,
				imageType:"product",
				muchRow:[],
				specsChils:[],				
				existRecord:true,
				moreArray:[],
			}
		},
		props:{
			spec_item:{
				type: Array,
				default:function(){
					return []
				}		
			},
			spec:{
				type: Array,
				default:function(){
					return []
				}		
			},
			product_id:{
				type: Number,
				default:function(){
					return parseInt("")
				}
			}
			
		},
		mixins:[shareMth],
		components:{
			imgUpload
		},
		computed:{	
			boxTitle(){
				var boxTitle=[];
				var changeSpec_item=JSON.parse(JSON.stringify(this.spec_item));//改变共同的域
				for(var i=0; i<changeSpec_item.length;i++){
					boxTitle[i]=changeSpec_item[i].spec_name
				}
				return boxTitle
			},	
			rowsCon(){
				var rowsCon=[];
				for(var i=0;i<this.spec.length;i++){
					rowsCon[i]=[];
					if(this.spec_items.length===0){
						//父集传过来时没长度
						rowsCon[i]=this.spec[i].spec_name.split(";")
					}else{
						for(var j=0;j<this.spec_items.length;j++){
							rowsCon[i]=this.spec[i].spec_name.split(";")						
						}
					}
					
				};
				return rowsCon
			}
		},
		methods:{
			addMore(){		
				this.spec_items.push({
					spec_name:"",
					sub:[
					],
				})
			},
			editSpec(){
				this.dialogVisible = true;
				this.specVis();
			},
			//页面显示原先规格数据
			specVis(){
				this.spec_items=JSON.parse(JSON.stringify(this.spec_item));
				for(let i=0; i<this.spec_items.length;i++){
					//删除空字符串
					this.deleteEmptyString(this.spec_items[i].sub);
					//删除空的数组
					this.deleteArrayObject(this.spec_items[i].sub);
				}
			},
			moreDelet(index,row){
				this.existRecord=false;
				this.$confirm("你是否确定删除该规格，删除后该规格内的规格属性都将被删除","温馨提示",{
					 confirmButtonText: '确定',
         			 cancelButtonText: '取消',
				}).then(()=>{
					this.spec_items.splice(index,1);
					
				}).catch(({response:data})=>{
					
				})
				
			},
			onlyDelet(child,index){
				this.existRecord=false;
				child.splice(index,1);		
				if(child.length<10){
					this.addOnlyShow=true;
				}
			},
			addOnly(child){
				this.existRecord=false;
				child.sub.push({
					item_name:""
				});
				if(child.sub.length>9){
					this.addOnlyShow=false;
				}
			},
			exist(){
				this.moreArray=[];//每次都是重新组合计算
				var itemsChild=[];	
				//收集this.spec_items中的所有值
				var allValue=[];
				var spec_nameVale=[];
				var subValue=[];
				for(let i=0; i<this.spec_items.length;i++){
					if(this.spec_items[i].spec_name==""){	
				        this.hintInfo('请输入规格名称')
						return 
					};
					if(this.spec_items[i].sub.length===0){
				        this.hintInfo('请输入规格属性名称');
						return
					};
					//删除空字符串
					this.deleteEmptyString(this.spec_items[i].sub);
					//删除空的数组
					this.deleteArrayObject(this.spec_items[i].sub);
					//传给父集的数据（spec_items）
					itemsChild[i]=this.spec_items[i];
					allValue.push(this.spec_items[i].spec_name);
					//只手机收集this.spec_items[i].spec_names中的值
					spec_nameVale.push(this.spec_items[i].spec_name);
					for(var h=0,subLen=this.spec_items[i].sub.length;h<subLen;h++){
						allValue.push(this.spec_items[i].sub[h].item_name);
						//只收集this.spec_items[j].sub[h].item_name中的值
						subValue.push(this.spec_items[i].sub[h].item_name)
					};
					
				};					
				var mergeValue=new Set([...spec_nameVale,...subValue]);
				//判断规格属性和规格属性名称是否有重复(有重复就返回)
				if(mergeValue.size!==allValue.length){
					this.hintInfo('规格属性或规格名称有重复命名')
					return 
				};					
				//传给父集的数据（specs）	
				var index=0;		
				for(var j=0,max=this.spec_items.length;j<max;j++){
					index++;
					this.moreArray[index-1]=[];	
					//删除空字符串
					this.deleteEmptyString(this.spec_items[j].sub);
					//删除空的数组
					this.deleteArrayObject(this.spec_items[j].sub);	
					//收集this.spec_items中的所有值									
					for(var h=0,subLen=this.spec_items[j].sub.length;h<subLen;h++){
						this.moreArray[index-1].push(this.spec_items[j].sub[h].item_name);	
					}
				};				
				
				if(this.moreArray.length===0){
					this.hintInfo('请填规格')
					return
				}		
				this.$emit("editSpec_items",itemsChild);
				
				if(this.$route.path==='/zxh/commodityPage/pulishProduct'){
					//传给父集的数据（specs）得到多种组合状况
					this.specsExist();
				}else{
					//编辑商品的时候保存商品规格接口以获得商品规格记录id
					var save_spec={
						product_id:this.product_id,
						data:itemsChild
					};
					this.editspefAPI(save_spec);
				}
				this.dialogVisible = false;
			},
			editspefAPI(mess){
				this.specsChils=[];//每次都是重新赋值
				editspef(mess)
				.then(({data})=>{						
					for(let i=0;i<data.product_specs.length;i++){
						this.$set(this.specsChils,i,{
							id:data.product_specs[i].id,
							spec_url:data.product_specs[i].spec_url,
							spec_price_yuan:data.product_specs[i].spec_price_yuan,
				            spec_store:data.product_specs[i].spec_store,
				            spec_name:data.product_specs[i].spec_name
						});
					};
					this.$emit("editeditSpec",this.specsChils);
				})
				.catch(({response:data})=>{
					this.$message.error(data.errorcmt);
				})
			},
			hintInfo(data){
				this.$message({
		        	message: data,	
		        	showClose:true
		        });
			},
			specsExist(){	
				//传给父集的数据（specs）得到多种组合状况
				if(this.moreArray.length>=2){
					this.muchRow=packedArray(this.moreArray);
				}else{
					//lastRow[0]长度为1是格式为[],长度大于1时格式为[[],[],[]]
					var lastRow=this.moreArray;
					if(lastRow[0].length===1){
						this.muchRow=lastRow;
					}else{
						var oneMoreArray=[];
						for(var i=0;i<lastRow[0].length;i++){						
							this.$set(oneMoreArray,i,[lastRow[0][i]])
						};
						this.muchRow=oneMoreArray;						
					}					
				};
				this.arrSpec();				
			},	
			arrSpec(){
				this.specsChils=[];//每次都是重新赋值
				for(var i=0;i<this.muchRow.length;i++){									
					this.$set(this.specsChils,i,{						
						spec_name: this.muchRow[i].join(";"),
						spec_url:"",
			            spec_price_yuan: "",
			            spec_store: "",
					})
				};
				this.$emit("editeditSpec",this.specsChils);	
			},
			cancel(){		
				//绑定数据				
				this.specVis();
				this.dialogVisible = false;
			},
			getPath(data){
				this.spec[data.index].spec_url=data.new_url;
			}
		}
		
	}
</script>
<style scoped="scoped">
	.specification .store-button1{
		padding-left: 38px;
		padding-right: 38px;
	}
	.addproduct{
		box-sizing: border-box;
		border-top: none;
		border-radius: 0;
		height: 40px;
		
	}
	.productProp .el-button:hover{
		background-color: transparent;
	}
	.productProp .el-table__row:hover .el-button{
		background-color: transparent;
	}
	.productProp{
		padding-top: 0px;
		padding-bottom: 0px;
		height: 454px;
		overflow-x: hidden;
		overflow-y: auto;
		margin-bottom: 0;
	}
	.productProp::-webkit-scrollbar{
		width:0px
	}
	.sureSpec{
		padding-top: 20px;
	}
	.sureSpec p{
		line-height: 16px;
	}
	.sureSpec .store-button2{
		padding-left: 38px;
		padding-right: 38px;
	}
	.sureSpec .el-button span{
		font-size: 12px;
	}
	.tableList td{
		color: #333;
		height: 70px;
	}
	.tableList td input{
		display: block;
		box-sizing: border-box;
		height: 28px;
		line-height: 28px;
		margin-left: auto;
		margin-right: auto;
		width: 120px;
		
	}
	.tableList td .imageUpload{
		height: 50px;
		width: 50px;
	}

</style>


<style>

.specification .el-table__empty-text{
	position: relative;
	left: 0;
	top: 0;
}
.productProp .el-table__empty-block{
		min-height: 0;
}
.specify .el-dialog--small{
	width: 900px;
	height: 600px;
}
.specify .el-dialog__body{
	padding-top: 20px;
	padding-bottom: 20px;
}
.specify .el-dialog__body::-webkit-scrollbar{
	width:0px
}
.specify .el-table__body,.specify  .el-table__footer,.specify  .el-table__header{
	table-layout: auto;
}
.productProp .el-table__expanded-cell .el-input{
	float: left;
	width: auto;	
}

.productProp .el-table__expanded-cell button.txtbtn{
	float: right;
	background-color: transparent;
	text-align: right;
	padding-left: 0;
	padding-right: 0;
	margin-right: 20px;
	
}
.productProp .el-table__expanded-cell{
	padding: 0;
	background-color: transparent;
}
.productProp .el-table__expanded-cell svg{
	margin-left: 64px;
	margin-right: 6px;
	margin-top: 4px
}
.productProp .el-table__expanded-cell .addOnly{
	font-size: 12px;
	border:1px solid #d6d6d6;
	padding-bottom: 0;
	padding-top: 0;
	height: 24px;
	line-height: 24px;
}
.productProp .el-table__expanded-cell .el-input__inner{
	height: 24px;
	line-height: 24px;
	border-radius: 2px;
	width: 250px;
}
.productProp .addOnly span{
	color: #0070C9;
	font-size: 12px;
}
.productProp .el-table__header th:nth-child(2),.productProp .el-table__body td:nth-child(2){
	width: 85%;
}
.productProp .el-table__header th:nth-child(3),.productProp .el-table__body td:nth-child(3){
	width: 10%;
	text-align: right;
}
.productProp .el-table__header th:nth-child(2) .cell,.productProp .el-table__header th:nth-child(3) .cell{
	color: #62778C;
}
.productProp .el-table__header th:nth-child(3) .cell, .productProp .el-table__body td:nth-child(3) .cell{
	padding-left: 20px;
	padding-right: 20px;
}
.productProp .el-table__body td:nth-child(3) .el-button{
	padding:0 ;
}
.productProp .el-table .cell,.productProp  .el-table th>div{
	padding-right: 0;
}
.productProp .el-table__body td:nth-child(2) .el-input__inner{
	height: 24px;
	line-height: 24px;
	border: 1px solid #d6d6d6;
	width: 280px;
	border-radius: 2px;
}

.productProp .el-table td,.productProp .el-table th.is-leaf{
	border-bottom: 1px solid #E9EEF2;
}
.tableList td .imageUpload_con{
	margin-top:-18px;
	margin-left: -11px;
}
.tableList td .imageUpload  .iconfont{
	font-size:24px;
}
.tableList .imageUpload  .imageUpload_con  p.clickUpdata{
	display: none;
}
.tableList .imageUpload  .imageUpload_con i{
	display: none;
}
.tableList .imageUpload  .imageUpload_con  p.againUpdata{
	color: #0070C9;
	width: 30px;
	word-wrap : break-word;
	width: 30px;
    margin-top: -3px;
    line-height: 18px;
    margin-left: -4px;
}
</style>