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
        var containerArray = creep.room.find(FIND_MY_STRUCTURES, {
          filter: {structureType: STRUCTURE_CONTAINER}
        });
        var container;
        for (container in containerArray) {
          if (container.energy < container.energyCapacity) {
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            }
          }
        }
        if (containerTarget[0].energy < containerTarget[0].energyCapacity) {
          if (creep.transfer(containerTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerTarget);
          }
        }
      }
      else if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
