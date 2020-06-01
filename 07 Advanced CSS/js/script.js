$(document).ready(function(){

	//Плавный переход к секциям

	$('ul a').on('click', function(event){
		event.preventDefault();

		let href = $(this).attr('href');

		let offset = $(href).offset().top;

		$('body,html').animate({scrollTop: offset,}, 700);
	});
	
	//Модальные окна

	//Функция, отключающая скролла
	function disableScroll()
	{
		$('html, body').css("overflow","hidden")
		$('html, body').css("width","100%")
			return false;
	}
	
	//Функция, включающая скролл
	function enableScroll()
	{
		$('html, body').css("overflow","initial")
			return false;
	}

	//Вызов всплывающего окна, при этом отключается скролл

	$('.get-call-btn, .header-phone-icon').click(function(){
		$('.popup-container').fadeIn(600, disableScroll);
	});

	$('.popup-btn').click(function(){
		$('.popup-container').fadeIn(600, disableScroll);
	});

	//Отключается модальное окно при клике вне этого окна, включается скролл
	$('.popup-container').click(function(event){
		if(event.target == this){
			$(this).fadeOut(600, enableScroll);
	};
	});

	// Закрытие модального окна по кнопке, включается скролл
	$('.form__close').click(function() { 
		$('.popup-container').fadeOut(600, enableScroll);
		$('form')[0].reset(); // Очистка полей формы при ее закрытии
	
	});

	// Вызов окна мобильного меню
	$('.burger-icon').click(function () {
		$('.mobile-container').fadeIn(600, disableScroll);
	});

	// Закрытие мобильного меню
	$('.close-icon, .mobile-list__services, .mobile-list__portfolio, .mobile-list__price, .mobile-container').click(function() {
		event.preventDefault(); 
		$('.mobile-container').fadeOut(300, enableScroll);
	});

	// Закрытие мобильного меню при ширине экрана >1400px
	$(window).resize(function() {
		var windowWidth = $(window).width();
		if(windowWidth >= 1400) {
			$('.mobile-container').fadeOut(300, enableScroll);
		}
	})
		
	// Свайпер
	var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    slidesPerView: 1,
	spaceBetween: 27,
	
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
	
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: 'true',
			
		},

		breakpoints: {
			618: {
				slidesPerView: 2,
				spaceBetween: 17
			},
		
			1140: {
				slidesPerView: 3,
				spaceBetween: 27
			},
		},
	});
	
    // Маска для телефона
    $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-9999"});

    // Валидация

    //$('select').styler();

			$('form').each(function () {
				$(this).validate({
					errorPlacement(error, element) {
						return true;
					},
					focusInvalid: false,
					rules: {
						Телефон: {
							required: true,
						},
						Имя: {
							required: true,
							
						}
					},
					messages: {
						Телефон: {
							required: 'Нужно что-то ввести'
						},
						Имя: {
							required: 'Нужно что-то ввести',
							maxlength: 'Нужно ввести максимум 5 букв'
						}
					},
					submitHandler(form) {
					let th = $(form);

					$.ajax({
					type: 'POST',
					url: 'mail.php',
					data: th.serialize(),
					// eslint-disable-next-line func-names
				}).done(function() {
					swal("Спасибо!", "Ваше сообщение отправлено", "success");//alert("Спасибо за Ваше обращение!");
					setTimeout(function() {

					console.log('Отправлено')

					th.trigger('reset');
				});

				return false;
				})
			}
			});    
 });

 });


    