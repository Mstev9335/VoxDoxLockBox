$("#submit").on("click", function (e) {
    e.preventDefault();
    let user = $("#username-box").val().trim();
    let pass = $("#password-box").val().trim();
    var newUser = {
        username: user,
        password: pass,
    }

    $.post("/api/users", newUser)
        .then(function (data) {
            console.log(data);
        });
});
