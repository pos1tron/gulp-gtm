# gulp-gtm

> Inject Google Tag Manager (GTM) script into HTML <head> with Gulp.

#### Install

```bash
$ npm install pos1tron/gulp-gtm --save-dev
```

## Example

Make sure to enter the correct containerId, startTag, and endTag. Set `replace: false` if you do not wish to replace the startTag and endTag.

```js
var gulp = require('gulp');
var gtm  = require('gulp-gtm');

// Usage:
gulp.task('gtm', function(){
	gulp.src('./index.html')
	.pipe(gtm({
		containerId: 'GTM-1234'
		startTag: '<!-- Google Tag Manager -->', // default
		endTag: '<!-- End Google Tag Manager -->', // default
		replace: true // default
	}))
	.pipe(gulp.dest('./'));
});

```

The following code will replace the startTag and endTag. Or if `replace: false`, the code will be inserted between the startTag and endTag.
```html
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-1234"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-1234');</script>
```
This snippet is directly from [Google Tag Manager's site](https://developers.google.com/tag-manager/quickstart).
