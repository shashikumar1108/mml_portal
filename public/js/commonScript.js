let accessToken = localStorage.getItem("portal_token");
console.log("Token : ",accessToken);

function checkLogin(){
    console.log("Validate Login");
    $.ajax({
      url: "/api/v1/validateLogin",
      headers: {"authorization": accessToken},
      type: "get",
      dataType:'json',
      data: { },
      success: function (result) {
        console.log(result);
      },
      error: function (err) {
        // check the err for error details
        // let msg = 'Something went wrong!!!!'
        if( err.status == 400 || err.status == 404 ){
          //msg = JSON.parse(err.responseText).message;
          window.location.href = 'login';
        }
        // swal({
        //   title: 'Read the alert!',
        //   text: msg,
        //   button: {
        //     text: "OK",
        //     value: true,
        //     visible: true,
        //     className: "btn btn-primary"
        //   }
        // })
      }
    });
}

if( accessToken != undefined || accessToken != '' ){
    checkLogin();
}