({
    appDir: "public",
    baseUrl: "js",
    dir: "build",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS
    optimize: "uglify",

    modules: [
        {
            name: "main"
        }
    ]
})