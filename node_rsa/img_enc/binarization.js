// Node.js標準装備のファイルの読み書きするやつ
var fs = require('fs');

// 別途用意した画像を保存してくれるやつ
var canvas_saver = require('./canvas_saver.js');

// node-canvas
var Canvas = require('canvas'),
    Image = Canvas.Image;

fs.readFile(__dirname + '/sample.png', function(err, data){
    if (err) throw err;

    // データをcanvasのcontextに設定
    var img = new Image;
    img.src = data;
    var canvas = Canvas.createCanvas(img.width, img.height);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // RGBの画素値の配列を取得
    var imagedata = ctx.getImageData(0, 0, img.width, img.height);

    // 画像加工(擬似モノクロ化)
    for(var y=0; y<imagedata.height; y++){
        for(var x=0; x<imagedata.width; x++){
            var index = (y*imagedata.width+x)*4;
            // imagedata.data[index] = imagedata.data[index]; // R
            imagedata.data[index+1] = imagedata.data[index]; // G
            imagedata.data[index+2] = imagedata.data[index]; // B
            // imagedata.data[index+3]; // alpha
        }
    }

    // 加工したデータをセット
    ctx.putImageData(imagedata, 0, 0);

    // データを保存
    canvas_saver.save(canvas, "monochrome.png", function(){
        console.log("画像保存完了したよ!!");
    });

});