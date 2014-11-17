var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals,
    content = {};

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.currentSection = 'home';
  locals.currentSectionId = 'homepage';

  locals.opener = {};

  locals.missionSection = {
    introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et pellentesque metus, in accumsan tellus. Proin consectetur sagittis efficitur. In non nibh tincidunt, mattis nunc eu, ultrices diam. Mauris vestibulum quam quam, sed aliquam augue viverra non. Proin laoreet fermentum orci non tincidunt.',
    images: [
      'mission-1',
      'mission-2',
      'mission-3'
    ]
  };
  view.query('missionSectionMain', 
             keystone.list('MissionStatement').model
             .find({})
             .limit(1)
             .sort('publishedDate'));

  view.query('missionSectionObjectives', 
             keystone.list('MissionStatement').model
             .find({})
             .skip(1)
             .limit(3)
             .sort('publishedDate'));

  locals.mediaSection = {};
  view.query('mediaSectionGalleryVideos', keystone.list('Video').model.find());
  view.query('mediaSectionGalleryLinks', keystone.list('Link').model.find());
  view.query('mediaSectionGalleryFiles', keystone.list('File').model.find());

  view.query('teamSectionProfiles', 
             keystone.list('Profile').model.find().sort('sortOrder'));

  locals.jobsSection = {};
  view.query('jobsSectionList', keystone.list('Job').model.find());

  locals.contactSection = {};
  view.query('teamLocations', keystone.list('Location').model.find());

  // Render the view
  view.render('index');

};
