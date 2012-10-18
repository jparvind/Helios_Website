(function($) {
	/**
	 *
	 * RoyalSlider tabs module
	 * @version 1.0:
	 * 
	 */ 
	$.extend($.rsProto, {
		_initTabs: function() {
			var self = this;
			if(self.st.controlNavigation === 'tabs') {
				self.ev.on('rsBeforeParseNode', function(e, content, obj) {
				content = $(content);
				obj.thumbnail = content.find('.rsTmb').remove();
				if(!obj.thumbnail.length) {

						obj.thumbnail = content.attr('data-rsTmb');
						if(!obj.thumbnail) {
							obj.thumbnail = content.find('.rsImg').attr('data-rsTmb');
						}
						if(!obj.thumbnail) {
							obj.thumbnail = '';
						} else {
							obj.thumbnail = '<img src="'+obj.thumbnail+'"/>';
						}
					} else {
						obj.thumbnail = $(document.createElement('div')).append(obj.thumbnail).html();
					}
				});
			}
			
		},
		_createTabs: function() {
			var self = this, 
				out = '',
				item;

			self._controlNavEnabled = true;
			out += '<div class="rsNav rsTabs">';
			for(var i = 0; i < self.numSlides; i++) {
				if(i === self.numSlides - 1) {
					style = '';
				}

				item = self.slides[i];
				out += '<div class="rsNavItem rsTab">'+item.thumbnail+'</div>'
			}

			out += '</div>';
			out = $(out);

			self._controlNav = out;
			self._controlNavItems = out.find('.rsNavItem');
			
			self.slider.append(out);
		}
	});
	$.rsModules.tabs = $.rsProto._initTabs;
})(jQuery);
