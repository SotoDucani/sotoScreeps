var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleRepairer = require('roleRepairer');
var roleMover = require('roleMover');

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');

  //Spawn creeps in order
  if(harvesters.length < 8) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', working: false, target: ""});
  }
  else if(upgraders.length < 4) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading: false, target: ""});
  }
  else if(movers.length < 2) {
    var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'mover', moving: false, target: ""});
  }
  else if(builders.length < 6) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder', building: false, target: ""});
  }
  else if(repairers.length < 4) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'repairer', repairing: false, target: ""});
  }

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
    else if(creep.memory.role == 'repairer') {
      //creep.say("I'm a repairer!");
      roleRepairer.run(creep);
    }
    else if(creep.memory.role == 'mover') {
      //creep.say("I'm a mover!");
      roleMover.run(creep);
    }

    //Look for dead creeps and remove from memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
