# Changelog

## [Unreleased]

### Added

* __docs__: add English version Changelog.

## [1.2.0] - 2022-10-06

### Added

* __playlist__: add playlist parser for override([3fc18ba6]).
* __utils__: add `Date.prototype.format` method([239cb451]).
* __logger__: add logger template class([8061475e]).
* __logger__: add Simple Logger class([8061475e]).
* __main__: add runtime log support([bd2a1d37]).
* __checker__: add runtime log support([498097f4]).
* __server__: add runtime log support([6bf6cd73]).

### Changed

* __utils__: refactor `Arguments.parse` function with regex([3f00b563]).
* __utils__: refactor `Arguments.stringify` function for regex([bb6f7dda]).
* __logger__: change root modules display style([2e67d133]).
* __logger__: change logger modules export path([9623a800]).

### Fixed

* __utils__: fix parse arguments without type flag([d38c2bfb]).
* __utils__: fix arguments stringify error([bb6f7dda]).

## [1.1.0] - 2022-09-30

### Added

* __main__: support attach to saved server process([25db07e3]).
* __checker__: support change master server address([6036d667]).

### Changed

* __server__: now server object need initialize manual([04a0c6c6]).

### Fixed

* __server__: fix parse argument with wrong param type([9748b24d]).
* __server__: fix online check timer bind([012860cf]).

### Removed

* __monitor__: remove monitor thread file([cc5ffb4f]).

## [1.0.0] - 2022-09-21

Transform to async monitor

### Added

* __utils__: add custom unicode encode&decode functions([8a888e17]).
* __utils__: add arguments parser for startup arguments([c72342a9]).
* __server__: add server class for Northstar server([cf807069]).
* __checker__: add online checker class for Northstar server([0023b867]).

### Changed

* __utils__: move config parser from monitor to new file([836e6fb3]).

### Removed

* Remove ~~`CreateWorker`~~([2758c372]).
* Remove ~~`RespawnNorthstar`~~([2758c372]).
* Remove ~~`SpawnNorthstar`~~([2758c372]).
* Remove ~~`CheckAlive`~~([2758c372]).
* Remove ~~`ExitHandler`~~([2758c372]).

### Deprecated

* Deprecated monitor thread([2758c372]).

## [0.1.0-alpha] - 2022-09-12

Just auto keep alive for Northstar server

### Added

* auto online check.
* restart on process exit.
* multi-thread based monitor.

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

[Unreleased]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/compare/v0.1.0...v1.0.0
[0.1.0-alpha]: https://github.com/R2NorthstarCN/Northstar_Server_Daemon_JSEdition/commits/v0.1.0
