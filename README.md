# <img src="https://github.com/madwire-media/sails-generate-forestay/raw/master/templates/assets/forestay/img/logo.png" width="40"> sails-generate-forestay

Built and tested as of SailsJS version 1.01

Build dynamic user interfaces quickly and easily! Use the `forestay` generator to scaffold complete CRUD interfaces using just your SailsJS model attributes.

Index:

<img src="https://user-images.githubusercontent.com/444485/39219498-11545dbe-47e8-11e8-87e7-3f655e2e7fda.png" width="400">

Create/Update:

<img src="https://user-images.githubusercontent.com/444485/39218824-d2618770-47e3-11e8-8bf5-ae7b90819618.png" width="400">

Note that this is an early release of this generator;

## Installation

```sh
$ npm install sails-generate-forestay --save
```

You may need to merge following into your `.sailsrc` file. :

```json
{
  "modules": {
    "forestay": "sails-generate-forestay"
  }
}
```

## Usage

### Creating new models
```bash
$ sails generate forestay (modelname)
```

You will then be shown the routing code to place into your `routes.js` file. This will route actions through the Forestay controllers and give you a complete CRUD interface.

![2018-04-20 11_06_07](https://user-images.githubusercontent.com/444485/39064195-d8ec12ec-448a-11e8-9d7b-ead98a718039.gif)



### Using forestay with existing models
[Please visit the wiki article on using existing models](https://github.com/madwire-media/sails-generate-forestay/wiki/Using-Forestay-with-existing-models)


### Features
- Model `string` - Text inputs
- Model `number` - Integers though input `number` attribute
- Model `boolean` - truthy/falsey represented by HTML select
- Model `enum` will show as a `<select>` list
```javascript
instrumentType: {
    type:"string",
    enum: ["stringed","woodwind","keys","electronic","brass"]
  },
```
- Association type `collection` - association of many records. Note that `populateBy` is required for the UI to know which field to use.
```javascript
musicians: {
    collection:"musician",
    via: "instruments",
    meta: {
      forestay:{
        populateBy: "name"
      }
    }
  }
```
- Association type `model` - association of a single record. `populateBy` is also required here.
```javascript
make: {
    model: 'make',
    meta:{
      forestay: {
        populateBy: "name"
      }
    }
}
```
- `model.attributes.required` - Supported by `required` input attribute
- `model.attributes.meta.hideInIndex === true` Hide this field in the forestay index
- `model.attributes.meta.hideInForm === true` Hide this field in all forms (may cause problems if the field is required!)
- `model.forestay.actions` These actions create UI buttons for your model index or individual records
```javascript
actions:{
    "/get-cpu/":{
      type:"index",
      label: "Get CPU Value"
    },
    "/instrument/play/:id":{
      type:"record",
      label: "Play Instrument"
    }
  },
```
<img src="https://user-images.githubusercontent.com/444485/39222294-33550f88-47f9-11e8-800b-c6e565184d69.png" width="500">


### `config/forestay.js` Features
- `defaultLayout` - use an alternate local layout instead of the default Forestay layout

### TODO

- JSON editor
- Wysiwyg editor
- Ref attributes
- datetime & date type UI
- defaultsTo on create template
- index beforeRender callback
- More Validations
- Separate controller actions for Index/createView/createPost/updateView/updatePost/delete so that they can be run through policies.
- Dynamic Actions (Buttons)
- Modal actions
- Pagination
- Filtering
- Associations
  - Additional fields to show for associative lists
  - Show populateBy fields in indexes.  Currently ids show for models, and nothing shows for collections
- Alternate layout per model
- `forestay.js` global configurations in config folder
  - Main title/header
  - Global Menu


[![NPM](https://nodei.co/npm/sails-generate-forestay.png?downloads=true)](http://npmjs.com/package/sails-generate-forestay)

## License

This forestay generator is available under the **MIT license**.

This is a generator for the  [Sails framework](https://sailsjs.com).
