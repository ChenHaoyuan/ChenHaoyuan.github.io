var generateButton = document.getElementById('generate-qrcode');

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
        console.log(result)

        var qr = new QRious({
            element: document.getElementById('qrcode_canvas'),
            value: result
        });
        imageUrl = qr.toDataURL();

        var imageElement = document.getElementById('image_display');
        imageElement.src = imageUrl;

    })
}


