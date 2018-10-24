<template>
	<div id="mapContain">
		<div>{{storeAddressChange}}</div>
	</div>	
</template>

<script>
	import {Tmap} from "@/api/script"
	export default{
		name:"storeMap",
		data(){
			return {
				storeMap:{},
				geocoder:{},
			}
		},
		props:["storeAddress"],
		created(){
			Tmap("QEJBZ-FBT3U-E6SV5-BWAEH-JBXCE-EMBE3")
			.then(qq=>{
				//地图开始时的位置（没有定位时）
				this.storeMap=new qq.maps.Map(document.getElementById('mapContain'),{
			        center: new qq.maps.LatLng(39.916527,116.397128),
			        zoom: 15
			  });
			    this.storeGeocoder();
			})
		},
		computed:{
			storeAddressChange(){
				if(this.storeAddress){
					return this.geocoder.getLocation&&this.geocoder.getLocation(this.storeAddress);
				}
			}
		},
		methods:{
			storeGeocoder(){
				var that=this;	
				//调用地址解析类
				this.geocoder=new qq.maps.Geocoder({
		 	        complete:function(result){
			            that.storeMap.setCenter(result.detail.location);
			            var marker = new qq.maps.Marker({
			                map:that.storeMap,
			                position: result.detail.location
			            });	
			            that.getPlace(result);	
			        },
			        error:function(error){	
			        	 that.getPlace(error);	
			        }
			 });	
			},
			getPlace(result){
				//传给父集的值
				if(result!=="ERROR"){
					//当地址被解析的时候
					let obj={
	   					addressComponents:result.detail.addressComponents,
						location:result.detail.location,
						address:result.detail.address
		   			};	
		            this.$emit("getDetail",obj);
				}else if(result==="ERROR"){
					//当地址不被解析的时候
					this.$emit("getDetail",result);
				}

			},
		}
	}
	
</script>

<style>
</style>