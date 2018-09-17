<template>
	<div class="productDetails">
		<div class="product_detail scrollbar">
			<div 
				v-for="(item,index) in CommodityDetails" 
				:key="index">
				<div 
					class="pos-r pushPic" 
					v-if="item.type==='image'?true:false">
					<img :src="item.content" class="w-100"/>
					<div class="pic-mask pos-a transition pos-all">
						<div  
							class="clearfix pt-10" 
							v-if="index===deletIndex?picdlt:true">
							<svg 
								width="40" 
								height="14" 
								class="float-r cursor" 
								@click="isdelet(index)">
								<use xlink:href="#shancubai" />
							</svg>
							<svg 
								width="40" 
								height="14" 
								class="float-r cursor">
								<use xlink:href="#xiayibai" 
									@click="indexDown(index)"/>
							</svg>
							<svg 
								width="40" 
								height="14" 
								class="float-r cursor" 
								@click="indexUp(index)">
								<use xlink:href="#shangyibai" />
							</svg>
						</div>
						<div v-else 
							class="pos-a btn-div">
							<p @click="picDelet(index)"
								class="border-f4 f12 color-f text-c mr-10 cursor">  
								
								确定删除
							</p>
							<p @click="picdlt=true"
								class="border-f4 f12 color-f text-c cursor">
								取消
							</p>
						</div>
					</div>
				</div>
				<div v-else>							
					<div 
						v-if="item.content===''?true:false" 
						class="pulishTxt bg-f padding-10">
						<el-input  
							type="textarea" 
							placeholder="单个文本框字数请勿超过500" 
							:maxlength="500" 
							v-model.trim="txtBox"
							class="radius-2 scrollbar" >									
						</el-input>
						<div 
							class="clearfix store-button mt-10">
							<el-button 
								class="store-button2 float-r" 
								@click="cancel(index,item)">取 消</el-button>
							<el-button 
								class="store-button1 float-r mr-10" 
								@click="pulishtxt(index,item)">发 布</el-button>
						</div>
					</div>

					<div v-else 
						class="showTxt bg-f pos-r">
						<p  class="f12 color-3 text-l">{{item.content}}</p>
						<div class="txt-mask pos-a transition">
							<div v-if="index===txtIndex?txtdlt:true"
								 class="clearfix pos-a arrow" >
								<svg 
									width="40" 
									height="14" 
									class="float-r cursor" 
									@click="txtIsDelet(index)">
									<use xlink:href="#shancubai" />
								</svg>
								<svg 
									width="40" 
									height="14" 
									@click="indexDown(index)"
									class="float-r cursor">
									<use xlink:href="#xiayibai" />
								</svg>
								<svg 
									width="40" 
									height="14" 
									@click="indexUp(index)"
									class="float-r cursor">									
									<use xlink:href="#shangyibai"/>
								</svg>
								<svg 
									width="40" 
									height="12" 
									@click="edit(index)"
									class="float-r cursor">									
									<use xlink:href="#bianjibai" />
								</svg>
							</div>
							<div  v-else class="btn-div pos-a">
								<p @click="txtDelet(index)"
									class="border-f4 f12 color-f text-c cursor mr-10" >
									确定删除
								</p>
								<p @click="txtdlt=true"
									class="border-f4 f12 color-f text-c cursor">
									取消
								</p>
							</div>							
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="pulishBtn clearfix">
			<div class="imgUpload bg-f text-c fl pos-r">
				<svg width="40" height="16">
					<use xlink:href="#updown"/>
				</svg>
				<input type="file" 
					@change="addPic"  
					ref="input" 
					class="pos-a pos-all"/>
				<span class="color-3 f12 ">添加图片</span>
			</div>	
			<div class="txtUpload bg-f fl">
				<button  
					type="button"  
					@click="addTxt" 
					:disabled="txtable" 
					class="display-in">
					<svg width="40" height="14">
						<use xlink:href="#wenzi" />
					</svg>
					<span class="color-3 f12">添加文字</span>
				</button>
			</div>
		</div>
	</div>	
</template>

<script>
		import {imUpload} from "@/api/script"
		import shareMth from '@/utils/shareMth'
		export default{
			data(){
				return{
					picdlt:true,
					deletIndex:"",
					txtBox:"",
					txtable:false,
					txtIndex:"",
					txtdlt:true,
					editTxt:true,
					changeTxtBox:"",
					isCancel:Boolean,
					isEdit:true,
				}
			},
			props:["CommodityDetails"],
			mixins:[shareMth],
			methods:{
				addPic(event){
					imUpload(event,"product").then((res)=>{
						this.CommodityDetails.push({
							type:"image",
							content:res
						});
					})
					.catch((error)=>{
						this.$message({
				        	message: error,
				        	type: 'warning',
				        	showClose:true
				        });
					})
					this.$refs.input.value="";
				},
				isdelet(index){			
					this.deletIndex=index;	
					this.picdlt=false;
				},
				txtIsDelet(index){
					this.txtIndex=index;
					this.txtdlt=false;
				},
				//删除样式的方法
				picDelet(index){
					this.picdlt=true;				
					this.itemDelte(index,this.CommodityDetails);				
				},
				txtDelet(index){
					this.txtdlt=true;
					this.itemDelte(index,this.CommodityDetails);
				},
				addTxt(){
					this.CommodityDetails.push({
						type:"text",
						content:""
					});
										
					let detail=this.CommodityDetails
					var j=0;
					if(this.txtable===false){//添加文字按钮是否能点
						this.txtable=true;
					};				
					this.txtBox="";
					this.isCancel=true;	
					this.isEdit=false;//点击添加文字不让出现编辑框，保证编辑框值出现一次
				},
				pulishtxt(index,item){	
					if(this.txtBox!==""){
						this.CommodityDetails[index].content=this.txtBox;											
						if(this.txtable===true){//添加文字按钮是否能点
							this.txtable=false
						}

					}else{
						this.isPrompt("请输入内容")
					};
					this.isEdit=true;//允许编辑
				},
				cancel(index,item){
					if(this.isCancel===true||this.txtBox===""){
						this.itemDelte(index,this.CommodityDetails);
						this.txtable=false;//添加文字按钮能点

					}else{						
						this.CommodityDetails[index].content=this.changeTxtBox;
						this.txtable=false;//添加文字按钮能点
					};
					this.isEdit=true;//允许编辑
				},
				indexDown(index){
					this.itemIndexDown(index,this.CommodityDetails);
				},
				indexUp(index){
					this.itemIndexUp(index,this.CommodityDetails);
				},
				edit(index){
					this.txtable=true;//点击编辑按钮是不让添加文字中的框出来
					this.isCancel=false;//用于判断是否需要整个删除（点击取消的时候;
					let content=this.CommodityDetails[index].content
					if(this.isEdit===true){
						this.changeTxtBox=JSON.parse(JSON.stringify(content));//保存未编辑是的内容
						this.txtBox=content;//先保存原先编辑的内容
						this.CommodityDetails[index].content="";
						this.isEdit=false;//不让出现多次编辑
					}else{
						this.isPrompt("请发布编辑内容")
					}
					
				},
				isPrompt(data){
					this.$message({
			          showClose: true,
			          message: data,
			        });
				}
			}
		}
		
</script>

<style lang="scss">
.productDetails{
	position: relative;
	height: 483px;
	width: 300px;
	background-color: #F0F4F7;
	border: 1px solid #d6d6d6;
	.pulishBtn{
		height: 40px;
		.imgUpload{
			width: 148px;
			height: 40px;
			border: 1px solid #d6d6d6;
			border-left:none;
			line-height:40px;
			input{
				width: 100%;
				height: 100%;
				opacity: 0;
				filter:alpha(opacity=0);		
				z-index: 500;
				cursor: pointer;
			}
			svg{
				vertical-align: text-bottom;
				margin-left: -10px;
			}
			span{
				margin-left: -10px;
			}
		}
		.txtUpload{
			width: 149px;
			height: 40px;
			border: 1px solid #d6d6d6;								
			button{
				width: 100%;
				height: 100%;
				background-color: transparent;
				border: 0;
				outline: none;
				cursor: pointer;
				svg{
					vertical-align: text-top;
				}
				span{
					margin-left: -10px;
				}
			}
		}
	}
	.product_detail{
		height: 443px;
		.pulishTxt{							
			height: 134px;
			.el-textarea{
				textarea{
					height: 100px;
					resize: none;
					font-size: 12px;
					color: #7F7F7F;
					&:focus{
						border: 1px solid #0070C9;
					}
				}
			}
			.store-button{
				.el-button{
					padding-left: 27px;
					padding-right: 27px;
					padding-top: 0;
					padding-bottom: 0;
					height: 24px;				
					line-height: 24px;
					font-size: 12px;
				}
			}
		}
		.showTxt{
			min-height:44px;
			padding: 10px;
			.txt-mask{				
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				height: 0;
				background: rgba(0,0,0,.7);
				z-index: 200;
				overflow:hidden;
				div.arrow{
					top: 10px;
					right: 0;
				}
				div.btn-div{
					top: 50%;
					left: 50%;
					width:174px;
					margin-left:-87px;
					margin-top:-12px;		
					p{
						float: left;
						width: 80px;
						height: 24px;
						line-height: 24px;
					}				
				}

			}
			&:hover{
				.txt-mask{
					height: 100%;
				}									
			}
		}
		.pushPic{
			.pic-mask{
				background: rgba(0,0,0,.7);
				z-index: 200;
				height: 0;
				overflow: hidden;
				.btn-div{
					top: 50%;
					left: 50%;
					width:174px;
					margin-left:-87px;
					margin-top:-12px;					
					p{
						float: left;
						width: 80px;
						height: 24px;
						line-height: 24px;
					}
				}
				

			}
			&:hover{
				.pic-mask{
					height: 100%;
				}
			}
		}
	}
}
</style>