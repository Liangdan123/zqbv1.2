import {getClassifyList,getMallClassifyList} from "@/api/commodity"
export default{
	computed:{
		//店铺分类信息
		storeClassify(){
			var classify=[];		
			this.ClassifyMethods(this.classifyList,classify,"shop_category_name")
			return  classify
		},
		//商城分类信息
		mallClassify(){		
			let mallClassify=[];	
			this.ClassifyMethods(this.mallClassifyList,mallClassify,"mall_category_name");	
			return  mallClassify
		}
	},
	methods:{
		ClassifyMethods(type,arrays,strings){
			type.map(item=>{
				if(item.is_final===0){
					arrays.push({
						[strings]:item[strings],
						level:item.level,
						is_final:item.is_final,
						id:item.id,
						checked:false
					})
					item.sub.map(itemSub=>{
						arrays.push({
							[strings]:itemSub[strings],
							level:itemSub.level,
							is_final:itemSub.is_final,
							id:itemSub.id,
							checked:false
						})
					})
				}else if(item.is_final===1){
					arrays.push({
						[strings]:item[strings],
						level:item.level,
						is_final:item.is_final,
						id:item.id,
						checked:false
					})
				};
			});
		},
	}
}
