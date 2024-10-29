## Hardhat Fund Me

## Hardhat Setup

to install and initialize hardhat:

```bash
npm install --save-dev hardhat
npx hardhat init
```

## Linting

[`Linting`](https://www.perforce.com/blog/qac/what-is-linting) is the automated checking of your source code for programmatic and stylistic errors. This is done by using a lint tool (otherwise known as linter). A lint tool is a basic static code analyzer.

## solhint

[`solhint`](https://github.com/protofire/solhint) is an open source project for linting Solidity code. This project provides both Security and Style Guide validations.

You can install Solhint using npm:

```bash
npm install -g solhint

# verify that it was installed correctly
solhint --version
```

Initialize a configuration file, if you don't have one:

```bash
solhint --init
```

you can also config the `.solhint.json` file as you want

```json
{
	"extends": "solhint:recommended",
	"rules": {
		"compiler-version": ["error", "^0.8.0"],
		"func-visibility": ["warn", { "ignoreConstructors": true }]
	}
}
```

to lint solidity files

```bash
#to lint all files inside contracts directory
solhint contracts/**/*.sol

#To lint a single file:
solhint contracts/MyToken.sol
```

## Importing from NPM

you need to install [`chainlink contract`](https://www.npmjs.com/package/@chainlink/contracts) package in order to compile solidity files that are using chainlink contract.

```bash
npm install --save-dev @chainlink/contracts
```

## Hardhat Deploy

we learned in the past that if we want to deploy our contract we need to use a script for that and make our own manual deploy script.

however, we realized the more we work with just raw ethers or hardhat, keeping track of our deployments can be tricky. if your just use deploy.js script , it not saving our deployments in any file. Additionally having everything in the deploy script for deploying can make the tests and the deploy scripts, maybe not work exactly hand in hand. And there are a couple of other thigs that might be a little bit tricky to work on, there is a package that can make our life easier which is called [`hardhat-deploy`](https://github.com/wighawag/hardhat-deploy).

A Hardhat Plugin For Replicable Deployments And Easy Testing

This hardhat plugin adds a mechanism to deploy contracts to any network, keeping track of them and replicating the same environment for testing.

to install it:

```bash
npm install -D hardhat-deploy
```

And add the following statement to your `hardhat.config.js`:

```js
require('hardhat-deploy');
```

and now the `deploy` task is added to hardhat available tasks.

It is also recommended to install hardhat-deploy-ethers which add extra features to access deployments as ethers contract.

```bash
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

in deploy.js file, every time you run the "deploy" script using the command:

```bash
npx hardhat deploy
```

it automatically calls the default module function and passes the hardhat object into it ((01-depoy-fund-me.js) default export).

## Mocking

hardhat network is a blank blockchain, the `priceFeed` contract won't exist (it is on sepolia). so how to intract with our code locally. we can fork the blockchain.

Mocking is primarily used in unit testing. An object under test may have dependencies on other (complex) objects. To isolate the behaviour of the object you want to test you replace the other objects by mocks that simulate the behaviour of the real objects. This is useful if the real objects are impractical to incorporate into the unit test.

In short, mocking is creating objects that simulate the behaviour of real objects.

we want to make a fake price feed contract that we can use and we can control when locally.

we need to parameterize price feed address so no matter what chain we deploy to, we don't have to change any of our codes.

> You can handle multiple solidity versions in your `hardhat.config.js`

```js
module.exports = {
	solidity: {
		compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
	},
};
```

## Utils Folder

we can have a folder called `utils` and we can add diffrent scripts that we can use accross different deployments. and use that script where ever wen want to avoid repeating writing multiple scripts.

## Testnet Demo Sepolia

```bash
npx hardhat deploy --network sepolia
```

## Solidity Style guide

you can visit [`style guide`](https://docs.soliditylang.org/en/v0.8.28/style-guide.html) to provide coding conventions for writing Solidity code. This guide should be thought of as an evolving document that will change over time as useful conventions are found and old conventions are rendered obsolete.

### Order of Layout

1. Pragma statements
2. Import statements
3. Events
4. Errors
5. Interfaces
6. Libraries
7. Contracts

### Inside each contract, library or interface

1. Type declarations
2. State variables
3. Events
4. Errors
5. Modifiers
6. Functions

## Order of Functions

1. constructor
2. receive function (if exists)
3. fallback function (if exists)
4. external
5. public
6. internal
7. private

### NatSpec

Solidity contracts can also contain [`NatSpec comments`](https://docs.soliditylang.org/en/latest/natspec-format.html). They are written with a triple slash (///) or a double asterisk block (/** ... */) and they should be used directly above function declarations or statements.

## Testing Fund Me

there are two kinds of testing:

1. Unit Tesing
	- Unit testing, a.k.a. component or module testing, is a form of software testing by which isolated source code is tested to validate expected behavior.
	- Unit testing describes tests that are run at the unit-level to contrast testing at the integration or system level.
	- can be done in `local hardhat` or `forked hardhat`

2. Staging Test => tests that can be done on a testnet, before deploy to mainnet

### Unit Testing

[`development.fixture()`](https://github.com/wighawag/hardhat-deploy#creating-fixtures) allow us to basiclly run our entire deploy folder with as many tags as want.

```js
const { deployments } = require("hardhat");

await development.fixture(['all'])
```

- [`Chai matchers`](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) => A set of sweet chai matchers, makes your test easy to write and read. Before you can start using the matchers, you have to tell chai to use the solidity plugin:

- [`ethers.utils.parseUnits`](https://docs.ethers.org/v5/api/utils/display-logic/#utils-parseUnits)

- [`Breakpoints & Debugging`](https://code.visualstudio.com/Docs/editor/debugging)

- [`TransactionResponse`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse)

- [`TransactionReceipt`](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionReceipt)

- [`hardhat console.log`](https://hardhat.org/hardhat-network/docs/reference#console.log)