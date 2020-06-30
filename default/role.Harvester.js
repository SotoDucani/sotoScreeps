module.exports = {
  run: function(creep) {
      var assignedSource = Game.getObjectById(creep.memory.assignedSource);
      //If one is successully assigned from memory
      if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity(RESOURCE_ENERGY) && creep.room.controller.level === 1) {
        var spawn = Game.getObjectById(creep.memory.homeSpawn);
        if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      }
      else if (assignedSource) {
        if (creep.harvest(assignedSource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(assignedSource);
        }
      }
	}
};
