/**
 * This is the jquery plugin that fetch and show static .md contents through markd js lib
 *
 * Usage
 * =====
 * ```
 * $.md({
 * 	url: ...
 * 	marked: marked options see [https://github.com/chjj/marked]
 *
 *  callback: function($el)...
 * })
 * ```
 *
 * @author Tim.Liu
 * @created 2013.11.05
 * @updated 2014.03.02
 */

(function($){

	/*===============the util functions================*/

	/*===============the plugin================*/
	$.fn.md = function(options){
		var that = this;
		if(_.isString(options)) options = { url: options };
		options = options || {};

		return this.each(function(index, el){
			var $el = $(el);
			var url = options.url || $el.attr('md') || $el.data('md');
			$.get(url).done(function(res){
				$el.html(marked(res, options.marked)).addClass('md-content');
				options.callback && options.callback($el);
			});
		});
	}

})(jQuery);