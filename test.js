const critical = require('critical');
const minify = require('minify');
const fs = require('fs');

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

