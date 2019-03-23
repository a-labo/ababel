ababel
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/a-labo/ababel
[bd_travis_url]: http://travis-ci.org/a-labo/ababel
[bd_travis_shield_url]: http://img.shields.io/travis/a-labo/ababel.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/a-labo/ababel
[bd_travis_com_shield_url]: https://api.travis-ci.com/a-labo/ababel.svg?token=
[bd_license_url]: https://github.com/a-labo/ababel/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/a-labo/ababel
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/a-labo/ababel.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/a-labo/ababel.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/a-labo/ababel
[bd_gemnasium_shield_url]: https://gemnasium.com/a-labo/ababel.svg
[bd_npm_url]: http://www.npmjs.org/package/ababel
[bd_npm_shield_url]: http://img.shields.io/npm/v/ababel.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Compile with babel only when file changed from last time.

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install ababel --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const ababel = require('ababel')

void async function () {
  await ababel('**/*.jsx', {
    cwd: 'src',
    out: 'dest',
    minified: true,
    presets: ['es2015', 'react']
  })
}().catch((err) => console.error(err))


```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Signature.md.hbs" Start -->

<a name="section-doc-guides-03-signature-md"></a>

Signature
---------

`ababel(pattern, options) -> Promise`

### Params

| Name | Type | Description |
| ----- | --- | -------- |
| pattern | string | Glob file name pattern |
| options | Object | Optional settings |
| options.cwd | string | Current working directory path |
| options.out | string | Output directory path |
| options.minified | boolean | Minified or not |
| options.reflects | string[] | File patterns to reflects changes |



<!-- Section from "doc/guides/03.Signature.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/a-labo/ababel/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [Babel][babel_url]

[babel_url]: https://babeljs.io/

<!-- Links End -->
