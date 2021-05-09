# Zendesk Ticket Viewer (Intern Coding Challenge)

This is a CLI-based ticket viewer app built using Zendesk Ticket API. There are 102 tickets overall and a few options for you to use the app. This Ticket Viewer can:

- connect to the Zendesk API
- request all the tickets for your account
- display them in a list
- display individual ticket details
- page through tickets when more than 25 are returned

I built this app using [MVC](https://medium.com/@ToddZebert/a-walk-through-of-a-simple-javascript-mvc-implementation-c188a69138dc) pattern which means Model-View-Controller. The MVC design pattern is about a clean cut **separation of concerns.** The idea is to make the solution intelligible and inviting. Any fellow programmer looking to make specific changes can find the right spot with ease.

### Used technologies:

- JavaScript
- Node.js
- [prompt](https://www.npmjs.com/package/prompt)
- [axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
