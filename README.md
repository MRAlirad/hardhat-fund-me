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