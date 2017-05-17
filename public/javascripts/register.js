/**
 * Created by lethe on 17-5-8.
 */
var regex={
    password:/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/
};
function register() {
    var name = document.getElementById('name').value;
    var pass = document.getElementById('pass').value;
    var rePass = document.getElementById('rePass').value;
    if(!regex.password.test(pass)){
        console.log("密码格式错误");
    }
    else if(pass != rePass){
        console.log("两次密码不一致");
    }
    else{
        fetch('/users/register',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: pass
            })
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            if (json.code == 0) {
                location.href = '/users/login';
            }
        });
    }
}