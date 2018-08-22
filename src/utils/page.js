export default {
	//删除空对象
	data(){
		return {
			lastPage:null,
			selectArr:[],
			total: 0,
		}
	},
	created() {
		//我的店铺商品数据
		this.searchMethod();
	},
	methods: {
		SelectionChange(arr, row) {//表格勾选
			this.selectArr=arr;
		},
		cancel() {//取消弹窗
			this.$refs['ruleForm'].resetFields();
			this.Visible = false;
		},
		handleCurrentChange(val) {//分页跳转
			this.searchCondition.page=val;
			this._doSearch();
		},
		searchMethod() { //搜索方法
			if(this.searchCondition.page == 1) {
				//页面在第一页搜索手动调接口获取数据列表
				this._doSearch()
			} else {
				//页面在第一页搜索列表就让他回到第一页然后触发handleCurrentChange（）方法（页面更改设置触发）
				this.searchCondition.page = 1;
			}
		}
	}

}
