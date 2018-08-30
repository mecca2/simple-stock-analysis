

const vm = new Vue({
  el: '.vue-app',
  data: {
    results: [], 
    companyInfo: false, 
    apiEndPoint : 'https://api.iextrading.com/1.0/', 
    stock: '', 
    stocksSearched : []
  },
  mounted() {
    this.init();
  }, 
  methods : {
    init : function(){
      var self = this; 
      /*axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            self.results  = response.data;
      })*/
    },
    submitStock: function(){
      var self = this; 
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/company')
          .then(response => {
            self.stocksSearched.push(this.stock); 
            self.companyInfo  = response.data;
      })
      console.log(self.stocksSearched); 
    }
  }
});


Vue.config.devtools = true;
