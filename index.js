const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const options = {
    key: fs.readFileSync('privateKey.key'),
    cert: fs.readFileSync('certificate.crt')
}

const server = http2.createSecureServer(options);

/*server.on('stream', (stream, headers) => {
    console.log(stream);
    fs.readFile(__dirname + '/www/' + headers[':path'], (err, data) => {
        console.log(data)
    });
    stream.end("Hello World");
})

server.listen(8080, () => console.log("Server is running."))*/

server.on('request', (req, res) => {
    console.log(path.resolve(__dirname, 'www', 'index.html'));
    fs.readFile(__dirname + req.url, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    })
})

/*
//imagemin, um mehrere Bilder zu minimieren

const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminWebp = require('imagemin-webp');

(async () => {
    const files = await imagemin(['./www/images/*.{jpg,png}'], {
        destination: './www/images',
        plugins: [
            //imageminJpegoptim({ progressive: true, max: 80 }),
            imageminWebp({ quality: 100, size: 20000, resize: { width: 800, height: 450 } })

        ]
    });

    const filesBackground = await imagemin(['./www/images/background/*.{jpg,png}'], {
        destination: './www/images/background',
        plugins: [
            //imageminJpegoptim({ progressive: true, max: 80 }),
            imageminWebp({ quality: 100, size: 200000 })

        ]
    });
})();*/