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
