var keystone = require('keystone'),
    path = require('path'),
    Types = keystone.Field.Types;

var File = new keystone.List('File', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '+editedDate'
});

File.add({
  title: { type: String, required: true, initial: true },
  description: { type: String },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() } },
  icon: {
    type: Types.CloudinaryImage,
    width: 200,
    height: 200
  },
  file: {
    type: Types.LocalFile,
    required: true,
    initial: false,
    dest: path.join(global.APP_ROOT, 'public/files'),
    prefix: '/files',
    filename: function(doc, file) {
      return file.replace(/[#@\s]/g, '');
    },
  }
});

File.register();
