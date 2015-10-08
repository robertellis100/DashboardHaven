# adf-widget-wysiwyg

wysiwyg widget for the [angular-dashboard-framework](https://github.com/sdorra/angular-dashboard-framework).

## Build

The widget is build with the help of [node](https://nodejs.org/), [npm](https://www.npmjs.com/), [bower](http://bower.io/) and [gulp](http://gulpjs.com/). For a install instruction for node and npm, please have a look [here](https://docs.npmjs.com/getting-started/installing-node).

#### Installing bower and gulp

```bash
npm install -g bower
npm install -g gulp
```

#### Installing dependencies

```bash
npm install
bower install
```

#### Build the adf-widget-wysiwyg

```bash
gulp
```

The compiled and optimized files can be found in the dist directory.

#### Other build goals

Each goal can be used as parameter for the gulp command.

* *clean*: removes the dist folder
* *lint*: checks css and javascript files for common errors
* *serve*: starts an webserver to test the widget

## Usage

Install the widget with bower:

```bash
bower install adf-widget-wysiwyg --save
```

Include the script in your index.html and be sure it is loaded after [angular](https://angularjs.org/) and after the [angular-dashboard-framework](https://github.com/sdorra/angular-dashboard-framework).

```html
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">

[...]

<script src="bower_components/rangy/rangy-core.js"></script>
<script src="bower_components/rangy/rangy-classapplier.js"></script>
<script src="bower_components/rangy/rangy-highlighter.js"></script>
<script src="bower_components/rangy/rangy-selectionsaverestore.js"></script>
<script src="bower_components/rangy/rangy-serializer.js"></script>
<script src="bower_components/rangy/rangy-textrange.js"></script>
<script src="bower_components/textAngular/dist/textAngular.js"></script>
<script src="bower_components/textAngular/dist/textAngular-sanitize.js"></script>
<script src="bower_components/textAngular/dist/textAngularSetup.js"></script>
<script type="text/javascript" src="bower_components/angular-wysiwyg-directive/wysiwyg.js"></script>
<script type="text/javascript" src="bower_components/adf-widget-wysiwyg/dist/adf-widget-wysiwyg.min.js"></script>
```

Define a dependency for the module:

```javascript
angular.module('sample', ['adf', 'adf.widget.wysiwyg']);
```
