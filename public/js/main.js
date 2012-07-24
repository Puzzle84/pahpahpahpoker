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
        vendor: 'vendor'
    }
});

// Start the main app logic.
requirejs(['jquery', 'tools', 'game'],
function   ($, t, g) {
     $(function() {
        //
    });

    // create a new instance of showcase.
    var game = new g.game();
    game.init();

    game.gameTest();
});