# grunt-angular-gettext-transifex

Grunt tasks that:

- extract translatable strings from Angular apps and uploads them to Transifex
- downloads translations and compile them

It makes use of [grunt-angular-gettext](https://github.com/rubenv/grunt-angular-gettext) & [grunt-tx](https://github.com/eHealthAfrica/grunt-tx) and assumes that those are configured properly in your project. Please refer to their respective documentation to find out how.

## Workflow

- `template.pot` is ignored in git.
- On every successful build on our main branch we run `grunt ng-gettext-transifex-upload`
- `grunt ng-gettext-transifex-download` is run on local machines whenever our translators tell us that the translation are ready and the resulting files are committed to the repo.

This way we prevent that `template.pot` is overwritten with local uploads or work in branches, which can lead to data loss. This is also the reason why the upload task defaults to exit when not run in a CI environment. You can overcome this by providing a environment variable, like this: `CI=true grunt grunt ng-gettext-transifex-upload`

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

## Setup for TravisCI

As described our upload workflow is fully automated on [TravisCI](http://travis-ci.org). You need to have the [travis CLI tool](https://github.com/travis-ci/travis) installed and we assume that you have [grunt-angular-gettext](https://github.com/rubenv/grunt-angular-gettext) & [grunt-tx](https://github.com/eHealthAfrica/grunt-tx) properly configured in your project, follow these steps to get the same results as we do:

1. `travis encrypt TRANSIFEX_USER=YOUR_TRANSIFEX_USERNAME --add`
2. `travis encrypt TRANSIFEX_PASSWORD=YOUR_TRANSIFEX_PASSWORD --add`
3. Add a script to your repository which goes along the lines of this:
    ```bash
    #!/usr/bin/env bash
    set -e

    # Don't upload if we're in a pull request
    [[ "$TRAVIS_PULL_REQUEST" == "false" ]] || {
      exit 0;
    }

    # Don't upload if we're in a branch
    [[ "$TRAVIS_BRANCH" == "Your branch, which is probably master" ]] || {
      exit 0;
    }

    # Don't upload if we're in a fork
    [[ "$TRAVIS_REPO_SLUG" == "githubusername/reponame" ]] || {
      exit 0;
    }

    grunt ng-gettext-transifex-upload
    ```

4. Make that script executable `chmod +x ./path/to_script_above.sh`
5. Add this to your `.travis.yml`
    ```yaml
    after_success:
      - /path/to_script_above.sh
    ```
6. Commit everything, push and be happy :)

## Example project

Have a look at [eHealthAfrica/move](github.com/eHealthAfrica/move) to see an example of our projects using it.

## License

Apache 2.0, see [LICENSE](/LICENSE)

## Author

© 2015 [Robin Mehner](http://coding-robin.de) for [eHealth Systems Africa](http://ehealthafrica.org)
