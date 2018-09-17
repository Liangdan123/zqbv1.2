<template>
	<div class="addMess">
		<div class="addMess-con pos-r">
			<el-form :model="addMessForm" :rules="storeRules" ref="addMessForm"  class="addMessForm">
				<h2 class="color-3 f16 text-l mb-20">基本信息</h2>
			 	<el-form-item label="店铺名称" prop="shop_name">
			    	<el-input v-model="addMessForm.shop_name" placeholder="不超过30个字"
			    		      class="login-input2" :class="{border:borderOne}">
			    	</el-input>
		    		<em v-if="storeNameError">{{storeNameLen}}</em>
				</el-form-item>
				<el-form-item label="店长姓名" prop="shopkeeper_name">
			    	<el-input 
			    		v-model="addMessForm.shopkeeper_name" 
			    		class="login-input2">
			    	</el-input>
			  	</el-form-item>
				<el-form-item label="联系电话" prop="shopkeeper_phone">
			    	<el-input v-model="addMessForm.shopkeeper_phone" class="login-input2" 
			    		:class="{border:borderTwo}">
			    	</el-input>
			    	<em v-if="shop_nameError">{{shop_name}}</em>
				</el-form-item>
			  	<el-form-item label="营业时间">
			    	<el-col  class="time-width">
			      		<el-time-select  placeholder="选择时间" v-model="addMessForm.shop_start"
			      			:picker-options="{
			      				start: '00:30',
						     	step: '00:30',
						    	end: '23:30'
			      			}"
			      			 style="width: 100%;" class="login-input2">
			      		</el-time-select>
			    	</el-col>
			    	<el-col class="line text-c">至</el-col>
			    	<el-col  class="time-width">
			      		<el-time-select  placeholder="选择时间" v-model="addMessForm.shop_end"
			      			:picker-options="{
			      				start: '00:30',
						     	step: '00:30',
						    	end: '23:30'
			      			}"
			      			style="width: 100%;" class="login-input2">
			      		</el-time-select>
			    	</el-col>
			  	</el-form-item>
			  	<h2 class="color-3 f16 text-l mb-20">店铺客服</h2>
			  	<el-form-item label="客服名称" prop="kefu_name">
			    	<el-input v-model="addMessForm.kefu_name" class="login-input2" ></el-input>
				</el-form-item>
				<el-form-item label="客服电话" prop="kefu_phone">
			    	<el-input v-model="addMessForm.kefu_phone" class="login-input2"
			    		:class="{border:borderThree}">
			    	</el-input>
			    	<em v-if="kefu_numError">{{kefu_num}}</em>
			  	</el-form-item>
			  	<p class="text-l color-7F mb-40">
			  		注：此处店铺客服用来接待电话咨询，在线咨询客服接待需要在公众号后台进行添加客服微信。
			  	</p>
			  	<h2 class="color-3 f16 text-l mb-20">门店地址</h2>
			  	<el-form-item label="详细地址" prop="address">
			    	<el-input v-model="addMessForm.address"  placeholder="不能为空，长度必须控制在2-50个字符之间"
			    		class="login-input2" :class="{border:borderFour}" @change="changeAdress">
			    	</el-input>
			    	<em v-if="addressInfoError">{{addressInfo}}</em>
			    	<el-button  @click="location" class="store-button1">搜索定位</el-button>
			  	</el-form-item>
				<storeMap :storeAddress="detailAddress" @getDetail="getMess"></storeMap>
				<div class="imageUrl_all text-l pos-a">
					<span class="mb-10 display-in">店铺LOGO</span>
					<imageUpload :imageUrl="imgUrl" :imageType="imageType" @getImageUrl="updataLogo"></imageUpload>
					<span class="mt-10 display-in">图片尺寸建议104×104px<br>格式支持png、jpg</span>
				</div>				
				<div class="storeButton" v-if="preservation">
					<div  class="storeButton-con">
						<el-button class="store-button1" @click="createMess('addMessForm')">保 存</el-button>
						<el-button class="store-button2" @click="cancelMess">取 消</el-button>
					</div>
				</div>
				<el-form-item class="addStore" v-if="preservation===false">
					<el-button class="store-button1" @click="createMess('addMessForm')">添加</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import	{getStoreMessage} from "@/api/platform"
	import {createStoreMess,editStoreMess,getUserMess} from "@/api/servicer"
	import router from '@/router'
	import shareMth from '@/utils/shareMth'
	import * as links from "@/links/index"
	import * as types from "@/store/mutation-types"
	export default{
		name:"addMess",
		data(){
			return{
				addMessForm:{
					shop_name:"",
					shop_logo:"",
					shopkeeper_name:"",
					shopkeeper_phone:"",
					shop_start:"",
					shop_end:"",
					kefu_name:"",
					kefu_phone:"",
					province:"",
					city:"",
					area:"",
					address:"",
					lat:"",
					lng:""
				},
				storeRules:{
					shop_name:[
						{required: true, message:"请输入店铺名称",trigger: 'submit' },
						{min:0,max:30,message:"不超过30个字",trigger: 'submit' }						
					],
					shop_start:[
						{type: 'fixed-time',required: true, message:"请选择时间", trigger: 'submit' }
					],
					shop_end:[
						{type: 'fixed-time',required: true, message:"请选择时间", trigger: 'submit' }
					],
					kefu_name:[
						{required: true, message:"请输入客服名称", trigger: 'submit'}
					],
					kefu_phone:[
						{required: true, message:"请输入客服电话", trigger: 'submit'}
					],
					address:[
						{required: true, message:"请输入详细地址", trigger: 'submit'},
						{min:2, max:50, message:"详细地址必须控制在2-50个字之间",trigger: 'submit' }
					],
				},
				geocoder:"",
				detailAddress:"",
				preservation:Boolean,
				imgUrl:"",				
				imageType:"shop",
				address:"",
				borderOne:false,
				borderTwo:false,
				storeNameLen:"店铺名称不超过八个字",
				storeNameError:false,
				shop_nameError:false,
				shop_name:"请输入正确的手机格式",
				borderThree:false,
				kefu_numError:false,
				kefu_num:"请输入正确的格式",
				borderFour:false,
				addressInfoError:false,
				addressInfo:"",
				storeMessShow:{},//店铺信息数据
				exitsMess:{},
				addressFail:false,
				auditsMess:{},//审核的一部分信息				
			}
		},
		mixins:[shareMth],		
		created(){	
			this.getStoreMessage();				
		},
		updated(){
			this.$emit('update:addMessForm', this.addMessForm)
		},
		methods:{
			//地址发生改变的情况所触发的事件
			changeAdress(){
				this.addMessForm.city="";
			},
			borderVisTwo(){
				let arr2=["borderOne","storeNameError","borderTwo","shop_nameError","borderThree","kefu_numError"];
				this.isBoolean(arr2,false);
				let arr3=["borderFour","addressInfoError"];
				this.isBoolean(arr3,true);	
			},
			borderVisOne(arr,booleans){
				let arr1=["borderOne","storeNameError"];
				this.isBoolean(arr1,booleans);
			},
			ObjectCon(ObjectName){
				for(let val in ObjectName){
					return ObjectName[val]
				};
			},
			getMess(data){
				if(data!=="ERROR"){					
					//地址解析成功
					this.addMessForm.lat=data.location.lat;
					this.addMessForm.lng=data.location.lng;
					if(data.addressComponents.province===""){//直辖市没有省份
						this.addMessForm.province=data.addressComponents.city;
					}else if(data.addressComponents.province!==""){
						this.addMessForm.province=data.addressComponents.province;
					}					
					this.addMessForm.city=data.addressComponents.city;
					this.addMessForm.area=data.addressComponents.district;
					this.addressFail=false;
				}else if(data==="ERROR"){
					//地址解析失败
					this.addressFail=true;
				}
			},
			location(){//获取地图地址
				let addRessMess=this.addMessForm
				this.detailAddress=addRessMess.province+addRessMess.city+addRessMess.area+addRessMess.address;
				let arr3=["borderFour","addressInfoError"];
				this.isBoolean(arr3,false);	
			},
			updataLogo(data){
				this.addMessForm.shop_logo=data.new_url
				this.imgUrl=data.new_url
			},
			//上传时有无默认LOHGO,有就删掉
			shopLogo(){
				if(this.imgUrl.indexOf("data:image")!==-1){
					delete this.addMessForm.shop_logo
				}else{
					this.addMessForm.shop_logo=this.imgUrl;
				}
			},
			//创建信息与编辑信息合并
			createMess(addMessForm){				
				var store=this.addMessForm;				
				//分情况，创建店铺信息还是编辑店铺信息
				if(this.preservation){
					var getId=this.storeMessShow.id;
					store.id=getId;						
				}
				//调用shopLogo()方法
				this.shopLogo();
				let patt1=/^[1][3,4,5,7,8][0-9]{9}$/;
				let patt2=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
				var shop_nameLen=store.shop_name.length;
				let shopkeeper_phone=store.shopkeeper_phone;
				var kefu_phone=store.kefu_phone;							
				this.$refs[addMessForm].validate((valid) => {
		          	if (valid) {
		          		//地址解析错误不能继续进行
		          		if(this.addressFail){
		          			this.$message.error("请填正确的地址");   
		          			this.addressFail=false;
		          			return
		          		};
						for(let val in store){
							if(store[val]===""){
								delete store[val]
							}								
						};
						
	            		switch(true){//验证
	            			case !patt1.test(shopkeeper_phone):
								let arr=["borderTwo","shop_nameError"];
								this.isBoolean(arr,true)
								break;
							case this.addMessForm.shop_end===""||this.addMessForm.shop_start==="":
								this.$message.error("请选择营业时间");
								break;
							case this.addMessForm.shop_end < this.addMessForm.shop_start:
								this.$message.error("开始营业时间大于结束营业时间");
								break;
							case !patt1.test(kefu_phone)&&!patt2.test(kefu_phone):
								let arr4=["borderTwo","shop_nameError"];
								this.isBoolean(arr4,false);
								let arr1=["borderThree","kefu_numError"];
								this.isBoolean(arr1,true);
								break;
							case store.city===""||store.city===undefined:
								let arr3=["borderFour","addressInfoError"];
								this.isBoolean(arr3,true);	
								this.addressInfo='请点击"搜索定位"按钮，获取地理位置'
								break;
							default:
								if(this.preservation){//编辑信息
									this.doKeepMess(store);								
								}else{//添加店铺									
									this.createStoreMess(store);								
								}				
						}						
		          	} else {	            	
		            	return false;
		          	}
		        });
			},	
			createStoreMess(data){		
				createStoreMess(data)//创建信息接口	
				.then(({data})=>{						
					getUserMess()//获取服务商店铺
					.then(({data})=>{		
						this.$store.commit(types.ADDSUCESS,true);//提示添加成功
						let len=data.length;//没有数据时长度为0;
						this.$store.dispatch("doCloseStore",true);//导航能够看见
						if(len > 0) {
							let shop_id = data[0].shop_id;	
							this.$store.commit(types.GETSHOPID, shop_id);
							this.hopPage();//跳转页面
						};
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
					})	
					
				})
				.catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},
			isBoolean(isArrt,booleans){
				isArrt.map(item=>this[item]=booleans)
			},
			addZero(num){
				if(num<=9){
					num="0"+num;
				}
				return num;
			},
			//编辑API
			doKeepMess(keepMess){
				editStoreMess(keepMess)
				.then(({data})=>{
					this.$store.commit(types.KEEPSUCESS,true);	
					this.hopPage();	
				})
				.catch(({response: {data}})=>{
					 this.$message.error(data.errorcmt);
				})	
			},
			cancelMess(){
				this.$confirm('你是否确定放弃本次编辑', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		       }).then(()=>{
		        	//确认放弃，还原为未改之前	   
		        	this.addMessForm=JSON.parse(JSON.stringify(this.exitsMess));
		        	this.logo();
					this.$message({
			            type: 'info',
			            message: '已放弃本次编辑'
			         });
		        }).catch(()=>{
		        	if(event.srcElement.innerText=="取消"){
		        		this.$message({
				            type: 'info',
				            message: '未放弃本次编辑'
				        });
		        	}
		        })
			},	
			hopPage(){
				//跳转页面
				router.replace("/server/storeSetInfo/storeMessShow");
			},
			logo(){
				//没有LOGO显示默认Logo,有就显示				
				if(this.storeMessShow.shop_logo){
					this.imgUrl=this.storeMessShow.shop_logo;
				}else{
					this.imgUrl=links.IMG
				}	
			},
			getStoreMessage(){//有没有店铺信息			
				var shop_id=this.$store.getters.getShop_id;
				if(shop_id){
					this.preservation=true;
					getStoreMessage({shop_id})
					.then(({data})=>{	
						this.storeMessShow=data;
						this.whetherShow();
						this.location();//显示地图
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
					})
				}else{
					this.preservation=false;
					this.imgUrl=links.IMG;
				}
			},
			whetherShow(){	
				//删除对象里面的空属性；包括对象里的对象
				this.deleteEmptyString(this.storeMessShow);
				//删除不需要的
				delete this.storeMessShow.statistics_shop_logs
				this.addMessForm=Object.assign({},this.storeMessShow);//改变内存，以用于取消用
				this.exitsMess=JSON.parse(JSON.stringify(this.storeMessShow));
				this.$emit("createMess",this.exitsMess);//传到父集去
				//没有LOGO显示默认Logo,有就显示	
				this.logo();
			},
		},
	}
</script>

<style lang="scss">
	.addMess{
		.el-menu-item{
			color: #7F7F7F;
		}
		.store_mess{
			color: #0070C9;
			font-weight: bold;
		}
		.addMess-con{
			#mapContain{
				width: 436px;
				height: 200px;
			}
			.addMessForm{
				.el-form-item{
					margin-bottom: 20px;
					.el-form-item__label{
						font-family: SourceHanSansCN-Regular;
						text-align: right;
						font-size: 14px;
						color: #333;
						letter-spacing: 0;
						margin-right: 10px;
						float:none;
						&::before{
							content: "";
							margin-right: 0;
						}
					}
					.el-form-item__content{
						font-size: 12px;
						line-height: 32px;
						height: 32px;
						margin-top: 10px;						
						.time-width{
							width:140px;
							display: inline-block;
						}
						.line{
							width: 40px;
							display: inline-block;
						}
						.el-input{
							width: 320px;
							.el-input__inner{
								height: 32px;
								font-size: 12px;
							}
						}
						.el-input.border{
							.el-input__inner{
								border:1px solid #FF5B00;
							}
						}
						em{
							 position: absolute;
						    top: 100%;
						    left: 10px;
							color: #FF5B00;
   							font-size: 12px;
						    line-height: 1;
						    padding-top: 4px;
						}
						.el-button{
							border-radius: 2px;
							height: 32px;
							width: 104px;
							padding:0;
							margin-left: 10px;
							border: 0;
						}
					}
				}
				.el-form-item.addStore{
					margin-bottom: 40px;

					.el-form-item__content{
						margin-left: 50%;
						.el-button{
							width: 160px;
							margin-left: -80px;
						}
					}
				}
/*...................错误提示样式改变.....................*/
				.el-form-item.is-error{
					.el-input__inner{
						border-color:#FF5B00;
					}
					.el-form-item__error{
						color:#FF5B00 ;
						margin-left:10px;
					}
				}
				.el-form-item.is-error.checkboxMess{
					.el-form-item__error{
						top: -100%;
					    margin-top: -4px;
					    left: 110px;
					    width: 150px;
					    text-align: left;
					}
				}
			}
			.imageUrl_all{
				height: 264px;
				top: 54px;
				left: 437px;
				padding-left: 20px;
				padding-top: 10px;
				padding-bottom: 20px;			
				border-left: 1px solid #D6D6D6;
				span{
					font-family: SourceHanSansCN-Regular;
					font-size: 12px;
					color: #7F7F7F;
					letter-spacing: 0;

				}
				.imageUpload{
					border-radius: 2px;
					height: 100px;
					width: 100px;
				}
			}

		}
		.storeButton{
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 100;
			height: 34px;
			padding-top: 6px;
			background: #F9F9F9;
			box-shadow: 0 -2px 2px 0 rgba(98,119,140,.2);
			width: 100%;
			.storeButton-con{
				width: 1200px;
				margin: 0 auto;
				text-align: left;
				button{
					border-radius: 2px;
					height:28px;
					line-height: 0;
					width: 120px;
				}
			}

		}
	}
</style>
