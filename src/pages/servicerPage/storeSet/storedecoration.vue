<template>
	<div class="decoration">
		<div class="decoration_content">
			<!--........中间部分......-->
			<div class="decoration_middle" v-loading="loading">
				<!--........导航......-->
				<div class="decoration_nav">
					<img src="../../../assets/image/zhuangtailan.png" class="w-100"/>
					<p class="shop_name text-c">{{shopMess.shop_name}}</p>
					<div class="nav-info">
						<img src="../../../assets/image/fanhui.png" class="back">
						<img src="../../../assets/image/guanbi.png" class="quit">
					</div>
				</div>
				<div class="search text-c">
					<img src="../../../assets/image/sousuo.png" />
					<span>搜索商品，总有一款你会喜欢</span>
				</div>
				<banner :banner="banner"></banner>
				<!--........商品数量.....-->
				<div class="statistics_shop_logs clearfix">
					<img :src="shopMess.shop_logo" class="shop_logo float-l">
					<div class="statistics float-l">
						<p class="shop_name">{{shopMess.shop_name}}</p>
						<div class="shop_num mt-10 clearfix">
							<span>商品
								<b>{{product_num}}</b>
							</span>
							<span class="fans">粉丝
									<b>{{fans_num}}</b>
							</span>
						</div>
					</div>
					<div class="float-r statistics_share">
						<img src="../../../assets/image/fenxiang.png" class="w-100">
						<p>分享店铺</p>
					</div>
				</div>
				<div class="search_column">
					<img src="../../../assets/image/searchlan.jpg" class="w-100" />
				</div>
				<!--..............新品推荐........-->
				<div class="newArrival" v-if="intro.length">
					<div v-for="(item,index) in intro" class="arrival_list bg-f">
						<div class="clearfix" v-if="item.images.length">
							<div class=" float-l" width="228" height="232">
								<img :src="item.images[0].image_url" 
									class="float-l" 
									width="228" 
									height="232"/>
							</div>
							<div class=" float-r" v-if="item.images.length>=3">
								<img :src="item.images[1].image_url" class="display-b pic_two" />
								<img :src="item.images[2].image_url" class="display-b pic_two mt-10" />
							</div>
						</div>
						<div class="color-3 f16 mt-10 product_name">{{item.product_name}}</div>
						<div class="clearfix productSell">
							<p class="float-l f16 color-red">
								<b>￥</b>
								<b v-if="item.product_price_yuan.min==item.product_price_yuan.max">														
									{{item.product_price_yuan[0]}}
								</b>
								<b v-else>{{item.product_price_yuan.min}} - {{item.product_price_yuan.max}}</b>
							</p>
							<p class="float-r color-7F f12">
								销量：<span>{{item.statistics_product.sell_num}}</span>
							</p>
						</div>
					</div>
				</div>

				<div v-if="intro.length<0?true:false" class="no_arrival text-c">
					<img src="../../../assets/image/Rectangle .png" />
					<p>商品空空如也，敬请期待</p>
				</div>
				<div class="footer-min ">
					<img src="../../../assets/image/caidanlan.png" class="w-100" />
				</div>
			</div>
			<!--.............右边栏.........-->
			<div class="decoration_right">
				<div class="decoration_right_con">
					<el-tabs v-model="realTime" type="card">
						<el-tab-pane label="基本信息" name="first">
							<decorate-basic :shopMess="shopMess" @passBasicMess="passBasicMess">

							</decorate-basic>
						</el-tab-pane>
						<el-tab-pane label="轮播海报" name="second">
							<banner-editor 
								:banner="banner" 
								@passBanner="passBanner" 
								choicePlate="store"
								:isForm="false">
							</banner-editor>
						</el-tab-pane>
					</el-tabs>
					<div class="btn-edit">
						<button class="btn-edit-cancel" @click="cancelItemsEdit">
							取消
						</button>
						<button class="btn-edit-save" @click="saveItemsEdit">
							保存
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import shareMth from '@/utils/shareMth'
	import {getStoreMessage,getProductList} from "@/api/platform"
	import {getStoreBanner,existStoreMess} from "@/api/servicer"
	import banner from "@/components/servicer/storeSet/banner"
	import decorateBasic from "@/components/servicer/storeSet/decorateBasic"
	import BannerEditor from "@/components/platform/mallSet/BannerEditor"
	import * as links from "@/links/index"
	export default{
		components:{banner,decorateBasic,BannerEditor},
		data(){
			return{
				isExist:false,
				shopMess:{},
				copyShopMess:{},
				fans_num: "",
				product_num:"",
				loading:true,
				banner:[],
				copyBanner:[],
				intro:{},
				realTime: "first",
				bannerMess: {},
				basicMess:{},
				BombExist: {},
			}
		},
		mixins: [shareMth],
		beforeRouteLeave(to, from, next) {
			let shopMess_string_now = JSON.stringify(this.shopMess);
			let banner_string_now = JSON.stringify(this.banner);
			if((shopMess_string_now!==this.copyShopMess||banner_string_now !== this.copyBanner)&&this.isExist===false) {
				// 提示是否保存数据
				Object.assign(this.BombExist, this.bannerMess, this.basicMess);
				this.shopLogo();
				this.$confirm("你有未保存的更改，是否确定保存更改并离开此页面？", "温馨提示", {
						confirmButtonText: '保存更改',
						cancelButtonText: '弃用更改',
					})
					.then(() => {
						//保存数据
						existStoreMess(this.BombExist)
							.then(({data}) => {															
								this.$message.success('店铺装修信息保存成功')
								next();
							})
					})
					.catch(() => {// 放弃保存						
						next()
					})
			} else {
				// 店铺信息未编辑过
				next()
			}
		},
		created(){
			this.isExist=false;
			let getter = this.$store.getters
			let shop_id = getter.getShop_id;					
			getStoreMessage({shop_id})//获取店铺信息
				.then(({data}) => {			
				this.shopMess = data;			
				if(this.shopMess.shop_logo === null) {//没有上传LOGO就显示默认LOGO；
					this.shopMess.shop_logo = links.IMG
				}				
				this.copyShopMess = JSON.stringify(this.shopMess);//拷贝一份用于取消编辑				
				this.fans_num = data.statistics_shop_logs.fans_num;//用于解决异步问题
				this.product_num = data.statistics_shop_logs.product_num;
				this.loading=false;
			})
			//获取轮播海报数据
			getStoreBanner(shop_id)
				.then(({data}) => {	
					this.banner = data;	
					this.copyBanner = JSON.stringify(this.banner);//拷贝一份用于取消编辑
				})
			var newArrival = {
				shop_id,
				orderby: {onoff_time: "desc"},									
				page: 1
			};
			this.getProductList(newArrival);
		},
		methods:{
			getProductList(data) {
				getProductList(data)
					.then(({data}) => {											
						this.intro = data.data;
					})
			},
			cancelItemsEdit(){//取消
				this.$confirm("是否确定放弃本次编辑", "温馨提示", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(() => {
					//保留数据库的信息
					this.shopMess = JSON.parse(this.copyShopMess);
					this.banner = JSON.parse(this.copyBanner);
					this.$message('已放弃本次编辑');
				}).catch(() => {
					this.$message('已保留本次编辑');
				})
			},
			shopLogo() {
				//上传数据删除默认LOGO
				if(this.BombExist.shop_logo) {
					if(this.BombExist.shop_logo.indexOf("data:image") !== -1) {
						delete this.BombExist.shop_logo
					}
				}
			},
			saveItemsEdit(){//保存				
				Object.assign(this.BombExist, this.bannerMess, this.basicMess);
				let len = Object.keys(this.BombExist).length;
				console.log("this.BombExist:",this.BombExist)
				if(len > 0) {
					this.shopLogo()
					existStoreMess(this.BombExist)
						.then(({data}) => {													
							this.$message({
								showClose: true,
								message: '保存成功',
								type: 'success'
							});
							this.isExist=true
						})
				}
			},
			passBanner(data){
				this.bannerMess = data;
			},
			passBasicMess(data){
				this.basicMess = data;
			}
		}
	}
</script>

<style lang="scss">
	.decoration{
		.decoration_content{
			position: relative;
			height: 100vh;
			.decoration_middle {
				position: absolute;
				top: 120px;
				left: 0;
				right: 0;
				width: 375px;
				margin: auto;
				background-color: #fff;
				box-shadow: 0 0 4px 0 rgba(51, 51, 51, 0.2);
				min-height: 88vh;
				background-color: #e6e6e6;
				.search_column {
					background-color: #fff;
					padding-top: 36px;
					margin-top: -36px;
				}
				.decoration_nav {
					.shop_name {
						font-family: PingFangSC-Regular;
						font-size: 18px;
						color: #333333;
						letter-spacing: 0.5px;
						line-height: 44px;
						box-shadow: inset 0 -1px 0 0 #E6E6E6;
						height: 44px;
					}
					.nav-info {
						.back {
							position: absolute;
							left: 11px;
							top: 32px;
							width: 10.5px;
						}
						.quit {
							position: absolute;
							right: 8px;
							top: 25px;
							width: 87px;
						}
					}
				}
				.statistics_shop_logs {
					position: relative;
					width: 345px;
					margin: 0 auto;
					padding-top: 10px;
					padding-bottom: 10px;
					background: #FFFFFF;
					box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.30);
					border-radius: 1px;
					text-align: left;
					margin-top: -36px;
					z-index: 3;
					.shop_logo {
						margin-left: 10px;
						width: 52px;
						height: 52px;
					}
					.statistics {
						width: 160px;
						padding-left: 10px;
						.shop_name {
							font-family: PingFangSC-Regular;
							font-size: 16px;
							color: #333333;
							letter-spacing: 0;
							line-height: 20px;
							height: 20px;
						}
						.shop_num {
							span {
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #7F7F7F;
								letter-spacing: 0;
								line-height: 14px;
								b {
									font-weight: normal;
								}
							}
							.fans {
								margin-left: 20px;
							}
						}
					}
					.statistics_share {
						text-align: center;
						padding-left: 14px;
						padding-right: 14px;
						border-left: 1px solid #D6D6D6;
						img {
							width: 18px;
							height: 18px;
							margin-top: 2px;
						}
						p {
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #7F7F7F;
							letter-spacing: 0;
							margin-top: 8px;
						}
					}
				}
				.newArrival {
					padding-bottom: 50px;
					.arrival_list {
						margin-top: 15px;
						padding-left: 15px;
						padding-right: 15px;
						padding-top: 40px;
						padding-bottom: 15px;
						.pic_two {
							width: 111px;
							height: 111px;
						}
						.product_name {
							max-width: 345px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.productSell {
							line-height: 20px;
							margin-top: 10px;
						}
					}
				}
				.no_arrival {
					img {
						width: 120px;
						margin-top: 71px;
						margin-bottom: 10px;
					}
					p {
						font-size: 14px;
						color: #7F7F7F;
						line-height: 14px;
					}
				}
				.footer-min {
					position: fixed;
					bottom: 0;
					width: 375px;
				}
				.search {
					position: absolute;
					left: 10px;
					top: 74px;
					width: 355px;
					height: 32px;
					background: rgba(0, 0, 0, .6);
					border-radius: 1px;
					z-index: 50;
					line-height: 32px;
					img {
						height: 13px;
						width: 13px;
						vertical-align: text-top;
					}
					span {
						color: #fff;
						opacity: .8;
						font-size: 14px;
					}
				}
			}
			.decoration_right {
				position: fixed;
				top: 102px;
				right: 0;
				bottom: 0;
				width: 260px;
				padding-left: 20px;
				padding-right: 20px;
				background-color: #fff;
				border-left: 1px solid #D6D6D6;
				z-index: 200;
				.decoration_right_con {
					height: 100%;
					overflow-y: auto;
					&::-webkit-scrollbar {
						width: 0px;
					}
					.el-tabs__header {
						margin-bottom: 0;
						.el-tabs__nav-scroll {
							margin-top: 20px;
							.el-tabs__nav {
								width: 100%;
								.el-tabs__item {
									width: 50%;
									height: 32px;
									line-height: 32px;
									border: 1px solid #D6D6D6;
									border-radius: 0;
									color: #333;
									text-align: center;
								}
								.el-tabs__item.is-active {
									background-color: #0070C9;
									color: #fff;
									border-color: #0070C9;
								}
							}
						}
					}
					.el-tabs__content {
						.el-dialog__wrapper {
							.el-dialog--small {
								width: 992px;
								.el-dialog__header {
									span {
										font-size: 14px;
										color: #333;
									}
									button {
										font-size: 14px;
										.el-dialog__close {
											color: #7F7F7F;
										}
									}
								}
								.el-dialog__body {
									padding-top: 0;
									padding-bottom: 0;
									.el-tabs__nav-scroll {
										margin-top: 15px;
									}
									.el-tabs__nav {
										width: auto;
										.el-tabs__item {
											border: none;
											background-color: transparent;
										}
										.el-tabs__item.is-active {
											background-color: transparent;
											color: #0070C9;
										}
										.el-tabs__active-bar {
											background-color: #0070C9;
											height: 2px;
										}
									}
								}
							}
						}
					}
					.btn-edit {
						position: fixed;
						bottom: 0;
						right: 0;
						height: 50px;
						width: 300px;
						border-top: 1px solid #D6D6D6;
						text-align: left;
						background-color: #fff;
						z-index: 550;
						button {
							background: none;
							border: 0;
							cursor: pointer;
							height: 100%;
							width: 49%;
							font-size: 14px;
							color: #333333;
							outline: none;
						}
						.btn-edit-save {
							border-left: 1px solid #D6D6D6;
							color: #0070C9;
						}
					}
				}
			}			
		}
	}
</style>