const MetaCoin = artifacts.require("Token");

// contract("Token", accounts => {
//     it("should have Name as name", () =>
//       MetaCoin.deployed()
//         .then(instance => instance.tokenName == "Name")
//     );
// });

// contract("Token", accounts => {
//     it("should have tokenSymbol as Symbol", () =>
//       MetaCoin.deployed()
//         .then(instance => instance.tokenSymbol == "Symbol")
//     );
// });

// contract("Token", accounts => {
//     it("should have 1000000 as initialSupply", () =>
//       MetaCoin.deployed()
//         .then(instance => instance.initialSupply == 1000000 )
//     );
// });

// contract("Token", accounts => {
//     it("should have 1.0 as version", () =>
//       MetaCoin.deployed()
//         .then(instance => instance.version == "1.0" )
//     );
// });

contract("Token", accounts => {
    it("Balance 0", () => {
      let meta;
    
      MetaCoin.deployed()
        .then(instance => { meta = instance; return instance.getBalance.call(accounts[0])})
        .then(balance => { assert.equal(balance.valueOf(), 0, '0 balance') })
        .then(instance => {return instance.transfer(accounts[1], 10000, { from: accounts[0] })})
        .then(() => {return meta.getBalance.call(accounts[0])})
        .then(balance => {assert.equal(balance.valueOf(), 10000, '10000 in tokens')})

    });

});

contract("Token", accounts => {
    it("Balance 10000", () => {
      let meta;
    
      MetaCoin.deployed()
        .then(instance => { meta = instance })
        .then(() => {return meta.transfer(accounts[1], 10000, { from: accounts[0] })})
        .then(() => {return meta.getBalance.call(accounts[1])})
        .then(balance => {assert.equal(balance.valueOf(), 10000, 'transfered 10000 in tokens to account1')})

    });

});

/*
contract("Token", accounts => {
  it("should put 10000 Token in the first account", () =>
    MetaCoin.deployed()
    .then(instance => instance.transfer.call(accounts[0], 10000, { from: accounts[0] }))
      .then(instance => instance.getBalance.call(accounts[0]))
      .then(balance => {
        assert.equal(
          balance.valueOf(),
          10000,
          "10000 wasn't in the first account"
        );
      }));

  it("should call a function that depends on a linked library", () => {
    let meta;
    let metaCoinBalance;
    let metaCoinEthBalance;

    return MetaCoin.deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(accounts[0]);
      })
      .then(outCoinBalance => {
        metaCoinBalance = outCoinBalance.toNumber();
        return meta.getBalanceInEth.call(accounts[0]);
      })
      .then(outCoinBalanceEth => {
        metaCoinEthBalance = outCoinBalanceEth.toNumber();
      })
      .then(() => {
        assert.equal(
          metaCoinEthBalance,
          2 * metaCoinBalance,
          "Library function returned unexpected function, linkage may be broken"
        );
      });
  });

  it("should send coin correctly", () => {
    let meta;

    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    let account_one_starting_balance;
    let account_two_starting_balance;
    let account_one_ending_balance;
    let account_two_ending_balance;

    const amount = 10;

    return MetaCoin.deployed()
      .then(instance => {
        meta = instance;
        return meta.getBalance.call(account_one);
      })
      .then(balance => {
        account_one_starting_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then(balance => {
        account_two_starting_balance = balance.toNumber();
        return meta.sendCoin(account_two, amount, { from: account_one });
      })
      .then(() => meta.getBalance.call(account_one))
      .then(balance => {
        account_one_ending_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      })
      .then(balance => {
        account_two_ending_balance = balance.toNumber();

        assert.equal(
          account_one_ending_balance,
          account_one_starting_balance - amount,
          "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
          account_two_ending_balance,
          account_two_starting_balance + amount,
          "Amount wasn't correctly sent to the receiver"
        );
      });
  });
});

*/