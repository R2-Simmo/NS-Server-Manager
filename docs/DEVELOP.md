# Northstar Server Daemon

English|[简体中文]

## Modules path

### main

__path__: [/index.js]()

__description__: Entry point, Main executable file

### Server

__path__: [/src/server.js]()

__description__: Server class file

### Checker

__path__: [/src/checker.js]()

__description__: Online status checker class file

### Logger

__path__: [/src/lib/log]()

__description__: Logger modules root directory

#### Empty

__path__: [/src/lib/log/Logger.ts]()

__description__: Logger template class, Empty class

#### Simple

__path__: [/src/lib/log/Simple.js]()

__description__: Logger module class, Simple logger module

### Utils

#### Arguments

__path__: [/src/lib/arguments.js]()

__description__: Utils, Startup arguments parser

#### Config

__path__: [/src/lib/config.js]()

__description__: Utils, Source Engine typed configure file parser

#### Playlist

__path__: [/src/lib/playlist.js]()

__description__: Utils, Playlist Override parser

#### Unicode

__path__: [/src/lib/unicode.js]()

__description__: Utils, Unicode encoder&decoder

#### Date_Extend

__path__: [/src/lib/date_extend.js]()

__description__: Utils, Date formatter

## Functions & Classes

### removeIfExists
If exists, delete subdirectory and files
* return value: none
* alias: none
* defined at: [main]
* permission require: **detect directory readable, writeable**

| param name |  type  | required |   description    | sample |
|:----------:|:------:|:--------:|:----------------:|:------:|
|    path    | string |   Yes    | target directory | ./temp |

### SavePID
Save all server process ID when running
* return value: none
* alias: none
* defined at: [main]
* permission require: **detect directory readable, writeable**

### ParseArguments
Parse Arguments object from text
* return value: `object`
* alias: `Arguments.parse`
* defined at: [arguments.js]
* permission require: none

| param name |  type  | required |      description       |   sample    |
|:----------:|:------:|:--------:|:----------------------:|:-----------:|
|    str     | string |   Yes    | Startup Arguments text | -port 37015 |

### StringifyArguments
Generate text from Arguments object
* return value: `string`
* alias: `Arguments.stringify`
* defined at: [arguments.js]
* permission require: none

| param name |  type  | required |       description        |        sample         |
|:----------:|:------:|:--------:|:------------------------:|:---------------------:|
|    args    | object |   Yes    | Startup Arguments object | { \'-port\' : 37015 } |

### ParseConfig
Parse Config object from text
* return value: `object`
* alias: `Config.parse`
* defined at: [config.js]
* permission require: none

| param name |  type  | required | description |                   sample                    |
|:----------:|:------:|:--------:|:-----------:|:-------------------------------------------:|
|    str     | string |   Yes    | Config text | ns_server_name \"Unnamed Northstar Server\" |

### StringifyConfig
Generate text from Config object
* return value: `string`
* alias: `Config.stringify`
* defined at: [config.js]
* permission require: none

| param name |  type  | required |  description  |                      sample                       |
|:----------:|:------:|:--------:|:-------------:|:-------------------------------------------------:|
|   config   | object |   Yes    | Config object | { ns_server_name : \'Unnamed Northstar Server\' } |

### ParsePlaylist
Parse Playlist Override object from text
* return value: `object`
* alias: `Playlist.parse`
* defined at: [playlist.js]
* permission require: none

| param name |  type  | required |      description       |                            sample                             |
|:----------:|:------:|:--------:|:----------------------:|:-------------------------------------------------------------:|
|    str     | string |   Yes    | Playlist Override text | max_players 12 earn_meter_pilot_multiplier 8 boosts_enabled 0 |

### StringifyPlaylist
Generate text from Playlist Override object
* return value: `string`
* alias: `Playlist.stringify`
* defined at: [playlist.js]
* permission require: none

| param name |  type  | required |       description        |                                  sample                                   |
|:----------:|:------:|:--------:|:------------------------:|:-------------------------------------------------------------------------:|
|   config   | object |   Yes    | Playlist Override object | { max_players : 12, earn_meter_pilot_multiplier : 8, boosts_enabled : 0 } |

### toUnicode
Encode text with Unicode
* return value: `string`
* alias: `Unicode.toUnicode`
* defined at: [unicode.js]
* permission require: none

| param name |  type  | required | description |       sample       |
|:----------:|:------:|:--------:|:-----------:|:------------------:|
|    str     | string |   Yes    |  any text   | 这是中文和English混合测试文本 |

### fromUnicode
Decode text with Unicode
* return value: `string`
* alias: `Unicode.fromUnicode`
* defined at: [unicode.js]
* permission require: none

| param name |  type  | required |     description      |                                  sample                                   |
|:----------:|:------:|:--------:|:--------------------:|:-------------------------------------------------------------------------:|
|  encoded   | string |   Yes    | Unicode encoded text | \u8fd9\u662f\u4e2d\u6587\u548cEnglish\u6df7\u5408\u6d4b\u8bd5\u6587\u672c |

### class:Server
Server manage class
* defined at: [server.js]
* permission require: **detect directory readable, writeable, executable**

#### Server.constructor
Class constructor
* return value: none
* call type: constructor
* call require: none

| param name |  type  | required |     description      |                     sample                     |
|:----------:|:------:|:--------:|:--------------------:|:----------------------------------------------:|
|    path    | string |    No    | detected server path | D:\Program Files (x86)\Origin Games\Titanfall2 |

#### Server.UseLogger
Logger binder
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |     description      |                 sample                  |
|:----------:|:------:|:--------:|:--------------------:|:---------------------------------------:|
|   logger   | Logger |   Yes    | target Logger object | new Logger.Simple({ root : __dirname }) |

#### Server.SetPath
Set target server path
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |     description      |                     sample                     |
|:----------:|:------:|:--------:|:--------------------:|:----------------------------------------------:|
|    path    | string |   Yes    | detected server path | D:\Program Files (x86)\Origin Games\Titanfall2 |

#### Server.SetProfile
Set target profile
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |       description       |   sample    |
|:----------:|:------:|:--------:|:-----------------------:|:-----------:|
|  profile   | string |   Yes    | detected server profile | R2Northstar |

#### Server.GetVersion
Get detected server core mods version
* return value: `string`
* call type: instance
* call require: none

#### Server.GetName
Get detected server display name
* return value: `string`
* call type: instance
* call require: After `Server.Init`

#### Server.GetAuthPort
Get detected server HTTP authority port
* return value: `number`
* call type: instance
* call require: After `Server.Init`

#### Server.GetPort
Get detected server Game port
* return value: `number`
* call type: instance
* call require: After `Server.Init`

#### Server.GetPID
Get detected server process ID
* return value: `number`
* call type: instance
* call require: none

#### Server.Start
Start detected server process
* return value: none
* call type: instance
* call require: After `Server.Init`

| param name |  type  | required |       description        |       sample        |
|:----------:|:------:|:--------:|:------------------------:|:-------------------:|
|  ...args   | string |    No    | extend startup arguments | -novid,-disablelogs |

#### Server.Stop
Stop detected server process
* return value: none
* call type: instance
* call require: After `Server.Init`

#### Server.Attach
Attach to detected server process
* return value: none
* call type: instance
* call require: After `Server.Init`

#### Server.Restart
Restart detected server process
* return value: none
* call type: instance
* call require: After `Server.Init`

#### Server.Init
Initialize server configure and startup arguments
* return value: none
* call type: instance
* call require: none

### class:Checker
Online status check class
* defined at: [checker.js]
* permission require: none

#### Checker.constructor
Class constructor
* return value: none
* call type: constructor
* call require: none

| param name |  type  | required |        description        |           sample            |
|:----------:|:------:|:--------:|:-------------------------:|:---------------------------:|
|    host    | string |    No    |     master server url     | https://nscn.wolf109909.top |
|   delay    | number |    No    | delay between twice check |            5*60             |

#### Checker.UseLogger
Logger binder
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |     description      |                 sample                  |
|:----------:|:------:|:--------:|:--------------------:|:---------------------------------------:|
|   logger   | Logger |   Yes    | target Logger object | new Logger.Simple({ root : __dirname }) |

#### Checker.Check
Check once manual
* return value: none
* call type: instance
* call require: none

#### Checker.on
Register Event listener, defined Events on [Checker.Events](#checkerevents)
* inherited by: `Events.EventEmitter`

| param name |   type   | required |       description       |          sample           |
|:----------:|:--------:|:--------:|:-----------------------:|:-------------------------:|
| eventName  |  string  |   Yes    |    target event name    |          update           |
|  listener  | function |   Yes    | event listener function | list => console.log(list) |

#### Checker.Events
##### Event:update
Online status updated event, need to be listened by `Checker.on`
* event name: `update`

| param name |  type  |     description     |      sample       |
|:----------:|:------:|:-------------------:|:-----------------:|
|    list    | object | online servers list | { server1 : ... } |

### class:Logger
Logger class
* defined at: [Logger.ts], [Simple.js]
* permission require: **detect directory readable, writeable**

#### Logger.constructor
Class constructor
* return value: none
* call type: constructor
* call require: none

| param name |  type  | required |            description             |        sample        |
|:----------:|:------:|:--------:|:----------------------------------:|:--------------------:|
|  options   | object |   Yes    |   Logger detected options object   | { root : __dirname } |

#### Logger.debug
Debug level log
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.log
No level log
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.info
Info level log
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.warn
Warning level log
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.error
Error level log
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.fatal
Fatal Error level log, will exit process
* return value: none
* call type: instance
* call require: none

| param name |  type  | required |                   description                    | sample |
|:----------:|:------:|:--------:|:------------------------------------------------:|:------:|
|   format   | string |    No    |       format string, same as `util.format`       | opt:%s |
|  ...args   |  any   |    No    | anything, will replace with `format` string tags |  Test  |

#### Logger.RegisterModule
Register new Logger as submodule
* return value: `Logger`
* call type: instance
* call require: none

| param name |  type  | required |      description      | sample |
|:----------:|:------:|:--------:|:---------------------:|:------:|
|    name    | string |   Yes    | Logger submodule name | Server |

### class:String
Modified String class, add 2 methods
* defined at: [unicode.js]
* permission require: none

#### String.toUnicode
Encode text with Unicode
* return value: `string`
* call type: instance
* call require: any string instance

#### String.fromUnicode
Decode text with Unicode
* return value: `string`
* call type: static
* call require: none

| param name |  type  | required |     description      |                                  sample                                   |
|:----------:|:------:|:--------:|:--------------------:|:-------------------------------------------------------------------------:|
|  encoded   | string |   Yes    | Unicode encoded text | \u8fd9\u662f\u4e2d\u6587\u548cEnglish\u6df7\u5408\u6d4b\u8bd5\u6587\u672c |

### class:Date
Modified Date class, add 1 method
* defined at: [date_extend.js]
* permission require: none

#### Date.format
Generate text from Date object with format
* return value: `string`
* call type: instance
* call require: none

| param name |   type   | required | description |                                      sample                                      |
|:----------:|:--------:|:--------:|:-----------:|:--------------------------------------------------------------------------------:|
|   format   |  string  |   Yes    | date format |                               yyyy-MM-dd hh:mm:ss                                |
| week_list  | string[] |    No    | week style  | \['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'\] |

<!-- Module ref -->
[main]: #main
[server.js]: #server
[checker.js]: #checker
[arguments.js]: #arguments
[config.js]: #config
[playlist.js]: #playlist
[unicode.js]: #unicode
[log]: #logger
[Logger.ts]: #empty
[Simple.js]: #simple
[date_extend.js]: #date_extend
<!-- Develop Document Files -->
[English]: /docs/DEVELOP.md
[简体中文]: /docs/DEVELOP.ZH-CN.md
