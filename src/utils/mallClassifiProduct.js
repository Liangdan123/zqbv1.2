export default {
	methods:{
		indexUp(index){
			this.itemIndexUp(index,this.banner);
		},
		indexDown(index){
			this.itemIndexDown(index,this.banner)
		},
		initStoreClassify(data) { //初始化数据
			for(let val of this[data]) {
				val.checked = false;
			}
		},
		isChecked(data){//传到子集时判断是否事先被选中				
			for(let val of this.mallClassify){		
				if(val.id===data.click_id){val.checked=true;}																
			}
		},
		showBomb(item,index){
			this.dialogFormVisible=true;
			this.bannerIndex=index;
			this.initStoreClassify("mallClassify");
			if(this.banner[index].click_type==="mall_category"){//商品分类中是否选中
				this.classifyName={click_name:item.click_name,click_id:item.click_id};	
				this.isChecked(this.classifyName)//传到子集时判断是否事先被选中
			};	
			this.$set(this.productChecked,"id",{});//开始点击弹框时让他都不选择
			if(this.banner.length != 0){
				if(this.banner[index].click_type==="product"){//商品链接中是否选中
					this.$set(this.productChecked,"id",this.banner[index].click_id);
				}
			}
		},
		classifyCnt(data){//商品链接确定按钮
			var banner=this.banner[this.bannerIndex];
			if(data.click_image!==undefined){
				delete data.click_image;
			}	
			Object.assign(banner,data);
			this.$emit("addNav",this.bannerIndex,data);//添加图片导航和文字导航
		},
		shop_hidden(data){
			this.dialogFormVisible=data;
		},
		categorys(val){
			this.classifyName=val;	
		},
		cancel(){
			this.dialogFormVisible=false;
		},
		sureclassify(){
			var classifyCnt = {click_type: "mall_category",click_name: this.classifyName.click_name,click_id:this.classifyName.click_id};
			if (this.classifyName != "") {this.classifyCnt(classifyCnt)};
			this.dialogFormVisible=false;
		},
	}
}