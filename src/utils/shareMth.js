export default{
	//删除空对象
	methods:{
		//删除对象里面的空属性；包括对象里的对象
		deleteEmptyString(obj){
			for(var i in obj){
				if(obj[i]===""){
					delete obj[i]
				}else if(typeof obj[i]==="object"){
					this.deleteEmptyString(obj[i])
				}
			}
		},
		//删除整个空对象
		deleteEmptyObject(obj){
			for(var i in obj){
				if(Object.keys(obj[i]).length===0&&obj.constructor===Object){
					delete obj[i]
				}
			}
		},
		//删除数组里的整个空对象
		deleteArrayObject(ary){
			var j=0;
			for(var i=0,max=ary.length;i<max;i++){
				if(Object.keys(ary[i]).length===0){
					j++;//累计数组空对象长度
				}
			};
			ary.length=ary.length-j;
		},
		itemIndexUp(index,cyclicData){
			this.itemIndexChange("up",index,cyclicData);
		},
		itemIndexDown(index,cyclicData){
			this.itemIndexChange("down",index,cyclicData)
		},
		itemDelte(index,cyclicData){
			if(cyclicData[index].sort!==undefined){//当有sort顺序时
				cyclicData.forEach((item,i)=>{
					if(i>index){item.sort=item.sort-1;}	//如果被删除那么被删除之后的顺序都减1										
				})
			};
			cyclicData.splice(index,1);
		},
		itemIndexChange(type,index,cyclicData){
			var num=type==="up"?-1:1;
			if(num<0&&index===0 ){
				this.$message({showClose: true, message: '已至最前'});
				return false
			};
			if(num>0&&index===cyclicData.length-1){
				this.$message({showClose: true, message: '已至最后'});			
				return false
			};
			if(cyclicData[index].sort!==undefined){
				cyclicData[index].sort=index+num;//sort顺序改变
				cyclicData[index+num].sort=index;
			};
			let item_selected=cyclicData[index];
			let new_item=cyclicData[index+num];
			cyclicData.splice(index,1,new_item);
			cyclicData.splice(index+num,1,item_selected);
		},
	}

}
