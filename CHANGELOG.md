## [3.5.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.5.0...v3.5.1) (2023-10-20)


### Bug Fixes

* **#49:** use splitAtom instead of immutable object path ([#50](https://github.com/MiroslavPetrik/form-atoms-field/issues/50)) ([7fb372b](https://github.com/MiroslavPetrik/form-atoms-field/commit/7fb372b37ea5e6db405915563d5c461c7b070534)), closes [#49](https://github.com/MiroslavPetrik/form-atoms-field/issues/49)

# [3.5.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.4.0...v3.5.0) (2023-10-16)


### Features

* clear file input value via atomEffect ([#47](https://github.com/MiroslavPetrik/form-atoms-field/issues/47)) ([e124aaa](https://github.com/MiroslavPetrik/form-atoms-field/commit/e124aaaa3c9281e509c6418be31fefafc355055e))

# [3.4.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.3.3...v3.4.0) (2023-07-12)


### Features

* **PlaceholderOption:** separate placeholder from useOptions fixes [#45](https://github.com/MiroslavPetrik/form-atoms-field/issues/45) [#43](https://github.com/MiroslavPetrik/form-atoms-field/issues/43) ([b2f4726](https://github.com/MiroslavPetrik/form-atoms-field/commit/b2f4726cfe5bd85b429a18127cebde8e3020e903))

## [3.3.3](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.3.2...v3.3.3) (2023-07-03)


### Bug Fixes

* **Select:** optional field can be cleared by clicking on the placeholder (fixes [#44](https://github.com/MiroslavPetrik/form-atoms-field/issues/44)) ([096deae](https://github.com/MiroslavPetrik/form-atoms-field/commit/096deaea6c399d4cdb994ec2da3a84450a08aee4))

## [3.3.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.3.1...v3.3.2) (2023-06-14)


### Bug Fixes

* **Select:** make immune to react-key render bug when shuffling options ([6d52da8](https://github.com/MiroslavPetrik/form-atoms-field/commit/6d52da8c81ec5a7c4d9681a6d36cd6fa7daa9cef))

## [3.3.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.3.0...v3.3.1) (2023-06-14)


### Bug Fixes

* exclude story components from build ([1f1cb10](https://github.com/MiroslavPetrik/form-atoms-field/commit/1f1cb100ba622d8167d4467e7bde4b824472547a))

# [3.3.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.2.0...v3.3.0) (2023-06-07)


### Features

* add dateField ([#41](https://github.com/MiroslavPetrik/form-atoms-field/issues/41)) ([c2066ab](https://github.com/MiroslavPetrik/form-atoms-field/commit/c2066ab5c68832b7606ffd3207360b80a25cd444))

# [3.2.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.1.0...v3.2.0) (2023-06-02)


### Bug Fixes

* add formStory ([c3a3328](https://github.com/MiroslavPetrik/form-atoms-field/commit/c3a332849c24a68fae411c7495ee4dcf67fc7520))


### Features

* list field ([#38](https://github.com/MiroslavPetrik/form-atoms-field/issues/38)) ([ce51657](https://github.com/MiroslavPetrik/form-atoms-field/commit/ce516574ef992e4adcd7f9871ae8cc5a7f195ba4))

# [3.1.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.0.2...v3.1.0) (2023-06-01)


### Features

* filesField as arrayField ([#36](https://github.com/MiroslavPetrik/form-atoms-field/issues/36)) ([946268c](https://github.com/MiroslavPetrik/form-atoms-field/commit/946268c482029f1821c412d989827fd5368c4fc8)), closes [#30](https://github.com/MiroslavPetrik/form-atoms-field/issues/30)

## [3.0.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.0.1...v3.0.2) (2023-05-18)


### Bug Fixes

* **#34:** for required field, indicate aria-valid only after validation ([334d276](https://github.com/MiroslavPetrik/form-atoms-field/commit/334d276bf08b36e6a012caa60164cff68b161712)), closes [#34](https://github.com/MiroslavPetrik/form-atoms-field/issues/34)

## [3.0.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.0.0...v3.0.1) (2023-05-18)


### Bug Fixes

* optional zod field as field atom ([3b1ea99](https://github.com/MiroslavPetrik/form-atoms-field/commit/3b1ea99fe87f2e170406f23081e474219256484a))

# [3.0.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.14...v3.0.0) (2023-05-17)


* Next (#32) ([a446e33](https://github.com/MiroslavPetrik/form-atoms-field/commit/a446e33c9102874b5afdccbe5963068046469781)), closes [#32](https://github.com/MiroslavPetrik/form-atoms-field/issues/32) [#29](https://github.com/MiroslavPetrik/form-atoms-field/issues/29)


### BREAKING CHANGES

* optional field via .optional() method


fix: optional checkbox in radio & required
* switch submit value based on required/optional g param
* optional field via .optional() method ([de99234](https://github.com/MiroslavPetrik/form-atoms-field/commit/de99234ec45d9cdc53b4750b61abaa8531eb7012))

### BREAKING CHANGES

* switch submit value based on required/optional g param

closes 29

* fix: revert checkbox field props

* chore(release): 3.0.0-next.2

# [3.0.0-next.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.0.0-next.1...v3.0.0-next.2) (2023-05-17)

### Bug Fixes

* revert checkbox field props ([09a4d80](https://github.com/MiroslavPetrik/form-atoms-field/commit/09a4d80bee4d09b6b5f2f4068ec5046a341d4850))

# [3.0.0-next.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v3.0.0-next.1...v3.0.0-next.2) (2023-05-17)


### Bug Fixes

* revert checkbox field props ([09a4d80](https://github.com/MiroslavPetrik/form-atoms-field/commit/09a4d80bee4d09b6b5f2f4068ec5046a341d4850))

# [3.0.0-next.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.14...v3.0.0-next.1) (2023-05-17)


* BREAKING CHANGE: optional field via .optional() method ([de99234](https://github.com/MiroslavPetrik/form-atoms-field/commit/de99234ec45d9cdc53b4750b61abaa8531eb7012))


### BREAKING CHANGES

* switch submit value based on required/optional g param

closes 29

## [2.5.14](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.13...v2.5.14) (2023-05-17)


### Bug Fixes

* zod opt schema undefined by default instead of never ([395207e](https://github.com/MiroslavPetrik/form-atoms-field/commit/395207e2e990b9dfcfd9b551b1bc87226e5d78ff))

## [2.5.13](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.12...v2.5.13) (2023-05-17)


### Bug Fixes

* drop schema atom from field ([686a517](https://github.com/MiroslavPetrik/form-atoms-field/commit/686a517447fa97a9a7e87387eef7f8a8c737e6d7))

## [2.5.12](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.11...v2.5.12) (2023-05-16)


### Bug Fixes

* validation on blur when dirty & change when touched ([d550dab](https://github.com/MiroslavPetrik/form-atoms-field/commit/d550dab4626f6df474b62a375629a23c8fae2506))

## [2.5.11](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.10...v2.5.11) (2023-04-10)


### Bug Fixes

* newline for errors ([33e4108](https://github.com/MiroslavPetrik/form-atoms-field/commit/33e410819874b60c2762ef3299f62e24933c8ce0))

## [2.5.10](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.9...v2.5.10) (2023-04-08)


### Bug Fixes

* controlled numberFieldProps ([487c577](https://github.com/MiroslavPetrik/form-atoms-field/commit/487c57779cd7cdcd0b727bb9d289083ba7ce9024))

## [2.5.9](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.8...v2.5.9) (2023-04-07)


### Bug Fixes

* debugLabel with atom id instead of unnamed ([124886f](https://github.com/MiroslavPetrik/form-atoms-field/commit/124886f3e9ce61b5a9880f76f5363122a45796d3))

## [2.5.8](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.7...v2.5.8) (2023-04-07)


### Bug Fixes

* radio control with checkbox field ([20cebc8](https://github.com/MiroslavPetrik/form-atoms-field/commit/20cebc8a0991cc4b45d8331e579d6d3d257c8d63))

## [2.5.7](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.6...v2.5.7) (2023-04-07)


### Bug Fixes

* selectFieldProps reset out-of-bounds values to empty value ([9bc978e](https://github.com/MiroslavPetrik/form-atoms-field/commit/9bc978e90c774a1947458d34535964698ff18017))

## [2.5.6](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.5...v2.5.6) (2023-04-06)


### Bug Fixes

* fileField with array value & SSR support ([4d64c50](https://github.com/MiroslavPetrik/form-atoms-field/commit/4d64c50394b0279fe69dc65c0e6362da2881f1b0)), closes [#19](https://github.com/MiroslavPetrik/form-atoms-field/issues/19)

## [2.5.5](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.4...v2.5.5) (2023-03-16)


### Bug Fixes

* decouple requirement indicator from the requiredProps hook ([b7bcc4d](https://github.com/MiroslavPetrik/form-atoms-field/commit/b7bcc4d245439f7a0b6919b9c004368b9dcacad9))

## [2.5.4](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.3...v2.5.4) (2023-03-16)


### Bug Fixes

* MultiSelect - initialize options value from field ([83f1587](https://github.com/MiroslavPetrik/form-atoms-field/commit/83f15871f76e50877aecbb59689967ba6b03233c))

## [2.5.3](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.2...v2.5.3) (2023-03-14)


### Bug Fixes

* select initialized for object value ([9695c40](https://github.com/MiroslavPetrik/form-atoms-field/commit/9695c40894643b5cb77019e362b330f772a06c65))

## [2.5.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.1...v2.5.2) (2023-03-14)


### Bug Fixes

* react warning about select option being selected ([004dd89](https://github.com/MiroslavPetrik/form-atoms-field/commit/004dd8996203108aee35256a5f9de9b1fb86402f))

## [2.5.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.5.0...v2.5.1) (2023-03-14)


### Bug Fixes

* select clears to empty value when form reset ([9c1925b](https://github.com/MiroslavPetrik/form-atoms-field/commit/9c1925bc5308b59274a3032467a1a226338acc59))

# [2.5.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.4.2...v2.5.0) (2023-03-14)


### Features

* checkbox group export ([0a7d756](https://github.com/MiroslavPetrik/form-atoms-field/commit/0a7d7561a4623ef189183357aeb42ce9e75a7803)), closes [#24](https://github.com/MiroslavPetrik/form-atoms-field/issues/24) [#23](https://github.com/MiroslavPetrik/form-atoms-field/issues/23)

## [2.4.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.4.1...v2.4.2) (2023-03-13)


### Bug Fixes

* placeholder value as -1 ([0afa86f](https://github.com/MiroslavPetrik/form-atoms-field/commit/0afa86f2a5c73ba87d2835efe92cc011f466a550))

## [2.4.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.4.0...v2.4.1) (2023-03-13)


### Bug Fixes

* bump versions ([24814df](https://github.com/MiroslavPetrik/form-atoms-field/commit/24814df84b8eb1aa93080e570dc632d764238c79))

# [2.5.0-next.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.4.1-next.1...v2.5.0-next.1) (2023-03-13)


### Features

* checkbox group ([c3e1b0f](https://github.com/MiroslavPetrik/form-atoms-field/commit/c3e1b0f119547864ec960e8f6165281873fda4d1))

## [2.4.1-next.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.4.0...v2.4.1-next.1) (2023-03-12)


### Bug Fixes

* UseOptionsProps name ([128fc26](https://github.com/MiroslavPetrik/form-atoms-field/commit/128fc261af2f9b07cfdd66ca4be0450149a7b5b2))

# [2.4.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.3.1...v2.4.0) (2023-03-05)


### Bug Fixes

* field naming ([795abe7](https://github.com/MiroslavPetrik/form-atoms-field/commit/795abe7bd4e7567b53fbfb2a1dadeee3aead2f5f))


### Features

* Select with multiple prop ([7b15833](https://github.com/MiroslavPetrik/form-atoms-field/commit/7b158335c81e92663e0ada78d5f889c73c204698)), closes [#25](https://github.com/MiroslavPetrik/form-atoms-field/issues/25)

## [2.3.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.3.0...v2.3.1) (2023-03-05)


### Bug Fixes

* select placeholder value ([60cbd70](https://github.com/MiroslavPetrik/form-atoms-field/commit/60cbd709ea50b7a8433dd7789bcd59a583779b4d)), closes [#22](https://github.com/MiroslavPetrik/form-atoms-field/issues/22)

# [2.3.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.2.0...v2.3.0) (2023-03-05)


### Features

* Select ([95ab917](https://github.com/MiroslavPetrik/form-atoms-field/commit/95ab9172000eab0bc23cccc621b3c92bb2a1800f))

# [2.2.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.1.2...v2.2.0) (2023-03-05)


### Features

* RadioGroup ([259e6b2](https://github.com/MiroslavPetrik/form-atoms-field/commit/259e6b2e988cf8c29afec1616228bc3af78a810a))

## [2.1.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.1.1...v2.1.2) (2023-03-05)


### Bug Fixes

* export useOptionFieldProps ([a2f84bd](https://github.com/MiroslavPetrik/form-atoms-field/commit/a2f84bd9831b89a1fe8c35900f779afea57979c4))

## [2.1.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.1.0...v2.1.1) (2023-03-05)


### Bug Fixes

* normalize option hooks prop type names ([389ae92](https://github.com/MiroslavPetrik/form-atoms-field/commit/389ae92ab31a361b8352d08a2b0a11cc8e67b07f))

# [2.1.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v2.0.0...v2.1.0) (2023-03-04)


### Features

* generic select and radio for primitive fields by coercing schema ([f3419f5](https://github.com/MiroslavPetrik/form-atoms-field/commit/f3419f572c49a11af568329ff82ef2eb08430d09))

# [2.0.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.1.2...v2.0.0) (2023-03-03)


* Next (#20) ([7aeb138](https://github.com/MiroslavPetrik/form-atoms-field/commit/7aeb13803dd37ac5012451cf5925400a631b151e)), closes [#20](https://github.com/MiroslavPetrik/form-atoms-field/issues/20)


### BREAKING CHANGES

* renamed select&multiselect field as those are not 'real'. For multiselect there is arrayField and the selectField is regular stringField.

selectFieldHook will be made generic to support boolean, number, string, date (all primitive values) selection from list of options.

* chore(release): 2.0.0-next.1

# [2.0.0-next.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.1.2...v2.0.0-next.1) (2023-03-03)

### Code Refactoring

* infer field value from field schema ([378d1b5](https://github.com/MiroslavPetrik/form-atoms-field/commit/378d1b5b32d9b9c55b848e0d4c872aceb3cff6de))

### BREAKING CHANGES

* renamed select&multiselect field as those are not 'real'. For multiselect there is arrayField and the selectField is regular stringField.

selectFieldHook will be made generic to support boolean, number, string, date (all primitive values) selection from list of options.

* docs: update recent changes

* refactor: rename ValidatedField to ZodField

# [2.0.0-next.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.1.2...v2.0.0-next.1) (2023-03-03)


### Code Refactoring

* infer field value from field schema ([378d1b5](https://github.com/MiroslavPetrik/form-atoms-field/commit/378d1b5b32d9b9c55b848e0d4c872aceb3cff6de))


### BREAKING CHANGES

* renamed select&multiselect field as those are not 'real'. For multiselect there is arrayField and the selectField is regular stringField.

selectFieldHook will be made generic to support boolean, number, string, date (all primitive values) selection from list of options.

## [1.1.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.1.1...v1.1.2) (2023-03-03)


### Bug Fixes

* debug labels ([83716a4](https://github.com/MiroslavPetrik/form-atoms-field/commit/83716a44c6f68eb5909632c45c04a72ed3bd9c22))

## [1.1.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.1.0...v1.1.1) (2023-03-01)


### Bug Fixes

* drop redundant multiselect ([5bf2320](https://github.com/MiroslavPetrik/form-atoms-field/commit/5bf2320e8e6a3cb2fdb7b8942a898ca87e9d82b1))
* useSelectOptions based on useOptions ([6e1f282](https://github.com/MiroslavPetrik/form-atoms-field/commit/6e1f2820decef281addb977716f30028683a4f06))

# [1.1.0](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.11...v1.1.0) (2023-03-01)


### Features

* booleanFIeld input hook and demo ([d6957ba](https://github.com/MiroslavPetrik/form-atoms-field/commit/d6957ba4297890db79a56a18e4b7df642de36c57))

## [1.0.11](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.10...v1.0.11) (2023-03-01)


### Bug Fixes

* selectField with scoped id & document radio group example ([f021759](https://github.com/MiroslavPetrik/form-atoms-field/commit/f0217597e3a525bfb42f02587ad5b0247d1f2a36))

## [1.0.10](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.9...v1.0.10) (2023-03-01)


### Bug Fixes

* exclude stories from build/dist ([101c4f7](https://github.com/MiroslavPetrik/form-atoms-field/commit/101c4f72e627d1429c9a7816a37bf025b728d199))

## [1.0.9](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.8...v1.0.9) (2023-02-28)


### Bug Fixes

* dependencies ([65b56f5](https://github.com/MiroslavPetrik/form-atoms-field/commit/65b56f585477e3ad7f3221f6f4d15cd118e2496e))
* drop chakra yarnlock ([0ab9564](https://github.com/MiroslavPetrik/form-atoms-field/commit/0ab956494b868ad33999267c1dee06ca4fcae891))

## [1.0.8](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.7...v1.0.8) (2023-02-28)


### Bug Fixes

* checkboxField without params ([f264619](https://github.com/MiroslavPetrik/form-atoms-field/commit/f264619357db66ae9c753e98d73dd035a37c2761))
* field error default children & field prop id as atom key ([ae3eaf6](https://github.com/MiroslavPetrik/form-atoms-field/commit/ae3eaf6fbdd759ad3acf109fedf43142af15824b))

## [1.0.7](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.6...v1.0.7) (2023-02-28)


### Bug Fixes

* fieldErrors via component ([cac01a3](https://github.com/MiroslavPetrik/form-atoms-field/commit/cac01a30c03168fb1bc828379f5ab9c5bbbf3c4f))
* normalize field value names ([30368dc](https://github.com/MiroslavPetrik/form-atoms-field/commit/30368dcfa6fe79c88319f68ad650000070592fe1))
* radio import ([902e7d6](https://github.com/MiroslavPetrik/form-atoms-field/commit/902e7d69854927c858dca65af10bbf6a3b1c87db))

## [1.0.6](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.5...v1.0.6) (2023-02-27)


### Bug Fixes

* required textField with min 1 length ([eda10d6](https://github.com/MiroslavPetrik/form-atoms-field/commit/eda10d6549650e434ab031862a2920676aefb471))
* selectField w/ required error message ([e7e2e71](https://github.com/MiroslavPetrik/form-atoms-field/commit/e7e2e71fd3130bfe81a30f4ce9e0fc1670334280))

## [1.0.5](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.4...v1.0.5) (2023-02-27)


### Bug Fixes

* numberField w/ required error message ([36c420c](https://github.com/MiroslavPetrik/form-atoms-field/commit/36c420c9d2edfa3eb056ca475cc19a9af0ed6d1d))

## [1.0.4](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.3...v1.0.4) (2023-02-27)


### Bug Fixes

* fileField w/ configurable required message ([97f7ecd](https://github.com/MiroslavPetrik/form-atoms-field/commit/97f7ecd7a2ae997f88b7fd569ba84a7fdf21e98c))

## [1.0.3](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.2...v1.0.3) (2023-02-27)


### Bug Fixes

* add boolean field ([2d93cda](https://github.com/MiroslavPetrik/form-atoms-field/commit/2d93cda9bec8db9f9887f7dc40c8439485006dc1))

## [1.0.2](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.1...v1.0.2) (2023-02-27)


### Bug Fixes

* checkbox field w/ configurable required message ([5355f50](https://github.com/MiroslavPetrik/form-atoms-field/commit/5355f50887dd02efd7b722951668decf8bebe735))

## [1.0.1](https://github.com/MiroslavPetrik/form-atoms-field/compare/v1.0.0...v1.0.1) (2023-02-26)


### Bug Fixes

* array field export add/remove button props ([c54fd3e](https://github.com/MiroslavPetrik/form-atoms-field/commit/c54fd3e42e8e92181cbe4f17a9f13e27c5d55e7c))

# 1.0.0 (2023-02-21)


### Bug Fixes

* chakra-ui/checkbox ([33b12cf](https://github.com/MiroslavPetrik/form-atoms-field/commit/33b12cf158778db7d5b18d1f284ed3701998910f))
* number input controlled & clearable ([fde3331](https://github.com/MiroslavPetrik/form-atoms-field/commit/fde3331da4c1d617511e5cc5a8e28f868eca3b35))
* optional checkbox ([153a710](https://github.com/MiroslavPetrik/form-atoms-field/commit/153a7100bb4e686152e964a2bec4966ec7de7bb3))
* rating field 0 by default ([0b739e4](https://github.com/MiroslavPetrik/form-atoms-field/commit/0b739e4351349c94bc105d40c2313672aa5d4bca))
* shorten fieldAtoms to fields in array field ([5dac894](https://github.com/MiroslavPetrik/form-atoms-field/commit/5dac8943b113a159913dbdc87978ea5be1bc3753))


### Features

* array field with empty message ([b38106e](https://github.com/MiroslavPetrik/form-atoms-field/commit/b38106e88d3207784c5e81fc356a130b1e633f50)), closes [#1](https://github.com/MiroslavPetrik/form-atoms-field/issues/1)
* multiselect & flowbite checkboxgroup ([d3a5a6f](https://github.com/MiroslavPetrik/form-atoms-field/commit/d3a5a6fac90ece1fec0832615323153baf2cd33b))
* use field with validation ([ae08fb0](https://github.com/MiroslavPetrik/form-atoms-field/commit/ae08fb05196af9cb7818a3e5a673d73d59c455b6))

# 1.0.0-next.1 (2023-02-21)


### Bug Fixes

* chakra-ui/checkbox ([33b12cf](https://github.com/MiroslavPetrik/form-atoms-field/commit/33b12cf158778db7d5b18d1f284ed3701998910f))
* number input controlled & clearable ([fde3331](https://github.com/MiroslavPetrik/form-atoms-field/commit/fde3331da4c1d617511e5cc5a8e28f868eca3b35))
* optional checkbox ([153a710](https://github.com/MiroslavPetrik/form-atoms-field/commit/153a7100bb4e686152e964a2bec4966ec7de7bb3))
* rating field 0 by default ([0b739e4](https://github.com/MiroslavPetrik/form-atoms-field/commit/0b739e4351349c94bc105d40c2313672aa5d4bca))
* shorten fieldAtoms to fields in array field ([5dac894](https://github.com/MiroslavPetrik/form-atoms-field/commit/5dac8943b113a159913dbdc87978ea5be1bc3753))


### Features

* array field with empty message ([b38106e](https://github.com/MiroslavPetrik/form-atoms-field/commit/b38106e88d3207784c5e81fc356a130b1e633f50)), closes [#1](https://github.com/MiroslavPetrik/form-atoms-field/issues/1)
* multiselect & flowbite checkboxgroup ([d3a5a6f](https://github.com/MiroslavPetrik/form-atoms-field/commit/d3a5a6fac90ece1fec0832615323153baf2cd33b))
* use field with validation ([ae08fb0](https://github.com/MiroslavPetrik/form-atoms-field/commit/ae08fb05196af9cb7818a3e5a673d73d59c455b6))
