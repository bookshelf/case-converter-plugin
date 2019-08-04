# Bookshelf Case Converter Plugin

Bookshelf plugin for handling the conversion between the database's snake_cased and a model's camelCased properties
automatically.

## How to use

First load the plugin using `bookshelf.plugin('case-converter')`. No further action is required, since the plugin will
automatically convert model attributes between snake_case and camelCase.

## Limitations

Note that there are some limitations to the way this plugin works. When you access query methods directly, there will be
no conversion, meaning that you have to use the actual database column names in this case. The following methods do no
work with this plugin yet:

- [model.query()](https://bookshelfjs.org/api.html#Model-instance-query)
- [model.where()](https://bookshelfjs.org/api.html#Model-instance-where)
- [collection.query()](https://bookshelfjs.org/api.html#Collection-instance-query)
