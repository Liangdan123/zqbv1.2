<template>
	<div class="checkClassify">		
		<label class=" store_label cursor" 
	    	v-for="(item,index) in mallClassify" 
	    	:key="index">  	
			<input type="checkbox" 
				name="two" 
				:disabled="item.level==1&&item.is_final==0" 				
				@change="checkedIndex(item,index)" 
				:checked="checked.includes(item.id)"
				class="display-n">			
			<em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
				:class="item.level===2? 'ml-20' : ''"></em>
			{{item.mall_category_name}}
		</label>
	</div>
</template>

<script>
	import {getMallClassifyList} from "@/api/platform"
	import storeClassify from "@/utils/storeClassify"
	export default{
		data(){
			let businessRange=this.$store.state.user.user.business_range;
			return{
				mallClassifyList:[],
				business_range:businessRange,//服务商经营范围
			}
		},
		created(){
			getMallClassifyList()//商城分类列表
			.then(({data})=>{
				this.mallClassifyList=data.filter(item=>item.id==this.business_range);;					
			})
		},
		mixins:[storeClassify],
		props:{
			mall_categorys:{
				type: Array,
				default:function(){
					return []
				}		
			},
		},
		computed:{
			//把父集所传过来的id集中在一个数组以判断编辑时哪些是被选中的(checked属性)
			checked(){
				return this.mall_categorys.map(({mall_category_id,id})=>{
					if(mall_category_id&&id){
						return mall_category_id
					}else{
						return id
					}
				})//mall_category_id与id都是一个意思（商城分类记录ID），编辑时是mall_category_id发布是id
			},
			//编辑商品时有父集传过来的参数进行整理
			classfyId(){
				return this.checked.map(id_checked=>{
					let index = this.mallClassify.findIndex(({id})=>id_checked==id);
					return {
						id:id_checked,
						index
					}
				})
				
			},
		},
		methods:{
			checkedIndex(item,index){	
				//编辑是有值				
				if(event.target.checked===true){
					this.classfyId.push({
						id:item.id,
						index:index
					});
				}else{
					for(var i=0;i<this.classfyId.length;i++){
						//需要删除的项与当前的项是否相等
						if(this.classfyId[i].index===index){
							this.classfyId.splice(i,1)
						}
					}
				};
				this.$emit("mallCategorys",this.classfyId);
			}
		}
	}
</script>

<style lang="scss">
.checkClassify{
	text-align: left;
	label{
		display:block;
		cursor: pointer;
	}
}
</style>