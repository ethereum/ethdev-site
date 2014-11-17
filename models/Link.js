var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Link = new keystone.List('Link', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '+editedDate'
});

Link.add({
  title: { type: String, required: true, initial: true },
  description: { type: String },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() } },
  heroImage: {
    type: Types.CloudinaryImage
  },
  url: { type: Types.Url, required: true, initial: true }
});

Link.register();

