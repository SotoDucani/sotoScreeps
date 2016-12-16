var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

  //Spawn creeps in order
  if(harvesters.length < 4) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', working: false});
  }
  else if(upgraders.length < 4) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading: false});
  }
  //if(builders.length < 2) {
    //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
  //}

  //Make Creeps perform their roles
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      //creep.say("I'm a harvester!");
      roleHarvester.run(creep);
    }
    else if(creep.memory.role == 'upgrader') {
      //creep.say("I'm a upgrader!");
      roleUpgrader.run(creep);
    }
    else if(creep.memory.role == 'builder') {
      //creep.say("I'm a builder!");
      roleBuilder.run(creep);
    }

    //Look for dead creeps and remove from memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
