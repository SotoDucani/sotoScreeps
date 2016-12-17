var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is building and runs out of energy
  	if(creep.memory.building == true && creep.carry.energy == 0) {
      creep.memory.building = false;
      //creep.say("Swap to harvesting!");
  	}
    //If creep is gathering and fills it's capacity
  	else if(creep.memory.building == false && creep.carry.energy == creep.carryCapacity) {
  	  creep.memory.building = true;
  	  //creep.say("Swap to building!");
  	}
    //If creep needs to use energy to build on construction sites
  	if(creep.memory.building == true) {
  	  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length > 0) {
        //creep.say("Building!");
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      //Find Ramparts under 1000
      else if(targets.length == 0) {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_RAMPART &&
              structure.hits < 1000;
          }
        });
        if (targets.length > 0) {
          if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets);
          }
        }
      }
      //Find Walls under 1000
      else if(targets.length == 0) {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_WALL &&
              structure.hits < 1000;
          }
        });
        if (targets.length > 0) {
          if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets);
          }
        }
      }
  	}
    //If creep needs to gather energy
    else if (creep.memory.building == false) {
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

module.exports = roleBuilder;
