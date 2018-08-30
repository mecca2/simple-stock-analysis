

const vm = new Vue({
  el: '.vue-app',
  data: {
    results: []
  },
  mounted() {
    this.init();
  }, 
  methods : {
    init : function(){
      var self = this; 
      axios.get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            self.results  = response.data;
        })
    }
  }
});


Vue.config.devtools = true;
