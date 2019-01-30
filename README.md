# OPRF Info Page

A simple website and API for viewing information an OPRF student would want to
know.

## Developing

Ensure that you have [NodeJS](https://nodejs.org) and
[Yarn](https://yarnpkg.com) installed (also that you're on linux but that may
change).

Run in command line:

```sh
git clone https://github.com/oprf-programming-club/oprf-info-page
cd oprf-info-page
yarn

# don't actually run this ↓
while [[ $developing ]]; do

  yarn start
  # or, if you're on https://coder.com
  yarn start:coder

  # Navigate to http://localhost:5000 or
  # whatever "80" URL is in the sidebar in coder

done
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file
for more details
