<template>
	<div class="checkProducts">
		<el-dialog  title="商品主图" :visible.sync="dialogVisible" :modal=false>
			<i class="iconfont icon-zuoyi" @click="next" v-if="dialogVisible&&index!=0"></i>
			<img :src="imgUrl" width="300" height="300" class="middle display-b"/>
			<i class="iconfont icon-youyi" @click="prev" v-if="dialogVisible&&index!=this.checkProduct.specs.length-1"></i>				
								
		</el-dialog>
		<div class="plate mb-30 clearfix">
			<div class="clearfix title_all">
				<span class="float-l color-7F f14 title">商品标题：</span>
				<div class="float-l color-3 ml-10 f14 cont">{{checkProduct.product_name}}</div>				
			</div>
			<div class="clearfix">
				<span class="float-l color-7F f14 title">商品状态：</span>
				<div class="float-l color-3 ml-10 f14" v-if="checkProduct.status==='off'&& checkProduct.sellout_time>=30?false:true">					
					<span v-if="checkProduct.status==='on'&&checkProduct.sellout_status==='on'">正常出售中</span>
					<span v-if="checkProduct.status==='on'&&checkProduct.sellout_status==='off'">已售罄</span>
					<span v-if="checkProduct.status==='off'">仓库中</span>
					<span v-if="checkProduct.sellout_status==='off'&&checkProduct.status==='on'">（若在{{checkProduct.buhuo_date}}未进行补货操作，商品将自动下架至仓库中）</span>
				</div>				
			</div>
			<div class="clearfix">
				<span class="float-l color-7F f14 title">商品分类：</span>
				<div class="float-l color-3 ml-10 f14 cont">
					<span v-for="item in checkProduct.shop_categorys">
						{{item.shop_category_name}}
					</span>
				</div>				
			</div>
		</div>
		<div class="plate mb-30 clearfix">
			<div class="clearfix title_all">
				<span class="float-l color-7F f14 title">配送方式：</span>
				<div class="float-l color-3 ml-10 f14">
					<p class="cont" v-for="item in checkProduct.distributes">
						{{item.distribute_type==="express"?"快递配送":item.distribute_type==="shop"?"门店配送":"到店自提"}}
						<span class="color-7F" v-if="(item.distribute_type==='express'&&item.shipping_set_type!=='seller')||item.distribute_type==='shop'&&item.shipping_set_type!=='seller'">	
							({{item.shipping_set_type==="define"?"自定义运费":item.template_name}}{{item.first_num}}件内{{item.first_price_yuan}}元,
							每增加{{item.add_num}}件，增加运费{{item.add_price_yuan}}元）							
						</span>
						<span class="color-7F" v-if="item.shipping_set_type==='seller'">卖家承担运费</span>
					</p>
				</div>				
			</div>
		</div>
		<div class="plate clearfix">
			<span class="float-l color-7F f14 title">商品参数：</span>
			<div class="scrollbar params mb-40 ">
				<el-table  :data = "checkProduct.params"  style="width: 900px" border class="float-l ml-10 clearfix   ">
					<el-table-column label="参数名称" prop="param_name"></el-table-column>				
					<el-table-column label="参数描述" prop="param_describe"></el-table-column>				
				</el-table>
			</div>

		</div>
		<div class="plate mb-40 clearfix  cursor ">
			<span class="float-l color-7F f14 title">
				商品规格：<br>价格：<br>库存：
			</span>	
			<div class="float-l ml-10 scrollbar table" >
				<table  border bordercolor="#D6D6D6" cellspacing="0" width="900px" >
					<thead>
						<tr style="color: #62778C;background-color: #F0F4F7;">
							<th v-for="item in checkProduct.spec_items">{{item.spec_name}}</th>
							<th width="200"  >价格</th>
							<th  width="200" >库存</th>
							<th width="200" >图片</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in checkProduct.specs">
							<td v-for="child in rowsCon[index]" class="text-c">
								{{child}}
							</td>
							<td width="200" class="text-c">
								<span>{{item.spec_price_yuan}}</span>
							</td>
							<td width="200" class="text-c">
								<span>{{item.spec_store}}</span>
							</td>
							<td width="200" class="text-c">
								<img :src="item.spec_url" @click="bigPic(index,item)">
							</td>
						</tr>
					</tbody>
				</table>	
			</div>
			
		</div>
		<div class="plate mb-40 clearfix">
			<span class="float-l color-7F f14 title">商品主图：</span>	
			<div class="float-l ml-10" v-if="checkProduct.images.length">
				<span class="display-in" v-for="item in checkProduct.images">
					<img :src="item.image_url" class="producImg"/>
				</span>
			</div>				
		</div>
		<div  class="plate  clearfix mb-40">
			<span class="float-l color-7F f14 title">详情页：</span>	
			<div class="float-l ml-10 details scrollbar ">	
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
		<div v-if="irrList!==undefined">
			<div v-if="irrList.data.length!==0">
				<div class="plate clearfix">
					<span class="float-l color-7F f14 title">违规提醒：</span>	
					<div class="float-l ml-10  scrollbar ">	
						<div v-for="item in irrList.data" class="irrMess  mb-20 ">
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
				imgUrl:"",
				dialogVisible:false,
				index:0
			}
		},
		props:["checkProduct","irrList"],
		computed:{
			rowsCon(){
				var rowsCon=[];
				for(var i=0;i<this.checkProduct.specs.length;i++){
					rowsCon[i]=[];
					for(var j=0;j<this.checkProduct.spec_items.length;j++){
						rowsCon[i]=this.checkProduct.specs[i].spec_name.split(";")
					}
				};
				return rowsCon
			}
		},
		methods:{		
			//大的图片浏览
			bigPic(index,item){
				this.dialogVisible=true
				this.index=index
				this.imgUrl=item.spec_url;
			},
			prev() {				
				if(this.index<this.checkProduct.specs.length-1){    
		    		this.index++;  
		    		this.imgUrl=this.checkProduct.specs[this.index].spec_url;
		    	} 

		    },
			next(){
		    	if(this.index>0){  		
		    		this.index--;   
		    		this.imgUrl=this.checkProduct.specs[this.index].spec_url
		    	};				
			},
		}
	}
</script>

<style scoped="scoped">
	.plate .title,.plate .cont{
		line-height: 20px;
	}
	.plate .title{
		width: 70px;
		white-space: normal;
		text-align: right;
	}
	.plate .params{
		width: 900px;
		height: 160px;
	}
	.plate table img{
		height: 50px;
		width: 50px;
		overflow: hidden;
	}
	.plate table th{
		height: 40px;
	}
	.plate table td{
		height: 70px;
	}
	.plate .producImg{
		width: 100px; 
		height: 100px; 
		overflow: hidden;
		margin-right: 20px;
	}
	.plate .details{
		width: 900px;
		height: 445px;
		border: 1px solid #d6d6d6;
	}
	.plate .detailsCon{
		background-color: #F0F4F7;
		min-height:445px ;
		width:300px;
	}
	.plate .text{
		overflow: hidden;
		padding: 10px;
	}
	.checkProducts .iconfont{
		position: absolute;
		top: 50%;
		font-size: 15px;
		color: #7F7F7F;
		cursor: pointer;
	}
	.checkProducts .icon-zuoyi{
		left: 20px;
	}
	.checkProducts .icon-youyi{
		right:20px;
	}
	.checkProducts .el-dialog__body img{
		max-width: 300px;
		min-height: 300px;
	}
	.table.scrollbar{
		height: 320px;
		overflow: hidden;
		overflow-y:auto ;
	}
</style>
<style>
	.checkProducts .el-dialog--small{
		width: 600px;
		height: 396px;
	}
	.history .checkpro  .checkProducts .el-dialog__body{
		padding: 0px;
	}
	.history .checkpro  .checkProducts .el-dialog__header{
		padding: 20px;
	}
	.category .check  .checkProducts .el-dialog__header{
		padding: 20px;
	}
	.category .check  .checkProducts .el-dialog__body{
		padding: 0px;
	}
	
	.warehouse .checkpro  .checkProducts .el-dialog__header{
		padding: 20px;
	}
	.warehouse .checkpro  .checkProducts .el-dialog__body{
		padding: 0px;
	}
	.sale_commodity .checkpro  .checkProducts .el-dialog__header{
		padding: 20px;
	}
	.sale_commodity .checkpro  .checkProducts .el-dialog__body{
		padding: 0px;
	}
</style>