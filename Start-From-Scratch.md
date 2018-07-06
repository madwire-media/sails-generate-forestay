# Starting from scratch

### Install Node.JS
https://nodejs.org/en/download/

### Install sailsJS

```bash
npm install sails -g
```

### Create new app called projectmanage

```bash
sails new projectmanage
```

### Install forestay

```bash
npm install sails generate forestay
```

### Generate a new models with CRUD
```bash
sails generate forestay user
sails generate forestay usergroup
sails generate forestay project
```

Your models are located at `api/models` and can be modified with Forestay features.  

### Run your app

```bash
node app.js
```

### Navigate to localhost:1337/user/ or /project/ etc

Navigate around. You'll quickly realize that there's nothing there.

### Add attributes to models

###### Edit api/models/User.js
```javascript
name: {
    type: "string",
    required: true
  },
email: {
  type: "string",
  required: true
},
```

These attributes will now appear when you add new users when you go to `/user/create`
