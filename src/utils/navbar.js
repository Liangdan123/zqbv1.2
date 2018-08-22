
export default {
  data() {
    return {
      hide: false,
      active: "",
      selected: ""
    }
  },
  created(){
    this.selected = this.$route.name;			
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
    }
  }
}
