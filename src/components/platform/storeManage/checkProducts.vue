<template>
	<div class="checkProducts">
		<div class="plate mb-30 mt-10 clearfix">
			<div class="clearfix title_all">
				<span class="float-l title">商品标题：</span>
				<div class="float-l  cont">{{checkProduct.product_name}}</div>				
			</div>
			<div class="clearfix title_all">
				<span class="float-l title">商品状态：</span>
				<div class="float-l cont">					
					<span v-if="checkProduct.status==='on' && !checkProduct.deleted_at">正常出售中</span>
					<span v-if="checkProduct.deleted_at">商品已删除</span>
					<span v-if="checkProduct.status==='off' &&! checkProduct.deleted_at">商品已下架</span>
				</div>				
			</div>
			<div class="clearfix title_all">
				<span class="float-l color-7F f14 title">商品分类：</span>
				<div class="float-l cont">
					<span v-for="item in checkProduct.mall_categorys">
						{{item.mall_category_name}}
					</span>
				</div>				
			</div>
		</div>
		<div class="plate clearfix">
			<span class="float-l title">商品参数：</span>
			<div class=" params mb-30 ">
				<el-table  :data = "checkProduct.params"   class="float-l clearfix   ">
					<el-table-column label="参数名称" prop="param_name"></el-table-column>				
					<el-table-column label="参数描述" prop="param_describe"></el-table-column>				
				</el-table>
			</div>
		</div>
		
		<div class="plate clearfix">
			<span class="float-l title">商品规格：</span>
			<div class=" params mb-30 ">
				<el-table  :data = "checkProduct.specs"   class="float-l clearfix   ">
					<el-table-column label="规格名称" prop="spec_name"></el-table-column>				
					<el-table-column label="单价" prop="spec_price_yuan"></el-table-column>		
					<el-table-column label="原价" prop="init_price_yuan"></el-table-column>				
					<el-table-column label="退款" prop="enable_refund">
						<template slot-scope="props">
							{{props.row.enable_refund===1?"可退款":"不可退"}}
						</template>
					</el-table-column>	
				</el-table>
			</div>
		</div>
		
		<div class="plate mb-40 clearfix">
			<span class="float-l  title">商品主图：</span>	
			<div class="float-l cont" v-if="checkProduct.images.length">
				<span class="display-in" v-for="item in checkProduct.images">
					<img :src="item.image_url" class="producImg"/>
				</span>
			</div>				
		</div>
		
		<div  class="plate  clearfix">
			<span class="float-l title">详情页：</span>	
			<div class="float-l  details scrollbar ">	
				<div class="detailsCon middle">
					<div v-for="item in checkProduct.product_detail_arr">
						<div v-if="item.type==='image'">
							<img :src="item.content" class="w-100"/>
						</div>
						<div v-if="item.type==='text'" class=" text scrollbar">
							<span>{{item.content}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div v-if="irrList" class="mt-30">
			<div v-if="irrList.data.length!==0">
				<div class="plate clearfix">
					<span class="float-l color-7F f14 title">违规提醒：</span>	
					<div class="float-l  scrollbar ">	
						<div v-for="item in irrList.data" class="irrMess">
							<p class="color-3 f14">时间：{{item.created_at}}</p>
							<span class="color-3 f14">{{item.illegal_content}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},

		props:{
			checkProduct:{
				default:function(){
					return {}
				}
			},
			irrList:{
				default:function(){
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.checkProducts{
		.plate{				
			.title{				
				color: #7F7F7F;
				line-height: 24px;
				width: 70px;
				white-space: normal;
				text-align: right;
				font-size: 14px;	
				margin-right: 10px;				
			}
			.cont{
				color: #333;
				line-height: 24px;			
				font-size: 14px;
				span{
					margin-right: 10px;
				}
				img{
					width: 100px;
					height: 100px;
				}
			}
			.params{
				width: 900px;
				float: left;
				
				.el-table{
					border: 1px solid #E9EEF2;
				}
			}
			
			.details{
				width: 900px;
				height: 445px;
				border: 1px solid #d6d6d6;
				.detailsCon{
					background-color: #F0F4F7;
					min-height:445px ;
					width:300px;
				}
			}
		}
	}
</style>