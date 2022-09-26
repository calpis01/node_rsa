var fs = require('fs');
var rsab = require('./main2');

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


    var buffer = new Uint8Array(10);
    // RGBの画素値の配列を取得
    var imagedata = ctx.getImageData(0, 0, img.width, img.height);
    console.log(imagedata);
    const normalArray = Array.from(imagedata);

    var key = rsab.generateKeyPair(1024);
    //console.log('private=', key.private);
    //console.log('public=', key.public);

    var enc2 = rsab.publicEncrypt(key.public, normalArray);
    console.log('enc2=', enc2);
    var dec2 = rsab.privateDecrypt(key.private, enc2);
    console.log('OK? dec2=', dec2);

    
    /*
    const byteCharacters = atob(enc2);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8ClampedArray(byteNumbers);
    console.log('uintArray=', byteArray);
    */
});
