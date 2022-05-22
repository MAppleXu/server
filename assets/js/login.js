$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login_box').hide();
        $('.reg_box').show()
    })

     // 点击去登录的链接
     $('#link_login').on('click',function(){
        $('.reg_box').hide();
        $('.login_box').show()
    })  
    

    
    // 从layui中获取from对象
    var form = layui.form
    var layer = layui.layer

    // form.verify()函数自定义校验规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            // 通过形参拿到确认密码框中的内容，还需要拿到密码框的内容

            var pwd = $('.reg_box [name=password]').val()

            if(pwd!==value){
                return '两次密码不一样'
            }
        }
    })
    

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认的提交行为
        e.preventDefault()
        // 发起ajax的POST请求
        var data={username:$('#form_reg [name=uesrname]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功')

            $('#link_login').click()
        })
    })


    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认的提交行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            seccess:function(res){

                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                // 登录成功将TOKEN保存
                localStorage.setItem('token', res.token)

                // 跳转到后台主页
                location.href ='/index.html'
            }


            }

        )

    })



})
