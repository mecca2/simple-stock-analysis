

const vm = new Vue({
  el: '.vue-app',
  data: {
    results: {}, 
    companyInfo: false, 
    apiEndPoint : 'https://api.iextrading.com/1.0/', 
    stock: '', 
    stocksSearched : [], 
    error: false, 
    notFoundSku : '', 
    apiRequestComplete: false
  },
  mounted()  {
    this.init();
  }, 
  computed: {
    displaySearchedStocks: function(){
      var tempString = this.stocksSearched.toString(); 
      tempString = tempString.replace(',', ' , ');
      return tempString; 
    }
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
      self.apiRequestComplete = false; 
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/company')
          .then(response => {
            if(self.stocksSearched.indexOf(self.stock) == -1){
              self.stocksSearched.unshift(self.stock); 
            }
            self.companyInfo  = response.data;
            self.error = false; 
          })
          .catch(function (error) {
            self.notFoundStock = self.stock;
            self.error = true; 
            console.log(self.notFoundStock);
          });
      // if no error then stock is found run rest of api requests 
      if(!self.error){
        self.getStockCurrentPrice(); 
      }
      
    }, 
    getStockCurrentPrice: function(){
      var self = this; 
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/price')
          .then(response => {
             
            self.results.price = response.data; 
            console.log('PRICE: ' + self.results.price);
            self.apiRequestComplete = true; 
          })
          .catch(function (error) {
            self.notFoundStock = self.stock;
            self.error = true; 
            console.log(self.notFoundStock);
          });
    }, 
    formatPrice(value) {
        if(typeof value !== "undefined"){
          return "$" + value.toFixed(2); 
        }
        return "$" + value; 
    }
  }
});


Vue.config.devtools = true;
