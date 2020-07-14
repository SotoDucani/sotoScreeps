/// <reference path="../ScreepsAutocomplete/_references.js" />

module.exports = {
  creepBuildObject: function(creep,object) {
    if (creep.build(object) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepHarvestObject: function(creep,object) {
    if (creep.harvest(object) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepRepairObject: function(creep,object) {
    if (creep.repair(object) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepTransferResource: function(creep,object,resource) {
    if (creep.transfer(object, resource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepWithdrawResource: function(creep,object,resource) {
    if (creep.withdraw(object, resource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepPickupObject: function(creep,object) {
    if (creep.pickup(object) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepAttackObject: function(creep,object) {
    if (creep.attack(object) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  creepUpgradeController: function(creep,controller) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(object);
    }
  },

  towerRepairObject: function(tower,object) {
    tower.repair(object);
  },

  towerAttackObject: function(tower,object) {
    tower.attack(object);
  },

  linkTransferEnergy: function(link,target) {
    link.transferEnergy(target);
  }
}