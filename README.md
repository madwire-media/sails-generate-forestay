# sails-generate-forestay

A `forestay` generator for use with the Sails command-line interface.


## Notes
- forestay requires jquery and bootstrap.  Our default layout uses a CDN for these, so if you want to replace the layout, you'll want to add those.
- You can use Forestay on existing controllers and models, using the existing structure.  In your controller, just reference your actions to the Forestay module:
```JavaScript
module.exports = {
  forestay:require("sails-generate-forestay").forestay.router
}
```
### models
configuration:
```JavaScript
forestay:{
  items_per_page: 10,
},
```

otherwise you can configure your models as normal



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

You will then be given shown the routing code to place into your `routes.js` file. This will route actions through the Forestay controllers and give you a complete CRUD interface.

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

[![NPM](https://nodei.co/npm/@david/sails-generate-forestay.png?downloads=true)](http://npmjs.com/package/@david/sails-generate-forestay)



## License

This forestay generator is available under the **MIT license**.

The [Sails framework](https://sailsjs.com) is free and open-source under the [MIT License](https://sailsjs.com/license).


![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
