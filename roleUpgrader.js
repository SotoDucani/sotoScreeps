var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is upgrading and runs out of energy
    if(creep.memory.upgrading == true && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      //creep.say("Swap to harvesting!");
	  }
    //If creep is gathering and fills it's capacity
	  else if(creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
	    creep.memory.upgrading = true;
      //creep.say("Swap to upgrading!");
	  }
    //If creep needs to use energy to upgrade the controller
	  if(creep.memory.upgrading == true) {
      //creep.say("Upgrading!");
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    //If creep needs to gather energy
    else if (creep.memory.upgrading == false) {
      //creep.say("Withdrawing energy!");
      var withdrawTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 100;
        }
      });
      if (creep.withdraw(withdrawTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(withdrawTargets[0]);
      }
    }
	}
};

module.exports = roleUpgrader;
