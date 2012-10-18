(function($) {
	/**
	 *
	 * RoyalSlider thumbnails module
	 * @version 1.0:
	 * 
	 */ 
	$.extend($.rsProto, {
		_initThumbs: function() {
			var self = this;
			if(self.st.controlNavigation === 'thumbnails') {

				self._thumbsDefaults = {
					drag: true,
					touch: true,
					orientation: 'horizontal',
					navigation: true,
					arrows: true,
					spacing: 4,
					arrowsAutoHide: false,
					transitionSpeed:600,
					autoCenter: true,
					fitInViewport: true, 
					firstMargin: true 
				};

				self.st.thumbs = $.extend({}, self._thumbsDefaults, self.st.thumbs);

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
		_createThumbs: function() {
			var self = this, 
				tText = 'rsThumbs',
				out = '',
				style,
				item,
				spacing = self.st.thumbs.spacing;
			
			self._controlNavEnabled = true;

			if(spacing > 0) {
				var pxs = spacing + 'px ';
				style = ' style="margin: 0 ' + pxs + pxs + '0;"';
			} else {
				style ='';
			}

			self._thumbsHorizontal = (self.st.thumbs.orientation === 'vertical') ? false : true;
			self._thumbsPosition = 0;
			self._isThumbsAnimating = false;
			self._thumbsDrag = false;
			self._thumbsNavigation = false;

			self._thumbsArrows = (self.st.thumbs.arrows && self.st.thumbs.navigation);

			var pl = (self._thumbsHorizontal ? 'Hor' : 'Ver');
			self.slider.addClass('rsWithThumbs' + ' rsWithThumbs'+ pl );

			out += '<div class="rsNav ' + 'rsThumbs rsThumbs'+pl +'"><div class="'+tText+'Container">';
			
			for(var i = 0; i < self.numSlides; i++) {
				if(i === self.numSlides - 1) {
					style = '';
				}
				item = self.slides[i];
				
				out += '<div'+style+' class="rsNavItem rsThumb">'+item.thumbnail+'</div>'
			}

			out += '</div></div>';
			out = $(out);
			
			self._thumbsContainer = $(out).find('.' + tText + 'Container');

			if(self._thumbsArrows) {
				tText += 'Arrow';
				out.append('<div class="'+ tText +' ' + tText +'Left"><div class="'+tText+'Icn"></div></div><div class="'+tText+' '+tText+'Right"><div class="'+tText+'Icn"></div></div>');
				self._thumbsArrowLeft = out.find('.'+tText+'Left').click(function() {
					var viewportSize = Math.floor(self._thumbsViewportSize / self._thumbSize),
						thumbId = Math.floor(self._thumbsPosition / self._thumbSize),
						newPos = (thumbId + self._visibleThumbsPerView) * self._thumbSize;
					self._animateThumbsTo( newPos > self._thumbsMinPosition ? self._thumbsMinPosition : newPos );
				});
				self._thumbsArrowRight = out.find('.'+tText+'Right').click(function() {
					var viewportSize = Math.floor(self._thumbsViewportSize / self._thumbSize),
						thumbId = Math.floor(self._thumbsPosition / self._thumbSize),
						newPos = (thumbId - self._visibleThumbsPerView) * self._thumbSize;
					self._animateThumbsTo( newPos < self._thumbsMaxPosition ? self._thumbsMaxPosition : newPos );
				});
				if(self.st.thumbs.arrowsAutoHide && !self.hasTouch) {
					self._thumbsArrowLeft.css('opacity', 0);
					self._thumbsArrowRight.css('opacity', 0);

					out.one("mousemove.rsarrowshover",function() {
						if(self._thumbsNavigation) {
							self._thumbsArrowLeft.css('opacity', 1);
							self._thumbsArrowRight.css('opacity', 1);		
						}		
					});

					out.hover(
						function() {
							if(self._thumbsNavigation) {
								self._thumbsArrowLeft.css('opacity', 1);
								self._thumbsArrowRight.css('opacity', 1);
							}
						},
						function() {
							if(self._thumbsNavigation) {
								self._thumbsArrowLeft.css('opacity', 0);
								self._thumbsArrowRight.css('opacity', 0);
							}
						}
					);	
				}	
			}

			self._controlNav = out;
			self._controlNavItems = out.find('.rsNavItem');
			
			self.slider.append(out);
			
			self._thumbsEnabled = true;
			self._thumbsSpacing = spacing;

			
			if(self.st.thumbs.navigation) {
				if(self._useCSS3Transitions) {
					self._thumbsContainer.css(self._vendorPref + 'transition-property', self._vendorPref + 'transform');
				}
			}
			

			self.ev.off('rsBeforeSizeSet.thumbs').on('rsBeforeSizeSet.thumbs', function() {
				self.updateThumbsSize();
			});
			
		},
		updateThumbsSize: function() {
			var self = this,
				firstThumb = self._controlNavItems.first(),
				cssObj = {};

			self._thumbSize = ( self._thumbsHorizontal ? firstThumb.outerWidth() : firstThumb.outerHeight() ) + self._thumbsSpacing;
			cssObj[self._thumbsHorizontal ? 'width' : 'height'] = self._thumbsContainerSize = self.numSlides * self._thumbSize - self._thumbsSpacing;
			self._thumbsViewportSize = self._thumbsHorizontal ? self._controlNav.width() : self._controlNav.height();
			self._thumbsMaxPosition = -(self._thumbsContainerSize - self._thumbsViewportSize) - (self.st.thumbs.firstMargin ? self._thumbsSpacing : 0);
			self._thumbsMinPosition = self.st.thumbs.firstMargin ? self._thumbsSpacing : 0;
			self._visibleThumbsPerView = Math.floor(self._thumbsViewportSize / self._thumbSize);

			if(self._thumbsContainerSize < self._thumbsViewportSize) {
				if(self.st.thumbs.autoCenter) {
					self._setThumbsPosition((self._thumbsViewportSize - self._thumbsContainerSize) / 2);
				}
				if(self.st.thumbs.arrows && self._thumbsArrowLeft) {
					var arrDisClass = 'rsThumbsArrowDisabled';
					self._thumbsArrowLeft.addClass(arrDisClass);
					self._thumbsArrowRight.addClass(arrDisClass);
				}
				self._thumbsNavigation = false;
				self._thumbsDrag = false;
				self._controlNav.off(self._downEvent);	

			} else if(self.st.thumbs.navigation && !self._thumbsNavigation) {
				self._thumbsNavigation = true;
				if( (!self.hasTouch && self.st.thumbs.drag) ||  (self.hasTouch && self.st.thumbs.touch)) {
					self._thumbsDrag = true;
					self._controlNav.on(self._downEvent, function(e) { self._onDragStart(e, true); });	
				}
			}

			self._thumbsContainer.css(cssObj);

			if(self._thumbsEnabled && (self.isFullscreen || self.st.thumbs.fitInViewport)) {
				if(self._thumbsHorizontal) {
					self._wrapHeight -= self._controlNav.outerHeight();
				} else {
					self._wrapWidth -= self._controlNav.outerWidth();
				}
			}
		},
		setThumbsOrientation: function(newPlacement, dontUpdateSize) {
			var self = this;
			if(self._thumbsEnabled) {
				self.st.thumbs.orientation = newPlacement;
				self._controlNav.remove();
				self.slider.removeClass('rsWithThumbsHor rsWithThumbsVer');
				self._createThumbs();
				self._controlNav.off(self._downEvent);	
				if(!dontUpdateSize) {
					self.updateSliderSize(true);
				}
			}
		},
		_setThumbsPosition: function(pos) {
			var self = this;
			self._thumbsPosition = pos;
			if(self._useCSS3Transitions) {
				self._thumbsContainer.css(self._xProp, self._tPref1 + ( self._thumbsHorizontal ? (pos + self._tPref2 + 0) : (0 + self._tPref2 + pos) ) + self._tPref3 );		
			} else {
				self._thumbsContainer.css(self._thumbsHorizontal ? self._xProp : self._yProp, pos);
			}
		},
		_animateThumbsTo: function(pos, speed, outEasing, bounceAnimPosition, bounceAnimSpeed) {

			var self = this;
			if(!self._thumbsNavigation) {
				return;
			}
			if(!speed) {
				speed = self.st.thumbs.transitionSpeed;
			}
			self._thumbsPosition = pos;
			if(self._thumbsAnimTimeout) {
				clearTimeout(self._thumbsAnimTimeout);
			}
			if(self._isThumbsAnimating) {
				if(!self._useCSS3Transitions) {
					self._thumbsContainer.stop();
				}
				outEasing = true;
			}
			var animObj = {};
			self._isThumbsAnimating = true;
			if(!self._useCSS3Transitions) {
				animObj[self._thumbsHorizontal ? self._xProp : self._yProp] = pos + 'px';
				self._thumbsContainer.animate(animObj, speed, outEasing ? 'easeOutCubic' : self.st.easeInOut);
			} else { 
				animObj[(self._vendorPref + 'transition-duration')] = speed+'ms';
				animObj[(self._vendorPref + 'transition-timing-function')] = outEasing ? $.rsCSS3Easing[self.st.easeOut] : $.rsCSS3Easing[self.st.easeInOut];
				self._thumbsContainer.css(animObj);
				self._setThumbsPosition(pos);
			}
			if(bounceAnimPosition) {
				self._thumbsPosition = bounceAnimPosition;
			}
			self._updateThumbsArrows();
			
			
			self._thumbsAnimTimeout = setTimeout(function() {
				self._isThumbsAnimating = false;
				if(bounceAnimSpeed) {
					self._animateThumbsTo(bounceAnimPosition, bounceAnimSpeed, true);
					bounceAnimSpeed = null;
				}
			}, speed);
		},
		_updateThumbsArrows: function() {
			var self = this;
			if(self._thumbsArrows) {
				var arrDisClass = 'rsThumbsArrowDisabled';
				
				if(self._thumbsPosition === self._thumbsMinPosition) {
					self._thumbsArrowLeft.addClass(arrDisClass);
				} else {
					self._thumbsArrowLeft.removeClass(arrDisClass);
				}
				if(self._thumbsPosition === self._thumbsMaxPosition) {
					self._thumbsArrowRight.addClass(arrDisClass);
				} else {
					self._thumbsArrowRight.removeClass(arrDisClass);
				}
			}
		},
		_setCurrentThumb: function(id, justSet) {
			
			var self = this,
				incr = 0,
				newPos,
				nextThumbEndPos = (id * self._thumbSize + self._thumbSize * 2 - self._thumbsSpacing + self._thumbsMinPosition),
				thumbId = Math.floor(self._thumbsPosition / self._thumbSize);
			
			if(!self._thumbsNavigation) {
				return;
			}

			if(nextThumbEndPos  + self._thumbsPosition > self._thumbsViewportSize) {
				if(id === self.numSlides - 1) {
					incr = 1;
				}
				thumbId = -id + self._visibleThumbsPerView - 2 + incr;
				newPos = thumbId * self._thumbSize + (self._thumbsViewportSize % self._thumbSize) + self._thumbsSpacing - self._thumbsMinPosition;
			} else {
				if(id !== 0) {
					if( (id-1) * self._thumbSize <= -self._thumbsPosition + self._thumbsMinPosition && (id-1) <= self.numSlides - self._visibleThumbsPerView) {
						thumbId = -id + 1;
						newPos = thumbId * self._thumbSize + self._thumbsMinPosition;
					}
				} else {
					thumbId = 0;
					newPos = self._thumbsMinPosition;
				}
			}
			if(newPos !== self._thumbsPosition) {
				var checkPos = (newPos === undefined) ? self._thumbsPosition : newPos;
				if(checkPos > self._thumbsMinPosition) {
					self._setThumbsPosition(self._thumbsMinPosition);
				} else if(checkPos < self._thumbsMaxPosition) {
					self._setThumbsPosition(self._thumbsMaxPosition);
				} else  if(newPos !== undefined) {
					if(!justSet) {
						self._animateThumbsTo(newPos);
					} else {
						self._setThumbsPosition(newPos);
					}
				}
			}
			self._updateThumbsArrows();
		}
	});
	$.rsModules.thumbnails = $.rsProto._initThumbs;
})(jQuery);
