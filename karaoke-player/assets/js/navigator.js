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
            console.log(err);
        });
}

function updateDeviceList() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        var checkDefaultAudio = devices.find(device => {
            return device.kind === 'audiooutput' && device.deviceId === "default"
        })
        console.log(checkDefaultAudio);

    });
}

navigator.mediaDevices.addEventListener('devicechange', function (event) {
    updateDeviceList()
})

window.addEventListener('DOMContentLoaded',function(){
    addMediaDevice();
})