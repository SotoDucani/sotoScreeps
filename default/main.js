//Import modules
require('prototype.spawn')();
var roleHarvester = require('role.Harvester');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleRepairer = require('role.Repairer');
var roleMover = require('role.Mover');

module.exports.loop = function () {
  //Look for dead creeps and remove from memory
  for (var i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i];
    }
  }

  //Loop through all spawns
  for (var i in Game.spawns) {
    var spawn = Game.spawns[i];

    //------------------------------

    //Make creeps do assigned role
    for (var n in Game.creeps) {
      //Get the creep object
      var creep = Game.creeps[n];

      //Harvester
      if (creep.memory.role === 'harvester') {
        roleHarvester.run(creep);
      }

      else if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep);
      }

      else if (creep.memory.role === 'builder') {
        roleBuilder.run(creep);
      }

      else if (creep.memory.role === 'repairer') {
        roleRepairer.run(creep);
      }

      else if (creep.memory.role === 'mover') {
        roleMover.run(creep);
      }
    }

    //------------------------------

    //Hacky Tower attack code
    //var hostiles = Game.spawns.Home.room.find(FIND_HOSTILE_CREEPS);
    //if(hostiles.length > 0) {
    //  var username = hostiles[0].owner.username;
    //  Game.notify(`User ${username} spotted in Spawn1`);
    //  var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
    //    filter: {
    //      structureType: STRUCTURE_TOWER
    //    }
    //  });
    //  towers.forEach(tower => tower.attack(hostiles[0]));
    //}

    //------------------------------

    //If a new spawn, find available sources in room
    if (spawn.memory.isOld === false) {
      var sources = spawn.room.find(FIND_SOURCES)
      spawn.memory.sources = [];
      for (var i in sources) {
        var source = sources[i];
        spawn.memory.sources.push(source.id);
      }
      spawn.memory.isOld = true;
    }

    //------------------------------

    //Get the current available energy of the spawn + it's extensions
    var availEnergy = spawn.room.energyCapacityAvailable;

    //------------------------------

    //Get current creep counts per role
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvestersNum = harvesters.length;

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgradersNum = upgraders.length;

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var buildersNum = builders.length;

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var repairersNum = repairers.length;

    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    var moversNum = movers.length;

    //------------------------------

    //Desired number of creeps calulation per role

    //Harvester target number is equal to number of sources the spawn is responsible for
    var harvesterTargetNum = 2;

    //Upgrader target number
    var upgraderTargetNum = spawn.room.controller.level;
    if (spawn.room.controller.level >= 4) {
      upgraderTargetNum = 4
    }

    //Builder target number
    var builderTargetNum = spawn.room.controller.level;
    if (spawn.room.controller.level >= 4) {
      builderTargetNum = 4
    }

    //Repairer target number
    var repairerTargetNum = 0;
    if (spawn.room.controller.level > 1 && spawn.room.controller.level < 4) {
      repairerTargetNum = spawn.room.controller.level;
    }
    else if (spawn.room.controller.level >= 4) {
      repairerTargetNum = 4;
    }

    //Mover target number
    var moverTargetNum = 0;
    if (spawn.room.controller.level > 2) {
      moverTargetNum = spawn.memory.sources.length * 2;
    }

    //------------------------------

    //Spawn creeps

    var name;

    //If not enough harvesters
    if (harvestersNum < harvesterTargetNum) {
      //Attempt to spawn one
      name = spawn.createCustomCreep(availEnergy, 'harvester');
      //If the spawn is successful
      if (!(name < 0)) {
        //Get the creep object
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.assignedSource = "";
        newCreep.memory.homeSpawn = spawn.id;
        //Generate an array of already occupied sources on the fly
        var harvesterIDArray = [];
        for (var i in harvesters) {
          var harvest = harvesters[i].memory.assignedSource;
          harvesterIDArray.push(harvest);
        }
        //Compare the source list of the spawner against the occupied sources list to find an open one
        for (var i in spawn.memory.sources) {
          var spawnListing = spawn.memory.sources[i];
          var spot = harvesterIDArray.indexOf(spawnListing);
          //If spot is -1, the current spawnlisting does not exist and should be assigned.
          if (spot === -1) {
            newCreep.memory.assignedSource = spawnListing;
          }
        }
        console.log("Spawned new harvester: " + name + "; Assgned to : " + newCreep.memory.assignedSource);
      }
    }

    //If not enough Builders
    else if (buildersNum < builderTargetNum) {
      //Attempt to spawn one
      name = spawn.createCustomCreep(availEnergy, 'builder')
      //If the spawn is successful
      if (!(name < 0)) {
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.homeSpawn = spawn.id;
        console.log("Spawned new builder: " + name);
      }
    }

    //If not enough Movers
    else if (moversNum < moverTargetNum) {
      //Attempt to spawn one
      name = spawn.createCustomCreep(availEnergy, 'mover')
      //If the spawn is successful
      if (!(name < 0)) {
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.homeSpawn = spawn.id;
        console.log("Spawned new mover: " + name);
      }
    }

    //If not enough Upgraders
    else if (upgradersNum < upgraderTargetNum) {
      //Attempt to spawn one
      name = spawn.createCustomCreep(availEnergy, 'upgrader')
      //If the spawn is successful
      if (!(name < 0)) {
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.homeSpawn = spawn.id;
        console.log("Spawned new upgrader: " + name);
      }
    }

    //If not enough Repairers
    else if (repairersNum < repairerTargetNum) {
      //Attempt to spawn one
      name = spawn.createCustomCreep(availEnergy, 'repairer')
      //If the spawn is successful
      if (!(name < 0)) {
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.homeSpawn = spawn.id;
        console.log("Spawned new repairer: " + name);
      }
    }
  }
};
