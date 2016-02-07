#JALA: _Just Another List App_
###Basic Description
Just as the name suggests, JALA is simply a to-do list
application meant to run in a local home or work environment
via [Node.js](https://nodejs.org/en/) and its modules.

![JALA Functionality Example]
(https://raw.githubusercontent.com/l4nk332/JALA-Just_Another_List_App/master/public/_assets/img/jala_example.gif)

The main objective of this application is to provide a
simple and easy to use interface in which a group of
individuals (*or maybe just one person...*) will be able
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

#####Node Dependencies
All Node Dependencies for the application will be identified and
placed in the _package.json_ file. The current Node module
dependencies for this project are:

  - [express ^4.13.4](https://www.npmjs.com/package/express)
  - [body-parser version ^1.14.2](https://www.npmjs.com/package/body-parser-json)
  - [cors ^2.7.1](https://www.npmjs.com/package/cors)
  - [ipware 0.0.7](https://www.npmjs.com/package/ipware)
  - [nodemailer ^2.1.0](https://www.npmjs.com/package/nodemailer)

Once [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are properly installed,
navigate in the Terminal to the root directory of the application
project and simply enter:

`$ npm install`

This will install any of the dependencies that are necessary for
the application and not found on the computer or within the
*node_modules* folder within the working directory.

#####Other Dependencies
There are a few other dependencies that will be used in JALA.
These dependencies will be linked to via [cdnjs](https://cdnjs.com/) in the
_index.html_ file and therefore will not need to be downloaded or
installed unless upon preference (e.g allow JALA to work offline):
  - [jQuery](https://jquery.com/)
  - [jQuery UI](https://jqueryui.com/)
  - [Normalize](https://necolas.github.io/normalize.css/)
  - [Babel](https://babeljs.io/)

###Application Set-up
To run the application simply navigate to the root directory of the
project and run:

`$ node app`

**Note:** *Write privileges might be necessary for JALA to properly run and
	  *write files on the system. In this case prepend sudo:* `$ sudo node app`

Once up and running open your Web Browser and navigate to the IP address 
of the computer (*server*) running the application followed by the a colon and the port 
number (*3000 by default*):

`192.168.1.1:3000`

#####Specifying Port Number
You can specify the port number JALA will listen on by appending the '-p'
flag followed by a number. Here is an example of JALA running on port 345:

`$ node app -p 345`

If no port number is specified JALA will run on port 3000 by default.