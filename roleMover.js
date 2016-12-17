var roleMover = {
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
      var target = null;
      //Look for spawns that need energy
      if(!target) {
        var spawnTarget = creep.pos.findClosestByPath(Game.spawns, {
          filter: function (spawner) {
            return spawner.energy < spawner.energyCapacity;
          }
        });
        if (spawnTarget) {
          target = spawnTarget;
        }
      }
      //Look for extensions that need energy
      else if(!target) {
        var expanderTarget = creep.pos.findClosestByPath(Game.structures, {
          filter: function(structure) {
            return structure.structureType == 'STRUCTURE_EXTENSION' && structure.energy < structure.energyCapacity;
          }
        });
        if (expanderTarget) {
          target = expanderTarget;
        }
      }
      //If you have a target
      if(target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }

    //If the creep has no energy to move, get some from a container
    else if (creep.memory.moving == false) {
      var withdrawTarget = creep.pos.findClosestByPath(Game.structures, {
        filter: function(structure) {
          return structure.structureType == 'STRUCTURE_CONTAINER' && structure.energy >= creep.carryCapacity;
        }
      });
      if (withdrawTarget) {
        if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(withdrawTarget);
        }
      }
    }
  }
}

module.exports = roleMover;
