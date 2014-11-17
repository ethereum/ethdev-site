var keystone = require('keystone'),
  path = require('path'),
  Types = keystone.Field.Types;

var Profile = new keystone.List('Profile', {
    sortable: true
  }),
  filePrefix = '/static/profileimages';

Profile.add({
  firstname: { type: Types.Text, required: true, initial: true },
  lastname: { type: Types.Text },
  biography: { type: Types.Markdown },
  photo: {
    type: Types.CloudinaryImage,
    width: 300,
    height: 300,
    thumbnail: '300, 300'
  }
});

Profile.defaultColumns = 'firstname, lastname';

Profile.register();
