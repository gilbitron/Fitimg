/*
 * jQuery Fitimg v1.0
 * http://dev7studios.com/fitimg
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

if(typeof console=="undefined"){window.console={log:function(){}}} // Console IE fix
;(function($, window, document, undefined) {

    var pluginName = 'fitimg',
        defaults = {
	        debug: false,
	        afterLoad: function(){}
        };

    function Fitimg(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
		var plugin = this;
		
		if(typeof $.fn.imagesLoaded != 'undefined'){
			$(this.element).imagesLoaded(function() {
	        	plugin.run(plugin.element, plugin.options);
	        	
	        	// Trigger the afterLoad callback
				plugin.options.afterLoad.call(this);
	        });
        } else {
	        plugin.run(plugin.element, plugin.options);
	        	
        	// Trigger the afterLoad callback
			plugin.options.afterLoad.call(this);
        }
        
        $(window).on('resize', function() {
            plugin.run(plugin.element, plugin.options);
        });
    }

    Fitimg.prototype = {

        run: function(el, options) {
            var $el = $(el),
            	$img = $el.find('img:first'),
				ratio = 0,
				imgRatio = 0,
				width = $el.width(),
				height = $el.height();
				
			if(options.debug){
				if(!$el.find('.fitimg-debug').length){
					$el.append('<div class="fitimg-debug" />');
				}
			}
			
			if(!$el.hasClass('fitimg')) $el.addClass('fitimg');
			$img.removeClass('fitimg-width fitimg-height').show();
			
			ratio = width / height;
			imgRatio = $img.width() / $img.height();
			if(options.debug) $el.find('.fitimg-debug').html('Aspect: '+ ratio +'<br />Img: '+ imgRatio);
			
			if(ratio == 1 || imgRatio > 1){
				if(imgRatio <= 1){
					var marginLeft = 0;
					if(width <= $img.width()) marginLeft = ((width - $img.width())/2) +'px';
					$img.addClass('fitimg-width').css({
						'margin-top': ((height - $img.height())/2) +'px',
						'margin-left': marginLeft
					});
				} else {
					var marginTop = 0;
					if(height <= $img.height()) marginTop = ((height - $img.height())/2) +'px';
					$img.addClass('fitimg-height').css({
						'margin-top': marginTop,
						'margin-left': ((width - $img.width())/2) +'px'
					});
				}
			}
			else if(ratio <= 1){
				var marginTop = 0;
				if(height <= $img.height()) marginTop = ((height - $img.height())/2) +'px';
				$img.addClass('fitimg-height').css({
					'margin-top': marginTop,
					'margin-left': ((width - $img.width())/2) +'px'
				});
			} else {
				var marginLeft = 0;
				if(width <= $img.width()) marginLeft = ((width - $img.width())/2) +'px';
				$img.addClass('fitimg-width').css({
					'margin-top': ((height - $img.height())/2) +'px',
					'margin-left': marginLeft
				});
			}
			
			if(!$img.hasClass('fitimg-loaded')) $img.addClass('fitimg-loaded');
        }

    };

    $.fn[pluginName] = function(options) {
    	if(typeof $.fn.imagesLoaded == 'undefined'){
	        console.warn('Fitimg works better with https://github.com/desandro/imagesloaded installed.');
        }
        
        return this.each(function() {
            if(!$.data(this, 'plugin_' + pluginName)){
                $.data(this, 'plugin_' + pluginName, new Fitimg(this, options));
            }
        });
    };

})( jQuery, window, document );