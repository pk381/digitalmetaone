const DirectIncomeRewards = {
  starter: 2,
  basic: 4,
  star: 10,
  superstar: 20,
  prime: 40,
  royal: 100,
};

const AutopoolIncomeRewards = {
  starter: {
    1: 0.5,
    2: 1,
    3: 2,
    4: 4,
    5: 8,
    6: 16,
    7: 32,
    8: 64,
    9: 128,
    10: 256,
  },

  basic: {
    1: 1,
    2: 2,
    3: 4,
    4: 8,
    5: 16,
    6: 32,
    7: 64,
    8: 128,
    9: 256,
    10: 512,
  },
  star: {
    1: 2.5,
    2: 5,
    3: 10,
    4: 20,
    5: 40,
    6: 80,
    7: 160,
    8: 320,
    9: 640,
    10: 1280,
  },
  superstar: {
    1: 5,
    2: 10,
    3: 20,
    4: 40,
    5: 80,
    6: 160,
    7: 320,
    8: 640,
    9: 1280,
    10: 2560,
  },
  prime: {
    1: 10,
    2: 20,
    3: 40,
    4: 80,
    5: 160,
    6: 320,
    7: 640,
    8: 1280,
    9: 2560,
    10: 5120,
  },

  royal: {
    1: 25,
    2: 50,
    3: 100,
    4: 200,
    5: 400,
    6: 800,
    7: 1600,
    8: 3200,
    9: 6400,
    10: 12800,
  },
};

const LevelIncomeRewards = {
  starter: 0.2,
  basic: 0.4,
  star: 1,
  superstar: 2,
  prime: 4,
  royal: 10,
};

const BoostBoardRewards = {
  starter: 15,
  basic: 30,
  star: 60,
  superstar: 150,
  prime: 300,
  royal: 1500,
};

module.exports = {
  DirectIncomeRewards,
  AutopoolIncomeRewards,
  LevelIncomeRewards,
  BoostBoardRewards,
};
