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

###### Add to `api/models/User.js`
```javascript
attributes: {
  name: {
      type: "string",
      required: true
    },
  email: {
    type: "string",
    required: true
  },
}

```

These attributes will now appear when you add new users when you go to `/user/create`

### Additional models for Proejcts and User Groups

###### Add to `api/models/Project.js`
```javascript
attributes: {
  name: {
      type: "string",
      description: "The project name",
      required: true
    },
}

```
###### Add to `api/models/Usergroup.js`
```Javascript
attributes: {
  name: {
      type: "string",
      description: "The project name",
      required: true
    },
}
```

### Let's add a one-to-many relationship between users and usergroups inside the `attributes` section of `api/models/Usergroup.js`
```javascript
userGroups: {
  model:"Usergroup",
    meta: {
      forestay: {
        populateBy: "name",  // This is the attribute value that it uses to populate your UI
        filterable: true,    // you will now be able to filter users by usergroups
        label: "User Group", // This is what label will be shown to the user
        description: "The user group this user is assigned to", // This will display as a help description on create/update
      }
    }
},
```

Now navigate to /userGroup/ and create a couple user groups like "Admin" or "Project Manager"

You can now associate users to usergroups by creating new users.
