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
