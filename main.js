//Module to control the selection of perks
var perkChooser = function() {
  //Get four perk objects at random
  var chooseRandomFourObjects = function(perkObjectArray) {
    var randomPerkIndexes = [];
    for (var i = 0; i < 4; i++) {
      var randomSurvivorPerkIndex = Math.floor(Math.random() * perkObjectArray.length);
      // I need to implement a no-repeat condition.
      randomPerkIndexes.push(randomSurvivorPerkIndex);
    }
    if (checkForDuplicatePerks(randomPerkIndexes)) {
      console.log("I found a duplicate!");
      randomPerkIndexes = []
      $('.results-display').html("Oops. There was a duplicate and I haven't figured out how to fix that. Please try again :)")
    }
    //I want to make a new array using the 4 chosen indexes
    var randomPerkObjectsArray = [];
    for (var i = 0; i < 4; i++) {
      randomPerkObjectsArray.push(perkObjectArray[randomPerkIndexes[i]])
    }
    var randomPerkArrayInObject = {
      perks: randomPerkObjectsArray
    }
    return randomPerkArrayInObject
  };

  var checkForDuplicatePerks = function(perkArray) {
    var sortedPerkArray = perkArray.sort(function(a, b) {
      return a - b
    });
    for (var i = 0; i < sortedPerkArray.length - 1; i++) {
      if (sortedPerkArray[i] === sortedPerkArray[i + 1]) {
        return true
      }
    }
    return false;
  };

  var displayResults = function(dataObject) {
    var source = $('#perk-display-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(dataObject);
    $('.results-display').append(newHTML);
  };


//I am trying to filter the main array into an array without the specified properties
var perkFilterFunction = function(allPerkArray,curtainCall,shatteredBloodline,halloween,jigsaw){
  var filteredPerks = [];
  curtainCall == 'true'? curtainCall = 'curtainCall' : curtainCall = false;
  shatteredBloodline == 'true'? shatteredBloodline = "shatteredBloodline" : shatteredBloodline = false;
  halloween == 'true'? halloween = "halloween" : halloween = false;
  jigsaw == 'true'? jigsaw = 'jigsaw' : jigsaw = false;
  filteredPerks = allPerkArray.filter(function(perkObjects){
    //for each one, I want to ask: does it have a desired property

    return (perkObjects.dlc == curtainCall || perkObjects.dlc == shatteredBloodline || perkObjects.dlc == halloween || perkObjects.dlc == jigsaw || perkObjects.dlc == 'baseGame')
  })

  return filteredPerks;
}

  return {
    chooseRandomFourObjects:chooseRandomFourObjects,
    displayResults:displayResults,
    perkFilterFunction:perkFilterFunction
  };

}
//I want to choose 4 perks at random from the master array, and populate the HTML with the information from the randomly chosen perks
$(document).ready(function() {
  $('#perks-4').on('click', function() {
    $('.results-display').empty();
    var $curtainCallDlc = $('#curtainCall').attr('value');
    var $shatteredBloodlineDlc = $('#shatteredBloodline').attr('value');
    var $halloweenDlc = $('#halloween').attr('value');
    var $jigsawDlc = $('#jigsaw').attr('value');
    var perks = perkChooser()
    // var filteredSurvivorPerks = perks.perkFilterFunction(allSurvivorPerks,$curtainCallDlc,$shatteredBloodlineDlc,$halloweenDlc,$jigsawDlc);
      var filteredSurvivorPerks = perks.perkFilterFunction(allSurvivorPerks,$curtainCallDlc,$shatteredBloodlineDlc,$halloweenDlc,$jigsawDlc);
    var randomResultsObject = perks.chooseRandomFourObjects(filteredSurvivorPerks);
    perks.displayResults(randomResultsObject)
  });
  $('#perks-3').on('click', function() {
    $('.results-display').empty();
    var $curtainCallDlc = $('#curtainCall').attr('value');
    var $shatteredBloodlineDlc = $('#shatteredBloodline').attr('value');
    var $halloweenDlc = $('#halloween').attr('value');
    var $jigsawDlc = $('#jigsaw').attr('value');
    var perks = perkChooser()
    // var filteredSurvivorPerks = perks.perkFilterFunction(allSurvivorPerks,$curtainCallDlc,$shatteredBloodlineDlc,$halloweenDlc,$jigsawDlc);
      var filteredSurvivorPerks = perks.perkFilterFunction(allSurvivorPerks,$curtainCallDlc,$shatteredBloodlineDlc,$halloweenDlc,$jigsawDlc);
    var randomResultsObject = perks.chooseRandomFourObjects(filteredSurvivorPerks);
    perks.displayResults(randomResultsObject);
    $('.perk-display:first-child').empty()
  });
  $('.DLC').on('click', function() {
  var $check = $(this).attr('value');
  if ($check == 'true') {
    $(this).attr('value', 'false')
  } else {
    $(this).attr('value', 'true');
  }
})
});
//
// var perkFilterFunction = function(allPerkArray,curtainCall,shatteredBloodline,halloween,jigsaw){
//   var filteredPerks = [];
//   curtainCall == 'true'? curtainCall = 'curtainCall' : curtainCall = false;
//   shatteredBloodline == 'true'? shatteredBloodline = "shatteredBloodline" : shatteredBloodline = false;
//   halloween == 'true'? halloween = "halloween" : halloween = false;
//   jigsaw == 'true'? jigsaw = 'jigsaw' : jigsaw = false;
//   filteredPerks = allPerkArray.filter(function(perkObjects){
//     //for each one, I want to ask: does it have a desired property
//
//     return (perkObjects.dlc == curtainCall || perkObjects.dlc == shatteredBloodline || perkObjects.dlc == halloween || perkObjects.dlc == jigsaw || perkObjects.dlc == 'baseGame')
//   })
//
//   return filteredPerks;
// }
