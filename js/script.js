//Объявляем стрелочную функцию, которая принимает два параметра: 
//выбранный тип данных и деструктуризацию переданного объекта. 
//В самой функции с помощью метода filter отсеиваем массив, оставляя в нем только те элементы, тип которых равен указанному в первом параметре. 
const filterByType = (type, ...values) => values.filter(value => typeof value === type), 

//Объявление стрелочной функции
	hideAllResponseBlocks = () => {
		//Объявление переменной в значении которой функция, которая создает массив из переданного объекта
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//Перебор массива методом forEach в котором каждому элементу добавляем свойство display: none;
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//Объявление стрелочной функции которая принимает три параметра
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//Вызов предыдущей функции
		hideAllResponseBlocks();
		//Назначение свойства display: block, первому переданному параметру в функции
		document.querySelector(blockSelector).style.display = 'block';
		//Проверка. Если spanSelector передан, то ему присваивается контентное содержимое переданное во втором аргументе функции
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//Объявление стрелочной функции с одним параметром, внутри которой вызывается другая функция с переданными аргументами
	//Функция показывает текст ошибки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//Объявление стрелочной функции с одним параметром, внутри которой вызывается другая функция с переданными аргументами
	//Функция показывает результат
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//Объявление стрелочной функции, внутри которой вызывается другая функция с переданными аргументами
	//Функция показывает отсутствие результат
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//Объявление стрелочной функции с двумя параметрами
	tryFilterByType = (type, values) => {
		//Конструкция try catch выполняет код в блоке try и в случае ошибки выводит её в блоке catch как пойманную
		try {
			//объявление переменной в значении которой метод глобального объекта eval, который переданную строку выполняет как js код.
			//в аргумент метода eval передан вызов функции filterByType, которая принимает в качестве своих аргументов, параметры функции tryFilterByType
			//и далее методом join собирает результат в строку с указанным разделителем
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

			//объявление переменной в которую передается значение из тернарного оператора.
			//Если длина массива valuesArray.length равняется true, то возвращается строка `Данные с типом ${type}: ${valuesArray}`
			//Если false, то `Отсутствуют данные типа ${type}`
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
				//Вызов функции показа сообщения
			showResults(alertMsg);
			//Бло обработки ошибок
		} catch (e) {
			//Вызов функции показа ошибки
			showError(`Ошибка: ${e}`);
		}
	};

	//объявление переменной в значении которой мы получаем кнопку
const filterButton = document.querySelector('#filter-btn');

//вешаем на кнопку обработчик события по клику
filterButton.addEventListener('click', e => {
	//При срабатывании события объявляем две переменные
	//typeInput принимает select c типами данных
	const typeInput = document.querySelector('#type');
	//dataInput принимает input с введенными значениями
	const dataInput = document.querySelector('#data');

	//Проверка. Если в инпут ничего не введено, то
	if (dataInput.value === '') {
		//на инпут применяется метод setCustomValidity, который позволет написать собственный текст для всплывающего сообщения валидации
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//Вызываем функцию для отображения результата
		showNoResults();

		//иначе
	} else {
		//на инпут применяется метод setCustomValidity, который позволет написать собственный текст для всплывающего сообщения валидации
		dataInput.setCustomValidity('');
		//отменяется стандартное действие при нажатии на кнопку
		e.preventDefault();
		//Вызываем функцию tryFilterByType с двумя аргументами.
		//Первый это значение selecta с методом trim, который убирает лишние пробелы в начале и в конце строки.
		//Второй аргумент это значение инпута с тем же методом trim
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

