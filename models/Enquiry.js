var keystone = require('keystone'),
    Types = keystone.Field.Types,
    _ = require("underscore"),
    Mailgun = require("mailgun-js");

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
  nocreate: true,
  noedit: true
});

Enquiry.add({
  name: { type: Types.Name, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  enquiryType: { type: Types.Select, options: [
    { value: 'message', label: "Just leaving a message" },
    { value: 'question', label: "I've got a question" },
    { value: 'other', label: "Something else..." }
  ] },
  message: { type: Types.Markdown, required: true },
  createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
  this.wasNew = this.isNew;
  next();
});

Enquiry.schema.post('save', function() {
  if (this.wasNew) {
    this.sendNotificationEmail();
  }
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {
  var enq = this;
  
  var name = enq.name.first + (enq.name.last ? (" " + enq.name.last) : "");

  keystone.list('User').model.find().where('receiveEnquiries', true).exec(function(err, recipients) {
    (new Mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.DOMAIN})).messages().send({
      from: "webmaster@ethdev.com",
      to: _.pluck(recipients, "email"),
      subject: "New enquiry from " + name + " " + enq.email,
      html: enq.message.md
    });
  });
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
