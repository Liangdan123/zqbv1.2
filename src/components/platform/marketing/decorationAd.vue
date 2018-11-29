<template>
  <div class="mallDecora">
    <!--..................轮播海报一....................-->
    <div v-if="styleType==0&&styleType==2">
      <h2 class="mt-20 pb-20 f20 color-3 border-e9-b">{{title}}</h2>
      <BannerEditor :banner='Plate'  @passBanner="passBanner">
      </BannerEditor>
    </div>
    <!--..................轮播海报二....................-->
    <div v-else>
      <h2 class="mt-20 pb-20 f20 color-3">{{title}}</h2>
      <BannerEditor  :banner='Plate' @passBanner="passBanner" title="hbys2"
        :isForm="false">
      </BannerEditor>
    </div>
  </div>
</template>

<script>
  import BannerEditor from "@/components/platform/marketing/BannerEditor"
  export default {
    data() {
      return {
        banner: [],
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
