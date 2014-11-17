var keystone = require('keystone'),
    Types = keystone.Field.Types,
    async = require('async');

var MissionStatement = new keystone.List('MissionStatement', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  defaultSort: '-publishedDate',
  sortable: true,
  nocreate: true
});

MissionStatement.add({
  title: { type: String, required: true, initial: true },
  description: { type: Types.Markdown, required: true, initial: true },
  publishedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
  editedDate: { type: Date, default: function() { return Date.now() }, hidden: true },
});

MissionStatement.register();

MissionStatement.model.find().count(function(err, count) {
  if (count > 0) return;

  console.log('Seeding mission statements')
  async.series([
    function(done) {
      var msg0 = (new MissionStatement.model({
        "key": "mission-statement",
        "title": "Mission Statement",
        "description": {
          "md": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc ex, porta nec dictum vel, finibus et odio. Praesent dictum nulla nunc, at tincidunt quam dapibus ac. Nunc quis dolor rutrum, ultricies justo a, consectetur mi.",
          "html": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc ex, porta nec dictum vel, finibus et odio. Praesent dictum nulla nunc, at tincidunt quam dapibus ac. Nunc quis dolor rutrum, ultricies justo a, consectetur mi."
        }
      }))
      msg0.save(function(err) {
        setTimeout(done, 10000, err);
      })
    },
    function(done) { 
      var msg1 = (new MissionStatement.model({
        "key": "refine-implement",
        "title": "Refine & Implement",
        "publishedDate": new Date(),
        "description": {
          "md": "Further refine and implement ethereum 1.0 as specified in the White Paper & Yellow Paper with 3 separate clean-room implementations",
          "html": "<p>Further refine and implement ethereum 1.0 as specified in the White Paper &amp; Yellow Paper with 3 separate clean-room implementations</p>\n"
        }
      }))
      msg1.save(function(err) {
        setTimeout(done, 10000, err);
      })
    }, 
    function(done) {
      var msg2 = new MissionStatement.model({
        "key": "develop-tools",
        "title": "Develop Tools",
        "publishedDate": new Date(),
        "description": {
          "md": "Develop the tools required to simplify the authoring, deployment and usage of contracts.",
          "html": "<p>Develop the tools required to simplify the authoring, deployment and usage of contracts.</p>\n"
        }
      })
      msg2.save(function(err) {
        setTimeout(done, 10000, err);
      })
    }, 
    function(done) {
      var msg3 = new MissionStatement.model({
        "key": "develop-key-technologies",
        "title": "Develop key technologies",
        "publishedDate": new Date(),
        "description": {
          "md": "Develop other key technologies in the quest for the decentralised web. this includes *Swarm* & *Whisper* as described before and further refinements to the ethereum (i.e. 2.0) and its tools.",
          "html": "<p>Develop other key technologies in the quest for the decentralised web. this includes <em>Swarm</em> &amp; <em>Whisper</em> as described before and further refinements to the ethereum (i.e. 2.0) and its tools.</p>\n"
        }
      })
      msg3.save(function(err) {
        setTimeout(done, 10000, err);
      })
    }
  ], function() {});
})
