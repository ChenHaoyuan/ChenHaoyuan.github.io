var generateButton = document.getElementById('generate-qrcode');

if (generateButton) {
    generateButton.addEventListener('click', function () {
        var qrcodeValueList = document.getElementsByClassName('qrcode-value')
        var result = {};
        for (var qrcodeValue of qrcodeValueList) {
            if (qrcodeValue.value.length == 0) {
                console.log("value is empty");
                alert("请填写完整。");
                return;
            }
            result[qrcodeValue.id] = qrcodeValue.value;
            document.cookie = qrcodeValue.id + "=" + qrcodeValue.value;
        }
        result["date"] = new Date();
        result["validTime"] = "m5";
        result["codeId"] = genNonDuplicateID();
        console.log(result);
        var encryptResult = Encrypt(JSON.stringify(result))
        console.log(encryptResult)


        var qr = new QRious({
            element: document.getElementById('qrcode_canvas'),
            size: 300,
            level: "Q",
            value: encryptResult
        });
        imageUrl = qr.toDataURL();

        var imageElement = document.getElementById('image_display');
        imageElement.src = imageUrl;

        var noteP = document.getElementById('note-p');
        noteP.removeAttribute("hidden");
    })
    //从cookie中设置默认值
    var qrcodeValueList = document.getElementsByClassName('qrcode-value')
    for (var qrcodeValue of qrcodeValueList) {
        qrcodeValue.value = getCookie(qrcodeValue.id);
    }
}

var key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
var iv = CryptoJS.enc.Utf8.parse('ABCDEF4321432143');   //十六位十六进制数作为密钥偏移量

function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}


//汉字生成二维码前要转换，AES编码后则不需要
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

/**
 * 生成一个用不重复的ID
 */
 function genNonDuplicateID(randomLength){
    return Number(Math.random().toString().substr(2,4) + Date.now()).toString(16)
  }