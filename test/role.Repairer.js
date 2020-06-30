module.exports = {
  run: function(creep) {
      var buildingSites = creep.room.find(FIND_CONSTRUCTION_SITES);

    //If creep is transfering and runs out of energy
    if (creep.memory.working == true && creep.carry.energy === 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }

    //If creep is gathering and fills it's capacity
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      //creep.say("Swap to working!");
    }

    //------------------------------

    //If creep needs to repair
    if (creep.memory.working === true) {
      //Find a repair target
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax;
        }
      });
      if (target) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_WALL && structure.hits < 20000;
          }
        });
        if (target) {
          if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
        else if (!target) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax;
            }
          });
          if (target) {
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
        }
      }
    }

    //------------------------------

    //If creep needs to get more energy
    else if(creep.memory.working === false) {
      //Look for storage
      var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity;
        }
      });
      if (target) {
        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      //Look for Dropped Energy
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
          filter: r => (r.resourceType === RESOURCE_ENERGY && r.amount > 100)
        });
        if(target) {
          if(creep.pickup(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
        //Look for containers
        else if (!target) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);
            }
          });
          if(target) {
            if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
        }
      }
    }
  }
}
