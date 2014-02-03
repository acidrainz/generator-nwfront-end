'use strict';
var util = require('util');
var exec = require('child_process').exec;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var nwFrontEndGenerator = module.exports = function nwFrontEndGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function installDependencies() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });
};

util.inherits(nwFrontEndGenerator, yeoman.generators.Base);

nwFrontEndGenerator.prototype.promptForConfiguration = function promptForConfiguration() {

  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'includeNormalize',
    message: 'Would you like to include normalize.css?',
    default: true
  }, {
    type: 'confirm',
    name: 'includeJQuery',
    message: 'Would you like to include jQuery?',
    default: true
  }, {
     type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'LESS',
      value: 'includeLess',
      checked: true
    }, {
      name: 'Bootstrap',
      value: 'includeBootstrap',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    }]
  }];

  this.prompt(prompts, function processAnswers(answers) {
   var features = answers.features;
   function hasFeature(feat) { return features.indexOf(feat) !== -1; }
    this.includeNormalize = answers.includeNormalize;
    this.includeJQuery = answers.includeJQuery;
    this.includeLess = hasFeature('includeLess');
    this.includeBootstrap = hasFeature('includeBootstrap');
    this.includeModernizr = hasFeature('includeModernizr');

    done();
  }.bind(this));
};

nwFrontEndGenerator.prototype.createProjectFiles = function createProjectFiles() {
  this.mkdir('app');
  // css
  this.mkdir('app/css');
   // js
  this.mkdir('app/js');
     // images
  this.mkdir('app/images');
  //fonts
  this.mkdir('app/fonts');
  this.copy('index.html', 'app/index.html');
  this.copy('css/fonts.css', 'app/css/fonts.css');
  this.copy('js/app.js','app/js/app.js');
  if(this.includeLess){
     this.copy('css/style.less','app/css/style.less');
  }else{
     this.copy('css/style.css','app/css/style.css');
  }
  if(this.includeJQuery){
     this.copy('vendor/jQuery/jquery.min.js','app/js/jquery.min.js');
     this.copy('vendor/jQuery/jquery.min.map','app/js/jquery.min.map');
  }
  if(this.includeNormalize){
     this.copy('vendor/normalize/normalize.css','app/css/normalize.css');
  }
  if(this.includeBootstrap){
     this.copy('vendor/bootstrap/css/bootstrap.min.css','app/css/bootstrap.min.css');
     this.copy('vendor/bootstrap/js/bootstrap.min.js','app/js/bootstrap.min.js');
     this.directory('vendor/bootstrap/fonts','app/fonts');
  }
if(this.includeModernizr){
     this.copy('vendor/modernizr/modernizr.js','app/js/modernizr.js');
}
this.copy('Gruntfile.js');
this.copy('package.json');
this.copy('bower.json');
this.copy('bowerrc', '.bowerrc');
this.copy('editorconfig', '.editorconfig');
this.copy('gitignore', '.gitignore');
this.copy('gitattributes', '.gitattributes');


};

nwFrontEndGenerator.prototype.gitCommit = function gitCommit() {
  var done = this.async();

  this.log('\n\nInitializing Git repository. If this fail, try running ' +
           chalk.yellow.bold('git init') +
           ' and make a first commit manually');
  var async = require('async');
  async.series([
    function (taskDone) {
      exec('git init', taskDone);
    },
    function (taskDone) {
      exec('git add . --all', taskDone);
    },
    function (taskDone) {
      exec('git commit -m "Created nwFrontEnd"', taskDone);
    }
  ], function (err) {

    console.log(err);
    if (err === 127) {
      this.log('Could not find the ' + chalk.yellow.bold('git') + ' command. Make sure Git is installed on this machine');
      return;
    }

    this.log(chalk.green('complete') + ' Git repository has been setup');
    done();
  }.bind(this));
};
