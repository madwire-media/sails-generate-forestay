# sails-generate-forestay

Built and tested as of SailsJS version 1.01

Build dynamic user interfaces quickly and easily! Use the `forestay` generator to scaffold complete CRUD interfaces using just your SailsJS model attributes.


![image](https://user-images.githubusercontent.com/444485/39064481-e652975c-448b-11e8-8a77-383440127a1d.png)
Note that this is an early release of this generator;

## Notes
- forestay requires jquery and bootstrap.  Our default layout uses a CDN for these, so if you want to replace the layout, you'll want to add those.
- You can use Forestay on existing controllers and models, using the existing structure.  In your controller, just reference your actions to the Forestay module:

## Installation
```sh
$ npm install https://github.com/madwire-media/sails-generate-forestay.git --save
```

or

```sh
$ npm install sails-generate-forestay --save
```

Then merge the following into your `.sailsrc` file. :

```json
{
  "modules": {
    "forestay": "sails-generate-forestay"
  }
}
```
In some cases, sailsjs may automatically insert this in.


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
/* Merge this code into your model */
module.exports = {
  forestay:{
    index: {
      itemsPerPage: 10,
      showId:true,
      showCreatedAt:true,
      showUpdatedAt:true,
      beforeRender: function(forestay, next){
        /*...*/
        return next();
      },
      footerHtml:"<p style='font-size: 8px'>Note that these CRUD scaffolds are really meant only for administration purposes, and not for public users to use. Use at your own risk</p>"
    },
    createUpdate:{
      labelWidth: 200
    },
    title: "Forestay Model",
    onSaveLoadIndex : false,
    urlPrefix :"/modelname/",
  },
  attributes: {
    /* ... */

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

- JSON, ref attributes
- date type UI
- defaultsTo on create/update template
- index beforeRender callback
- Model Validation
- Dynamic Actions (Buttons)
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
