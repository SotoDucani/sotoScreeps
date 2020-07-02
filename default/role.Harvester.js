module.exports = {
  run: function(creep) {
      //Check for builders to move energy
      var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
      var buildersNum = builders.length;

      var assignedSource = Game.getObjectById(creep.memory.assignedSource);
      //If one is successully assigned from memory
      if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY) && (creep.room.controller.level === 1 || buildersNum < 2)) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
              structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY);
          }
        });
        if (target) {
          if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY)) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER) &&
            structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY);
          }
        });
        if (target) {
          if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
      }
      else if (assignedSource) {
        if (creep.harvest(assignedSource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(assignedSource);
        }
      }
	}
};
