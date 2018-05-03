# <img src="https://github.com/madwire-media/sails-generate-forestay/raw/master/templates/assets/forestay/img/logo.png" width="40"> sails-generate-forestay

Build dynamic user interfaces quickly and easily! Use the `forestay` generator to scaffold complete CRUD interfaces using just your SailsJS model attributes.

## Why?

*Data First.* Sometimes building great user interfaces requires a full understanding of how data are structured and how users interact with them. Forestay is a way to quickly build data models with a sensible, basic user interface.

*Data manipulation.* When you get your data, a lot of times you want to display it in a different way. That's why the forestay object is completely mutable throughout the request process.

> Forestay isn't meant to be your final UI.  
> It's meant to be your first UI.

Instant gratification

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






### Using forestay with existing models
[Please visit the wiki article on using existing models](https://github.com/madwire-media/sails-generate-forestay/wiki/Using-Forestay-with-existing-models)

## Demo

##### Index:

<img src="https://user-images.githubusercontent.com/444485/39219498-11545dbe-47e8-11e8-87e7-3f655e2e7fda.png" width="400">

##### Create/Update:

<img src="https://user-images.githubusercontent.com/444485/39218824-d2618770-47e3-11e8-8bf5-ae7b90819618.png" width="400">

Note that this is an early release of this generator;

##### The Setup
![2018-04-20 11_06_07](https://user-images.githubusercontent.com/444485/39064195-d8ec12ec-448a-11e8-9d7b-ead98a718039.gif)

### Features
- Model `string` - Text inputs
- Model `number` - Integers though input `number` attribute
- Model `boolean` - truthy/falsey represented by HTML select
- Model `text` - HTML Text Area
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
- `model.attributes[key].meta.forestay.hideInIndex === true` Hide this field in the forestay index
- `model.attributes[key].meta.forestay.hideInForm === true` Hide this field in all forms (may cause problems if the field is required!)
- `model.attributes[key].meta.forestay.replaceIndexHtml` - When in the index, replace with given HTML template. (TODO: Can be a EJS template!) - Warning, this will evaluate all HTML, EJS and Javascript and could be an entry to your system.  If you make this user editable, you are potentially introducing a security risk if you are not sanitizing your inputs
- `model.forestay.actions` These actions create UI buttons for your model index or individual records
- `model.forestay.index.hideAddButton` Removes the "Add" record button from index.  You can alternately create an action button to replace it.

- `model.attributes[key].meta.forestay.prefillable === true` Allow values to be prefilled from the URL query when this is set to true.  For example a query parm of `?pet=12` will prefill the `pet` field with the value of `12` on the create form.
- `model.forestay.index.beforeCreate`  - we opted to use this instead of Sails beforeCreate callback, because we have the req and res objects available.
```Javascript
  beforeCreate: function(req, res, forestay, next)
```
- `model.forestay.index.beforeRender` callback, gets fired before the index page is rendered
```javascript
beforeRender: function (req, res, forestay, next) {
  /* ... modify and return forestay .. */
  var errors
  if (errors) return next(errors)
  return next(null,forestay)
},
```
- `model.forestay.createUpdate.beforeUpdateCreateView` callback, gets fired before the create/update page is rendered.  
```javascript
beforeUpdateCreateView: function (req, res, forestay, next){
  /* ... */
  return next(null,forestay)
}
```
- Filtering via `model.attributes[key].meta.forstay.filterable` & `model.attributes[key].meta.forstay.hideFilter`
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

- `routes.js` rendered menu in Forestay layouts.  Set `forestay.hideFromMenu = true` to hide a route from the menu.  Any `GET` items will otherwise end up in here.  Also use `forestay.linkName` to specify display friendly names and `forestay.model` so forestay understands what model the router is going to use.
- `model.attributes[key].meta.forestay.updateCreateFilterBy` for Models Create Filter By - Only show models with specified property value. for example, only models related to a specific record by id
- Replace row data with `forestay.config.index.replaceIndexRowHtml`.  Note that this is rendered as actual HTML.  TODO: EJS templating
```Javascript
replaceIndexRowHtml: function (req, res, forestay, row, cb) {
  row.forestay_replace = {
    user: 'foobar'
  }
  cb(null, forestay, row);
},
```
- `beforeRoute` Before each route, call this callback
```Javascript
beforeRoute: function(req, res, forestay, next){
  console.log("cool!")
  return next(null, forestay)
},
```
- `model.forestay.index.hideEditButton` hide edit button in indexes
- `model.forestay.index.hideDeleteButton` hide delete button in indexes
- `model.forestay.index.filterLogicalOperator === "or"` set to "or" and filters will user "or" logical oporator.  Default is "and"
- `boolean` type replacement text   
```Javascript
privacy: {
  type: "boolean",
  meta: {
    forestay: {
      label:"Privacy",
      booleanLabels: {
        true: "Private",
        false: "Public"
      }
    }
  }
},
```
- `forestay.config.forestay.index.filterOverride` override filters with sailsJS filter syntax https://sailsjs.com/documentation/concepts/models-and-orm/query-language

### `config/forestay.js` Features
- `defaultLayout` - use an alternate local layout instead of the default Forestay layout
- `background` - the URL location of a background image like `/images/bg.jpg`

### TODO

- Create defaults from other routes. Use case: A user can create an item with a default reference to an existing item in another model.
- Ref attributes
- datetime & date type UI
- defaultsTo on create template
- index `beforeRender` callback
- `beforeCreate` and `beforeUpdate`
- More Validations
- Separate controller actions for Index/createView/createPost/updateView/updatePost/delete so that they can be run through policies.
- Hide record action button (used in beforeRender)
- Modal action modals
- Pagination
- `model.attributes[key].meta.forestay.mutable === false` - Field can be edited on create, but not after create.
- Associations - Additional fields to show for associative lists
- Associations - Show populateBy fields in index list.  Currently ids show for models, and nothing shows for collections
- Edit button for each association from index along with "show associated edit button" in related model
- Alternate layout per model
- `forestay.js` global configurations in config folder
- Main title/header
- isIn ==== Enum
- Menu groups for forestay layout
- index sort by and `model.attributes[key].meta.forestay.sortable`
- default sort
- Create/Update custom return route/url
- Actions should have bootstrap `.btn` class alteration.  Maybe class replacement.
- action buttons need tooltips
- ability to use images for action buttons
- CreateUpdate/Create/Update/Index - Custom HTML that goes in footers.  For scripts
- Input type="hidden"
- `model.attributes[key].meta.forestay.updateCreateFilterBy` for collections - (object) Model - Create Filter By - Only show models with specified value. for example, only models related to a specific record
- Subtitles on each page
- `model.attributes[key].meta.forestay.position` field position in index and form
- `model.attributes[key].meta.forestay.populate === true` for models and controllers, populate result in `forestay.records` object
- Are you sure? on delete

[![NPM](https://nodei.co/npm/sails-generate-forestay.png?downloads=true)](http://npmjs.com/package/sails-generate-forestay)

Built and tested as of SailsJS version 1.01

## License

This forestay generator is available under the **MIT license**.

This is a generator for the  [Sails framework](https://sailsjs.com).
