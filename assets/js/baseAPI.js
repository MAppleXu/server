//每次调用$.ajax时候会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起请求之前，拼接请求地址
    options.url='http://ajax.frontend.itheima.net'+options.url 
})