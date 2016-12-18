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
  	  var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if(target) {
        //creep.say("Building!");
        creep.memory.target = target;
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      //Find Ramparts under 2000 hits
      else if(!target) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_RAMPART &&
              structure.hits < 5000;
          }
        });
        if (target) {
          //creep.say("Repairing Ramparts");
          creep.memory.target = target;
          if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
      //Find Walls under 2000 hits
      else if(!target) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_WALL &&
              structure.hits < 5000;
          }
        });
        if (target) {
          //creep.say("Repairing Walls");
          creep.memory.target = target;
          if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
      else {
        creep.memory.target = Game.flags.Builders;
        creep.moveTo(Game.flags.Builders);
      }
  	}
    //If creep needs to gather energy
    else if (creep.memory.building == false) {
      var withdrawTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 100;
        }
      });
      //creep.say("Withdrawing energy!");
      creep.memory.target = withdrawTarget;
      if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(withdrawTarget);
      }
      else {
        creep.memory.target = Game.flags.Builders;
        creep.moveTo(Game.flags.Builders);
      }
    }
	}
};

module.exports = roleBuilder;
