# Segment-Amplitude

## Installation and Dependencies
This repo uses `yarn` as a package manager. [Yarn can be installed using homebrew.](https://yarnpkg.com/en/docs/install)

`yarn install` is used to install all dependencies on a project.

You must have `node`, `yarn`, and `grunt` installed on your computer in order to develop on this repository locally.

## Use
In order to run this repository locally, you'll need to make a copy of the `secret.example.js` and call it `secret.js`. Replace the `api_key` value with your Amplitude api key.

In order to see the code in action, turn logging on by setting it on line 12 in `readable.js`. This will allow you to see the timestamps of the outgoing messages as well as the response from the Amplitude servers.

You can modify the `pathToFile` variable in `readable.js` to point to your `events.txt` file. I've included a shortened version in the `/test` folder called `30events.txt`.

You can run this locally by navigating to the root directory and running the `node readable.js` command. 

## Testing
Use the command `npm test` to run the test suite. 

I used [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and [Assert](https://github.com/defunctzombie/commonjs-assert) for unit testing the conversion step in this process.

This repo is using [StandardJS](http://standardjs.com/awesome.html) as a linter.

Upon every filechange, the test suite is run and the code is linted automatically using [grunt](http://gruntjs.com/). You can see this in action by using the `grunt` command and then making a change to the `readable.js` file.

## Other Considerations
I used Node Streams to read this file because this will allow the program to read large files without having to load the entire file into memory. Although processing a 10mb file may not be too intensive, this program should work just the same with much larger files. 

The Amplitude API asks for up to 1000 events per second. I ended up using a rate-limiter on the Read-Stream which is less than ideal because it doesn't allow fine tuning. 

### Possible improvements: 
The Amplitude API allows for batched events, so we could potentially store arrays of events in memory and send them out, reduce the number of HTTP requests made. 

We could process the events and determine if any are missing data. Those events can get written to another file of incomplete events for human intervention. This can be done by piping another Transform stream that filters out bad events. We could also move the conversion step this other Transform stream.

This repo could use additional test coverage. I only did basic unit testing for required fields. There is no end-to-end testing. I wrote out some comments of other possible unit tests in the test file.