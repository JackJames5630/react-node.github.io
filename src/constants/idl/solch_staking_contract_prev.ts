export type SolchStakingContract = {
  "version": "0.1.0",
  "name": "solch_staking_contract",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createDataAccount",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpData",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPoolSigner",
      "accounts": [
        {
          "name": "poolSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpPool",
          "type": "u8"
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u32"
        },
        {
          "name": "amountSecond",
          "type": "u32"
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        },
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalLockedAmount",
            "type": "u64"
          },
          {
            "name": "fees",
            "type": "u64"
          },
          {
            "name": "rewardInfo",
            "type": {
              "vec": {
                "defined": "REWARD"
              }
            }
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "stakedAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u32"
          },
          {
            "name": "endTime",
            "type": "u32"
          },
          {
            "name": "index",
            "type": "u8"
          },
          {
            "name": "lockTime",
            "type": "u32"
          },
          {
            "name": "fee",
            "type": "u8"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "apy",
            "type": "u16"
          },
          {
            "name": "isStaked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bumpVault",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "poolSigner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bumpSigner",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "type",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "days",
            "type": "u16"
          },
          {
            "name": "fee",
            "type": "u8"
          },
          {
            "name": "minAmount",
            "type": "u16"
          },
          {
            "name": "apy",
            "type": "u16"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "REWARD",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "availableAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "maxAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};

export const IDL: SolchStakingContract = {
  "version": "0.1.0",
  "name": "solch_staking_contract",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createDataAccount",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpData",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPoolSigner",
      "accounts": [
        {
          "name": "poolSigner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpPool",
          "type": "u8"
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stake",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u32"
        },
        {
          "name": "amountSecond",
          "type": "u32"
        },
        {
          "name": "index",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unstake",
      "accounts": [
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFrom",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSigner",
          "type": "u8"
        },
        {
          "name": "bumpVault",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalLockedAmount",
            "type": "u64"
          },
          {
            "name": "fees",
            "type": "u64"
          },
          {
            "name": "rewardInfo",
            "type": {
              "vec": {
                "defined": "REWARD"
              }
            }
          }
        ]
      }
    },
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "reward",
            "type": "u64"
          },
          {
            "name": "stakedAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u32"
          },
          {
            "name": "endTime",
            "type": "u32"
          },
          {
            "name": "index",
            "type": "u8"
          },
          {
            "name": "lockTime",
            "type": "u32"
          },
          {
            "name": "fee",
            "type": "u8"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "apy",
            "type": "u16"
          },
          {
            "name": "isStaked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bumpVault",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "poolSigner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bumpSigner",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "type",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "days",
            "type": "u16"
          },
          {
            "name": "fee",
            "type": "u8"
          },
          {
            "name": "minAmount",
            "type": "u16"
          },
          {
            "name": "apy",
            "type": "u16"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "REWARD",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "availableAmount",
            "type": "u64"
          },
          {
            "name": "claimedAmount",
            "type": "u64"
          },
          {
            "name": "maxAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
