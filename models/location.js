var keystone = require('keystone'),
    Types = keystone.Field.Types,
    async = require('async');

var Location = new keystone.List('Location', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '-publishedDate',
  sortable: true
});

Location.add({
  title: { type: String, required: true, initial: true },
  coordinates: { type: Types.Location, required: true, initial: true },
  telephone: { type: String },
  email: { type: String },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() }, hidden: true }
});

Location.register();

Location.model.find().count(function(err, count) {
  if (count > 0) return;

  console.log('Seeding locations')
  async.series([
    function(done) {
      var msg0 = (new Location.model({
        "title": "DEV London",
        "address": "123 Somestreet\nLondon\nUnited Kingdom\nEC2A 1XY",
        "telephone": "+44 891 50 50 50",
        "email": "london@dev"
      }))
      msg0.save(function(err) {
        done(err)
      })
    }
  ], function() {});
})
