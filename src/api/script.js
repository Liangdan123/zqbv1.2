import axios from "axios";
/*...............地图api..............*/
export function Tmap(key){
	return new Promise(function(resolve,reject){
		window.init=function(){
			resolve(qq); 			
		};		
		var script=document.createElement("script");
		script.type="text/javascript";
		script.src="https://map.qq.com/api/js?v=2.exp&callback=init&key="+key
		script.onerror=reject;
		document.head.appendChild(script)
	})
}

export function imUpload(event,imageType){
	return new Promise(function(resolve,reject){
		let file=event.target.files[0];
		let supportedTypes=['image/jpg', 'image/jpeg', 'image/png'];
		//图片大小不超过3M
		let imageSize=1024*1024*3;
		if(file && supportedTypes.indexOf(file.type)>=0 &&file.size<imageSize){	
			var formData = new FormData();
			formData.append('photo', file);
			formData.append('type',imageType);
			axios.post("upload_image",formData)
			.then(({data})=>{					
				resolve(data.path) 
			})
			.catch(({response:{data}})=>{
				reject(data)
			})
	
		}else{
			this.$message.error("文件格式只支持png、jpg,并且图片须在3MB以内")
		}
	})
}
/*...............数组组合排序法..............*/
export function packedArray(arr){
	var len=arr.length;
	if(len>=2){
		var len1=arr[0].length;
		var len2=arr[1].length;
		var lenBox=len1*len2;
		var firstArray=new Array(lenBox);
		var index=0;
		for(var i=0; i<len1;i++){
			for(var j=0; j<len2;j++){
				if(arr[0][i] instanceof Array){
					firstArray[index]=arr[0][i].concat(arr[1][j]);
				}else{
					firstArray[index]=[arr[0][i]].concat(arr[1][j]);
				}
				index++;
			}
		};
		var recombine=new Array(len-1);
		for(var n=2;n<len;n++){
			recombine[n-1]=arr[n];
		};
		recombine[0]=firstArray;
		return packedArray(recombine);
	}else{
		return arr[0];
	}	
}
//批量删除对象属性
export function deletes(data,objects){
		//data是属性，objects是整个对象
		for(var pro in objects){
			if(data.includes(pro)){
				//属性是变量是是这么获取的[]
				delete objects[pro]
			}
		}	
}
//格式化时间
export function format(data){
	let m = data.getMonth() + 1;
    let d = data.getDate();
   	let date = data.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    return date
}
//保留两位小数
export function capitalize(value){
	if (value == "") {
        return ""
    }
    return Math.round(parseFloat(value) * 100) / 100;
}
//并集差集
export function setUnion(data,arrays){
	let add_item=[...new Set([data].filter(item=>!new Set(arrays).has(item)))];//差集
	let dele_item=[...new Set(arrays.filter(item=>new Set([data]).has(item)))];//并集
	if(dele_item.length){
		let index=arrays.findIndex(item=>item.includes(data));
		arrays.splice(index,1)
	}else if(add_item.length){
		arrays.push(data);
	};
}



