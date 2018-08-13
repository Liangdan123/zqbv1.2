  <template>
    <el-table  :data="ClassifyList"  style="width: 100%" empty-text="尚未添加分类" class="mall_table_save">
      <el-table-column type="expand">  <!-- props.row.sub -->
        <template slot-scope="props">
          <div v-for="value in props.row.sub" class="expanded-box">
            <div class="expanded">
              	<svg width="24" height="24"><use xlink:href="#Rectangle"/></svg>
                {{value.mall_category_name}}
                <img :src="value.image_url" height="40" width="40">
            </div>
            <div class="expanded">
                {{value.created_at}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column    prop="mall_category_name"  label="分类名称"   >
      </el-table-column>
      <el-table-column    prop="created_at" label="创建时间"	width="592">
      </el-table-column>
    </el-table>

  </template>
<script>
import shareMth from '@/utils/shareMth'
export default {
  data() {
    return {

    }
  },
  props: ['ClassifyList'],
}
</script>

<style lang="scss" >
.el-table--enable-row-hover .el-table__body tr:hover > td,
.el-table__expanded-cell:hover {
    background: #fff !important;
}
.mall_table_save {
    border: 0;
      font-size: 12px;
    .el-table__empty-block{
        border-bottom: 1px solid #dfe6ec;
    }
    &:before {
        height: 0;
    }
    &:after{
      width:0;
    }
    th > .cell {
        color: #62778C;
    }
    td > div {
        color: #333;
    }
    td {
        box-sizing: border-box;
        height: 32px;
    }
    .cell,
    th > div {
        padding-left: 10px;
        text-align: left;
    }
    .el-table__expand-icon {
        height: 31px;
    }
    .el-icon-arrow-right {
        border: 6px solid transparent;
        border-left-color: #333;
        &:before {
            content: "";
        }
    }

    .el-table__expanded-cell {
        padding: 0;
        height: 0;
        background: #fff;
        box-shadow: none;
        border-bottom: 0;
        &:hover {
            background: #fff;
        }
        .expanded-box {
            overflow: hidden;
            border-bottom: 1px solid #dfe6ec;
        }
        .expanded {
            box-sizing: border-box;
            float: left;
            width: 50%;
            height: 60px;
            line-height: 60px;
            padding-left: 10px;
            text-align: left;
            &:first-child {
                padding-left: 59px;
            }
            svg {
                margin-right: 16px;
                vertical-align: middle;
            }
            img{
            	margin-left: 10px;
            }
        }
    }
}
</style>
<style>
.mall_table_save .el-table__row {
	height: 60px;
}
</style>
