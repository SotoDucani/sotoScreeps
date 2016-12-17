var roleMover = {
  
  /** @param {Creep} creep **/
  run: function(creep) {

    //If energy is zero, go get energy
    if(creep.memory.moving == true && creep.carry.energy == 0) {
      creep.memory.moving = false;
      //creep.say("Getting more energy!");
    }
    else if(creep.memory.moving == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.moving = true;
      //creep.say("Moving the energy");
    }

    //If Creep has energy to move
    if (creep.memory.moving == true) {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }

    //If the creep has no energy to move, get some from a container
    else if (creep.memory.moving == false) {
      var withdrawTarget = creep.pos.findClosestByPath(FIND_STRUCTURES{
        filter: function(structure) {
          return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
        }
      });
      if (withdrawTarget.length > 0) {
        if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(withdrawTarget);
        }
      }
    }
  }
}

module.exports = roleMover;
