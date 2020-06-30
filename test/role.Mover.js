module.exports = {
  run: function(creep) {
    //If creep is transfering and runs out of energy
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }

    //If creep is gathering and fills it's capacity
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      //creep.say("Swap to working!");
    }

    //------------------------------

    //If moving energy around
    if (creep.memory.working === true) {
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_TOWER) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
          }
        });
        if (target) {
          if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
    }

    //------------------------------

    //If it has no energy
    else if (creep.memory.working === false) {
      var target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
        filter: r => (r.resourceType === RESOURCE_ENERGY && r.amount > 100)
      });
      if (target) {
        if(creep.pickup(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else if (!target) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function(structure) {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 50);
          }
        });
        if (target) {
          if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
    }
  }
}
