(function($) {

	// 공통 함수
	function updateBannerOpacity() {
		const scrollY = $(window).scrollTop();
		const opacity = Math.min(scrollY / 10 * 0.01, 0.75);
		document.documentElement.style.setProperty('--banner-bg-opacity', opacity.toFixed(3));
	}

	window.onload = function(){
		$("loading").fadeOut("slow");
		$('.loading').fadeOut("slow");

		updateBannerOpacity();

		setTimeout(() => {
			$('#banner').addClass('banner-bg-transition');
		}, 10);
	};

	$('a.sitebutton[href^="#"]').addClass("emptylink");

	$(window).on('scroll', () => updateBannerOpacity());

})(jQuery);

	// Mobile Header

	if (matchMedia("screen and (max-width: 799px)").matches) {
		function nav_click() {
			$('header ul').toggleClass('click');
			$('input').toggleClass('clickbutton');
		};
	};

	$(window).resize(function () {
		if (matchMedia("screen and (max-width: 799px)").matches) {
			function nav_click() {
				$('header ul').toggleClass('click');
				$('input').toggleClass('clickbutton');
			};}
	});

	// vh checker

	let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    window.addEventListener('touchend', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

	(function ($) {
		let lastScrollY = window.scrollY;
		let scrollTimeout = null;
		let isAnimating = false;
		let lastTarget = null;
	
		const banner = document.querySelector("#banner");
		const about = document.querySelector("#about");
	
		function isInViewport(el) {
			const rect = el.getBoundingClientRect();
			return rect.bottom > 0 && rect.top < window.innerHeight;
		}
	
		function smoothScrollTo(selector) {
			const targetY = document.querySelector(selector).offsetTop;
			isAnimating = true;
			lastTarget = selector;
	
			window.scrollTo({
				top: targetY,
				behavior: "smooth"
			});
	
			setTimeout(() => {
				isAnimating = false;
			}, 500);
		}
	
		function onScrollStop() {
			if (isAnimating) return;
	
			const currentScroll = window.scrollY;
			const scrollDown = currentScroll > lastScrollY;
			lastScrollY = currentScroll;
	
			const bannerVisible = isInViewport(banner);
			const aboutVisible = isInViewport(about);
	
			const aboutTop = about.offsetTop;
			const offsetAboveAbout = aboutTop - (window.innerHeight * 0.25);
	
			if (scrollDown) {
				if (bannerVisible && aboutVisible && lastTarget !== "#about") {
					smoothScrollTo("#about");
				}
			} else {
				if (
					bannerVisible &&
					aboutVisible &&
					currentScroll < offsetAboveAbout &&
					lastTarget !== "#banner"
				) {
					smoothScrollTo("#banner");
				}
			}
		}
	
		window.addEventListener("scroll", () => {
			if (isAnimating) return;
	
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(onScrollStop, 1);
		}, { passive: true });
	})(jQuery);
	

	