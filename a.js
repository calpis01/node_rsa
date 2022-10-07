var fs = require('fs');
var rsab = require('./main2');
const NodeRSA = require('node-rsa');

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


    //var buffer = new Uint8Array(10);
    // RGBの画素値の配列を取得
    var imagedata = ctx.getImageData(0, 0, img.width, img.height);
    console.log(imagedata.data);
    const normalArray = Array.prototype.slice.call(imagedata.data);
    console.log(normalArray);
    
    //var key = rsab.generateKeyPair(1024);
    //console.log('private=', key.private);
    //console.log('public=', key.public);
    const key = new NodeRSA().generateKeyPair();
    const encrypted = key.encrypt(normalArray);
    fs.writeFile("file1.txt", encrypted.toString('base64'), (err) => {
        if (err) throw err;
        console.log('正常に書き込みが完了しました');
      });

    const decrypted = key.decrypt(encrypted);
    fs.writeFile("file2.txt", decrypted, (err) => {
        if (err) throw err;
        console.log('正常に書き込みが完了しました');
      });
      
      const byteCharacters = atob(encrypted.toString('base64'));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8ClampedArray(byteNumbers);
      console.log('uintArray=', byteArray);
/*
    const dataUri = 'data:image/png;base64,ABCDEFYOURIMAGEHEREABCDEF';
    const png = PNG.sync.read(Buffer.from(dataUri.slice('data:image/png;base64,'.length), 'base64'));
    const code = jsqr(Uint8ClampedArray.from(png.data), png.width, png.height);
*/
});
