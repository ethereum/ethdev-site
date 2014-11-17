var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Job = new keystone.List('Job', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '+editedDate'
});

Job.add({
  title: { type: String, required: true, initial: true },
  description: { type: Types.Markdown },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() } },
  skills: { type: String }
});

Job.register();

