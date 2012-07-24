#1 PREREQUISITES
##1 installing node

If you have homebrew installed it's as simple as

> brew install node

If you don't:
1. Install Xcode.
2. Install git.
3. Run the following commands:

> darwin_setup.sh

> git clone git://github.com/ry/node.git

> cd node

> ./configure

> make

> sudo make install

##2 installing requireJS
I preferred the global install as this would make calling r.js alot easier so go ahead and use

> sudo npm install -g requirejs

#2 TESTING

To test the current app.
navigate to the spec folder and run runner.html
this file loads mocha, expectjs and requirejs.
it then initializes the app and runs test/test.js which holds all the mocha tests.

if you want to write your own tests. put the tests in test.js or create your own file and reference it in runner.html.


#3 BUILDING
##1 running the buildscript
All the options i wanted/added are in app.build.js.
You can open that up and look at some of the options in there and play with them.
Once you're happy with those settings go to the root folder of my project and do

> r.js -o app.build.js

This will look up dependencies and minify the css and js if you've set it up to do so.

now you will hit the build/index.html file and TADA!!!