var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Video = new keystone.List('Video', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '-publishedDate'
});

Video.add({
  title: { type: String, required: true, initial: true },
  description: { type: String },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() } },
  heroImage: {
    type: Types.CloudinaryImage,
    width: 600,
    height: 600,
    thumbnail: '600, 600'
  },
  videoId: {
    type: String,
    required: true,
    initial: true,
    note: 'Youtube URL (eg. \'https://www.youtube.com/watch?v=o6D8Up411dI\')',
    watch: true,
    value: function() {
      var match = this.videoId.match(/v=([^&]+)/);
      return match && match[1] ?
        this.videoId.match(/v=([^&]+)/)[1] :
        this.videoId || '';
    }
  }
});

Video.register();

