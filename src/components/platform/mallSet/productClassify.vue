<template>
	<div class="productClassify">
		<slot name="header"></slot>
		<div class="Classify">
			<div v-if="Classify.length!=0?true:false">
				<div v-show="type=='单选'">
					<div v-if="choiceRole==='store'">
						<label class="display-b store_label" 
							v-for="(item,index) in Classify" 
							:key="index">		        	
				            <input type="radio" name="one" 
				            	@click="RadioIndex(index)" 
				            	:checked="item.checked" 
				              	:disabled="(item.level==1&&item.is_final==0)?true:false"  
				              	class="display-n"/>
				              
				            <em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
				              :class="item.level===2? 'ml-20' : ''">
				            </em>
			           		{{item.mall_category_name}}
			        	</label>
					</div>
					
					<div v-if="choiceRole==='mall'">
						<label class="display-b store_label" 
							v-for="(item,index) in Classify" 
							:key="index">		        	
				            <input type="radio" 
				            	name="one"
				            	@click="RadioIndex(index)" 
				            	:checked="item.checked" 
				              	:disabled="(item.level==1&&item.is_final==0)?true:false"  
				              	class="display-n"/>
				              
				            <em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
				              :class="item.level===2? 'ml-20' : ''"></em>
			           		 {{item.mall_category_name}}
			        	</label>
					</div>
				</div>
				
				<div class="text-l" 
					:class="{checkClassify:checkStyle}" 
					v-show="type=='多选'">					
					<label class="display-b store_label" 
						v-for="(item,index) in Classify" 
						:key="index">			        	
			          <input type="checkbox" 
			          	name="two" 
			          	@change="CheckIndex(item,index)"
			          	v-model="item.checked"
			           :disabled="(item.level==1&&item.is_final==0)?true:false"  
			           class="display-n">
			           
			          <em v-if="item.level==2||(item.level==1&&item.is_final==1)?true:false"
			            :class="item.level===2? 'ml-20' : ''"></em>
			          {{item.shop_category_name}}
			        </label>
				</div>
			</div>
			<div v-else class="color-6 f18" style="text-align: center;line-height: 380px;">
				尚未添加分类
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ["type", "checkStyle", "Classify", "classfyId","choiceRole"],
		methods: {
			RadioIndex(index) {
				let classify
				if(this.choiceRole==="store"){
					classify = {
						banner_click_name: this.Classify[index].mall_category_name,
						banner_click_id: this.Classify[index].id
					};
				}else if(this.choiceRole==="mall"){
					classify = {
						click_name: this.Classify[index].mall_category_name,
						click_id: this.Classify[index].id
					};
				};				
				this.$emit("categorys", classify)
			},
			CheckIndex(item, index) {
				var newClassId = [];
				if(event.target.checked === true) {
					this.classfyId.push({
						id: item.id,
						index: index,
						name: item.shop_category_name
					});
				} else {
					for(var i = 0; i < this.classfyId.length; i++) {
						//需要删除的项与当前的项是否相等         
						if(this.classfyId[i].index === index) {
							this.classfyId.splice(i, 1)
						}
					};
				}
				console.log(1111111111)
				this.$emit("categorys", this.classfyId)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.categorylabel {
		min-height: 24px;
		padding: 10px 0;
		border-bottom: 1px solid #E9EEF2;
		line-height: 29px;
		>.label_item {
			padding-left:10px;
			display: inline-block;
			width: 74px;
			height: 24px;
			background: rgba(240, 244, 247, 1);
			line-height: 24px;
			border-radius: 2px;
			margin-right: 10px;
			text-align: center;
			.label_name{
				max-width: 42px;
				font-weight:normal;
				float:left;			    
			    white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;
			}
		}
	}
	
	.store-button1,
	.store-button2 {
		padding-left: 24px;
		padding-right: 24px;
	}
	
	.Classify {
		min-height: 384px;
		overflow-y: auto;
		padding-left: 20px;
	}
	
	.Classify::-webkit-scrollbar {
		width: 0;
	}
	
	.store_label {
		cursor: pointer;
		height: 40px;
		line-height: 40px;
	}
	
	.checkClassify {
		.store_label {
			cursor: pointer;
			em {
				display: inline-block;
				position: relative;
				width: 14px;
				height: 14px;
				background: #ffffff;
				border: 1px solid #D6D6D6;
				border-radius: 2px;
				vertical-align: text-bottom;
				margin-right: 4px;
			}
			input[type="checkbox"]:checked+em {
				width: 14px;
				height: 14px;
				border: 1px solid #D6D6D6;
				border-radius: 0;
				position: relative;
				background-color: #0070C9;
				border-color: #0070C9;
				&:after {
					content: "";
					position: absolute;
					border: 2px solid #fff;
					top: 1px;
					height: 8px;
					width: 4px;
					border-left: 0;
					border-top: 0;
					left: 4px;
					transform: rotate(45deg);
				}
			}
		}
	}
</style>