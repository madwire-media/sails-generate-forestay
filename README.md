# sails-generate-forestay

Built and tested as of SailsJS version 1.01

Build dynamic user interfaces quickly and easily! Use the `forestay` generator to scaffold complete CRUD interfaces using just your SailsJS model attributes.


![image](https://user-images.githubusercontent.com/444485/39064481-e652975c-448b-11e8-8a77-383440127a1d.png)
Note that this is an early release of this generator;

## Installation
```sh
$ npm install https://github.com/madwire-media/sails-generate-forestay.git --save
```

or

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
If you have existing models, and you'd like to use the Forestay CRUD interface with them, just add the appropriate code to your router, model and controller. Note to make sure you replace "modelname" with the name of your intended model and route, following the same capitlization convention.

##### Routes
```JavaScript
/* Append routes.js */
module.exports.routes = {
  "/modelname/*": {
    controller: "modelname",
    action: "forestay",
    forestay:{
      model:"Modelname",
    }
  },
};
```
##### Controller
```JavaScript
/* Create your controller action */
module.exports = {
  forestay:require("sails-generate-forestay").forestay.router
}
```

##### Model
```JavaScript
/* Musician.js - example forestay model */
module.exports = {
  forestay:{
    index: {
      showId:true,
      showCreatedAt:true,
      showUpdatedAt:true,
      footerHtml:"<p style='font-size: 8px'>Copyright (c) 2020</p>"
    },
    createUpdate:{
      labelWidth: 200
    },
    title: "Musician's Database",
    urlPrefix :"/modelname/",
  },
  attributes: {

    // basic strings
    name:{
      type:"string",
      required: true
    },

    // Enum stirngs will result in a <select> list of items.
    instrumentType:{
      type:"string",
      enum: ["acoustic","electric"],  // allowed values
      meta:{
        forestay: {
             label: "Instrument Type" // User friendly display label
         }

      }
    },

    // boolean types will display as a <select> list of true/false
    touring:"boolean"

    // Collections are used for multiple associations, one-to-many (model-to-collection) many-to-many (collection-to-collection)
    instruments:{
      collection:"instrument",
      via: "musician",
      meta: {
        forestay:{
          populateBy: "name"
        }
      }
    },

    // Models are used for single association, one-to-one (model-to-model) or one-to-many (model-to-collection)
    style:{
      model:"styles"
      meta: {
        forestay: {
          populateByle: "styleName"
        }
      }
    }    
  }

```
### Attribute Features
- `string` - Text inputs
- `number` - Integers though input `number` attribute
- `boolean` - truthy/falsey represented by HTML select
- `collection` - association of many records
- `model` - association of a single record

### Attribute Property Features
- `required` - Suppored by `required` input attribute
- `enum` will show as a `<select>` list

### Attribute meta features
- `model.attributes.meta.hideInIndex === true` Hide this field in the forestay index
- `model.attributes.meta.hideInForm === true` Hide this field in all forms (may cause problems if the field is required!)

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

The [Sails framework](https://sailsjs.com) is free and open-source under the [MIT License](https://sailsjs.com/license).


![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
