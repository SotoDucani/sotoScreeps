var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is repairing and runs out of energy
  	if(creep.memory.repairing == true && creep.carry.energy == 0) {
      creep.memory.repairing = false;
      //creep.say("Swap to harvesting!");
  	}
    //If creep is gathering and fills it's capacity
  	else if(creep.memory.repairing == false && creep.carry.energy == creep.carryCapacity) {
  	  creep.memory.repairing = true;
  	  //creep.say("Swap to repairing!");
  	}
    //If creep needs to use energy to repair structures
  	if(creep.memory.repairing == true) {
  	  var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          for(potential in structure) {
            if ((potential.structureType == STRUCTURE_WALL || potential.structureType == STRUCTURE_RAMPART) && potential.hits < 10000) {
                return potential;
              }
            else if ((potential.structureType != STRUCTURE_WALL || potential.structureType != STRUCTURE_RAMPART) && structure.hits < (structure.hitsMax / 2)) {
              return potential;
            }
            else {
              return potential;
            }
          }
        }
      });
      if(targets.length > 0) {
        //creep.say("Repairing!");
        creep.memory.target = targets[0];
        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
    //If creep needs to gather energy
    else if (creep.memory.repairing == false) {
      var withdrawTargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE) &&
            structure.store[RESOURCE_ENERGY] > 100;
        }
      });
      //creep.say("Withdrawing energy!");
      creep.memory.target = withdrawTargets[0];
      if (creep.withdraw(withdrawTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(withdrawTargets[0]);
      }
    }
  }
}

module.exports = roleRepairer;
