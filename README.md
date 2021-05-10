# Zendesk Ticket Viewer (Intern Coding Challenge)

This is a CLI-based ticket viewer app built using Zendesk Ticket API. There are 102 tickets overall and a few options for you to use the app. This Ticket Viewer can:

- connect to the Zendesk API
- request all the tickets for your account
- display them in a list
- display individual ticket details
- page through tickets when more than 25 are returned

I built this app using [MVC](https://medium.com/@ToddZebert/a-walk-through-of-a-simple-javascript-mvc-implementation-c188a69138dc) pattern which means Model-View-Controller. The MVC is about a clean cut **separation of concerns.** It’s a design pattern that breaks an application into three parts: the data (Model), the presentation of that data to the user (View), and the actions taken on any user interaction (Controller). In other words, a user gives a command. That command is passed to a Controller that controls what should happen next. Often, the Controller requests data from the Model and then gives it to the View, which presents it to the user.

In my code, `api.js` file represents the **Model**. There are 2 functions inside the file which request both all tickets data and a single ticket data from Zendesk server using Zendesk Ticket API. So this file collects data and that's it!

Moreover, all the **View** files are created inside the `view` folder. View files are responsible for delivering a specific message or data according to the command users give to the controller.

Finally, there is a `controller.js` file in the project. As I mentioned above it stands between Model and View and navigates view files taking the required data from the Model.

### Used technologies:

- JavaScript
- Node.js v12.18.0
- yarn 1.22.10


## Installation

## Usage

1. Type `yarn start` in your terminal to start the project. You must be in the same directory that the project is created at.
