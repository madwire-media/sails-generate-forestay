/**
 * Contact.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  helm:{
    index: {
      itemsPerPage: 10,
      beforeRender: function(helm, next){
        /*...*/
        return next();
      }
    },
    create:{
      onSaveLoadIndex : false,
    }

    //title: "...Example",

    //urlPrefix :"/contact/",
  },

  attributes: {
    /*
    fullName: {
      type: "string",
      required: true,
      description: "Full legal name",
      maxLength: 120,
      example: "Lisa Microwave van der Jenny",
      meta: {
        helm: {
          label: "Contact Name"
        }
      }
    }
    */
  }
};
