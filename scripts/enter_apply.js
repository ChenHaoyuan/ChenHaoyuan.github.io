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
        var result = {};
        for(var qrcodeValue of qrcodeValueList) {
            if(qrcodeValue.value.length == 0){
                console.log("value is empty");
                alert("请填写完整。");
                return;
            }

            result[qrcodeValue.id] = qrcodeValue.value;
        }
        console.log(result)
        var encryptResult = Encrypt(JSON.stringify(result))
        console.log(encryptResult)
        qrcode.makeCode(encryptResult); // make another code.

        var image = document.getElementById("display-qrcode").getElementsByTagName("img")[0].src;

        var a = document.createElement("a"); //Create <a>
        a.href = image; //Image Base64 Goes here
        a.download = "Image.png"; //File name Here
        a.click(); //Downloaded file

  })
}

var key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
var iv = CryptoJS.enc.Utf8.parse('ABCDEF4321432143');   //十六位十六进制数作为密钥偏移量

function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

