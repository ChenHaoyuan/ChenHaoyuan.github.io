var generateButton = document.getElementById('generate-qrcode');

function utf16to8(str) {  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for(i = 0; i < len; i++) {  
    c = str.charCodeAt(i);  
    if ((c >= 0x0001) && (c <= 0x007F)) {  
        out += str.charAt(i);  
    } else if (c > 0x07FF) {  
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));  
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
    } else {  
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));  
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
    }  
    }  
    return out;  
} 

if (generateButton) {
    generateButton.addEventListener('click', function () {
        var qrcodeValueList = document.getElementsByClassName('qrcode-value')
        var result = "";
        for (var qrcodeValue of qrcodeValueList) {
            if (qrcodeValue.value.length == 0) {
                console.log("value is empty");
                alert("请填写完整。");
                return;
            }

            if (result.length == 0) {
                result = qrcodeValue.value;
            } else {
                result = result + "$$" + qrcodeValue.value;
            }
        }
        console.log(result);
        var utf8Result = utf16to8(result);
        console.log(utf8Result);

        var qr = new QRious({
            element: document.getElementById('qrcode_canvas'),
            size: 300,
            level: "Q",
            value: utf8Result
        });
        imageUrl = qr.toDataURL();

        var imageElement = document.getElementById('image_display');
        imageElement.src = imageUrl;

        var noteP = document.getElementById('note-p');
        noteP.removeAttribute("hidden");
    })
}


