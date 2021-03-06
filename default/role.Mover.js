/// <reference path="../ScreepsAutocomplete/_references.js" />

var utilActions = require('util.actions');

module.exports = {
  run: function(creep) {
    //If creep is transfering and runs out of energy
    if (creep.memory.working === true && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }

    //If creep is gathering and fills it's capacity
    else if (creep.memory.working === false && creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY)) {
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
            structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY);
        }
      });
      if(target) {
        utilActions.creepTransferResource(creep,target,RESOURCE_ENERGY);
      }
      else if (!target) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY);
          }
        });
        if (target) {
          utilActions.creepTransferResource(creep,target,RESOURCE_ENERGY);
        } else if (!target) {
          target = creep.room.find(FIND_CONSTRUCTION_SITES);
          if (target[0]) {
            utilActions.creepBuildObject(creep,target[0]);
          }
        }
      }
    }

    //------------------------------

    //If it has no energy
    else if (creep.memory.working === false) {
      var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: r => (r.resourceType === RESOURCE_ENERGY && r.amount > 100)
      });
      if (target) {
        utilActions.creepPickupObject(creep,target);
      }
      else if (!target) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function(structure) {
            return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000);
          }
        });
        if (target) {
          utilActions.creepWithdrawResource(creep,target,RESOURCE_ENERGY);
        }
        else if (!target) {
          var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
              return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100);
            }
          });
          if (target) {
            utilActions.creepWithdrawResource(creep,target,RESOURCE_ENERGY);
          }
        }
      }
    }
  }
}
