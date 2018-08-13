<template>
    <el-checkbox-group v-model="checkList">
        <ul class="express-wrap">
            <li class="express-item">
                <el-checkbox label="express">快递配送</el-checkbox>
                <el-radio-group v-if="chargeForExpressType" v-model="chargeForExpressType.shipping_set_type"
                                @change="expressTypeDetailSelected">
                    <el-radio label="template">运费模板</el-radio>
                    <el-radio label="define">自定义运费</el-radio>
                    <el-radio label="seller">卖家承担运费</el-radio>
                </el-radio-group>
                <div class="extend-box" v-if="chargeForExpressType&&chargeForExpressType.shipping_set_type!=='seller'">
                    <div class="wrap-template" v-if="chargeForExpressType.shipping_set_type=='template'">
                        <label>运费设置</label>
                        <el-select
                            v-model="chargeForExpressType.distribute_template_id"
                            placeholder="请选择运费模板"
                            @change="expressTemplatesSelected">
                            <div v-for="item in templatesForExpress">
                                <el-option
                                    v-show="!item.hidden"
                                    :key="item.distribute_template_id"
                                    :label="item.show_name"
                                    :value="item.distribute_template_id">
                                    <p class="express-label">{{item.template_name}}</p>
                                    <p class="express-info">
                                        {{item.first_num}}件内{{item.first_price_yuan}}元,每增加{{item.add_num}}件,增加运费{{item.add_price_yuan}}元</p>
                                </el-option>
                            </div>
                        </el-select>
                    </div>
                    <div class="wrap-define" v-if="chargeForExpressType.shipping_set_type=='define'">
                        <span>默认运费</span><input type="text" v-model.number="chargeForExpressType.first_num"/>
                        <span>件内</span><input type="text" v-model.number="chargeForExpressType.first_price_yuan"/>
                        <span>元，每增加</span><input type="text" v-model.number="chargeForExpressType.add_num"/>
                        <span>件，增加运费</span><input type="text" v-model.number="chargeForExpressType.add_price_yuan"/>
                    </div>
                </div>
            </li>
            <li class="express-item">
                <el-checkbox label="shop">门店配送</el-checkbox>
                <el-radio-group v-if="chargeForShopType" v-model="chargeForShopType.shipping_set_type"
                                @change="shopTypeDetailSelected">
                    <el-radio label="template">运费模板</el-radio>
                    <el-radio label="define">自定义运费</el-radio>
                    <el-radio label="seller">卖家承担运费</el-radio>
                </el-radio-group>
                <div class="extend-box" v-if="chargeForShopType&&chargeForShopType.shipping_set_type!=='seller'">
                    <div class="wrap-template" v-if="chargeForShopType.shipping_set_type=='template'">
                        <label>运费设置</label>
                        <el-select
                            v-model="chargeForShopType.distribute_template_id"
                            placeholder="请选择运费模板"
                            @change="shopTemplatesSelected">
                            <div v-for="item in templatesForExpress">
                                <el-option
                                    v-show="!item.hidden"
                                    :key="item.distribute_template_id"
                                    :label="item.show_name"
                                    :value="item.distribute_template_id">
                                    <p class="express-label">{{item.template_name}}</p>
                                    <p class="express-info">
                                        {{item.first_num}}件内{{item.first_price_yuan}}元,每增加{{item.add_num}}件,增加运费{{item.add_price_yuan}}元</p>
                                </el-option>
                            </div>
                        </el-select>
                    </div>
                    <div class="wrap-define" v-if="chargeForShopType.shipping_set_type=='define'">
                        <span>默认运费</span><input type="text" v-model.number="chargeForShopType.first_num"/>
                        <span>件内</span><input type="text" v-model.number="chargeForShopType.first_price_yuan"/>
                        <span>元，每增加</span><input type="text" v-model.number="chargeForShopType.add_num"/>
                        <span>件，增加运费</span><input type="text" v-model.number="chargeForShopType.add_price_yuan"/>
                    </div>
                </div>
            </li>
            <li class="express-item">
                <el-checkbox label="self">到店自提</el-checkbox>
            </li>
        </ul>
    </el-checkbox-group>
</template>
<style scoped>
    .el-radio {
        margin-left: 15px;
    }

    .extend-box {
        padding: 10px 0 10px 22px;
        background-color: #eef6fd;
    }

    .wrap-template label,
    .wrap-define label {
        font-size: 12px;
        margin-right: 10px;
    }

    .wrap-template span,
    .wrap-define span {
        font-size: 12px;
    }

    .wrap-template input,
    .wrap-define input {
        width: 70px;
        padding-left: 10px;
        height: 32px;
        line-height: 32px;
        border-radius: 2px;
        outline: none;
        border: 1px solid #d6d6d6;
        margin-left: 10px;
        margin-right: 10px;
    }

    .el-select {
        width: 300px;
    }

    .el-select-dropdown__item {
        height: auto;
        color: #333;
        font-size: 14px;
    }

    .express-info, .express-label {
        padding-left: 10px;
        width: 300px;
        font-size: 14px;
        color: #7f7f7f;
        line-height: 1.2;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .express-label {
        color: #333;
    }

    .el-select-dropdown__item.selected p {
        color: #fff;
    }

</style>
<script>
    import {getstoreMess} from "@/api/myStore"
    import {getShippingTem} from "@/api/commodity"
    import {deletes} from "@/api/script"

    export default {
        data() {
            return {
                templatesForExpress: [],
                expressTemplateSelectedId: '',
                expressDataBackUp:{},
                shopTemplateSelectedId: '',
                shopDataBackUp:{}
            }
        },
        props: {
            distribution: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        computed: {
            checkList: {
                get() {
                    return this.distribution.map(({distribute_type}) => distribute_type)
                },
                set(type) {
                    this.toggleExpressType(type);
                }
            },
            chargeForExpressType() {
                // 快递配送收费方式
                let charge_data = this.distribution.find(({distribute_type}) => distribute_type == 'express');
                if(Object.keys(this.expressDataBackUp).length == 0){
                    this.expressDataBackUp = Object.assign({},charge_data)
                }
                if (charge_data && charge_data.shipping_set_type == 'template') {
                    this.expressTemplateSelectedId = charge_data.distribute_template_id || this.expressTemplateSelectedId;
                }
                return charge_data
            },
            chargeForShopType() {
                // 门店配送收费方式
                let charge_data = this.distribution.find(({distribute_type}) => distribute_type == 'shop');
                if(Object.keys(this.shopDataBackUp).length == 0){
                    this.shopDataBackUp = Object.assign({},charge_data)
                }
                if (charge_data && charge_data.shipping_set_type == 'template') {
                    this.shopTemplateSelectedId = charge_data.distribute_template_id || this.shopTemplateSelectedId;
                }
                return charge_data
            }
        },
        created() {
            let shop_id = this.$store.getters.getShop_id;
			let multiple={
				shop_id
			};	
            //获取模板的数据
            getstoreMess(multiple)
                .then(({data: {mall_id, id: shop_id}}) => {
                    return getShippingTem({
                        mall_id,
                        shop_id
                    })
                })
                .then(({data}) => {
                    data.map(item=>{
                        let {add_num, add_price_yuan, first_num, first_price_yuan, template_name} = item;
                        item.show_name = `${template_name} ${first_num}件内${first_price_yuan}元,每增加${add_num}件,增加运费${add_price_yuan}元`;
                    })
                    this.templatesForExpress = data;
                })
        },
        methods: {
            toggleExpressType(type) {
                // 判断勾选还是取消勾选
                if (type.length > this.checkList.length) {
                    // 勾选
                    // 筛选出勾选类目
                    let [type_name] = type.filter(name => !new Set(this.checkList).has(name));
                    if (type_name == 'self') {
                        this.distribution.push({
                            distribute_type: 'self'
                        })
                    } else {
                        // 快递配送和店铺配送默认选中运费模板的默认模板
                        let data_base = {
                            distribute_type: type_name,
                            shipping_set_type: "template",
                        };
                        let data_default = this.getDefalutTemplateData();
                        Object.assign(data_base, data_default,)
                        this.distribution.push(data_base);
                    }
                } else {
                    // 取消勾选
                    let [type_name] = this.checkList.filter(name => !new Set(type).has(name));
                    let type_index = this.distribution.findIndex(({
                                                                      distribute_type
                                                                  }) => distribute_type == type_name);
                    this.distribution.splice(type_index, 1)
                }
            },
            expressTypeDetailSelected(name) {
                // 快递配送 运费模式选择
                this.toggleTypeData('express', name);
            },
            shopTypeDetailSelected(name) {
                // 自定义配送 运费模式选择
                this.toggleTypeData('shop', name)
            },
            expressTemplatesSelected(id) {
                // 快递配送方式 模板选择
                let data_selected = this.getDefalutTemplateData(id);
                this.expressTemplateSelectedId = id;
                this.toggleTypeData('express', 'template', data_selected)
            },
            shopTemplatesSelected(id) {
                // 快递配送方式 模板选择
                let data_selected = this.getDefalutTemplateData(id);
                this.shopTemplateSelectedId = id;
                this.toggleTypeData('shop', 'template', data_selected)
            },
            toggleTypeData(type, name, data) {
                // 根据type筛选出该配送方式的排序
                let index_change = this.distribution.findIndex(({distribute_type}) => distribute_type == type);
                let id = this[`${type}TemplateSelectedId`];
                let data_base = {
                    "distribute_type": type,
                    "shipping_set_type": name,
                };
                let data_extend = {};
                if(name == 'template' ){
                    if (id) {
                        data_extend = this.getDefalutTemplateData(id);
                    } else {
                        data_extend = data ? data : this.getDefalutTemplateData()
                    }
                }else  if(name == 'define'){
                    if (id) {
                        data_extend = this.getDefalutTemplateData(id);
                    } else {
                        if(data){
                            data_extend = data
                        }else if(Object.keys(this[`${type}DataBackUp`]).length>0){
                            let {distribute_unit,first_num,first_price_yuan,add_num,add_price_yuan} = this[`${type}DataBackUp`];
                            data_extend = {distribute_unit,first_num,first_price_yuan,add_num,add_price_yuan}
                        }else {
                            data_extend = this.getDefalutTemplateData()

                        }
                    }
                     delete data_extend.distribute_template_id
                }
                Object.assign(data_base, data_extend)
                this.$set(this.distribution, index_change, data_base)
            },
            getDefalutTemplateData(id) {
                let data_default = this.templatesForExpress.find(({is_default, distribute_template_id}) => id ? distribute_template_id == id : is_default);
                let {
                    distribute_template_id,
                    distribute_unit,
                    first_num,
                    first_price_yuan,
                    add_num,
                    add_price_yuan
                } = data_default;
                return {
                    distribute_template_id,
                    distribute_unit,
                    first_num,
                    first_price_yuan,
                    add_num,
                    add_price_yuan
                }
            }
        }
    }
</script>