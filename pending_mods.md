#Pending Modifications

This is a list of pending modification that should be implemented
into JALA but have not been:

###Front-end:

  - Add ('+') button needs to append a new list-item to the list.

  - Button focus ring needs to be removed or reduced.

  - Buttons need a color change on :focus as well as :hover.

  - Email button needs to be added at the bottom of the list.
    (Look below for server-side details on this)

  - List-Header needs to be stylized properly.

  - A new font (not default) needs to be implemented into
    JALA's styles.

  - It needs to be easier to click and drag list items.

###Back-end:

  - Email implementation will most likely utilize the [nodemailer](https://www.npmjs.com/package/nodemailer)
    module, allowing the user to email the list as plain-text.

  - A node web-socket interface will need to be utilized so that
    changes to the list stream-line to each user.
    (Best option might be [socket.io](http://socket.io/) for
    backward compatibility between web-browsers)
