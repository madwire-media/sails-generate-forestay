module.exports = function getFieldsInGroups(req, res, forestay) {

  /* Form fields in group */
  var model_attributes= forestay.config.attributes
  var attributeGroups = [];
  var defaultAttributeGroups = [];
  var groupKeys = []

  if (_.get(forestay.config.forestay, ['createUpdate', 'attributeGroups']) && Object.keys(forestay.config.forestay.createUpdate.attributeGroups).length) {
    Object.keys(forestay.config.forestay.createUpdate.attributeGroups).forEach(function(attributeGroupKey,j){
    //console.log(forestay.config.forestay.createUpdate.attributeGroups[attributeGroupKey]);
    var tempArray = []
    var tempKeys = []
    Object.keys(model_attributes).forEach(function(attrKey, i){
      if(_.get(model_attributes[attrKey],['meta','forestay','attributeGroup']) && _.get(model_attributes[attrKey],['meta','forestay','attributeGroup']) == [attributeGroupKey]) {
        tempKeys.push(attrKey)
        if(groupKeys.indexOf(attrKey) == -1) {
            groupKeys.push(attrKey)
        }
      }
    });

    tempArray.push({
      group: attributeGroupKey,
      title: forestay.config.forestay.createUpdate.attributeGroups[attributeGroupKey].title,
      fields: tempKeys
    })

    attributeGroups.push(tempArray)
  })
  }
  var tempArray = []
  var noGroupKeys = []
  Object.keys(model_attributes).forEach(function(attrKey, i){
        if(groupKeys.indexOf(attrKey) == -1) {
          noGroupKeys.push(attrKey)
        }
  });
  tempArray.push({
    group: '',
    title: '',
    fields: noGroupKeys
  })
  defaultAttributeGroups.push(tempArray)

  // assigning groups
  if(attributeGroups.length > 0){
    return defaultAttributeGroups.concat(attributeGroups)
  } else {
    return defaultAttributeGroups;
  }

}
