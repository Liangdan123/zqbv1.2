<template>
  <div class="mallDecora">
      <h2 class="mt-20 pb-20 f20 color-3">{{title}}</h2>
      <BannerEditor  :banner='Plate' @passBanner="passBanner"
        :isForm="isForm" :isPc='isPc'>
      </BannerEditor>
  </div>
</template>

<script>
  import BannerEditor from "@/components/platform/marketing/BannerEditor"
  export default {
    computed: {
      isForm(){
        if(this.styleType==0||this.styleType==2){
          return true
        }else{
          return false
        }
      },
      isPc(){
          if(this.styleType==0||this.styleType==1){
          return false
        }else{
          return true
        }
      }
    },
    props: {
      Plate: { //整个模块的数据
        type: Array,
        default:()=>{
          return  []
        }
			},
			styleType:{
				default:1
			},
			title:{
				default:"广告组"
			}
    },
    components: {
      BannerEditor,
    },
    methods: {
      passBanner(data) { //轮播海报一
        this.mallPlate = data;
      }
    }
  }

</script>

<style scoped="scoped">
  .mallDecora {
    position: fixed;
    top: 102px;
    right: 0;
    bottom: 44px;
    width: 260px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
    border-left: 1px solid #D6D6D6;
    z-index: 200;
    overflow-y: auto;
  }

   .mallDecora::-webkit-scrollbar {
    width: 0px;
  }

</style>
