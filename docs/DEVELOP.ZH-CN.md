# Northstar Server Daemon

[English]|简体中文

## 模块路径信息

### main

__文件位置__: [/index.js]()

__描述__: 入口点, 主执行文件

### Server

__文件位置__: [/src/server.js]()

__描述__: 单服务器实例类定义文件

### Checker

__文件位置__: [/src/checker.js]()

__描述__: 在线状态检测类定义文件

### Logger

__文件位置__: [/src/lib/log]()

__描述__: 日志模块组目录

#### Empty

__文件位置__: [/src/lib/log/Logger.ts]()

__描述__: 日志模块模板类, 无功能实现

#### Simple

__文件位置__: [/src/lib/log/Simple.js]()

__描述__: 日志模块功能类, 简单日志实现

### Utils

#### Arguments

__文件位置__: [/src/lib/arguments.js]()

__描述__: 实用功能, 启动参数文件解析

#### Config

__文件位置__: [/src/lib/config.js]()

__描述__: 实用功能, 起源引擎格式配置文件解析

#### Playlist

__文件位置__: [/src/lib/playlist.js]()

__描述__: 实用功能, Playlist Override 内容解析

#### Unicode

__文件位置__: [/src/lib/unicode.js]()

__描述__: 实用功能, Unicode 编解码函数

#### Date_Extend

__文件位置__: [/src/lib/date_extend.js]()

__描述__: 实用功能, Date 格式化为字符串

## 函数及类定义

### removeIfExists
若存在, 则删除目标目录及目录内的文件
* 返回值: 无
* 别名: 无
* 定义位置: [main]
* 权限要求: **目录可读写**

| 参数名  |   类型   | 必须  |    描述    |   示例   |
|:----:|:------:|:---:|:--------:|:------:|
| path | string |  是  | 要删除的目标路径 | ./temp |

### SavePID
保存运行中的所有服务器进程ID
* 返回值: 无
* 别名: 无
* 定义位置: [main]
* 权限要求: **目录可读写**

### ParseArguments
将文本解析为 Arguments 对象
* 返回值: `object`
* 别名: `Arguments.parse`
* 定义位置: [arguments.js]
* 权限要求: 无

| 参数名 |   类型   | 必须  |          描述          |     示例      |
|:---:|:------:|:---:|:--------------------:|:-----------:|
| str | string |  是  | Startup Arguments 文本 | -port 37015 |

### StringifyArguments
将 Arguments 对象转为文本
* 返回值: `string`
* 别名: `Arguments.stringify`
* 定义位置: [arguments.js]
* 权限要求: 无

| 参数名  |   类型   | 必须  |          描述          |          示例           |
|:----:|:------:|:---:|:--------------------:|:---------------------:|
| args | object |  是  | Startup Arguments 对象 | { \'-port\' : 37015 } |

### ParseConfig
将文本解析为 Config 对象
* 返回值: `object`
* 别名: `Config.parse`
* 定义位置: [config.js]
* 权限要求: 无

| 参数名 |   类型   | 必须  |    描述     |                     示例                      |
|:---:|:------:|:---:|:---------:|:-------------------------------------------:|
| str | string |  是  | Config 文本 | ns_server_name \"Unnamed Northstar Server\" |

### StringifyConfig
将 Config 对象转为文本
* 返回值: `string`
* 别名: `Config.stringify`
* 定义位置: [config.js]
* 权限要求: 无

|  参数名   |   类型   | 必须  |    描述     |                        示例                         |
|:------:|:------:|:---:|:---------:|:-------------------------------------------------:|
| config | object |  是  | Config 对象 | { ns_server_name : \'Unnamed Northstar Server\' } |

### ParsePlaylist
将文本解析为 Playlist Override 对象
* 返回值: `object`
* 别名: `Playlist.parse`
* 定义位置: [playlist.js]
* 权限要求: 无

| 参数名 |   类型   | 必须  |          描述          |                              示例                               |
|:---:|:------:|:---:|:--------------------:|:-------------------------------------------------------------:|
| str | string |  是  | Playlist Override 文本 | max_players 12 earn_meter_pilot_multiplier 8 boosts_enabled 0 |

### StringifyPlaylist
将 Playlist Override 对象转为文本
* 返回值: `string`
* 别名: `Playlist.stringify`
* 定义位置: [playlist.js]
* 权限要求: 无

|  参数名   |   类型   | 必须  |          描述          |                                    示例                                     |
|:------:|:------:|:---:|:--------------------:|:-------------------------------------------------------------------------:|
| config | object |  是  | Playlist Override 对象 | { max_players : 12, earn_meter_pilot_multiplier : 8, boosts_enabled : 0 } |

### toUnicode
对非纯 ASCII 字符串进行 Unicode 编码
* 返回值: `string`
* 别名: `Unicode.toUnicode`
* 定义位置: [unicode.js]
* 权限要求: 无

| 参数名 |   类型   | 必须  |  描述  |         示例         |
|:---:|:------:|:---:|:----:|:------------------:|
| str | string |  是  | 任意文本 | 这是中文和English混合测试文本 |

### fromUnicode
将经过 Unicode 编码的字符串转换回字符串对象
* 返回值: `string`
* 别名: `Unicode.fromUnicode`
* 定义位置: [unicode.js]
* 权限要求: 无

|   参数名   |   类型   | 必须  |        描述        |                                    示例                                     |
|:-------:|:------:|:---:|:----------------:|:-------------------------------------------------------------------------:|
| encoded | string |  是  | 经过 Unicode 编码的文本 | \u8fd9\u662f\u4e2d\u6587\u548cEnglish\u6df7\u5408\u6d4b\u8bd5\u6587\u672c |

### class:Server
服务器实例管理类
* 定义位置: [server.js]
* 权限要求: **目标路径可读且具有执行权限**

#### Server.constructor
类实例化函数
* 返回值: 无
* 调用类型: 类构造函数
* 调用条件: 无

| 参数名  |   类型   | 必须  |      描述      |                       示例                       |
|:----:|:------:|:---:|:------------:|:----------------------------------------------:|
| path | string |  否  | 目标服务器实例的所在路径 | D:\Program Files (x86)\Origin Games\Titanfall2 |

#### Server.UseLogger
Logger 绑定函数
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|  参数名   |   类型   | 必须  |      描述      |                   示例                    |
|:------:|:------:|:---:|:------------:|:---------------------------------------:|
| logger | Logger |  是  | 要使用的日志模块实例对象 | new Logger.Simple({ root : __dirname }) |

#### Server.SetPath
设置目标服务器实例所在路径
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

| 参数名  |   类型   | 必须  |      描述      |                       示例                       |
|:----:|:------:|:---:|:------------:|:----------------------------------------------:|
| path | string |  是  | 目标服务器实例的所在路径 | D:\Program Files (x86)\Origin Games\Titanfall2 |

#### Server.SetProfile
设置目标服务器启动时所用 profile
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |        描述        |     示例      |
|:-------:|:------:|:---:|:----------------:|:-----------:|
| profile | string |  是  | 目标服务器 profile 名称 | R2Northstar |

#### Server.GetVersion
获取目标服务器实例核心 Mod 版本
* 返回值: `string`
* 调用类型: 实例对象调用
* 调用条件: 无

#### Server.GetName
获取目标服务器实例显示名称
* 返回值: `string`
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.GetAuthPort
获取目标服务器实例 HTTP 认证端口
* 返回值: `number`
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.GetPort
获取目标服务器实例游戏端口
* 返回值: `number`
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.GetPID
获取目标服务器实例进程ID
* 返回值: `number`
* 调用类型: 实例对象调用
* 调用条件: 无

#### Server.Start
启动目标服务器实例进程
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

|   参数名   |   类型   | 必须  |   描述   |         示例          |
|:-------:|:------:|:---:|:------:|:-------------------:|
| ...args | string |  否  | 额外启动参数 | -novid,-disablelogs |

#### Server.Stop
结束目标服务器实例进程
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.Attach
附加到已运行的目标服务器实例进程
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.Restart
重新启动目标服务器实例进程
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 在 `Server.Init` 之后

#### Server.Init
初始化目标服务器实例相关配置信息
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

### class:Checker
在线状态检测类
* 定义位置: [server.js]
* 权限要求: 无

#### Checker.constructor
类实例化函数
* 返回值: 无
* 调用类型: 类构造函数
* 调用条件: 无

|  参数名  |   类型   | 必须  |      描述      |             示例              |
|:-----:|:------:|:---:|:------------:|:---------------------------:|
| host  | string |  否  | 主服务器的 url 地址 | https://nscn.wolf109909.top |
| delay | number |  否  |  两次检查间的延迟秒数  |            5*60             |

#### Checker.UseLogger
Logger 绑定函数
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|  参数名   |   类型   | 必须  |      描述      |                   示例                    |
|:------:|:------:|:---:|:------------:|:---------------------------------------:|
| logger | Logger |  是  | 要使用的日志模块实例对象 | new Logger.Simple({ root : __dirname }) |

#### Checker.Check
手动检查一次在线状态
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

#### Checker.on
注册 Event 响应函数, Events 可参考 [Checker.Events](#checkerevents)
* 继承自: `Events.EventEmitter`

|    参数名    |    类型    | 必须  |    描述    |            示例             |
|:---------:|:--------:|:---:|:--------:|:-------------------------:|
| eventName |  string  |  是  | 要监听的事件名称 |          update           |
| listener  | function |  是  | 处理该事件的函数 | list => console.log(list) |

#### Checker.Events
##### Event:update
在线服务器信息已更新事件, 需通过Checker.on函数使用
* 事件名: `update`

| 参数名  |   类型   |    描述    |        示例         |
|:----:|:------:|:--------:|:-----------------:|
| list | object | 在线的服务器列表 | { server1 : ... } |

### class:Logger
日志模块类
* 定义位置: [Logger.ts], [Simple.js]
* 权限要求: **目录可读写**

#### Logger.constructor
类实例化函数
* 返回值: 无
* 调用类型: 类构造函数
* 调用条件: 无

|   参数名   |   类型   | 必须  |         描述         |          示例          |
|:-------:|:------:|:---:|:------------------:|:--------------------:|
| options | object |  是  | 对应 Logger 指定的可选参数项 | { root : __dirname } |

#### Logger.debug
Debug 等级日志输出
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.log
无等级日志输出
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.info
Info 等级日志输出
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.warn
Warning 等级日志输出
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.error
Error 等级日志输出
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.fatal
Fatal Error 等级日志输出, 会同时结束程序
* 返回值: 无
* 调用类型: 实例对象调用
* 调用条件: 无

|   参数名   |   类型   | 必须  |            描述             |  示例   |
|:-------:|:------:|:---:|:-------------------------:|:-----:|
| format  | string |  否  |   格式字符串, 可参考util.format   | 测试:%s |
| ...args |  any   |  否  | 任意内容, 会传递至 format 字符串内占位符 | Test  |

#### Logger.RegisterModule
注册新的子级 Logger 并获取
* 返回值: `Logger`
* 调用类型: 实例对象调用
* 调用条件: 无

| 参数名  |   类型   | 必须  |      描述       |   示例   |
|:----:|:------:|:---:|:-------------:|:------:|
| name | string |  是  | 子 Logger 模块名称 | Server |

### class:String
对 String 类进行了修改, 增加了2个函数
* 定义位置: [unicode.js]
* 权限要求: 无

#### String.toUnicode
对非纯 ASCII 字符串进行 Unicode 编码
* 返回值: `string`
* 调用类型: 实例对象调用
* 调用条件: 实例为任意字符串

#### String.fromUnicode
将经过 Unicode 编码的字符串转换回字符串对象
* 返回值: `string`
* 调用类型: 对象静态方法
* 调用条件: 无

|   参数名   |   类型   | 必须  |        描述        |                                    示例                                     |
|:-------:|:------:|:---:|:----------------:|:-------------------------------------------------------------------------:|
| encoded | string |  是  | 经过 Unicode 编码的文本 | \u8fd9\u662f\u4e2d\u6587\u548cEnglish\u6df7\u5408\u6d4b\u8bd5\u6587\u672c |

### class:Date
对 Date 类进行了修改, 增加了1个函数
* 定义位置: [date_extend.js]
* 权限要求: 无

#### Date.format
将 Date 格式化为目标字符串
* 返回值: `string`
* 调用类型: 实例对象调用
* 调用条件: 无

|    参数名    |    类型    | 必须  |   描述    |                                        示例                                        |
|:---------:|:--------:|:---:|:-------:|:--------------------------------------------------------------------------------:|
|  format   |  string  |  是  | 目标字符串格式 |                               yyyy-MM-dd hh:mm:ss                                |
| week_list | string[] |  否  |  周显示格式  | \['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'\] |

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
