<template>
	<div class="assess">		
		<el-dialog 
			:visible.sync="backModel" 
			:modal="false" 
			:close-on-click-modal="false"
			:show-close="false"
			class="backModel">
			<p class="title">回复说明</p>
			<el-input  type="textarea"  v-model.trim="txtBox" class="radius-2 scrollbar" >													
			</el-input>
			<div class="clearfix store-button mt-10">
				<el-button class="store-button2 float-r" @click="cancel">取 消</el-button>
				<el-button class="store-button1 float-r mr-10" @click="backInfo">回复</el-button>
			</div>
		</el-dialog>
		
		<!--........................主体内容..................-->
		<h3 class="assess_title">评价详情{{'('+list.total+')'||0}}</h3>
		<div class="assess_con">
			<div v-for="item in list.data" class="assess_plate">
				<div class="assess_plate_top clearfix">
					<div class="float-l">
						<img :src="item.avatar_url" class="assess_plate_top-head"/>
						<span class="assess_plate_top-name">{{item.nick_name}}</span>
						<time class="assess_plate_top-time">{{item.created_at}}</time>
						<div class="assess_plate_top-Stars">
							<span class="iconfont icon-xingxing" v-for="item in item.comment_score"></span>
							<span class="iconfont icon-wuxing" v-for="item in (5-item.comment_score)"></span>
						</div>						
						<span class="assess_plate_top-name">{{item.comment_score|assess}}</span>						
					</div>
					<div class="float-r" v-if="item.is_back===0">
						<el-button class="store-button2" @click="backCustom(item.comment_id)">回复客户</el-button>
					</div>
					
				</div>				
				<div class="assess_plate_bottom">
					{{item.comment_content}}
				</div>
			</div>

		</div>				
		<div class="clearfix mt-20">
			<el-pagination :total="list.total"
				:current-page.sync="list.current_page" 
				:page-size="list.per_page"
				layout="total, prev, pager, next"
				@current-change="handleCurrentChange"
				class="pagination float-r">
				
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getAssessList,backAssess} from "@/api/servicer"
	export default{
		data(){
			return{
				searchCondition:{//搜索条件(只渲染一遍)
					product_id:this.productId,
					page: 1,
					per_page: 20,
				},
				list:{data:[]},
				backModel:false,
				txtBox:"",
				comment_id:0,
			}
		},
		filters:{
			assess(val){
				let num=+val;
				let evalute
				switch(num){
					case 1:
						evalute="非常差"
						break;
					case 2:
						evalute="差"
						break;
					case 3:
						evalute="一般"
						break;
					case 4:
						evalute="好"
						break;
					case 5:
						evalute="非常好"
						break;
				}
				return evalute
			}
		},
		mixins: [page],
		props:{
			productId:{
				default:function(){
					return 0
				}
			}
		},
		watch:{
			productId(){
				this.searchCondition={//重新赋值
					product_id:this.productId,
					page: 1,
					per_page: 20,
				}
				this.searchMethod();
			},			
		},
		methods:{
			_doSearch(){
				getAssessList(this.searchCondition)
				.then(({data})=>{
					this.list=data
				})
			},
			backCustom(id){//回复客户按钮
				this.backModel=true;
				this.comment_id=id;//评价记录ID
			},
			backInfo(){//回复客服（弹框）
				if(this.txtBox){
					let data={
						comment_id:this.comment_id,
						back_content:this.txtBox
					}
					backAssess(data)//评价回复API
					.then(({data})=>{
						this.searchMethod();//回复成功重新拉取评价列表
						this.backModel=false;
						this.txtBox="";
					})				
				}else{
					this.$message("请填写回复内容")
				}
			},
			cancel(){//取消
				this.backModel=false;
				this.txtBox="";
			}
		}
	}
</script>

<style lang="scss">
	.assess{
		.backModel.el-dialog__wrapper{
			.el-dialog--small{
				width: 600px;	
				.title{
					color: #333;
					font-size: 16px;
					font-weight: 700;
					margin-bottom: 10px;
				}
				.radius-2 {
					textarea{
						resize: none;
						height: 120px;
						font-size: 12px;
					}
					.el-textarea__inner{
						color: #333;
						border:1px solid #D6D6D6;
						border-radius: 2px;
					}
					
				}
			}
		}
		.assess_title{
			font-size: 20px;
			color: #333;
			margin-bottom: 20px;
		}
		.assess_con{
			.assess_plate{
				padding-bottom: 30px;
				padding-top: 30px;
				border-bottom: 1px solid #E6E6E6;
				.assess_plate_top{
					.assess_plate_top-head{
						height: 40px;
						width: 40px;
						border-radius: 50%;
					}
					.assess_plate_top-name{
						color: #333;
						font-size: 16px;
						margin-left: 10px;
					}
					.assess_plate_top-Stars{
						display: inline-block;
						margin-left: 10px;
						.icon-xingxing{
							color: #e63d;
						}
						.icon-wuxing{
							color:#e63e
						}
					}

					.assess_plate_top-time{
					
						color: #333;
						font-size: 16px;
						margin-left: 10px;
					}
				}
				.assess_plate_bottom{
					color: #333;
					font-size: 16px;
					margin-top:10px;
				}
			}
		}
	}
</style>