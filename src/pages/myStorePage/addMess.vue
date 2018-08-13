<template>
	<div class="addMess">
		<secNavbar></secNavbar>
		<storeMess  v-bind:addMessForm.sync="addMessForm" @createMess="createMess"></storeMess>
	</div>
</template>

<script>
	import secNavbar from "@/components/myStore/secNavbar"
	import storeMess from "@/components/sellerCenter/storeMessVue"
	import {keepStoreMess} from "@/api/myStore"
	export default{
		name:"addMess",
		data(){
			return{
				addMessForm:{},
				exitsMess:{}
			}
		},
		components:{
			secNavbar,storeMess
		},
		beforeRouteLeave (to,from,next){			
			let addFormDele=["shop_name","shop_start","shop_end","kefu_name","kefu_phone","address","shop_logo"];	
			let	booleanTwo=addFormDele.map(val=>this.addMessForm[val]===this.exitsMess[val]);	
			if(booleanTwo.includes(false)&&(to.path!=="/zxh/my_store_blank/storeMessShow"&&to.path!=="/")){
				next(false);					
				this.$confirm('你有未保存的更改，是否确定保存更改并离开此页面？', '温馨提示', {
		        	confirmButtonText: '保存更改',
		            cancelButtonText: '弃用更改',
		            lockScroll:false
		     }).then(()=>{	
		     		let keepMess=JSON.parse(JSON.stringify(this.addMessForm))
					if(keepMess.shop_logo===null){delete keepMess.shop_logo}
					keepStoreMess(keepMess)
					.then(({data})=>{ 												
						next();
					})
					.catch(({response: {data}})=>{
						 this.$message.error(data.errorcmt);
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
		created(){			
		},
		methods:{
			createMess(data){
				this.exitsMess=data
			}
			
		},
	}
</script>
<style scoped="scoped">
.addMess{margin-top: 110px;}
</style>


