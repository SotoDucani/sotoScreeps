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
    //If creep needs to transfer energy to spawn
    if (creep.memory.working == true) {
      //creep.say("Working!");
      if (Game.spawns.Spawn1.energy == Game.spawns.Spawn1.energyCapacity) {
        var containerTarget = creep.pos.findClosestByPath(Game.structures, {
          filter: function (structure) {
            return structure.structureType == 'STRUCTURE_CONTAINER' && structure.energy < structure.energyCapacity;
          }
        });
        if (creep.transfer(containerTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containerTarget);
        }
      }
      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1);
      }
    }
    //If creep needs to gather energy from a source
    else if (creep.memory.working == false) {
      //creep.say("Harvesting!");
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}
};

module.exports = roleHarvester;
