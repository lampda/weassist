@echo off
docker run -ti --rm --volume="$(pwd)":/bot zixia/wechaty index.js
