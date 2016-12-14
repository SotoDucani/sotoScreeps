var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
      }
    });

	  if(creep.carry.energy < creep.carryCapacity) {
      creep.memory.working = true;
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }

    else if (creep.carry.energy == creep.carryCapacity && targets.length > 0) {
      creep.memory.working = true;
      if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    }

    else {
      creep.memory.working = false;
      targetSpawn = creep.room.find(FIND_STRUCTURES, {
        filter: (strucure) => {
          return (structure.structureType == STRUCTURE_SPAWN);
        }
      });
      if (targetSpawn.length > 0) {
        creep.moveTo(targetSpawn[0]);
      }
    }
	}
};

module.exports = roleHarvester;
