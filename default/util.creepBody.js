module.exports = {

  getBody_Harvester: function(level) {
    switch (level) {
      default:
        console.log('Error @ getBody_Harvester');
      case 1:
        //300 Energy; 2x WORK, 1x MOVE, 1x CARRY
        return [WORK,WORK,CARRY,MOVE];
      case 2:
        //400 Energy; 3x WORK, 1x MOVE, 1x CARRY
        return [WORK,WORK,WORK,CARRY,MOVE];
      case 3:
        //500 Energy; 4x WORK, 1x MOVE, 1x CARRY
        return [WORK,WORK,WORK,WORK,CARRY,MOVE];
      case 4:
        //600 Energy; 5x WORK, 1x MOVE, 1x CARRY
        return [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE];
      case 5:
        //700 Energy; 5x WORK, 3x MOVE, 1x CARRY
        return [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    }
  },

  getBody_Worker: function(level) {
    switch (level) {
      default:
        console.log('Error @ getBody_Worker');
      case 1:
        //250 Energy, 1x WORK, 1x CARRY, 2x MOVE
        return [WORK,CARRY,
                MOVE,MOVE];
      case 2:
        //500 Energy; 2x WORK, 2x CARRY, 4x MOVE
        return [WORK,WORK,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE];
      case 3:
        //750 Energy; 3x WORK, 3x CARRY, 6x MOVE
        return [WORK,WORK,WORK,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
      case 4:
        //1000 Energy; 4x WORK, 4x CARRY, 8x MOVE
        return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
    }
  },

  getBody_Mover: function(level) {
    switch(level) {
      default:
        console.log('Error @ getBody_Mover');
        case 1:
          //300 Energy; 3x CARRY, 3x MOVE
          return [CARRY,CARRY,CARRY,
                  MOVE,MOVE,MOVE];
        case 2:
          //500 Energy; 5x CARRY, 5x MOVE
          return [CARRY,CARRY,CARRY,CARRY,CARRY,
                  MOVE,MOVE,MOVE,MOVE,MOVE];
        case 3:
          //700 Energy; 7x CARRY, 7x MOVE
          return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                  MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        case 4:
          //1000 Energy; 10x CARRY, 10x MOVE
          return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                  MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
    }
  },
};
