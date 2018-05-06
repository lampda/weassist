# WeAssist
wechat assistant bot


## Installation

	git clone https://github.com/lampda/weassist.git
	npm install
	node index.js

or using docker container, fire this command:

	docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty index.js

then you are ready to have fun with WeAssist.


## Requirements

Either one of the following tools should be installed.

1. `docker` (Linux/MacOS users) or `docker toolbox` (Windows users), or

2. `nodejs` for `node` users.

## Usage

for windows users and to have a quick run, please checkout **docker-weassist.cmd** or **node-weassist.cmd** and run either of both;

for advanced users, use either of the following commands:

    docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty index.js
or

	node index.js</pre>

## Acknowledgement

[Project wechaty](https://github.com/Chatie/wechaty)

