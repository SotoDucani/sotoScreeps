var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is transfering and runs out of energy
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }
    //If creep is gathering and fills it's capacity
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      //creep.say("Swap to working!");
    }
    //If creep needs to transfer energy to containers
    if (creep.memory.working == true) {
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.structureType == STRUCTURE_SPAWN;
        }
      });
      if(target) {
        //creep.say("Working!");
        creep.memory.target = target;
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else if {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER;
          }
        });
        if(target) {
          //creep.say("Working!");
          creep.memory.target = target;
          if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
    }
    //If creep needs to gather energy from a source
    else if (creep.memory.working == false) {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      //creep.say("Harvesting!");
      creep.memory.target = source;
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}
};

module.exports = roleHarvester;
