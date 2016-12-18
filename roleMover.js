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
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets);
        }
      }
      //Can't find targets, but have energy
      else {
        creep.memory.target = Game.flags.Movers;
        creep.moveTo(Game.flags.Movers);
      }
    }

    //If the creep has no energy to move, get some from a container if there is a need
    else if (creep.memory.moving == false) {
      var withdrawTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
          return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
        }
      });
      if (withdrawTarget) {
        if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(withdrawTarget);
        }
      }
      else {
        creep.memory.target = Game.flags.Movers;
        creep.moveTo(Game.flags.Movers);
      }
    }
  }
}

module.exports = roleMover;
