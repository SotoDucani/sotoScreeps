module.exports = function () {
  StructureSpawn.prototype.createCustomCreep =
    function(energy, roleName) {

      var containers = this.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

      if (roleName === "harvester" && this.room.energyCapacityAvailable < 700 && this.room.energyCapacityAvailable >= 500){
        return this.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: roleName, working: false});
      }
      else if (roleName === "harvester" && this.room.energyCapacityAvailable >= 700) {
        return this.createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName, working: false});
      }
      else if (roleName === "harvester") {
        return this.createCreep([WORK,WORK,MOVE,CARRY], undefined, {role: roleName, working: false});
      }
      else if (roleName === "mover" && this.room.energyCapacityAvailable <= 800) {
        return this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE], undefined, {role: roleName, working: false});
      }
      else if (roleName === "mover" && this.room.energyCapacityAvailable > 800) {
        return this.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, working: false});
      }
      else {
        var numParts = Math.floor(energy / 200);
        var body = [];
        for (let i = 0; i < numParts; i++) {
          body.push(WORK);
        }
        for (let i = 0; i < numParts; i++) {
          body.push(CARRY);
        }
        for (let i = 0; i < numParts; i++) {
          body.push(MOVE);
        }
        return this.createCreep(body, undefined, {role: roleName, working: false});
      }
    };
};
