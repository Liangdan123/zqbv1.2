import router from '@/router'
export default {
  data() {
    return {
      hide: false,
      active: "",
      selected: ""
    }
  },
  created(){
   this.fetchData()	
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName
    },
    email() {
      return this.$store.getters.getEmail
    }
  },
  methods: {
    //退出登录
    loginOut() {
      this.$store.dispatch('doLogout');
    },
    handleSelect(index) {
      this.selected = index;
    },
    fetchData() {
      let arr = this.$route.path.trim().split("/");
      this.selected = arr[arr.length-1]
    }
  }
}
