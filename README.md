# ev3-direct-serial-control

Resources:

* Christoph Gaukel: http://ev3directcommands.blogspot.com/ & https://github.com/ChristophGaukel/ev3-python3
* LEGO Mindstorms docs: https://www.lego.com/en-gb/mindstorms/downloads : Communications & Firmware PDFs
* folder structure: http://ev3.fantastic.computer/doxygen/UIdesign.html

### Mock debug server

You will need `socat` and optionally some way of converting output to hex, like `xxd`.

```
# In terminal 1, start a tty relay:
$ yarn mock
...
2020/12/05 11:46:39 socat[94041] N PTY is /dev/ttys00X
2020/12/05 11:46:39 socat[94041] N PTY is /dev/ttys00Y
...

# In terminal 2, listen on first tty for commands:
xxd /dev/ttys00X

# In terminal 3, connect to second tty and send EV3 commands:
yarn start /dev/ttys00Y
```
