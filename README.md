#JALA: _Just Another List App_
###Basic Description
Just as the name suggests, JALA is simply a to-do list
application meant to run in a local home or work environment
via [Node.js](https://nodejs.org/en/) and its modules.

The main objective of this application is to provide a
simple and easy to use interface in which a group of
individuals (or maybe just one person...) will be able
to keep track of things that would normally be placed
on a checklist.

I mean let's face it, the [Internet of Things](https://en.wikipedia.org/wiki/Internet_of_Things)
is here and has been here for a time now. Rather than misplacing
sticky notes around the office or creating a collage of paperwork
on the refrigerator, why not utilize something that connects to
all networking devices you own?

###Getting Started
In order to begin using JALA you will need to have [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)
(which will come bundled with Node) installed on your computer.

####Node Dependencies
All Node Dependencies for the application will be identified and
placed in the _package.json_ file.

Once [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are properly installed,
navigate in the Terminal to the root directory of the application
project and simply enter:
`$ npm install`

This will install any of the dependencies that are necessary for
the application and not found on the computer or within the
*node_modules* folder within the working directory.

####Other Dependencies
There are a few other dependencies that will be used in JALA.
These dependencies will be linked to via [cdnjs](https://cdnjs.com/) in the
_index.html_ file and therefore will not need to be downloaded or
installed unless upon preference (e.g allow JALA to work offline):
  - [jQuery](https://jquery.com/)
  - [jQuery UI](https://jqueryui.com/)
  - [Normalize](https://necolas.github.io/normalize.css/)
  - [Babel](https://babeljs.io/)
