<template>
	<div class="imgNav">
		<div class="imgNavCon mt-20 border-e9-b pb-20" v-for="(item,index) in banner">
			<div class="item-top clearfix mb-20">
				<span class="float-l color-3 f16">导航{{index+1}}</span>
				<div class="btn-group float-r clearfix">
					<div class="Icon float-l mr-10" @click="indexUp(index)">
						<svg height="14.4px" width="14.8px">
							<use xlink:href="#shangyi"/>
						</svg>
					</div>
					<div class="Icon float-l mr-10"  @click="indexDown(index)">
						<svg height="14.4px" width="14.8px">
							<use xlink:href="#xiayi"/>
						</svg>
					</div>
				</div>
			</div>
			<el-input type="text" v-model="item.name"  placeholder="请输入导航名称(必填)" class="login-input2 mb-20">
				
			</el-input>
			<imageUpload :imageUrl="item.image_url"  :imageType="'mall'" :index="index" 
			  @getImageUrl="updataBanner"></imageUpload>
			<p class="f12 color-7F sug mt-10 mb-10">图片尺寸建议104×104px，格式支持png、jpg</p>			
			<p class="jump mt-10 color-3">添加导航链接</p>
			<div class="link">
				 <span>
				 	{{item.click_type=="product"?"商品链接"+" -":
					(item.click_type=="mall_category"?"商品分类"+" -":"")}}
					{{item.click_name}}
				 </span>
				<button class="btn-link" @click="showBomb(item,index)">
					<svg height="18px" width="18px">
						<use xlink:href="#xianjie"/>
					</svg>
				</button>
			</div>
		</div>
		<el-dialog title="跳转链接" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
			:modal-append-to-body="false" :lock-scroll="false"  style="text-align: left;">
			<el-tabs v-model="activeName">
				<el-tab-pane label="商品链接" name="first">
					<storeList  @productName="classifyCnt" @shop_hidden="shop_hidden" :productChecked="productChecked">						 
					</storeList>
				</el-tab-pane>
				<el-tab-pane label="商品分类" name="second" >
					<productClassify   @categorys="categorys" :type="classifyType" :Classify="mallClassify" choiceRole="mall">						
						<div class="btn clearfix pt-20 pb-20 border-t">
							<el-button class="store-button2 float-r" @click="cancel">
								取消
							</el-button>
							<el-button class="store-button1 float-r mr-10" @click="sureclassify">
								确定
							</el-button>
						</div>
					</productClassify>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
		<button class="w-100 btn-add" @click="addBannerImg" v-if="disabled">
			<b>+</b>添加导航
			<span>[{{this.banner.length}}/{{length}}]</span>
		</button>
		<div v-show="false">{{btnVis}}</div>
	</div>
</template>

<script>
	import imageUpload from "@/components/func/imageUpload"
	import storeList from "@/components/platform/mallSet/storeList"
	import productClassify from "@/components/platform/mallSet/productClassify"
	import shareMth from '@/utils/shareMth'
	import storeClassify from "@/utils/storeClassify"
	import mallClassifiProduct from "@/utils/mallClassifiProduct"
	import {getMallClassifyList} from "@/api/platform"
	export default{
		data(){
			return{
				disabled:true,
				imgNavEditor:"",
				dialogFormVisible:false,
				activeName:"first",
				productChecked:{id:""},
				classifyType:"单选",
				bannerIndex:"",
				classifyName:{},
				mallClassifyList:[],
			}
		},
		props:["banner","length"],
		created(){				
			getMallClassifyList()//商城分类列表
			.then(({data})=>{
				this.mallClassifyList=data;					
			}).catch((error)=>{
			})
		},
		mixins:[shareMth,storeClassify,mallClassifiProduct],
		computed:{
			btnVis(){//导航数量改变 按钮显示不显示就改变
				if(this.length===4&&this.banner.length>4){//当导导航数量为4时，banner属性不能大于导航数量
					let len=Number(this.banner.length)-4;
					this.banner.splice(4,len)
				};
				return JSON.stringify(this.banner.length)==this.length?this.disabled=false:this.disabled=true
			},
			upBanner(){
				return JSON.parse(JSON.stringify(this.banner))
			}
		},
		updated(){
			this.upBannerData();
			if(this.banner.length!==0){
				this.$emit("passimgNav",this.imgNavEditor)
			}			
		},
		components:{imageUpload,storeList,productClassify},		
		methods:{
			addBannerImg(){//添加导航
				let bannerIndex=this.banner.length;//添加海报顺序
				this.banner.push({image_url:"",name:"",click_type:'',click_id:'',click_name:'',sort:bannerIndex})
			},
			updataBanner(data){
				let index=data.index
				let item_new=this.banner[index];
				item_new.image_url=data.new_url;
			},
			upBannerData(){
				let len=this.upBanner.length;
				for(let i=0,max=len;i<max;i++){	
					this.deleteEmptyString(this.upBanner[i]);//去除对象里空字符串
				};			
				this.deleteArrayObject(this.upBanner);//去除数组里的空对象
				this.imgNavEditor={banners:this.upBanner};	
			},
		}
	}
</script>

<style scoped="scoped">
button.btn-add{
    height: 32px;
    line-height: 32px;
    color: #333;
    text-align: center;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    background: none;
    cursor: pointer;
    outline: none;
    margin-top: 20px;
}
button.btn-add b{
	font-size: 20px;
	vertical-align: bottom;
	margin-right: 5px;
}
.imageUpload{
	width: 100px;
	height: 100px;
}
.sug{
	width: 146px;
	font-size: 12px;
}
div.link{
	padding: 0 0 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #333333;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    margin-top: 8px;
    text-align: left;
}
div.link span{
	display: inline-block;
    max-width: 208px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
button.btn-link{
	float: right;
	height: 32px;
	width: 32px;
   	border:none;
    border-left: 1px solid #d6d6d6;
    background-color: transparent;
    outline: none;
    cursor: pointer;
}
</style>
<style>
	.imgNav .imageUpload_con .iconfont{
		font-size: 32px;
	}
</style>