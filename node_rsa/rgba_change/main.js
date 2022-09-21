var selFile = document.getElementById('selectfile');

const hideCanvas = document.getElementById("hideCanvas");
const showCanvas = document.getElementById("showCanvas");
const hideCtx = hideCanvas.getContext("2d");
const showCtx = showCanvas.getContext("2d");

//変数宣言
var picWidth = 0;
var picHeight = 0;

var imageData;
var data;

//Canvas描画
function draw(){
    showCtx.clearRect(0, 0, showCanvas.width, showCanvas.height);
    showCtx.drawImage(hideCanvas, 0, 0, showCanvas.width, showCanvas.height);
}


selFile.addEventListener("change", function(evt){
    var file = evt.target.files;
    var reader = new FileReader();

    //dataURL形式でファイルを読みこむ
    reader.readAsDataURL(file[0]);

    reader.onload = function(){
        var dataUrl = reader.result;
        var img = new Image();
        img.src = dataUrl;
        img.onload = function(){
            
            hideCanvas.width = img.width;
            hideCanvas.height = img.height;

            hideCtx.clearRect(0, 0, hideCanvas.width, hideCanvas.height);

            hideCtx.drawImage(img, 0, 0);
            draw();

            imageData = hideCtx.getImageData(0, 0, hideCanvas.width, hideCanvas.height);
            data = imageData.data;

        }
    }

});

function saveCanvas(){
    document.getElementById("download").hlef = hideCanvas.toDataURL("image/png", 1.0);
}
