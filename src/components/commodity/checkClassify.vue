<template>
	<div class="checkClassify text-l ">
	    <label class="display-b store_label cursor" v-for="(item,index) in storeClassify" :key="index">  	
			<input type="checkbox" name="two" :disabled="item.level==1&&item.is_final==0" class="display-n"
				 @change="checkedIndex(item,index)" :checked="checked.includes(item.id)">			
			<em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
				:class="item.level===2? 'ml-20' : ''"></em>
			{{item.shop_category_name}}
		</label>
	</div>
</template>

<script>
	import storeClassify from "@/utils/storeClassify"
	import {getClassifyList} from "@/api/commodity"
	export default{
		data(){
			return{
				classifyList:[],
			}
		},
		created(){
			//获取店铺分类列表
			let shop_id=this.$store.getters.getShop_id;
			getClassifyList(shop_id)
			.then(({data})=>{
				this.classifyList=data;
			}).catch((error)=>{
			})
		},
		mixins:[storeClassify],
		props:{
			shop_categorys:{
				type: Array,
				default:function(){
					return []
				}		
			},
		},
		computed:{
			//把父集所传过来的id集中在一个数组以判断编辑时哪些是被选中的（checked属性）
			checked(){
				return this.shop_categorys.map(({shop_category_id,id})=>{
					if(shop_category_id&&id){
						return shop_category_id
					}else{
						return id
					}
				})
			},
			//编辑商品时有父集传过来的参数进行整理
			classfyId(){
				return this.checked.map(id_checked=>{
					let index = this.storeClassify.findIndex(({id})=>id_checked==id);
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
				this.$emit("categorys",this.classfyId);
			}
		}
	}
</script>
