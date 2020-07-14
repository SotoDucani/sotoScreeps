/// <reference path="../ScreepsAutocomplete/_references.js" />

var utilActions = require('util.actions');

module.exports = {
  run: function(creep) {

    //If creep is transfering and runs out of energy
    if (creep.memory.working == true && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }

    //If creep is gathering and fills it's capacity
    else if (creep.memory.working === false && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY)) {
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
        utilActions.creepRepairObject(creep,target);
      }
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_WALL && structure.hits < 20000;
          }
        });
        if (target) {
          utilActions.creepRepairObject(creep,target);
        }
        else if (!target) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax;
            }
          });
          if (target) {
            utilActions.creepRepairObject(creep,target);
          }
          else if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (structure) => {
                return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax;
              }
            });
            if (target) {
              utilActions.creepRepairObject(creep,target);
            }
            else if (!target) {
              target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
              if (target) {
                utilActions.creepBuildObject(creep,target);
              }
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
          return structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity(RESOURCE_ENERGY);
        }
      });
      if (target) {
        utilActions.creepWithdrawResource(creep,target,RESOURCE_ENERGY);
      }
      //Look for Dropped Energy
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
          filter: r => (r.resourceType === RESOURCE_ENERGY && r.amount > 100)
        });
        if(target) {
          utilActions.creepPickupObject(creep,target);
        }
        //Look for containers
        else if (!target) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity(RESOURCE_ENERGY));
            }
          });
          if(target) {
            utilActions.creepWithdrawResource(creep,target,RESOURCE_ENERGY);
          }
        }
      }
    }
  }
}
