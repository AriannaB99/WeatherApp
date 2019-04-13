var likelycount = 0;
var unlikelycount = 0;
var defaultcount = 0;
	var div_5day = new Vue({
  el: '#day',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    cycle: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})