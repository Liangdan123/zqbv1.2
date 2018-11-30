<template>
  <div class="bannerEditore">
    <div class="banner-editor" v-for="(item,index) in banner" :key="index">
      <div class="item-top clearfix">
        <span class="float-l color-3 f14">海报{{index+1}}</span>
        <div class="btn-group float-r clearfix">
          <div class="Icon float-l mr-10" @click="indexUp(index)">
            <svg height="14.4px" width="14.8px">
              <use xlink:href="#shangyi" />
            </svg>
          </div>
          <div class="Icon float-l mr-10" @click="indexDown(index)">
            <svg height="14.4px" width="14.8px">
              <use xlink:href="#xiayi" />
            </svg>
          </div>
          <div class="Icon float-l" @click="delte(index)">
            <svg height="12.8px" width="12.8px">
              <use xlink:href="#shanchu" />
            </svg>
          </div>
        </div>
      </div>
      <imageUpload :imageUrl="item.image_url" imageType="mall" :index="index" @getImageUrl="updataBanner">
      </imageUpload>
      <p class="jump">跳转链接</p>
      <div class="link">
        <span>
          {{item.click_type=="product"?`商品链接-${item.click_name}`:''}}
          {{item.click_type=="mall_category"?`商品分类-${item.click_name}`:''}}
          {{item.click_type=="form"?"表单信息":''}}
          {{item.click_type=="url"?"外链地址":''}}
        </span>
        <button class="btn-link" @click="showBomb(item,index)">
          <svg height="18px" width="18px">
            <use xlink:href="#xianjie" />
          </svg>
        </button>
      </div>
      <el-dialog title="跳转链接" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal-append-to-body="false"
        :lock-scroll="false" style="text-align: left;">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="商品链接" name="first">
            <storeList @productName="classifyCnt" @shop_hidden="shop_hidden" :productChecked="productChecked"
              :choiceRole="choiceRole" class='mt-20'>
            </storeList>
          </el-tab-pane>
          <el-tab-pane label="商品分类" name="second">
            <productClassify @categorys="categorys" :type="classifyType" :Classify="mallClassify" :choiceRole="choiceRole" class='mt-20'>
              <div class="btn clearfix pt-20 pb-20 border-t">
                <el-button class="store-button2 float-r" @click="cancel">
                  取消
                </el-button>
                <el-button class="store-button1 float-r mr-10" @click="sureclassify">
                  确定
                </el-button>
              </div>
            </productClassify>
          </el-tab-pane>
          <el-tab-pane label="表单信息" name="three" v-if="isForm">
            <appendForm @shop_hidden="shop_hidden" @setFormMess="setFormMess" @resetData="resetData" :formData="formData" class='mt-20'
              :click_style="click_style" :index="bannerIndex">
            </appendForm>
          </el-tab-pane>
            <el-tab-pane label="其他链接" name="four" v-if="isPc&&isForm">
             <div class='url_content'>
                <el-input placeholder="请粘贴你要跳转的其他链接地址 如：https://www.baidu.com" v-model="url">
                <template slot="prepend">其他链接地址：</template>
              </el-input>
             </div>
              <div class="pagination-r clearfix text-r pb-20">
                <el-button class="store-button2 float-r" @click="cancel">取消</el-button>
                <el-button class="store-button1 float-r mr-10" @click="sureUrl">确定</el-button>
              </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <button class="w-100 btn-add" @click="addBanner" v-if="disabled">
      <b>+</b>添加海报
      <span>[{{this.banner.length}}/5]</span>
    </button>
    <div v-if="false">{{upBanner}}</div>
  </div>
</template>

<script>
  import storeList from "@/components/platform/mallSet/storeList"
  import productClassify from "@/components/platform/mallSet/productClassify"
  import appendForm from "@/components/platform/mallSet/appendForm"
  import shareMth from '@/utils/shareMth'
  import {
    getMallClassifyList
  } from "@/api/platform"
  import storeClassify from "@/utils/storeClassify"
  import {
    deletes
  } from "@/api/script"
  export default {
    components: {
      storeList,
      productClassify,
      appendForm
    },
    data() {
      let businessRange = this.$store.state.user.user.business_range;
      return {
        dialogFormVisible: false,
        activeName: "first",
        bannerIndex: "",
        disabled: true,
        url:'',
        classifyName: {},
        classifyType: "单选",
        productChecked: {
          id: ""
        },
        BannerRadio: "", //海报样式二的标题选项
        bannerTitle: "",
        mallClassifyList: [],
        classifyList: [],
        formData: { //表单信息数据				                   
          click_type: "form",
          click_style: 1,
          click_image_url: "",
        },
        click_style: 0, //表单样式		
        choiceRole: "mall",
        business_range: businessRange, //服务商经营范围
      }
    },
    props: {
      banner: {
        default: ()=>{
          return []
        },
      },
      isPc:{
         default:false
      },
      isForm: {
        default:true
      }
    },
    created() {
      getMallClassifyList()//商城分类列表
      .then(({data})=>{
        this.mallClassifyList=data;					
      })
      //添加海报按钮显示不显示(有时一个页面会调两个或者多个这个组件)
      this.disabled=this.banner.length<=4;
    },
    mixins: [shareMth, storeClassify],
    methods: {
      resetData() {
        this.formData = { //表单信息数据				                   
          click_type: "form",
          click_style: 1,
          click_image_url: "",
        };
      },
      //商品分类传过来的数据
      categorys(val) {
        this.classifyName = val;
      },
      sureUrl(){
         this.classifyCnt({click_url:this.url,click_type: "url"})
        this.dialogFormVisible = false;
      },
      sureclassify() { //保存按钮
        this.dialogFormVisible = false;
        let classify = {
          click_type: "mall_category",
          click_name: this.classifyName.click_name,
          click_id: this.classifyName.click_id
        };
        if (this.classifyName) {
          this.classifyCnt(classify)
        }
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      productName(data) { //storeList框的确定按钮
        this.classifyCnt(data)
      },
      setFormMess(data) { //adForm确定按钮
        this.classifyCnt(data);
      },
      updataBanner(data) {
        let index = data.index
        let item_new = this.banner[index];
        item_new.image_url = data.new_url;
      },
      addBanner() { //点击添加海报	
        if (JSON.stringify(this.banner.length) == 4) {
          this.disabled = false;
        };
        this.banner.push({
          image_url: "",
        })
      },
      classifyCnt(data) { //点击弹框的确定按钮（商品链接）
        if (data.click_image) {
          delete data.click_image
        }; //删掉不需要的click_image
        let plateMess = Object.assign({}, this.banner[this.bannerIndex], data);
        this.$set(this.banner, this.bannerIndex, plateMess);
      },
      indexUp(index) {
        this.itemIndexUp(index, this.banner);
      },
      indexDown(index) {
        this.itemIndexDown(index, this.banner)
      },
      delte(index) {
        this.itemDelte(index, this.banner);
        if (this.banner.length == 4) {
          this.disabled = true
        };
      },
      initStoreClassify(data) { //初始化数据
        for (let val of this[data]) {
          val.checked = false;
        }
      },
      isChecked(data, type) { //传到子集时判断是否事先被选中	
        for (let val of this.mallClassify) { //只有商城分类，没有店铺分类
          if (type === "storeClassify") {
            if (val.id === data.banner_click_id) {
              val.checked = true;
            }
          } else if (type === 'mallClassify') {
            if (val.id === data.click_id) {
              val.checked = true;
            }
          }
        }
      },
      showBomb(item, index) { //打开弹窗		
        this.dialogFormVisible = true;
        this.bannerIndex = index;
        this.initStoreClassify("mallClassify"); //初始化数据
        if (this.mallClassify.length == 0 || this.banner.length == 0) {
          return
        };
        if (this.banner[index].click_type === "mall_category") { //商品分类中是否选中
          this.classifyName = {
            click_name: item.click_name,
            click_id: item.click_id
          };
          this.isChecked(this.classifyName, 'mallClassify') //传到子集时判断是否事先被选中
        };
        this.$set(this.productChecked, "id", {}); //开始点击弹框时让他都不选择
        if (this.banner.length == 0) {
          return
        }
        if (this.banner[index].click_type === "product") { //商品链接中是否选中
          this.$set(this.productChecked, "id", this.banner[index].click_id);
        };
        if (this.banner[index].click_type === "form") { //有表单信息时
          this.formData = Object.assign({}, this.formData, item);
          this.click_style = item.click_style; //弹框时固定住样式值，以好知道是哪个图片有值							
        } else { //没有表单信息时
          this.formData = Object.assign({}, this.formData, {
            click_type: "form",
            click_style: 1,
            click_image_url: "",
          })
        }
        if(this.banner[index].click_type === "url"){
          this.url=this.banner[index].click_url;
        }
      },
      shop_hidden(data) {
        this.dialogFormVisible = data;
      },
    }
  }

</script>

<style scoped="scoped">
  .url_content{
    height:350px;
    margin-top:50px ;
    padding:20px;
  }
  .bannerEditore {
    padding-bottom: 60px;
  }

  .item-top {
    line-height: 26px;
    margin-top: 20px;
  }

  .btn-group .Icon {
    height: 24px;
    width: 24px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    cursor: pointer;
  }

  .imageUpload {
    width: 258px;
    height: 220px;
    margin-top: 10px;
  }

  p.sug {
    display: block;
    text-align: left;
    line-height: 32px;
  }

  p.jump {
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    color: #333333;
    text-align: left;
    margin-top: 10px;
  }

  div.link {
    padding: 0 0 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #333333;
    border: 1px solid #D6D6D6;
    border-radius: 2px;
    margin-top: 8px;
    text-align: left;
  }

  div.link span {
    display: inline-block;
    max-width: 208px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button.btn-link {
    float: right;
    height: 32px;
    width: 32px;
    border: none;
    border-left: 1px solid #d6d6d6;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  button.btn-add {
    height: 32px;
    line-height: 32px;
    color: #333;
    text-align: center;
    border: 1px solid #d6d6d6;
    border-radius: 2px;
    background: none;
    cursor: pointer;
    outline: none;
    margin-top: 20px;
  }

  button.btn-add b {
    font-size: 20px;
    vertical-align: bottom;
    margin-right: 5px;
  }

  .btn-edit {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 50px;
    width: 300px;
    border-top: 1px solid #D6D6D6;
    text-align: left;
    background-color: #fff;
    z-index: 550;
  }

  .btn-edit button {
    background: none;
    border: 0;
    cursor: pointer;
    height: 100%;
    width: 49%;
    font-size: 14px;
    color: #333333;
  }

  .btn-edit button:focus {
    outline: none;
  }

  .btn-edit .btn-edit-save {
    border-left: 1px solid #D6D6D6;
    color: #0070C9;
  }

</style>
