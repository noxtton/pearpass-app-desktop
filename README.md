# PearPass

PearPass is a distributed password manager powered by Pear Runtime. It allows secure storage of passwords, credit card details, and secure notes, with the ability to distribute data across multiple devices.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [Dependencies](#dependencies)
- [Related Projects](#related-projects)

## Features

- Secure password storage with strong encryption
- Credit card information management
- Secure notes for sensitive information
- Cross-device synchronization via Pear Runtime
- Offline access to your credentials
- Password strength analysis
- Random password generator
- Intuitive user interface

## Installation

- **Node.js**: Ensure you have the correct Node.js version installed. You can check the required version in the `.nvmrc` file. And ensure it matches to your current node version  by running:
```bash
node --version
```

- **Pear**: Ensure you have Pear installed mode details can be found [here](https://docs.pears.com/guides)


Clone the repository

```bash
git clone git@github.com:tetherto/pearpass-app-desktop.git
```
Go to the cloned directory 
```bash
cd pearpass-app-desktop
```
Install npm modules
```bash
npm install
```
generate translation keys
```bash
npm run lingui:extract
```
```bash
npm run lingui:compile
```
run the app
```bash
pear run --dev .
```

## Dependencies

- [Pear Runtime](https://pears.com/)
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Lingui](https://lingui.dev/)
- [Redux](https://redux.js.org/)

## Related Projects

- [pearpass-app-mobile](https://github.com/tetherto/pearpass-app-mobile) - A mobile app for PearPass, a password manager
- [pearpass-lib-ui-react-native-components](https://github.com/tetherto/pearpass-lib-ui-react-native-components) - A library of React Native UI components for PearPass
- [pearpass-lib-ui-react-components](https://github.com/noxtton/pearpass-lib-ui-react-components) - A library of React UI components for PearPass
- [tether-dev-docs](https://github.com/tetherto/tether-dev-docs) - Documentations and guides for developers
- [pearpass-lib-vault](https://github.com/noxtton/pearpass-lib-vault) - A library for managing password vaults
- [pearpass-lib-vault-bare](https://github.com/noxtton/pearpass-lib-vault-bare) - A bare wrapper for Autopass and Corestore for password storage and encryption


