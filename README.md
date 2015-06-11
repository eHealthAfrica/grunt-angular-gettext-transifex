# grunt-angular-gettext-transifex

Grunt tasks that:

- extract translatable strings from Angular apps and uploads them to Transifex
- downloads translations and compile them

It makes use of [grunt-angular-gettext](https://github.com/rubenv/grunt-angular-gettext) & [grunt-tx](https://github.com/eHealthAfrica/grunt-tx) and assumes that those are configured properly in your project. Please refer to their respective documentation to find out how.

Our workflow is:

- `template.pot` is ignored in git.
- On every successful build on our main branch we run `grunt ng-gettext-transifex-upload`
- `grunt ng-gettext-transifex-download` is run on local machines whenever our translators tell us that the translation are ready and the resulting files are committed to the repo.

This way we prevent that `template.pot` is overwritten with local uploads or work in branches and this is also the reason why the upload task defaults to exit when not run in a CI environment. You can overcome this by providing a environment variable, like this: `CI=true grunt grunt ng-gettext-transifex-upload`

Honestly I'm not really sure if this is useful for any project outside of our setup, but here it is :)

## Getting started

In your project run: `npm install --save grunt-angular-gettext-transifex`.

Then go to your `Gruntfile.js`, include this plugin and add the configuration. Example:

```javascript
// load the plugin
grunt.loadNpmTasks('grunt-angular-gettext-transifex');
```

The plugin exposes two tasks:

- `grunt ng-gettext-transifex-upload` – extracts the translatable strings and uploads them
- `grunt ng-gettext-transifex-download` – downloads the translations and compiles them

## License

Apache 2.0, see [LICENSE](/LICENSE)

## Author

© 2015 [Robin Mehner](http://coding-robin.de) for [eHealth Systems Africa](http://ehealthafrica.org)
