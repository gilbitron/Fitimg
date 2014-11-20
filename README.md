### This repo is no longer maintained. If you would like to take over ownership please [get in touch](mailto:gilbert@pellegrom.me).

Fitimg
======

Fitimg is a jQuery plugin to make images "fit" to their containers. [See the demo](http://dev7studios.com/demo/fitimg).

![Fitimg](http://cdn.dev7studios.com/fitimg/example.jpg)

Requirements
------------

1. jQuery v1.8+
2. The [imagesLoaded](https://github.com/desandro/imagesloaded) plugin (v3+)

The imagesLoaded plugin is optional but Fitimg won't work very well without it. See Advanced section below.

Usage
-----

Include the scripts and styles in your HTML head:

```html
<link rel="stylesheet" href="jquery.fitimg.css" type="text/css" />

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="imagesloaded.js"></script>
<script src="jquery.fitimg.js"></script>
```

Then make sure your images have container divs wrapping them:

```html
<div class="imgwrap">
	<img src="http://placekitten.com/400/200" alt="" />
</div>
<div class="imgwrap">
	<img src="http://placekitten.com/200/400" alt="" />
</div>
<div class="imgwrap">
	<img src="http://placekitten.com/300/150" alt="" />
</div>
```

Then simply hook up Fitimg:

```html
<script>
$(document).ready(function(){
	$('.imgwrap').fitimg();
});
</script>
```

Advanced
--------

Fitimg has an `afterLoad` event which is triggered after the image has been loaded and positioned. For example:

```html
<script>
$(document).ready(function(){
	$('.imgwrap').fitimg({
		afterLoad: function(){
			// do something here...
		}
	});
});
</script>
```

Fitimg will add a `fitimg-loaded` class to images once they have been loaded and positioned. By default Fitvid uses opacity to hide the images, but to make sure you're images don't flash before Fitvid has loaded, you can help by making sure you're images have zero opacity. For example in CSS:

```css
.imgwrap img { opacity: 0; }
```

If you are not using the imagesLoaded plugin you should use jQuery's `$(window).load()` event rather than `$(document).ready()`, to make sure the images have fully loaded.

Browser Compat
--------------

Fitimg works in all modern browsers (Chrome, Firefox, Safari, Opera) and in IE8+.

Credits
-------

Fitimg was created by [Gilbert Pellegrom](http://gilbert.pellegrom.me) from [Dev7studios](http://dev7studios.com). Released under the MIT license.
