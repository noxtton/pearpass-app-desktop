# PearPass

PearPass is a distributed password manager powered by Pear Runtime. It allows secure storage of passwords, credit card details, and secure notes, with the ability to distribute data across multiple devices.

## Prerequisites

- **Node.js**: Ensure you have the correct Node.js version installed. You can check the required version in the `.nvmrc` file. And ensure it matches to your current node version  by running:
```bash
node --version
```

- **Pear**: Ensure you have Pear installed mode details can be found [here](https://docs.pears.com/guides)


## How to run
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

