const { equal } = require('assert')
const knex = require('knex')
const db = knex({ client: 'sqlite3', connection: ':memory:', useNullAsDefault: true })
const caseConverter = require('..')

describe('Case Converter Plugin integration tests', function () {
  let bookshelf

  beforeEach(() => {
    bookshelf = require('bookshelf')(db)
  })

  it('does not override other plugins that modify the parse method', function () {
    function testPlugin(bookshelf) {
      bookshelf.Model = bookshelf.Model.extend({
        parse(attrs) {
          const parsed = {}
          for (const attr in attrs) {
            parsed[`${attr}_parsed`] = attrs[attr]
          }
          return parsed
        }
      })
    }

    bookshelf.plugin([testPlugin, caseConverter])

    const TestModel = bookshelf.Model.extend({ tableName: 'users' })
    const testModel = new TestModel()
    const parsedAttributes = testModel.parse({ first_name: 'Aayla' })

    equal('firstNameParsed' in parsedAttributes, true, 'Expected parsed attributes to include "firstNameParsed"')
    equal(parsedAttributes.firstNameParsed, 'Aayla')
  })

  it('does not override other plugins that modify the format method', function () {
    function testPlugin(bookshelf) {
      bookshelf.Model = bookshelf.Model.extend({
        format(attrs) {
          const formatted = {}
          for (const attr in attrs) {
            formatted[`${attr}Formatted`] = attrs[attr]
          }
          return formatted
        }
      })
    }

    bookshelf.plugin([testPlugin, caseConverter])

    const TestModel = bookshelf.Model.extend({ tableName: 'users' })
    const testModel = new TestModel()
    const formattedAttributes = testModel.format({ firstName: 'Aayla' })

    equal(
      'first_name_formatted' in formattedAttributes,
      true,
      'Expected parsed attributes to include "first_name_formatted"'
    )
    equal(formattedAttributes.first_name_formatted, 'Aayla')
  })
})
