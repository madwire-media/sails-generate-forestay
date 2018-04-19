/**
 * Contact.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
    title: "Forestay <%= upperForestay %>",
    onSaveLoadIndex : false,
    urlPrefix :"/<%= lowerForestay %>/",
  },
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    // example
    // fullName: {
    //
    //   type: 'string',
    //   required: true,
    //   description: 'Full legal name',
    //   maxLength: 120,
    //   example: 'Lisa Microwave van der Jenny',
    //   meta: {
    //     forestay:{
    //       label: "Contact Name",
    //
    //     }
    //
    //   }
    // },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
