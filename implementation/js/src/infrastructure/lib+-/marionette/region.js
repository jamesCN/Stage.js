/**
 * Enhancing the Backbone.Marionette.Region Class
 *
 * 1. open()+
 * --------------
 * a. consult view.effect config block when showing a view;
 * b. inject parent view as parentCt to sub-regional view;
 * c. store sub view as parent view's _fieldsets[member];
 * 
 *
 * @author Tim.Liu
 * @updated 2014.03.03
 */

;(function(app){

	_.extend(Backbone.Marionette.Region.prototype, {
		open: function(view){

			/**
			 * effect config in view 
			 * 
			 * 'string' name of the effect in jQuery;
			 * or
			 * {
			 * 		name: ...
			 * 	 	options: ...
			 * 	 	duration: ...
			 * }
			 *
			 * or 
			 *
			 * effect config on region attr $.data()
			 * <div region="..." data-effect="slide"></div>
			 * <div region="..." data-effect="{"name":"slide", "options":{...}, "duration":...}"></div>
			 * 
			 */
			if(view.effect !== false && this.$el.data('effect'))
				view.effect = view.effect || this.$el.data('effect');
			if(view.effect){
				if(_.isString(view.effect)){
					view.effect = {
						name: view.effect
					};
				}
				this.$el.hide();
				this.$el.empty().append(view.el);
				this.$el.show(view.effect.name, view.effect.options, view.effect.duration || 200);
			}
			else 
				this.$el.empty().append(view.el);

			//inject parent view container through region into the regional views
			if(this._parentLayout){
				view.parentCt = this._parentLayout;
				//also passing down the name of the outter-most context container.
				if(this._parentLayout.isContext) view.parentCtx = this._parentLayout;
				else if (this._parentLayout.parentCtx) view.parentCtx = this._parentLayout.parentCtx;
			}

			//store sub region form view by fieldset
			if(view.fieldset) {
				this._parentLayout._fieldsets = this._parentLayout._fieldsets || {};
				this._parentLayout._fieldsets[view.fieldset] = view;
			}

			//trigger view:resized anyway upon its first display
			if(this._contentStyle){
				//view.$el.css(this._contentStyle); //Tricky, use a .$el.css() call to smooth dom sizing/refreshing after $el.empty().append()
				view.trigger('view:resized', {region: this}); //!!Caution: this might be racing if using view.effect as well!!
			}

			view.parentRegion = this;

			return this;
		},

		//you don't need to calculate paddings on a region, since we are using $.innerHeight()
		resize:function(options){
			options = options || {};

			/*Note that since we use box-sizing in css, if using this.$el.css() to set height/width, they are equal to using innerHeight/Width()*/
			this._contentStyle = _.extend({}, options, this._contentOverflow);
			this.$el.css(this._contentStyle);
			
			var that = this;
			_.defer(function(){ //give browser a chance to catch up with style changes.
				if(that.currentView) {
					//this.currentView.$el.css(this._contentStyle);
					that.currentView.trigger('view:resized', {region: that});
				}
			});

			return this;

		}
	});

})(Application);
