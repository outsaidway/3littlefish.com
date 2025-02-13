(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	});
    // Header Sticky
	$(window).on('scroll',function() {
        if ($(this).scrollTop() > 120){  
            $('.navbar-area').addClass("is-sticky");
        }
        else{
            $('.navbar-area').removeClass("is-sticky");
        }
    });
	//  Star Scrolling nav
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 30)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Back to top button 
	$(function () {
		// Scroll Event
		$(window).on('scroll', function () {
			var scrolled = $(window).scrollTop();
			if (scrolled > 300) $('.back-to-top').addClass('active');
			if (scrolled < 300) $('.back-to-top').removeClass('active');
		});
		// Click Event
		$('.back-to-top').on('click', function () {
			$("html, body").animate({
				scrollTop: "0"
			}, 500);
		});
	});
	// Testimonials owl
	$('#testimonial-slide').owlCarousel({
		margin: 0,
		autoplay: true,
		autoplayTimeout: 4000,
		nav: false,
		smartSpeed: 800,
		dots: true,
		autoplayHoverPause: true,
		loop: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	});
	// Partner Logo Slide owlCarousel
	$('#partner-slide').owlCarousel({
		loop: true,
		margin: 0,
		mouseDrag: true,
		autoplay: true,
		dots: false,
		fullscreen: false,
		smartSpeed: 800,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 5
			}
		}
	});
	//  Star Counter
	$('.counter-number').counterUp({
		delay: 15,
		time: 2000
	});
	//  Accordion faq
	$(".accordion").on("click", ".title", function () {
		$(this).next().slideDown();
		$(".accordion-info").not($(this).next()).slideUp();
	});
	$(".accordion").on("click", ".accordion-item", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//  POPUP VIDEO
	$('.popup-video').magnificPopup({
		type: 'iframe',
	});

	// Progress Bar
	$(window).on('scroll', function () {
		$(".skill-progress .progres").each(function () {
			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			var myVal = $(this).attr('data-value');
			if (bottom_of_window > bottom_of_object) {
				$(this).css({
					width: myVal
				});
			}
		});
	});
	// MagnificPopup 
	$('.project-container').magnificPopup({
		delegate: '.popimg',
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	// Porfolio isotope and filter
	$(window).on('load', function () {
		var projectIsotope = $('.project-container').isotope({
			itemSelector: '.project-grid-item'
		});
		$('#project-flters li').on('click', function () {
			$("#project-flters li").removeClass('filter-active');
			$(this).addClass('filter-active');
			projectIsotope.isotope({
				filter: $(this).data('filter')
			});
		});
	});
	// WOW JS
	$(window).on('load', function () {
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: 'wow', // Animated element css class (default is wow)
				animateClass: 'animated', // Animation css class (default is animated)
				offset: 30, // Distance to the element when triggering the animation (default is 0)
				mobile: false, // Trigger animations on mobile devices (default is true)
				live: true, // Act on asynchronously loaded content (default is true)
			});
			wow.init();
		}
	});
	// START PRELOADED
	$(window).on('load', function () {
		$('.preloader').fadeOut();
		$('.preloader').delay(350).fadeOut('slow');
	});
	// ... existing code ...

/*=========================================
	Contact Form
=========================================*/
$(document).ready(function() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        var formData = $(this).serialize();
        
        // 禁用提交按钮防止重复提交
        var submitButton = $(this).find('button[type="submit"]');
        submitButton.prop('disabled', true);
        
        // 显示加载状态
        submitButton.html('发送中... <i class="fa fa-spinner fa-spin"></i>');
        
        // 发送AJAX请求
        $.ajax({
            type: 'POST',
            url: 'mails-php.php',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // 成功提示
                    $('.form-message').html('<div class="alert alert-success">消息发送成功！</div>');
                    // 清空表单
                    $('#contact-form')[0].reset();
                } else {
                    // 错误提示
                    $('.form-message').html('<div class="alert alert-danger">发送失败，请稍后重试。</div>');
                }
            },
            error: function() {
                // 错误提示
                $('.form-message').html('<div class="alert alert-danger">发送失败，请稍后重试。</div>');
            },
            complete: function() {
                // 恢复提交按钮状态
                submitButton.prop('disabled', false);
                submitButton.html('发送消息');
                
                // 5秒后清除提示消息
                setTimeout(function() {
                    $('.form-message').html('');
                }, 5000);
            }
        });
    });
});

// 订阅表单处理
$(document).ready(function() {
    $('#subscribe-form').on('submit', function(e) {
        e.preventDefault();
        
        var form = $(this);
        var submitButton = form.find('button[type="submit"]');
        var email = form.find('input[name="email"]').val();
        
        // 禁用提交按钮
        submitButton.prop('disabled', true);
        submitButton.html('Subscribing... <i class="fa fa-spinner fa-spin"></i>');
        
        // 发送AJAX请求
        $.ajax({
            type: 'POST',
            url: 'subscribe.php',
            data: { email: email },
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // 显示成功消息
                    form.after('<div class="alert alert-success subscribe-message">' + response.message + '</div>');
                    // 清空表单
                    form[0].reset();
                } else {
                    // 显示错误消息
                    form.after('<div class="alert alert-danger subscribe-message">' + response.message + '</div>');
                }
            },
            error: function() {
                // 显示错误消息
                form.after('<div class="alert alert-danger subscribe-message">Something went wrong. Please try again later.</div>');
            },
            complete: function() {
                // 恢复提交按钮状态
                submitButton.prop('disabled', false);
                submitButton.html('Subscribe <i class="fa fa-arrow-right"></i>');
                
                // 5秒后移除消息
                setTimeout(function() {
                    $('.subscribe-message').fadeOut(function() {
                        $(this).remove();
                    });
                }, 5000);
            }
        });
    });
});

// Portfolio Popup
$(document).ready(function() {
    $('.popup-gallery').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.parents('.portfolio-content').find('h3').text();
            }
        },
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        closeOnContentClick: true,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
});

// ... existing code if any ...
})(jQuery);