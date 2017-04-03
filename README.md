## React crud
Simple application showing react in action.

App uses express for dev-server, webpack and babel for building and transpiling.

Awesome library [mobx](https://github.com/mobxjs/mobx) is used for data-flow control.

### Directories
- Application client entrypoint is **./src/app.js**
- Generic components are place in **./src/components/common**
and application-specific (business-logic) components are in **./src/components/ProfileApp**
- Data-specific things are located in **./src/stores**. There is a **ProfilesStore**
and generic **FormStore**
- Static helpers are in **./src/util**

### How to run

npm i

npm start

open [http://localhost:3000](http://localhost:3000) in your browser