// Setup
{
  // Vars
  var prestigeLvl = 1;
  var cd = 0;
  var moneyz = 0;
  var calcUpgradesVal = [0];
  var calcAbilitiesVal = [1, 1, 1, 1, 1, 1, 1, 1];
  var clickVal = 1;
  // var mains = [mainUpgrades, mainSetting, mainPrestiges, mainAbility];
  var mainUpgrades = ["mainUpgrade", "abilities","prestige", "upgrade0"];
  var mainSetting = ["mainSettings", "setting0"];
  var mainPrestiges = ["mainPrestige", "prestigeLvlText", "prestigePrestige", "prestigeDisclaimer"];
  var mainAbility = ["mainAbilities", "abilities7", "abilities6", "abilities5", "abilities4", "abilities3", "abilities2", "abilities1", "abilities0"];
  var unlockAbilities = ["unlockAbility7", "unlockAbility6", "unlockAbility5", "unlockAbility4", "unlockAbility3", "unlockAbility2", "unlockAbility1", "unlockAbility0"];
  var currentUpgradeCost = [100];
  var pics = ["https://studio.code.org/blockly/media/skins/bee/static_avatar.png", "https://livforcake.com/wp-content/uploads/2019/06/oreo-cake-4.jpg","https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg?crop=0.670xw:1.00xh;0.147xw,0&resize=980:*","https://studio.code.org/blockly/media/skins/applab/static_avatar.png"];
  var currentAbilitiesCost = [10, 50, 100, 500, 1000, 5000, 10000, 50000];
  var currentPrestigeCost = 10000;
  var currentPic = 0;
  // Special
  var i = 0;
}
// Called f(x)
{
  // Win Screen
  function win () {
    setScreen("win");
    playSound("assets/default.mp3", false);
  }
  //Round
  function round(x, digits) {
    return Number.parseFloat(x).toFixed(digits);
    
  }
  //Find next value in Geometric Sequence
  function nextGeoVal (currentVal, multiplier, roundDigits, iterations) {
    var i = 0;
    if (isNaN(iterations)) {iterations = 1}
    for(i; i < iterations; i++) {currentVal *= multiplier}
    if(!isNaN(roundDigits)) {currentVal = round(currentVal, roundDigits)}
    return currentVal;
    
  }
  // Calculates value of click
  function calcClick(calcUpgrades, clickVal, calcAbilities, prestigeLvl) {
    var i = 0;
    clickVal *= prestigeLvl;
    for (i; i < calcAbilities.length; i++) {
      clickVal *= calcAbilities[i];
    }
    i = 0;
    for (i; i < calcUpgrades.length; i++) {
      clickVal += calcUpgrades[i];
    }
    return clickVal;
    
  }
}
//Interact
{
  //Unique
  {
    // Change Pic
    onEvent("clickAreaPic", "click", function() {
      i += 1;
      if(i == 4) {
        i = 0;
        setImageURL("clickAreaPic", pics[currentPic]);
        if(currentPic + 1  == pics.length) {
          currentPic = 0;
        } else {
          currentPic += 1;
        i = 0;
        }
      }

    });
    // Selects upgrades
    onEvent("upgrade", "click", function( ) {
    	console.log("Upgrade selected");
    	var i = 0;
    	for(i; i < mainUpgrades.length; i++){
    	  showElement(mainUpgrades[i]);
    	}
    	i = 0;
    	for(i; i < mainSetting.length; i++){
    	  hideElement(mainSetting[i]);
    	}
    	i = 0; 
    	for(i; i < mainPrestiges.length; i++) {
    	  hideElement(mainPrestiges[i]);
    	}
    	i = 0;
    	for(i; i < mainAbility.length; i++) {
    	  hideElement(mainAbility[i]);
    	}
    	i = 0;
    	for(i; i < unlockAbilities.length; i++) {
    	  hideElement(unlockAbilities[i]);
    	}
    	setProperty("settings", "background-color", rgb(200,200,200,1));
    	setProperty("upgrade", "background-color", rgb(255,164,0,1));
    	
    });
    // Selects settings
    /*
    onEvent("settings", "click", function( ) {
    	console.log("Setting selected");
    	var i = 0;
    	for(i; i < mainUpgrades.length; i++){
    	  hideElement(mainUpgrades[i]);
    	}
    	i= 0;
    	for(i; i < mainSetting.length; i++){
    	  showElement(mainSetting[i]);
    	}
    	i = 0; 
    	for(i; i < mainPrestiges.length; i++) {
    	  hideElement(mainPrestiges[i]);
    	}
    	i = 0;
    	for(i; i < mainAbility.length; i++) {
    	  hideElement(mainAbility[i]);
    	}
    	i = 0;
    	for(i; i < unlockAbilities.length; i++) {
    	  hideElement(unlockAbilities[i]);
    	}
    	setProperty("upgrade", "background-color", rgb(200,200,200,1));
    	setProperty("settings", "background-color", rgb(255,164,0,1));
    	
    });
    */
    // Clicks, earning moneyz
    onEvent("clickAreaPic", "click", function( ) {
    	console.log("Clicked!");
    	var moneyzAdded = calcClick(calcUpgradesVal, clickVal, calcAbilitiesVal, prestigeLvl);
    	moneyz += moneyzAdded;
    	if(moneyz >= 1000000){win()}
    	setProperty("moneyz", "value", "$" + round(moneyz, 2));
    	
    });
    // Scroll
    onEvent("scrollBar", "input", function( ) {
      var scrollBarNum = getNumber("scrollBar");
      // setProperty("scrollBarText", "text", scrollBarNum);
      var i = 0;
      if(getProperty("mainUpgrade", "hidden") === false){
    	  for(i; i < mainUpgrades.length; i++) {
          setProperty(mainUpgrades[i], "y", scrollBarNum + 45* (i-1));
    	  }
    	} else if(getProperty("mainSettings", "hidden") === false) {
    	  for(i; i < mainSetting.length; i++) {
    	    setProperty(mainSetting[i], "y", scrollBarNum + 45 * (i-1));
    	  }
    	} else if(getProperty("mainAbilities", "hidden") === false) {
    	  for(i; i < mainAbility.length; i++) {
    	    setProperty(mainAbility[i], "y", scrollBarNum - 420 - 45 * (i-1));
    	  }
    	  i = 0;
    	  for(i; i < unlockAbilities.length; i++) {
    	    setProperty(unlockAbilities[i], "y", scrollBarNum - 450 - 45 * (i-1));
    	  }
    	} /*else if(getProperty("mainPrestige", "hidden") === false) {
    	  for(i; i < mainPrestiges.length; i++) {
    	    setProperty(mainPrestiges[i], "y", scrollBarNum) + 45 * (i-1);
    	  }
    	}
    	*/
    	
    });
    onEvent("prestige", "click", function( ) {
	    console.log("Prestige clicked");
	    var i = 0;
    	for(i; i < mainUpgrades.length; i++){
    	  hideElement(mainUpgrades[i]);
    	}
    	i = 0;
    	for(i; i < mainSetting.length; i++){
    	  hideElement(mainSetting[i]);
    	}
    	i = 0; 
    	for(i; i < mainPrestiges.length; i++) {
    	  showElement(mainPrestiges[i]);
    	}
    	i = 0;
    	for(i; i < mainAbility.length; i++) {
    	  hideElement(mainAbility[i]);
    	}
    	i = 0;
    	for(i; i < unlockAbilities.length; i++) {
    	  hideElement(unlockAbilities[i]);
    	}
    	setProperty("upgrade", "background-color", rgb(200,200,200, 1));
    	setProperty("settings", "background-color", rgb(200,200,200, 1));
    	
    });
    onEvent("prestigePrestige", "click", function( ) {
	    if(moneyz >= currentPrestigeCost) {
	      moneyz -=currentPrestigeCost;
	      setProperty("moneyz", "value", "$" + round(moneyz, 2));
	      prestigeLvl += 1;
	      var displayPrestige = prestigeLvl - 1;
	      console.log("Prestiged to lvl. " + displayPrestige + " !");
	      setProperty("prestigeLvlText", "text", "Prestige Lvl.: " + displayPrestige);
	      currentPrestigeCost = nextGeoVal(currentPrestigeCost, 10, 0);
	      setProperty("prestigePrestige", "text", "Prestige - $" + currentPrestigeCost);
	    } else { console.log("Not enough moneyz!")}
	    
    });
    onEvent("abilities", "click", function( ) {
	    console.log("Abilities clicked");
	    var i = 0;
	    for(i; i < mainUpgrades.length; i++){
    	  hideElement(mainUpgrades[i]);
    	}
    	i = 0;
    	for(i; i < mainSetting.length; i++){
    	  hideElement(mainSetting[i]);
    	}
    	i = 0; 
    	for(i; i < mainPrestiges.length; i++) {
    	  hideElement(mainPrestiges[i]);
    	}
    	i = 0;
    	for(i; i < mainAbility.length; i++) {
    	  showElement(mainAbility[i]);
    	}
    	i = 0;
    	for(i; i < unlockAbilities.length; i++) {
    	  hideElement(unlockAbilities[i]);
    	}
    	setProperty("upgrade", "background-color", rgb(200,200,200, 1));
    	setProperty("settings", "background-color", rgb(200,200,200, 1));
    	setProperty("scrollBar", "value", 1000);
    	
    });
  }
  //Repetitions
  {
    // Click on "ability"s
    {
      onEvent("ability0", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 1 activated!");
        		calcAbilitiesVal[0] = 2;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 1 over!");
        	  calcAbilitiesVal[0] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 80000);
        }
      	
      });
      onEvent("ability1", "click", function( ) {
        if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 2 activated!");
        		calcAbilitiesVal[1] = 5;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 2 over!");
        	  calcAbilitiesVal[1] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 80000);
        }
        
      });
      onEvent("ability2", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 3 activated!");
        		calcAbilitiesVal[2] = 10;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 3 over!");
        	  calcAbilitiesVal[2] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
      onEvent("ability3", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 4 activated!");
        		calcAbilitiesVal[3] = 15;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 4 over!");
        	  calcAbilitiesVal[3] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
      onEvent("ability4", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 5 activated!");
        		calcAbilitiesVal[4] = 20;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 5 over!");
        	  calcAbilitiesVal[4] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
      onEvent("ability5", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 6 activated!");
        		calcAbilitiesVal[5] = 25;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 6 over!");
        	  calcAbilitiesVal[5] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
      onEvent("ability6", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 7 activated!");
        		calcAbilitiesVal[6] = 30;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 7 over!");
        	  calcAbilitiesVal[6] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
      onEvent("ability7", "click", function( ) {
      	if(cd){ console.log("Cooldown!");
        } else if(!cd){
        	console.log("Ability 8 activated!");
        		calcAbilitiesVal[7] = 35;
        	cd = 1;
        	setTimeout(function() {
        	  console.log("Ability 8 over!");
        	  calcAbilitiesVal[7] = 1;
        	}, 10000);
        	setTimeout(function() {
        	  cd = 0;
        	}, 60000);
        }
      	
      });
    }
    // Click on abilities
    {
      onEvent("abilities0", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[0]) {
          console.log("Ability 1 unlocked!");
          moneyz -= currentAbilitiesCost[0];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility0");
          hideElement("abilities0");
          showElement("unlockAbility0");
        }
        
      });
      onEvent("abilities1", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[1]) {
          console.log("Ability 2 unlocked!");
          moneyz -= currentAbilitiesCost[1];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility1");
          hideElement("abilities1");
          showElement("unlockAbility1");
        }
        
      });
      onEvent("abilities2", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[2]) {
          console.log("Ability 3 unlocked!");
          moneyz -= currentAbilitiesCost[2];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility2");
          hideElement("abilities2");
          showElement("unlockAbility2");
        }
        
      });
      onEvent("abilities3", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[3]) {
          console.log("Ability 4 unlocked!");
          moneyz -= currentAbilitiesCost[3];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility3");
          hideElement("abilities3");
          showElement("unlockAbility3");
        }
        
      });
      onEvent("abilities4", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[4]) {
          console.log("Ability 5 unlocked!");
          moneyz -= currentAbilitiesCost[4];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility4");
          hideElement("abilities4");
          showElement("unlockAbility4");
        }
        
      });
      onEvent("abilities5", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[5]) {
          console.log("Ability 6 unlocked!");
          moneyz -= currentAbilitiesCost[5];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility5");
          hideElement("abilities5");
          showElement("unlockAbility5");
        }
        
      });
      onEvent("abilities6", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[6]) {
          console.log("Ability 7 unlocked!");
          moneyz -= currentAbilitiesCost[6];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility6");
          hideElement("abilities6");
          showElement("unlockAbility6");
        }
        
      });
      onEvent("abilities7", "click", function( ) {
        if(moneyz >= currentAbilitiesCost[7]) {
          console.log("Ability 8 unlocked!");
          moneyz -= currentAbilitiesCost[7];
          setProperty("moneyz", "value", "$" + round(moneyz, 2));
          hideElement("lockAbility7");
          hideElement("abilities7");
          showElement("unlockAbility7");
        }
        
      });
    }
    // Click on upgrades
    {
      onEvent("upgrade0", "click", function( ) {
      	if(moneyz >= currentUpgradeCost[0]) {
      	  console.log("Upgrade 1, Level 1 successfully acquired!");
      	  moneyz -= currentUpgradeCost[0];
      	  setProperty("moneyz", "value", "$" + round(moneyz, 2));
      	  calcUpgradesVal[0] += 2;
      	  setProperty("upgrade0", "text", "$" + nextGeoVal(currentUpgradeCost[0], 1.5, 2) + ", +2");
      	  currentUpgradeCost [0] = nextGeoVal(currentUpgradeCost[0], 1.5, 2);
      	} else {console.log("Not enough moneyz!")}
      	
      });
    }
  }
}