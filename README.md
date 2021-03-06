# Gitdowner CLI

Download github directory from CLI with single command

![demo](demo.gif)

## Usage

Simply run with npx (nodejs must be installed locally)

```bash
  npx gitdowner d <url>
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/DNI9/gitdowner-cli.git
```

Go to the project directory

```bash
  cd gitdowner-cli
```

Install dependencies

```bash
  yarn install
```

Build

```bash
  yarn build
```

output will be in `build` directory

## Packaging

Package the application into a single executable by running

```bash
  yarn package
```

this will generate executable for linux and windows, output will be in the `dist` directory
