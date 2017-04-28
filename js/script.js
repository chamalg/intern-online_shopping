var sellerIdIncremented=0;
//Chamal's variables
var uid = "";
var fingerprint = "";
var elemsList;
//end of chamal's v.

//get last seller ID
function getlastSellerId(){

    var oql="1=1";
    var apiURL="https://preprod.gtnexus.com/rest/";
    var dataKey="963963434e915554d54807cf2288989edc0a4bdf";
    var authentication="Basic YW1hbmRhQnV5ZXI6dHJhZGVjYXJk"
    var ConnectionManager = APPXPRESS.core.connection_manager.controller.createConnectionManager(apiURL);
    var client = ConnectionManager;
    var httpMethod = 'GET';
    var endpoint = '310/$sellerB1/query';
    var params = null;
    var headers = {
        'Content-Type': 'application/json',
        'dataKey': dataKey,
        'Authorization': authentication,
        'oql':oql
    };

    var body = "";
    var onDataFn = function(data) {

        //console.log('data',data.response);
        var user=JSON.parse(data.response);
        var arrayLength=user.result.length-1;
        var sellerID=user.result[arrayLength].seller_id;
        var m = parseInt(sellerID.match(/\d+/g)); 
        m++;
        sellerIdIncremented= m;
        console.log(sellerIdIncremented);
    }

    var onErrorFn = function(data) {
        console.log('edata', data);
    }
    
    client.createRequest('GET', endpoint, params, headers, body, onDataFn, onErrorFn);

    
    return sellerIdIncremented;
    
}


//add a seller

function signUp() {

    getlastSellerId();
    
    setTimeout(function () {

        var username = $("#username");
        var name = document.getElementsByName('name')[0].value;
        var contactNo = document.getElementsByName('contactNo')[0].value;
        var location = document.getElementsByName('location')[0].value;
        var email = document.getElementsByName('email')[0].value;
        var password = document.getElementsByName('password')[0].value;
        var rePassword = document.getElementsByName('rePassword')[0].value;


        if (validateSignUpForm()==true) {


            var userObject={
                type:"$sellerB1",
                seller_id: "S0"+sellerIdIncremented,
                username: username,
                password: password,
                name: name,
                location: location,
                contact_no: contactNo
            };

            console.log(userObject);
            var apiURL="https://preprod.gtnexus.com/rest/";
            var dataKey="963963434e915554d54807cf2288989edc0a4bdf";
            var authentication="Basic YW1hbmRhQnV5ZXI6dHJhZGVjYXJk"
            var ConnectionManager = APPXPRESS.core.connection_manager.controller.createConnectionManager(apiURL);
            var client = ConnectionManager;
            var httpMethod = 'GET';
            var endpoint = '310/$sellerB1';
            var params = null;
            var headers = {
                'Content-Type': 'application/json',
                'dataKey': dataKey,
                'Authorization': authentication
            };
            var body = userObject;
            var onDataFn = function(data) {
        //console.log('data', JSON.parse(data.response));
        var user=JSON.parse(data.response);
        console.log(user);
        //console.log("Department: "+user.create.result.department);

    }
    var onErrorFn = function(data) {
        console.log('edata', data);
    }
    client.createRequest('POST', endpoint, params, headers, body, onDataFn, onErrorFn);
	$("#signUpUname").val("");
	$("#signUpName").val("");
	$("#contactNo").val("");
	$("#location").val("");
	$("#email").val("");
	$("#signUpPassword").val("");
	$("#rePassword").val("");
	$('#signUpModal').modal('hide');
} else {
    console.log("NOTvalidated");
}

}, 3000)

}




//get a user by id
function signIn() {

    if(document.getElementById('radio1').checked){
       var username = document.getElementsByName('uname')[0].value;
       var passwordV = document.getElementsByName('psw')[0].value;


       var oql="username='"+username+"'";
       var apiURL="https://preprod.gtnexus.com/rest/";
       var dataKey="963963434e915554d54807cf2288989edc0a4bdf";
       var authentication="Basic YW1hbmRhQnV5ZXI6dHJhZGVjYXJk"
       var ConnectionManager = APPXPRESS.core.connection_manager.controller.createConnectionManager(apiURL);
       var client = ConnectionManager;
       var httpMethod = 'GET';
       var endpoint = '310/$sellerB1/query';
       var params = null;
       var headers = {
        'Content-Type': 'application/json',
        'dataKey': dataKey,
        'Authorization': authentication,
        'oql':oql
    };

    var body = "";
    var onDataFn = function(data) {
        console.log('data',data.response);
        var user=JSON.parse(data.response);

        console.log(user.result[0].password);
        var password=user.result[0].password;

        if (passwordV==password) {
            console.log("correct");
            $('#signInModal').modal('hide');
            document.getElementById ('visi').style.visibility ="visible";
            var docItemPos = document.getElementById("login_alert");
            var htm= '<div class="alert alert-success" style="color:black">';
            htm += '<strong>Hi  '+username+' !</strong>';
            htm +='</div>';
            console.log(htm);
            docItemPos.insertAdjacentHTML('afterbegin', htm);
            

        }
        else{
            alert("Wrong Password.. Try again");
        }



    }
    var onErrorFn = function(data) {
        console.log('edata', data);
    }
    client.createRequest('GET', endpoint, params, headers, body, onDataFn, onErrorFn);

}

    //else part
    else{
        var username = document.getElementsByName('uname')[0].value;
        var passwordV = document.getElementsByName('psw')[0].value;


        var oql="username='"+username+"'";
        var apiURL="https://preprod.gtnexus.com/rest/";
        var dataKey="963963434e915554d54807cf2288989edc0a4bdf";
        var authentication="Basic YW1hbmRhQnV5ZXI6dHJhZGVjYXJk"
        var ConnectionManager = APPXPRESS.core.connection_manager.controller.createConnectionManager(apiURL);
        var client = ConnectionManager;
        var httpMethod = 'GET';
        var endpoint = '310/$buyerB1/query';
        var params = null;
        var headers = {
            'Content-Type': 'application/json',
            'dataKey': dataKey,
            'Authorization': authentication,
            'oql':oql
        };

        var body = "";
        var onDataFn = function(data) {
            console.log('data',data.response);
            var user=JSON.parse(data.response);

            console.log(user.result[0].password);
            var password=user.result[0].password;

            if (passwordV==password) {

                console.log("correct");
                $('#signInModal').modal('hide');
                document.getElementById ('visi').style.visibility ="visible";
            }
            else{
                alert("Wrong Password.. Try again");
            }



        }
        var onErrorFn = function(data) {
            console.log('edata', data);
        }\
        client.createRequest('GET', endpoint, params, headers, body, onDataFn, onErrorFn);

    }

}

function validateSignUpForm(){
    var username = document.getElementsByName('username')[0].value;
    var name = document.getElementsByName('name')[0].value;
    var contactNo = document.getElementsByName('contactNo')[0].value;
    var location = document.getElementsByName('location')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('password')[0].value;
    var rePassword = document.getElementsByName('rePassword')[0].value;
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    const number = /^[0-9]{10}$/;
    var flag=false;


    if(username===""||name===""||contactNo===""||location===""||email===""||password===""||rePassword===""){
      alert("Incomplete form");
  }
  else{

      if(!(mailformat.test(email))){
          alert("Wrong mail");
          return;
      }

      if (!(number.test(contactNo))) {
          alert("please add 10 digits only");
          return;
      }

      if (password!=rePassword) {
          alert("wrong password combination");
          return;
      }
      flag=true;
  }
  return flag;


}



//Chamal's method

function retriveItemList(){

    var apiURL = "https://preprod.gtnexus.com/rest/310/$SellerB2?oql=1=1&limit=1";
    var dataKey = "88b069ce5b9985b5c28c7563d72a7da3b19fc793";
    var authentication = "Basic Y2didXllcjAyOnRyYWRlY2FyZA==";

    var ConnectionManager = APPXPRESS.core.connection_manager.controller.createConnectionManager(apiURL);
    var client = ConnectionManager
    var httpMethod = 'GET';
    var endpoint = '310/$SellerB2/';
    var params = null;

    var headers = {
        'Content-Type': 'application/json',
        'dataKey': dataKey,
        'Authorization': authentication

    };


    var onDataFn = function(data) {
            //console.log('data', data);
            //console.log('data', JSON.parse(data.response));
            var user=JSON.parse(data.response); 
            var resBody = user.result;
            console.log(resBody);
            var resArrSize = resBody.length;

            elemsList = [];

            resBody.forEach(function(element){
                elemsList.push(element.uname);


                var htm = '<div class="well">';

                htm += '                            <table>';
                htm += '                                    <tr>';
                htm += '                                        <td><div class="loopContainer1" style="text-transform: uppercase">';
                htm += '                                            <h3>'+element.items[0].name+'</h3>';
                htm += '                                        </div>';
                htm += '                                        <img class="img-responsive" src="'+element.items[0].image+'"></td>';
                htm += '                                        <td>';
                htm += '                                            <div class="loopContainer2" style="padding:50px">';
                htm += '                                                <h4> Remaining qty: '+element.items[0].qty+'</h4>';
                htm += '                                                <h4> Price: '+element.items[0].price+'</h4>';
                htm += '                                            </div>';
                htm += '                                        </td>';
                htm += '                                    </tr>';
                htm += '                                </table>';
                htm += '                            </div>';

                var docItemPos = document.getElementById("containerIn");

                docItemPos.insertAdjacentHTML('beforebegin', htm);
            });





        }

        var onErrorFn = function(data) {
            console.log('edata', data);

        } 


        if(uid!=""){
            endpoint += uid;
        }

        client.createRequest('GET', endpoint, params, headers, null, onDataFn,
            onErrorFn);

    }

