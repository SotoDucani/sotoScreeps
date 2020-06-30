module.exports = {
  run: function(creep) {
      var assignedSource = Game.getObjectById(creep.memory.assignedSource);
      //If one is successully assigned from memory
      if (assignedSource) {
        if (creep.harvest(assignedSource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(assignedSource);
        }
      }
	}
};
