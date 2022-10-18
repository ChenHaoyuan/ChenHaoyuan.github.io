var applyForm = document.getElementById('userName');
var generateButton = document.getElementById('generate-qrcode');
var qrcode = new QRCode(document.getElementById("display-qrcode"), {
    text: '',
    //width: 128,
    //height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    //correctLevel : QRCode.CorrectLevel.H
});
qrcode.clear();


if (generateButton) {
    generateButton.addEventListener('click', function () {
        qrcode.clear();
        var qrcodeValueList = document.getElementsByClassName('qrcode-value')
        
        var result = "";
        for(var qrcodeValue of qrcodeValueList) {
            if(qrcodeValue.value.length == 0){
                console.log("value is empty");
                alert("请填写完整。");
                return;
            }

            if(result.length == 0){
                result = qrcodeValue.value;
            }else{
                result = result +"$$"+ qrcodeValue.value;
            }
        }
        console.log(result)
        qrcode.makeCode(result); // make another code.

  })
}



