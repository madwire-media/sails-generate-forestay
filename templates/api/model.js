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
      showId:true,
      showCreatedAt:true,
      showUpdatedAt:true,
      beforeRender: function(helm, next){
        /*...*/
        return next();
      },
      footerHtml:"<p style='font-size: 8px'>Note that these CRUD scaffolds are really meant only for administration purposes, and not for public users to use. Use at your own risk</p>"
    },
    createUpdate:{
      labelWidth: 200
    },
    title: "Contacts",
    onSaveLoadIndex : false,
    urlPrefix :"/contact/",
  },
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    fullName: {

      type: 'string',
      required: true,
      description: 'Full legal name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny',
      meta: {
        helm:{
          label: "Contact Name",

        }

      }
    },
    address1:{
      type: 'string',
      //required: true,
      description: 'The address for this contact',
      maxLength: 120,
      example: '123 Main Street'
    },
    address2:{
      type: 'string',
      //required: false,
      description: 'The address for this contact',
      maxLength: 120,
      example: '123 Main Street'
    },
    city:{
      type: 'string',
      //required: true,
      description: 'The address for this contact',
      maxLength: 120,
      example: '123 Main Street'
    },
    state:{
      type: 'string',
    //  required: true,

      maxLength: 2,
      example: 'Colorado'
    },
    zip:{
      type: 'string',
      //required: true,
      maxLength: 120,
      example: '80528'
    },
    age:{
      type:'integer',
      //required: true,
      description: "the age of this contact",
      example: 24,
    },
    occupation:{
      type: "string"
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
