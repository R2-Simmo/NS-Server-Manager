# 更新日志

[English]|简体中文

## [未发布的版本]

### 新增

* __docs__: 添加了英语版本的Changelog

## [1.2.0] - 2022-10-06

### 新增

* __playlist__: 为 playlist override 添加了解析器([3fc18ba6]).
* __utils__: 添加了 `Date.prototype.format` 方法([239cb451]).
* __logger__: 添加了 Logger 模板类([8061475e]).
* __logger__: 添加了简单的 Logger 类实现([8061475e]).
* __main__: 添加了运行时日志支持([bd2a1d37]).
* __checker__: 添加了运行时日志支持([498097f4]).
* __server__: 添加了运行时日志支持([6bf6cd73]).

### 修改

* __utils__: 使用正则表达式重构了 `Arguments.parse` 方法([3f00b563]).
* __utils__: 为使用了正则表达式的模块重构 `Arguments.stringify` 方法([bb6f7dda]).
* __logger__: 修改了顶级模块的日志输出显示样式([2e67d133]).
* __logger__: 修改了日志模块的路径格式([9623a800]).

### 修复

* __utils__: 修复了解析 argument 时丢失项标志的问题([d38c2bfb]).
* __utils__: 修复了将对象转为 argument 字符串时的错误([bb6f7dda]).

## [1.1.0] - 2022-09-30

### 新增

* __main__: 现在支持附加到已保存的服务器进程([25db07e3]).
* __checker__: 现在支持设置 master server 的 url 地址([6036d667]).

### 修改

* __server__: 现在需要显式初始化 server 实例([04a0c6c6]).

### 修复

* __server__: 修复了解析 argument 时传递的参数类型不符的问题([9748b24d]).
* __server__: 修复了定时器绑定的实例不正确的问题([012860cf]).

### 已移除

* __monitor__: 移除了 monitor 线程相关文件([cc5ffb4f]).

## [1.0.0] - 2022-09-21

迁移至异步状态检测模式

### 新增

* __utils__: 添加了自制的 Unicode 编解码函数([8a888e17]).
* __utils__: 添加了启动参数的解析模块([c72342a9]).
* __server__: 添加了 Server 类用于管理单个 Northstar Server 进程([cf807069]).
* __checker__: 添加了服务器列表检查模块([0023b867]).

### 修改

* __utils__: 将配置文件解析函数移动至新的文件([836e6fb3]).

### 已移除

* 删除了 ~~`CreateWorker`~~ 方法([2758c372]).
* 删除了 ~~`RespawnNorthstar`~~ 方法([2758c372]).
* 删除了 ~~`SpawnNorthstar`~~ 方法([2758c372]).
* 删除了 ~~`CheckAlive`~~ 方法([2758c372]).
* 删除了 ~~`ExitHandler`~~ 方法([2758c372]).

### 已弃用

* 现在, monitor 线程已被弃用([2758c372]).

## [0.1.0-alpha] - 2022-09-12

简单的 Northstar 服务器保活程序

### 新增

* 自动的在线检测
* 自动进程重启
* 基于多线程的 monitor

[6bf6cd73]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/6bf6cd73d38b83af10062d006c838ba69bc8e22c
[498097f4]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/498097f41c02e6cb2d10c6ed71c11cd724efaea3
[bd2a1d37]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/bd2a1d37c18caa5df2556321d5ce4a839090bf86
[2e67d133]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/2e67d13386a453650075266f42baf2615fa91225
[9623a800]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/9623a8005364e9aa11c6116b085be8c125e0f287
[8061475e]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/8061475e0941019976ac5e970f47b2e836dc90bc
[239cb451]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/239cb4516737063ea7b4cb2d6a830d1e02ac6ae1
[bb6f7dda]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/bb6f7ddad47fee3f9932a28751a829dc0afd4081
[d38c2bfb]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/d38c2bfbf420c5477debcf383311853d3a54d429
[3f00b563]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/3f00b5637f8d7408b8fdba723a75917b3f996fe9
[3fc18ba6]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/3fc18ba6265f8fecb4ba1ca6a75a21d7704273b0

[25db07e3]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/25db07e318624a6650b86678b1d5621bcf00ab08
[04a0c6c6]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/04a0c6c6976a28dbb42a0906cebef022b7a67160
[012860cf]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/012860cf7b73487481464560c9b7535d8607f91e
[9748b24d]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/9748b24d73be2f77cbe8ae078261736a5d1d7fe2
[6036d667]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/6036d66703581c27c5f93ad03ffe9a6de8853928
[cc5ffb4f]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/cc5ffb4fc4feb92605c504ca11fe4538776abb2a

[2758c372]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/2758c37208ec7f41ae5c924abe60a0e4dcf2a568
[0023b867]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/0023b867ce6fa42cecbf5a2cd2a0f046e5baa800
[cf807069]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/cf8070696d4c8f0679307d4f7bd2725dd750e326
[836e6fb3]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/836e6fb3d76a42743abc2390a8a05969779aaacc
[c72342a9]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/c72342a9783d5cd59eab992eea13732138f3898c
[8a888e17]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commit/8a888e17244a3744bf202af73958f4f1d38aa3e1

[未发布的版本]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v0.1.0...v1.0.0
[0.1.0-alpha]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commits/v0.1.0

[简体中文]: /docs/CHANGELOG.ZH-CN.md
[English]: /CHANGELOG.md
