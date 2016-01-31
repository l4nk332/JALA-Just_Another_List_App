#Pending Modifications

This is a list of pending modification that should be implemented
into JALA but have not been:

###Front-end:

  - Fix bug when Toggling Hidden items and then checking additional
    ones.

###Back-end:

  - Email implementation will most likely utilize the [nodemailer](https://www.npmjs.com/package/nodemailer)
    module, allowing the user to email the list as plain-text.

  - A node web-socket interface will need to be utilized so that
    changes to the list stream-line to each user.
    (Best option might be [socket.io](http://socket.io/) for
    backward compatibility between web-browsers)
