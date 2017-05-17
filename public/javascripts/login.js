/**
 * Created by lethe on 17-5-7.
 */
var regex={
    password:/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/
};
function login() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if(!regex.password.test(password)){
        console.log("密码格式错误");
    }
    else {
        fetch('/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            if (json.code == 0) {
                location.href = '/users/home';
            }
        });
    }
}