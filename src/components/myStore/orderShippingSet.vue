<template>
	<div class="orderShip" v-loading="loading">
		<el-dialog :visible.sync="dialogVisible"  title="包邮设置" :close-on-click-modal=false>
			<el-form :model="mailingFee"  ref="mailingFee" >					
				<el-form-item label="默认运费："  prop="money_yuan" class="pos-r">					
					<el-input type="number" v-model="mailingFee.money_yuan" :class="{border:isError}"  style="width: 80px;"></el-input>&#8194;元包邮.	
					<p class="color-FF5B f12" v-if="isError">请输入金额</p>
				</el-form-item>
				<div class="clearfix">
					<el-button class="store-button2 float-r ml-10" @click="cancel">取消</el-button>
					<el-button class="store-button1 float-r"  @click="sureTem">确定</el-button>
				</div>
			</el-form>
						
		</el-dialog>
		<label class="color-3 f14" @change="isShipping">
			是否支持包邮：
			<el-radio-group v-model="shippingForm.resource" class="ml-10">
				<el-radio label="否"></el-radio>
				<el-radio label="是"></el-radio>
			</el-radio-group>
		</label>
		<!--.....................表格......................-->
		<div v-if="shippingForm.resource==='是'&&Object.keys(this.shippingData).length!==1" class="mt-20">
			<div class="shippingList mb-10">
				<div class="shippingListHead clearfix f14">
					<span class="float-l">包邮</span>
					<p class="float-r color-3">
						最后修改日期：&#8194;<span >{{shippingData.updated_at}}</span> 
						<b class="color-b ml-20 font-n cursor" @click="edit">编辑</b>				
					</p>			
				</div>
				<div class="shippingListBox color-3 f14">
					包邮条件：订单满{{shippingData.money_yuan}}元包邮。
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {existFreeShipping,seeFreeShipping} from "@/api/myStore"
	export default{
		data(){
			return {
				shippingForm:{
					resource:"否",
				},
				shippingData:{},//查看订单包邮数据	
				dialogVisible:false,
				mailingFee:{
					mall_id:"",
					money_yuan:""
				},
				isError:false,
				loading:true,
			}
		},
		created(){
			let mall_id = this.$store.getters.getMall_id;
			this.$set(this.mailingFee, "mall_id", mall_id);
			this.seeFreeShip(mall_id);
		},
		methods:{
			seeFreeShip(mall_id){
				seeFreeShipping(mall_id)
				.then(({data})=>{
					//先调接口，看是否包邮，如果包邮选中是，不包邮选中否；
					if(data.is_support===1){
						this.$set(this.shippingForm,"resource","是");
					}else if(data.is_support===0){
						this.$set(this.shippingForm,"resource","否");
					}
					this.shippingData=data;
					this.loading=false;
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			cancel(){
				this.dialogVisible=false;
				this.isError=false;
			},
			sureTem(){
				if(this.mailingFee.money_yuan===""){
					this.isError=true;
					return
				};
				this.isError=false;
				this.$set(this.mailingFee,"is_support",1);
				this.FreeShipping(this.mailingFee);
			},
			edit(){
				this.dialogVisible=true;
				this.$set(this.mailingFee, "money_yuan", this.shippingData.money_yuan);
			},
			FreeShipping(data){
				existFreeShipping(data)
				.then(({data})=>{
					this.dialogVisible=false;
					if(this.shippingForm.resource==="是"&&Object.keys(this.shippingData).length===0){
						this.hintInfo("添加成功！","success");	
					};
					if(this.shippingForm.resource==="是"&&Object.keys(this.shippingData).length!==0){
						this.hintInfo("包邮！","success");	
					};
					if(this.shippingForm.resource==="否"&&Object.keys(this.shippingData).length!==0){
						this.hintInfo("不包邮！","success");	
					};
					let mall_id = this.$store.getters.getMall_id;
					this.seeFreeShip(mall_id)
				})
				.catch(({response:{data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			isShipping(){			
				if(this.shippingForm.resource==="是"&&Object.keys(this.shippingData).length===1){
					this.dialogVisible=true;
				};				
				if(this.shippingForm.resource==="是"&&Object.keys(this.shippingData).length!==1){	
					this.setData(1)
				};
				if(this.shippingForm.resource==="否"&&Object.keys(this.shippingData).length!==1){
					this.setData(0)
				};
			},
			setData(data){
				this.$set(this.mailingFee, "is_support",data);
				this.$set(this.mailingFee, "money_yuan", this.shippingData.money_yuan);
				this.FreeShipping(this.mailingFee);
			},
			hintInfo(data,types){
				this.$message({
					message: data,
          			type: types
				});
			},
			
		}
	}
</script>

<style lang="scss">
.orderShip{
	.el-dialog--small{
		width: 600px;
		P{
			position: absolute;
			top: 28px;
		}
		.border{
			.el-input__inner{
				border: 1px solid #FF5B00;
			}
		}
	}
	.shippingList{
		-webkit-box-shadow: 0px -1px 0px 0px #e9eef2, -1px 0px 0px 0px #e9eef2, 1px 0px 0px 0px #e9eef2;
	    box-shadow: 0px -1px 0px 0px #e9eef2, -1px 0px 0px 0px #e9eef2, 1px 0px 0px 0px #e9eef2;
	    border-bottom: 1px solid #E9EEF2;
    	.shippingListHead{
	    	height: 32px;
		    background: #EEF6FD;
		    color: #62778C;
		    line-height: 32px;
		    padding-left: 20px;
		    padding-right: 20px;
	    }
    	.shippingListBox{
	    	border-left: 1px solid #E9EEF2;
	    	border-right: 1px solid #E9EEF2;
	    	padding:20px;
	    }
	}
}
</style>