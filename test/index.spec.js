const { equal } = require('assert')
const knex = require('knex')
const db = knex({ client: 'sqlite3', connection: ':memory:', useNullAsDefault: true })
const bookshelf = require('bookshelf')(db)
const caseConverter = require('..')

describe('Case Converter Plugin', function() {
  var Author
  var author

  before(function() {
    bookshelf.plugin(caseConverter)

    Author = bookshelf.Model.extend({ tableName: 'authors' })
    author = new Author()

    return db.schema.createTable('authors', table => {
      table.increments('id')
      table.string('first_name')
      table.string('last_name')
    })
  })

  beforeEach(() => {
    return db('authors')
      .truncate()
      .then(() => {
        return db('authors').insert([{ first_name: 'Leia', last_name: 'Organa' }])
      })
  })

  after(() => db.destroy())

  describe('Model#parse()', function() {
    it('converts snake case attributes to camel case', function() {
      var parsedAttributes = author.parse({
        first_name: 'Aayla',
        last_name: 'Secura'
      })

      equal(parsedAttributes.firstName, 'Aayla')
    })

    it('converts attributes to camel case when fetching data from the database', function() {
      return new Author({ id: 1 }).fetch().then(function(author) {
        equal(typeof author.attributes.firstName, 'string')
        equal(author.attributes.first_name, undefined)
        equal(author.get('firstName'), 'Leia')
      })
    })
  })

  describe('Model#format()', function() {
    it('converts camel case attributes to snake case', function() {
      var formattedAttributes = author.format({
        firstName: 'Aayla',
        lastName: 'Secura'
      })
      equal(formattedAttributes.first_name, 'Aayla')
    })

    it('converts attributes to snake case when saving data to the database', function() {
      return new Author({ firstName: 'Aayla', lastName: 'Secura' }).save().then(function(author) {
        equal(typeof author.attributes.id, 'number')
        equal(author.isNew(), false)
      })
    })
  })
})
