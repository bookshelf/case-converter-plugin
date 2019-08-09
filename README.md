# Bookshelf Case Converter Plugin

[![Build Status](https://travis-ci.com/bookshelf/case-converter-plugin.svg?branch=master)](https://travis-ci.com/bookshelf/case-converter-plugin)

This is a plugin for the [Bookshelf Node.js ORM](https://bookshelfjs.org/) that handles the conversion between the
database's snake_cased and a model's camelCased properties automatically.

## How to use

First install the package:

    npm install bookshelf-case-converter-plugin

Then load the plugin using `bookshelf.plugin('bookshelf-case-converter-plugin')`. No further action is required, since
the plugin will automatically convert model attributes between snake_case and camelCase.

## Limitations

Note that there are some limitations to the way this plugin works. When you access query methods directly, there will be
no conversion, meaning that you have to use the actual database column names in this case. The following methods do no
work with this plugin yet:

- [model.query()](https://bookshelfjs.org/api.html#Model-instance-query)
- [model.where()](https://bookshelfjs.org/api.html#Model-instance-where)
- [collection.query()](https://bookshelfjs.org/api.html#Collection-instance-query)
