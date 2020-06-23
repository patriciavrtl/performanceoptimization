const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminWebp = require('imagemin-webp');
const critical = require('critical');
const minify = require('minify');
const fs = require('fs');


(async () => {
    const files = await imagemin(['./www/images/*.{jpg,png}'], {
        destination: './www/images',
        plugins: [
            imageminWebp({ quality: 100, size: 20000, resize: { width: 800, height: 450 } }),
        ],
    });

    const filesBackground = await imagemin(['./www/images/background/*.{jpg,png}'], {
        destination: './www/images/background',
        plugins: [
            imageminWebp({ quality: 100, size: 200000 })

        ]
    });
})();

const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
    },
};

(async () => {
    try {
        const data = await minify('./www/css/style.css', options);
        fs.writeFile('./www/css/style.mini.css', data, (err) => {
            if (err) throw err;
            console.log('the file has been saved!');
        });
    } catch (err) {
        console.log(err.message);
    }
})();

fs.readdir('./www/js/', async (err, files) => {
    console.log(files);
    for (let file in files) {
        if (!files[file].includes('min.js')) {
            try {
                const data = await minify(`./www/js/${files[file]}`, options);
                const fileSplit = files[file].split('.');
                const fileNameFragmentations = fileSplit.slice(0, -1);
                const fileName = fileNameFragmentations.join('.');


                fs.writeFile(`./www/js/${fileName}.min.js`, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
});

critical.generate({
    inline: true,
    base: 'www/',
    src: 'index-source.html',
    dest: 'index.html',
    width: 500,
    height: 800,
    minify: true,
});

