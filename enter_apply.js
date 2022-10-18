var applyForm = document.getElementById('userName');
var generateButton = document.getElementById('generate-qrcode');
var qrcode = new QRCode(document.getElementById("display-qrcode"), {
    text: '测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据',
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

        var image = document.getElementById("display-qrcode").getElementsByTagName("img")[0].src;

var iframe = "<iframe width='100%' height='100%' src='" + image + "'></iframe>"
var x = window.open()
x.document.open()
x.document.write(iframe)
x.document.close()

  })
}


