//Module to control the selection of perks
var perkChooser = function() {
  //Select DLC status, and keep track based on the controller buttons
  var DLCs = {
    curtainCall: false,
    shatteredBloodline: false,
    jigsaw: false,
    halloween: false
  };

  var preferredPerks = [];

  var DLCToggleFunction = function(clickedDLC) {
    DLCs[clickedDLC] = !DLCs[clickedDLC]
  }
  //find the Perk index of the given perk
  var findPerkIndexAndAdd = function(perkNameString, perkArray) {
    verifyPreferredPerkLength();
    var perkIndex = perkArray.findIndex(function(elementInArray) {
      return elementInArray.name == perkNameString;
    });
    preferredPerks.push(perkArray[perkIndex]);
  };

  var verifyPreferredPerkLength = function() {
    if (preferredPerks.length === 4) {
      preferredPerks.shift();
    }
  }

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

      // randomPerkIndexes = []
      // $('.results-display').html("Oops. There was a duplicate and I haven't figured out how to fix that. Please try again :)")
    }
    //I want to make a new array using the 4 chosen indexes
    var randomPerkObjectsArray = [];
    for (var i = 0; i < 4; i++) {
      randomPerkObjectsArray.push(perkObjectArray[randomPerkIndexes[i]])
    };

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
        sortedPerkArray[i] = sortedPerkArray[i] + 1;
        return true
      }
    }
    return false;
  };


  var perkFilterFunctionV2 = function() {
    var includedDLCPerks = [];
    if (DLCs['curtainCall']) {
      includedDLCPerks.push(DLCfinderFunction('curtainCall'));
    };
    if (DLCs['halloween']) {
      includedDLCPerks.push(DLCfinderFunction('halloween'));
    };
    if (DLCs['jigsaw']) {
      includedDLCPerks.push(DLCfinderFunction('jigsaw'));
    };
    if (DLCs['shatteredBloodline']) {
      includedDLCPerks.push(DLCfinderFunction('shatteredBloodline'));
    };
    includedDLCPerks.push(DLCfinderFunction('baseGame'))
    // now I need to put them all into an array and then push them inot the master one that gets put out
    var finalPerkPool = [];
    for (var i = 0; i < includedDLCPerks.length; i++) {
      for (var j = 0; j < includedDLCPerks[i].length; j++) {
        finalPerkPool.push(includedDLCPerks[i][j]);
      };
    };
    return finalPerkPool;
  };

  var DLCfinderFunction = function(DLCString) {
    var thisDLC = [];
    thisDLC = allSurvivorPerks.filter(function(perkObjectsForDLC) {
      return (perkObjectsForDLC.dlc == DLCString);
    });
    return thisDLC;
  };


  var finalFunction = function() {
    var filteredSurvivorPerks = perkFilterFunctionV2();
    var randomFourPerks = chooseRandomFourObjects(filteredSurvivorPerks);
    return randomFourPerks;

  };

  return {
    DLCs: DLCs,
    finalFunction: finalFunction,
    DLCToggleFunction: DLCToggleFunction,
    findPerkIndexAndAdd: findPerkIndexAndAdd,
    preferredPerks: preferredPerks
  };

};

var View = function() {

  var displayResults = function(dataObject) {
    var source = $('#perk-display-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(dataObject);
    $('.results-display').append(newHTML);
  };
  var displayPerkChoiceIcons = function(perkObjectsArray) {
    perkObjectsArray.forEach(function(perkObjects) {
      var source = $('#perk-choice-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(perkObjects);
      $('.choice-controller').append(newHTML)
    })
  };

  return {
    displayResults: displayResults,
    displayPerkChoiceIcons: displayPerkChoiceIcons
  }
}

//I want to choose 4 perks at random from the master array, and populate the HTML with the information from the randomly chosen perks
$(document).ready(function() {
  $('#perks-4').on('click', function() {
    $('.results-display').empty();
    var results = perks.finalFunction();
    perkView.displayResults(results);
    var choices = {};
    console.log(perks.preferredPerks)

    if (perks.preferredPerks.length > 0) {
      for (var i = 0; i < perks.preferredPerks.length; i++) {
        $('.perk-display:first-child').remove()
      }
      choices['perks'] = perks.preferredPerks;
      perkView.displayResults(choices)
    }
  })

  // $('#perks-3').on('click', function() {
  //   $('.results-display').empty();
  //   var perks = perkChooser();
  //   perks.finalFunction()
  //   $('.perk-display:first-child').empty()
  //
  // });
  //controllers to set the DLC preferences

  $('#clear-choices').on('click', function() {
    perks.preferredPerks.length = 0;
    $('.results-display').empty();
    $(document).find('.selected').removeClass('selected');

  })

  $('.DLC').on('click', function() {
    //Toggles DLC status in model
    perks.DLCToggleFunction($(this).attr('id'))
  });
  $(document).on('click', '.perk-choice', function() {
    // $('.results-display').empty();
    var perkNameString = $(this).find('p').html();
    perks.findPerkIndexAndAdd(perkNameString, allSurvivorPerks);
    $(this).find('.icon-perk-choice').toggleClass('selected')

  });
});

perks = perkChooser();
var perkView = View();
perkView.displayPerkChoiceIcons(allSurvivorPerks)
