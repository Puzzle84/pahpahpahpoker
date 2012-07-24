({
    appDir: "public",
    baseUrl: "js",
    dir: "build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",

    paths: {
        "jquery": "libs/require-jquery"
    },

    modules: [
        //Optimize the application files. jQuery is not
        //included since it is already in require-jquery.js
        {
            name: "main",
            exclude:
                ["jquery"]
        }
    ]
})