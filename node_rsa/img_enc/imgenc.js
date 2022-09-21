var fs = require('fs');
var rsab = require('./main');

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
    //console.log(imagedata);
    var buffer = new ArrayBuffer(10);



    var key = rsab.generateKeyPair(1024);
    console.log('private=', key.private);
    console.log('public=', key.public);

    var enc2 = rsab.publicEncrypt(key.public, imagedata);
    console.log('enc2=', enc2);
});
