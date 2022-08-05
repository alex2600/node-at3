# at3

Run something **at** a specific time.

## Install

    npm i at3

## Usage

### Callback style

    const at = require("at3")
    at(new Date("2023-01-01T00:00:00"), () => console.log("🎉"))

### Promise style

    const at = require("at3")
    at(new Date("2023-01-01T00:00:00")).then(() => console.log("🎉"))
    
or

    const at = require("at3")
    await at(new Date("2023-01-01T00:00:00"))
    console.log("🎉")
