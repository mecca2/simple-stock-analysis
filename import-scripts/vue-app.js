Vue.component('line-chart', {
  extends: VueChartJs.Line,
  props: ['stock', 'chartdata', 'chartlabel'],
  mounted() {
    this.renderLineChart(); 
  },  
  methods: {
    renderLineChart: function (){
      var self = this; 
      this.renderChart({
        labels: self.chartlabel,
        datasets: [{
          label: self.stock,
          backgroundColor: '#f87979',
          data: self.chartdata
        }],
        
      }, { responsive: true, maintainAspectRatio: false , elements: { point: { radius: 0 } }})
    }
  }, 
  watch: {
    chartdata: function() {
      this.renderLineChart();
    }
  }

})



const vm = new Vue({
  el: '.vue-app',
  data: {
    results: {},
    companyInfo: false,
    apiEndPoint: 'https://api.iextrading.com/1.0/',
    stock: '',
    stocksSearched: [],
    error: false,
    notFoundSku: '',
    apiRequestComplete: false,
    stockYearlyChart: [],
    stockYearlyChartDates: []
  },
  mounted() {
    this.init();
  },
  computed: {
    displaySearchedStocks: function() {
      var tempString = this.stocksSearched.toString();
      tempString = tempString.replace(',', ' , ');
      return tempString;
    }
  },
  methods: {
    init: function() {
      var self = this;
    },
    submitStock: function() {
      var self = this;
      self.apiRequestComplete = false;
      console.log('test '); 
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/company')
        .then(response => {
          if (self.stocksSearched.indexOf(self.stock) == -1) {
            self.stocksSearched.unshift(self.stock);
          }
          self.companyInfo = response.data;
          self.error = false;

          if (!self.error) {
            self.getStockCurrentPrice();
            self.getStockYearlyChart('1y');
          }
        })
        .catch(function(error) {
          self.notFoundStock = self.stock;
          self.error = true;
          console.log(self.notFoundStock);
        });
      // if no error then stock is found run rest of api requests 
      

    },
    getStockCurrentPrice: function() {
      var self = this;
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/price')
        .then(response => {

          self.results.price = response.data;
          console.log('PRICE: ' + self.results.price);
        })
        .catch(function(error) {
          self.notFoundStock = self.stock;
          self.error = true;
          console.log(self.notFoundStock);
        });
    },
    switchtoDaily : function(){
      this.getStockYearlyChart('1d'); 
    },
    getStockYearlyChart: function(range) {
      var self = this;
      axios.get(this.apiEndPoint + '/stock/' + this.stock + '/chart/' + range)
        .then(response => {
          var temp = response.data;
          if(range == '1y'){
            data = temp.map(function(e) {
              return e.close;
            });
            data2 = temp.map(function(e) {
              return e.date;
            });
          }else{
            data = temp.map(function(e) {
              return e.marketAverage;
            });
            data2 = temp.map(function(e) {
              return e.minute;
            });
          }
          
          self.stockYearlyChart = data;
          self.stockYearlyChartDates = data2;
          console.log(self.stockYearlyChart); 
          self.apiRequestComplete = true;
          self.error = false;
        })
        .catch(function(error) {
          self.notFoundStock = self.stock;
          self.error = true;
          
        });
    },
    formatPrice(value) {
      if (typeof value !== "undefined") {
        return "$" + value.toFixed(2);
      }
      return "$" + value;
    }
  }
});


Vue.config.devtools = true;