var idDeviceAudio = null;
function addMediaDevice() {
    navigator.mediaDevices
        .getUserMedia({
            audio: true,
        })
        .then(async (stream) => {
            // console.log(captureStream);
            // videoElement.srcObject = stream;
            updateDeviceList();
        })
        .catch((err) => {
            console.log()
        });
}

function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        var checkDefaultAudio = devices.find(device => {
            return device.kind === 'audiooutput' && device.deviceId === "default"
        })
        if (checkDefaultAudio && checkDefaultAudio.groupId !== idDeviceAudio) {
            if (isPlay && /Speakers/.test(checkDefaultAudio.label)) {
                buttonPlayer.click();
            }
            idDeviceAudio = checkDefaultAudio.groupId;
        }
    });
}

navigator.mediaDevices.addEventListener('devicechange', function (event) {
    updateDeviceList()
})

window.addEventListener('DOMContentLoaded', function () {
    addMediaDevice();
    window.addEventListener("devicemotion", (event) => {
        const acceleration = event.acceleration;

        // Kiểm tra nếu giá trị acceleration thay đổi đột ngột
        if (Math.abs(acceleration.x) > 10 || Math.abs(acceleration.y) > 10 || Math.abs(acceleration.z) > 10) {
            // AirPod có thể được đặt vào tai hoặc tháo ra khỏi tai
        }
    });

    if (!navigator.bluetooth) {
        console.log("Trình duyệt web không hỗ trợ API Web Bluetooth");
        return;
    }
    let options = {
       acceptAllDevices:true
    };

    function checkBluetooth() {
        navigator.bluetooth.requestDevice(options)
            .then((device) => {
                console.log(device.name);
                // Kết nối với thiết bị
                // device.connect()
                //     .then((server) => {
                //         // Lấy dịch vụ GATT
                //         console.log(server);
                //         // server.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb")
                //         //     .then((service) => {
                //         //         // Lấy đặc điểm LED
                //         //         service.getCharacteristic("0000ffe1-0000-1000-8000-00805f9b34fb")
                //         //             .then((characteristic) => {
                //         //                 // Bật đèn LED
                //         //                 characteristic.writeValue(new Uint8Array([0x01]));

                //         //                 // Tắt đèn LED
                //         //                 characteristic.writeValue(new Uint8Array([0x00]));
                //         //             });
                //         //     });
                //     });
            });
    }
})