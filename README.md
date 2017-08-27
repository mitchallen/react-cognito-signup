@mitchallen/react-cognito-signup
==
CognitoSignup React component
--

<p align="left">
  <a href="https://circleci.com/gh/mitchallen/react-cognito-signup">
    <img src="https://img.shields.io/circleci/project/github/mitchallen/react-cognito-signup.svg" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/react-cognito-signup">
    <img src="https://codecov.io/gh/mitchallen/react-cognito-signup/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-cognito-signup">
    <img src="http://img.shields.io/npm/dt/@mitchallen/react-cognito-signup.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/react-cognito-signup">
    <img src="http://img.shields.io/npm/v/@mitchallen/react-cognito-signup.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/react-cognito-signup">
    <img src="https://img.shields.io/github/license/mitchallen/react-cognito-signup.svg" alt="License"></a>
  </a>
</p>

## UNDER CONSTRUCTION
### DO NOT USE

## Installation

    $ npm init
    $ npm install @mitchallen/react-cognito-signup --save
  
* * *

## Usage

1: Add this line near the top of your file (like ```src/App.js```):

```
import CognitoSignup from '@mitchallen/react-cognito-signup';
```

__NOTE:__ CognitoSignup must be Capitalized or component won't render.

2: Somewhere in the middle of the __render__ method add this line:

```
<CognitoSignup />
```


* * *

## Testing

### Run the Tests

To test, go to the root folder and type (sans __$__):

    $ npm test
    
## Component Testing

### Prerequisite

If you've never installed __create-react-app__ (you may need to use ```sudo```):

```
$ npm install -g create-react-app
```

### Create a local npm link

In the original component folder (you may need to use ```sudo```):

```
$ npm link
```

### Create a test package

Create a root test folder and then do the following:

```
$ create-react-app react-cognito-signup-test
$ cd react-cognito-signup-test
$ npm link @mitchallen/react-cognito-signup
```

### Modify src/App.js

1: Add this line near the top:

```
import CognitoSignup from '@mitchallen/react-cognito-signup';
```

__NOTE:__ CognitoSignup must be Capitalized or component won't render.

2: Somewhere in the middle of the __render__ method add this line:

```
<CognitoSignup />
```

### Run The Test App

```
$ npm start
```

### Cleanup

Remember to unlink when done.
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/react-cognito-signup.git](https://bitbucket.org/mitchallen/react-cognito-signup.git)
* [github.com/mitchallen/react-cognito-signup.git](https://github.com/mitchallen/react-cognito-signup.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.2

* Updated example to use published package 

#### Version 0.1.1 

* initial release

* * *