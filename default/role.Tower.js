/// <reference path="../ScreepsAutocomplete/_references.js" />

var utilActions = require('util.actions');

module.exports = {
  run: function(tower,mode,hostiles) {
    //Determine if we need to be in attack mode or not
    if (mode === "attack") {
      utilActions.towerAttackObject(tower,hostiles[0]);
    } else if (mode === "repair") {
      //Find a repair target
      var target = tower.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER && structure.hits < structure.hitsMax;
        }
      });
      if (target) {
        utilActions.towerRepairObject(tower,target);
      } else if (!target) {
        target = tower.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return structure.structureType === STRUCTURE_WALL && structure.hits < 20000;
          }
        });
        if (target) {
          utilActions.towerRepairObject(tower,target);
        } else if (!target) {
          target = tower.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
            return structure.structureType === STRUCTURE_RAMPART && structure.hits < structure.hitsMax;
            }
          });
          if (target) {
            utilActions.towerRepairObject(tower,target);
          } else if (!target) {
            target = tower.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (structure) => {
                return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax;
              }
            });
            if (target) {
              utilActions.towerRepairObject(tower,target);
            }
          }
        }
      }
    }
  }
};