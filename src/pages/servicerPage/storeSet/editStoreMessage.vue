<template>
	<div class="editStoreMesage">
		<div class="g-content">
			<h3>店铺信息</h3>
			<storeMess  
				:addMessForm.sync="addMessForm" 
				@createMess="createMess">
				
			</storeMess>
		</div>
	</div>
</template>

<script>
	import storeMess from "@/components/servicer/storeSet/storeMess"
	import {editStoreMess} from "@/api/servicer"
	export default{
		name:"addMess",
		data(){
			return{
				addMessForm:{},
				exitsMess:{}
			}
		},
		components:{storeMess},		
		beforeRouteLeave (to,from,next){			
			let addFormDele=["shop_name","shop_start","shop_end","kefu_name","kefu_phone","address","shop_logo"];	
			let	booleanTwo=addFormDele.map(val=>this.addMessForm[val]===this.exitsMess[val]);	
			if(booleanTwo.includes(false)&&(to.path!=="/server/storeSetInfo/storeMessShow"&&to.path!=="/")){
				next(false);					
				this.$confirm('你有未保存的更改，是否确定保存更改并离开此页面？', '温馨提示', {
		        	confirmButtonText: '保存更改',
		            cancelButtonText: '弃用更改',
		            lockScroll:false
		     }).then(()=>{	
		     		let keepMess=JSON.parse(JSON.stringify(this.addMessForm))
					if(keepMess.shop_logo===null){delete keepMess.shop_logo}
					editStoreMess(keepMess)//编辑我的店铺信息
					.then(({data})=>{ 												
						next();
					})
					.catch(({response: {data}})=>{						
						 next(false)
					})			     		
		     	})
		     	.catch(()=>{
		     		next();
		     	})
			}else{  
				next();//一致时跳转页面 
			}
		},
		methods:{
			createMess(data){
				this.exitsMess=data
			}
			
		},
	}
</script>

<style lang="scss">
	.editStoreMesage{
		margin-top: 120px;
	}
</style>