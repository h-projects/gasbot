# 3.0.0 (2021-10-09)


### Bug Fixes

* add permissions check for logs ([1db47ce](https://github.com/h-projects/gasbot/commit/1db47ceb068217eaadb4c5eaabf314812d56d702))
* channel can be null when checking permissions ([2c3b268](https://github.com/h-projects/gasbot/commit/2c3b268037a9bc69b1d7cf06e0ec0ef856369f7d))
* check for `guild.available` instead of `guild.deleted` ([385e8c4](https://github.com/h-projects/gasbot/commit/385e8c4962678f35c2f9d1d705a31c3baa5e062f))
* **components:** correct variable name for permissions check ([7312b85](https://github.com/h-projects/gasbot/commit/7312b85907b1db78feb2013df939e8893b52b257))
* **detector:** bad letter in levelNames ([b056a12](https://github.com/h-projects/gasbot/commit/b056a12b8c80806bcf920a2409691751fc12b641))
* **detector:** remove `.` from content ([0cb3e09](https://github.com/h-projects/gasbot/commit/0cb3e097361cf91cef16a51fd07009aab2255115))
* **detector:** return false when no content ([f4b5831](https://github.com/h-projects/gasbot/commit/f4b5831fec4e44d4aa158dc0600110228efe2803))
* eslint errors ([f119d88](https://github.com/h-projects/gasbot/commit/f119d88d2cfff90cd5c619859532f3d29fa7179a))
* **g-spy:** add editable check ([fa82db5](https://github.com/h-projects/gasbot/commit/fa82db5e2e6703373d4f6f929c930941bae773af))
* **help:** rename `config.owners` to `config.developers` ([d00f676](https://github.com/h-projects/gasbot/commit/d00f676b8c477e6d0b14b3ccdea9dc271570d197))
* message detector doesn't return true ([aeb15e2](https://github.com/h-projects/gasbot/commit/aeb15e212dfa8d17e19974fa3c2929e724ca8e78))
* readd id ([93b1b93](https://github.com/h-projects/gasbot/commit/93b1b93c0f26e685ae1d940172c7ac457298e4e8))
* unintended eslint setting ([5cee802](https://github.com/h-projects/gasbot/commit/5cee802d3c6772ef16eeecbff86aa082a3576633))


### Features

* add application command dev tool ([d71197c](https://github.com/h-projects/gasbot/commit/d71197cc4fc4c66c592ed9246639ad3e5fa7c02c))
* add credits command ([88d5541](https://github.com/h-projects/gasbot/commit/88d554149199b940d8a1fb58e3ac8a8b3d19dcf5))
* add database backup ([6e412b5](https://github.com/h-projects/gasbot/commit/6e412b55e2c649e3408d42350fa90a9a698cdeca))
* add detection to prefix input ([a0cef10](https://github.com/h-projects/gasbot/commit/a0cef10cbac2b778c7b73766d002cdae12c443e6))
* add global logs ([c1dfc77](https://github.com/h-projects/gasbot/commit/c1dfc771cfb759114d549253f3df18893e723d2a))
* add info command ([6c955ad](https://github.com/h-projects/gasbot/commit/6c955ad29f98c7d8b60760c4a7b024d1c98a1a8c))
* add links command ([fb0c6cb](https://github.com/h-projects/gasbot/commit/fb0c6cb068e7a185c03ea88529fc033d225abcf2))
* add sql dev command ([a1f4968](https://github.com/h-projects/gasbot/commit/a1f496865719dc6c636540769292a5fd8ac1c355))
* bot join and leave logs ([722abcf](https://github.com/h-projects/gasbot/commit/722abcfee74031aef6b66f0ad20f74539f2a6d75))
* bot permissions check and fixes ([775f410](https://github.com/h-projects/gasbot/commit/775f410747553254ab2928d17bb1d4d988e0c9dd))
* context menus ([8c45dbf](https://github.com/h-projects/gasbot/commit/8c45dbf11a30e42731875d3388ba7f1ad7250903))
* detector whitelist ([2637c18](https://github.com/h-projects/gasbot/commit/2637c18b6ef3a977dbe3833cc1ece24ceb9574ae))
* **detector:** add database logic ([259b413](https://github.com/h-projects/gasbot/commit/259b413813b1d8a2289cf9c537cc5f5b1a9e08e1))
* disallow bots in g-spy ([3bfb865](https://github.com/h-projects/gasbot/commit/3bfb865c83fdc41396a20d0546075a4988421948))
* dynamic prefix ([22126fe](https://github.com/h-projects/gasbot/commit/22126fee82fb1ad752da56359adf64d25714289f))
* edited message detector ([e2e12e2](https://github.com/h-projects/gasbot/commit/e2e12e2e8aecf3b5478bd424a0974d9d49565805))
* **fun:** add more fun commands ([a002d5d](https://github.com/h-projects/gasbot/commit/a002d5d39e7e544414ee3af2dd80c5c89f1bcc32))
* h command ([bcb71e7](https://github.com/h-projects/gasbot/commit/bcb71e794609ba7ba03d80d2775e3eeb346735e4))
* initial sqlite3 implementation ([6b8a349](https://github.com/h-projects/gasbot/commit/6b8a3494cbe01c984932759dfb45f83ef9d884bc))
* **logs:** add reset button ([339a94f](https://github.com/h-projects/gasbot/commit/339a94f757d424a6d5c239d69755fa63d52756a3))
* loqs command ([2931842](https://github.com/h-projects/gasbot/commit/293184231618e805e6f177a9bd9271c0e84ffb66))
* meme command ([2b3b15d](https://github.com/h-projects/gasbot/commit/2b3b15d68b3779f0b757bbbe4b30fffbf5381ebb))
* message detector ([972f111](https://github.com/h-projects/gasbot/commit/972f111a7b825a4995a63ee2ea11114dc23d8324))
* nickname detector ([2c65b72](https://github.com/h-projects/gasbot/commit/2c65b720eed231bf55fb4bb8a2b6b6bf93040bb7))
* permissions check ([7eb48d6](https://github.com/h-projects/gasbot/commit/7eb48d63099a9968c6fc8087c43f15ed7df3f7d0))
* prefix check when mentioning ([0b80539](https://github.com/h-projects/gasbot/commit/0b8053966cd9e89e05b729891b3ebacb981df3f9))
* reaction detector ([f2cd13b](https://github.com/h-projects/gasbot/commit/f2cd13b923413e4452dcce5b33bd38273fb5e226))
* removed command ([24f2a44](https://github.com/h-projects/gasbot/commit/24f2a4406ead1962c82030f12ac03aaf563d726b))
* send messages check ([629e1b7](https://github.com/h-projects/gasbot/commit/629e1b72bac0914878c7ef08f2435f98e32ef12e))
* support guild avatars ([2357ffa](https://github.com/h-projects/gasbot/commit/2357ffa21d6bffba7feb012559dba351498576d0))
* top.gg stats poster ([4691bf7](https://github.com/h-projects/gasbot/commit/4691bf7249e05d2bc95416f88d344510f6879f4b))


### Reverts

* eslint test code ([c57ca6d](https://github.com/h-projects/gasbot/commit/c57ca6d4cb56488938297812436cdd0cb38507c5))



