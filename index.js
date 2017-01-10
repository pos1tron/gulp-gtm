var through = require('through2'),
    gutil   = require('gulp-util')

module.exports = function(opts) {
  opts                 = opts || {};
  opts.containerId     = opts.containerId || '';
  opts.startTag        = opts.startTag || '<!-- Google Tag Manager -->';
  opts.endTag          = opts.endTag || '<!-- End Google Tag Manager -->';
  opts.replace         = opts.hasOwnProperty('replace') ? (opts.replace ? true : false) : true;

  return through.obj(function(file, enc, cb) {
    if(file.isNull()) return cb(null, file)
    if(file.isStream()) return cb(new Error('gulp-gtm: streams not supported'))

    var gtm = '<noscript><iframe src="//www.googletagmanager.com/ns.html?id='+opts.containerId+'"\n'+
          'height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n'+
          "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n"+
          "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n"+
          "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n"+
          "'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n"+
          "})(window,document,'script','dataLayer','"+opts.containerId+"');</script>"

    var content = file.contents.toString();
    var startIndex = content.indexOf(opts.startTag);
    var endIndex = content.indexOf(opts.endTag);
    if (startIndex >= 0) {
      var sliceAt = opts.replace ? startIndex : startIndex + opts.startTag.length;
      var replaceChars = opts.replace ? (endIndex + opts.endTag.length) - startIndex : endIndex - (startIndex + opts.startTag.length);
      content = content.slice(0, sliceAt) + gtm + content.slice(sliceAt + Math.abs(replaceChars));
    }
    console.log(content);
    file.contents = new Buffer(content);
    cb(null, file);
  })
}
