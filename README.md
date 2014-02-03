# generator-nwfront-end

A generator for [Yeoman](http://yeoman.io) that scaffolds a simple web project for when you need to
quickly play with an idea. It will create an HTML, CSS and Javascript file, already linked with each other,
ready to be edited. It can also add normalize.css or jQuery.
It includes a Grunt configuration with an Express server to host the files
and livereload to directly see the modifications in your browser when you save.
It also initialises a Git repository, so you can version your experiments.

Nice to have features that might land in the future:
 - add Normalize and Modernizr
 - add LESS.
 - add Bootstrap .


## Getting Started

Yeoman runs using [node.js](http://nodejs.org), so you'll need it installed on your machine.
Installing the generator is a matter of a simple `npm` command.

```
$ npm install -g generator-nwfront-end
```

Yeoman, Grunt and Bower, which are needed for the generator to work fine should have been installed
automatically (yeah `package.json`'s `peerDependencies` section) and you should be ready to go.
Head over to the folder you wish scaffold a project and type:

```
$ yo nwfront-end
```

The generator will work its magic and scaffold the necessary files and folders. You're ready to go!

Start the express and livereload servers using `grunt server`.
This will also open your default browser to see index.html.
All that's left is popping up your favourite text editor and edit the `index.html`, `css/style.css` and/or `js/app.js`.

You could even go with a crazy one liner to do all of this at once
(might want to alias this if you plan on using it often):

```
$ yo nwfront-end && (sublime-text . index.html css/style.css js/app.js &) && grunt server
```
> Note: Replace the `sublime-text` command with the one corresponding to your editor,
> maybe the one stored in the $EDITOR environment variable.

Have fun coding!

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Release History
