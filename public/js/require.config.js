requirejs.config({
    //By default load any module IDs from js/libs
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        libs: 'libs',
        vendor: 'vendor',
        jquery: './libs/jquery-1.7.2'
    },
    nodeRequire: require
});

require(
    [
        "jquery"
    ],
    function ($){
        require(['main']);
    }
);
