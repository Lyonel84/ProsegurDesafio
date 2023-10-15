/*
========================================================================================================
Nota: 
	* Las funciones son soportados por varios browser
	* Desactivación combinación de teclado
	* Asignación de un comentario como información de procesos incorrectos

Nota: 
	* Agregación de controlador de E-mail
	* Agregación de información de las funciones


Fecha Creación: 15/03/2011
========================================================================================================
Key Codes
--------------------------------------------------------------------------------------------------------
	Tecla		Código		Tecla		Código		Tecla			Código	
	------------------------------------------------------------------------
	backspace		8		tab				9		enter				13	
	shift			16		ctrl			17		alt					18	
	pause/break		19		caps lock		20		escape				27	
	page up			33		page down		34		end					35	
	home			36		left arrow		37		up arrow			38	
	right arrow		39		down arrow		40		insert				45	
	delete			46		0				48		1					49	
	2				50		3				51		4					52	
	5				53		6				54		7					55	
	8				56		9				57		a					65	
	b				66		c				67		d					68	
	e				69		f				70		g					71	
	h				72		i				73		j					74	
	k				75		l				76		m					77	
	n				78		o				79		p					80	
	q				81		r				82		s					83	
	t				84		u				85		v					86	
	w				87		x				88		y					89	
	z				90		left window key	91		right window key	92	
	select key		93		numpad 0		96		numpad 1			97	
	numpad 2		98		numpad 3		99		numpad 4			100	
	numpad 5		101		numpad 6		102		numpad 7			103	
	numpad 8		104		numpad 9		105		multiply			106	
	add				107		subtract		109		decimal point		110	
	divide			111		f1				112		f2					113	
	f3				114		f4				115		f5					116	
	f6				117		f7				118		f8					119	
	f9				120		f10				121		f11					122	
	f12				123		num lock		144		scroll lock			145	
	semi-colon		186		equal sign		187		comma				188	
	dash			189		period			190		forward slash		191	
	grave accent	192		open bracket	219		back slash			220	
	close braket	221		single quote	222					
	
anchor.setAttribute('onKeyPress','borraritem()');
anchor.getAttribute("onKeyPress")
evt.srcElement

window.event //IE    CR OP
window.Event //   FF CR OP NS
function Event() 

Asignación de verificador de casillas
Ejemplo:
<input type="text" id="txt1" name="txt1" valExp="texto">

*/

var emailRe = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/";
var phoneRe = "/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/";
var lang = 'es-ES';

var keyError = {
	'code1': { 'es-ES': 'Caracter no permitido', 'en-EN': 'Denegate Charter' },
	'code2': { 'es-ES': 'Caracter no permitido', 'en-EN': 'Denegate Charter' },
	'code3': { 'es-ES': 'Caracter no permitido', 'en-EN': 'Denegate Charter' },
	'code4': { 'es-ES': 'Caracter no permitido', 'en-EN': 'Denegate Charter' },
	'code100': { 'es-ES': 'Caracter no permitido', 'en-EN': 'Denegate Charter' },
	'code200': { 'es-ES': 'Esta cuenta de e-mail (@email@) no es valida', 'en-EN': 'This account of e-mail (@email@) is not valid' }
}

//
function isValidDate(dateString) {
	// First check for the pattern
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
		return false;

	// Parse the date parts to integers
	var parts = dateString.split("/");
	var day = parseInt(parts[1], 10);
	var month = parseInt(parts[0], 10);
	var year = parseInt(parts[2], 10);

	// Check the ranges of month and year
	if (year < 1000 || year > 3000 || month == 0 || month > 12)
		return false;

	var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Adjust for leap years
	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;

	// Check the range of the day
	return day > 0 && day <= monthLength[month - 1];
};

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: stopEvent
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Detiene la propagación de los eventos ejecutados
//Uso:
// stopEvent(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function stopEvent(e) {
	if (!e) e = window.event;
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: cancelEvent
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Cancela los eventos ejecutados
//Uso:
// cancelEvent(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function cancelEvent(e) {
	if (!e) e = window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.keyCode = 0;
		e.returnValue = false;
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: getKey
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Retorna codigo de la tecla
//Uso:
// var key = getKey(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function getKey(e) {
	if (!e) e = window.event;
	//var key = !document.all ? e.which : e.keyCode;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	return key;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: keySpecial
//Parametros:
// k = Codigo de Key de teclado
//Anotación:
// Retorna true si se encuentre en la lista de keys especiales
//Uso:
// keySpecial(key) ||| {key = [45,46,...]}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function keySpecial(k) {
	/*if ((k == 8 || k == 13 || k == 0 || k == 9 || k == 17 ||
		(k >= 37 && k <= 40)) && k != 39) {
		return true;
	}*/
	if ((k == 8 || k == 13 || k == 0 || k == 9 || k == 17)) {
		return true;
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: getTarget
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Retorna el objeto que ejecuta el evento
//Uso:
// var obj = getTarget(evento);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function getTarget(e) {
	var _this = new Object();
	if (!e) e = window.event;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;
	return _this;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: Exception
//Parametros:
// name 		= Nombre de Error [default: TypeError]
// message 		= Mensaje del Error
// number 		= Numero del Error [default: -2146823281]
// description 	= Descripción del Error
//Anotación:
// Generador de Excepciones para controlador de errores personalizados
//Uso:
// throw new Exception('name','message','number','description')
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function Exception(_name, _message, _number, _description) {
	this.name = _name;
	this.message = _message;
	this.number = _number;
	this.description = _message;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: verifyMail
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Se utiliza el getTarget para obtener al objeto relacionado,
// se valida que el contexto ingresado sea un texto de correo valido
//Uso:
// objeto.onblur = verifyMail;
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function verifyMail(e) {
	try {
		var _this;
		_this = getTarget(e);

		if (_this.value == "")
			return true;

		var splitted = (_this.value).match("^(.+)@(.+)$");
		if (splitted == null)
			throw new Exception('Error e-mail', _this.value, 50012, _this.value);

		if (splitted[1] != null) {
			var regexp_user = /^\"?[\w-_\.]*\"?$/;
			if (splitted[1].match(regexp_user) == null)
				throw new Exception('Error e-mail', _this.value, 50012, _this.value);
		}

		if (splitted[2] != null) {
			var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
			if (splitted[2].match(regexp_domain) == null) {
				var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
				if (splitted[2].match(regexp_ip) == null)
					throw new Exception('Error e-mail', _this.value, 50012, _this.value);
			}
			if (email.indexOf('@', 0) < 3)
				throw new Exception('Error e-mail', _this.value, 50012, _this.value);
			if (email.indexOf('@', 0) + 1 == email.indexOf('.', email.indexOf('@', 0)))
				throw new Exception('Error e-mail', _this.value, 50012, _this.value);
			return true;
		}
	} catch (e) {
		if (e.number == 50012) {
			var message = '';
			message = _returnMessageKeyError(200)
			message = message.replace(/@email@/g, e.message)
			alert(e.name + '\n' + message);
			_this.value = "";
		}
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: _returnMessageKeyError
//Parametros:
// c = Codigo de Error
//Anotación:
// Retorna la descripción según el codigo de error enviado, y segun el idioma
//Uso:
// objeto.onblur = verifyMail;
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function _returnMessageKeyError(c) {
	if (!lang) lang = 'es-ES'
	if (keyError['code' + c][lang])
		return keyError['code' + c][lang];
	else
		return '';
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: __showInfo
//Parametros:
// e = Evento ejecutado (event)
// c = Codigo de Error
//Anotación:
// Muestra una cuadro de información de error
//Uso:
// __showInfo(event,200);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function __showInfo(e, c) {
	try {
		var obj = getTarget(e);

		var _top = 0, _left = 0;
		var _obj = new Object();

		_obj = obj;
		while (_obj) {
			_top += _obj.offsetTop;
			_left += _obj.offsetLeft;
			_obj = _obj.offsetParent;
		}
		//alert(document.body.offsetWidth)
		_left += obj.offsetWidth - 5;
		_top += 10;//obj.offsetHeight-10;
		var _div = document.getElementById('div_infoErroKey');
		_div.style['z-Index'] = 100;
		_div.style['position'] = 'absolute';
		_div.style['top'] = _top + 'px';
		_div.style['left'] = _left + 'px';
		_div.style.visibility = 'visible';
		_div.innerHTML = _returnMessageKeyError(c);
		_div.className = 'showErrInputType';

	} catch (e) {
		//alert(e.message)
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: __hiddenInfo
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Oculta el cuadro de información de error
//Uso:
// __hiddenInfo(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function __hiddenInfo(e) {
	try {
		var _div = document.getElementById('div_infoErroKey');
		_div.style.visibility = "hidden";
		//_div.style['display'] = "none";
		_div.className = 'hideErrInputType';
	} catch (e) {
		//alert(e.message)
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: onlyNum
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Controla que solo se digiten números
//Uso:
// onlyNum(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function onlyNum(e) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if ((key >= 48 && key <= 57) || keySpecial(key)) { __hiddenInfo(e) }
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 1); }
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function onlyNumConComa(e) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	//if(key==13)

	if ((key >= 48 && key <= 57) || key == 44 || keySpecial(key)) { __hiddenInfo(e) }
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 1); }
}

function onlyDecimal(e) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	var punto = 0;
	if ((key >= 48 && key <= 57) || key == 46 || key == 45 || keySpecial(key)) {
		__hiddenInfo(e);
		if (key == 46) {
			cadena = (e.srcElement).value
			if (cadena.indexOf(".") != -1) { punto = 1 }
			punto++;
			if (punto > 1) { stopEvent(e); cancelEvent(e); __showInfo(e, 2); }
		}
		if (key == 45) {
			cadena = (e.srcElement).value
			if (cadena.indexOf("-") != -1) { punto = 1 }
			punto++;
			if (punto > 1) { stopEvent(e); cancelEvent(e); __showInfo(e, 2); }
		}
	}
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 2); }
}

function onlyDecimalCP(e) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	var punto = 0;
	var decimal = 0;
	var _this;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	if ((key >= 48 && key <= 57) || key == 45 || key == 46 || keySpecial(key)) {
		__hiddenInfo(e);
		if (key == 46) {
			cadena = _this.value
			if (cadena.indexOf(".") != -1) {
				punto = 1;
			}
			punto++;
			if (punto > 1) { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
		} else {
			try {
				cadena = _this.value.substring(0, _this.selectionStart);
			} catch (e) {
				cadena = _this.value;
			}
			if (cadena.indexOf(".") != -1) {
				decimal = cadena.substring(cadena.indexOf(".")).length;
			}
			//Cambiar la cantidad de decimales que se están ingresando
			if (decimal > 5) { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
		}
	}
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
}

function onlyDecimalCP2(e) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	var punto = 0;
	var decimal = 0;
	var _this;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	if ((key >= 48 && key <= 57) || key == 45 || key == 46 || keySpecial(key)) {
		__hiddenInfo(e);
		if (key == 46) {
			cadena = _this.value
			if (cadena.indexOf(".") != -1) {
				punto = 1;
			}
			punto++;
			if (punto > 1) { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
		} else {
			try {
				cadena = _this.value.substring(0, _this.selectionStart);
			} catch (e) {
				cadena = _this.value;
			}
			if (cadena.indexOf(".") != -1) {
				decimal = cadena.substring(cadena.indexOf(".")).length;
			}
			if (decimal > 5) { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
			//Antes decimal > 4
		}
	}
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 3); }
}

function onlyTexto(e, spacerOk) {
	// note: backspace = 8, enter = 13, 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122 & /=47
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = '';
	if (spacerOk == 'spOk') {
		if ((key >= 64 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 46 || key == 95 || key == 209 || key == 225 || key == 233 || key == 237 || key == 241 || key == 243 || key == 250 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	} else {
		if ((key >= 64 && key <= 90) || (key >= 97 && key <= 122) || key == 46 || key == 95 || key == 209 || key == 225 || key == 233 || key == 237 || key == 241 || key == 243 || key == 250 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	}
}

function onlyTexto1(e, spacerOk) {
	// note: backspace = 8, enter = 13, 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122 & /=47
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = '';
	if (spacerOk == 'spOk') {
		if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	} else {
		if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	}
}

function onlyTexto2(e, spacerOk) {
	// note: backspace = 8, enter = 13, 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122 & /=47
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = '';
	if (spacerOk == 'spOk') {
		if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	} else {
		if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 4); }
	}
}


function onlyEmail(e) {
	// note: backspace = 8, enter = 13, 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122, '.' = 46, '@' = 64
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 46 || key == 64 || key == 45 || key == 95 || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
	else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
}

function onlyNumTexto(e, spacerOk) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	// 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = ''
	if (spacerOk == 'spOk') {
		if (key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || key == 160 || key == 130 || key == 161 || key == 162 || key == 163 || key == 239 || (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 40 || key == 41 || key == 47 || key == 58 || key == 59 || key == 44 || key == 46 || key == 33 || key == 173 || key == 63 || key == 168 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	} else {
		if (key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || key == 160 || key == 130 || key == 161 || key == 162 || key == 163 || key == 239 || (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 40 || key == 41 || key == 47 || key == 58 || key == 59 || key == 44 || key == 46 || key == 33 || key == 173 || key == 63 || key == 168 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	}
}

function onlyNumTextoSinAcento(e, spacerOk) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	// 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = ''
	if (spacerOk == 'spOk') {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 40 || key == 41 || key == 47 || key == 58 || key == 59 || key == 44 || key == 46 || key == 33 || key == 173 || key == 63 || key == 168 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	} else {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 40 || key == 41 || key == 47 || key == 58 || key == 59 || key == 44 || key == 46 || key == 33 || key == 173 || key == 63 || key == 168 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	}
}

function onlyOtroDocumento(e, spacerOk) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	// 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = ''
	if (spacerOk == 'spOk') {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 47 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	} else {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 47 || key == 209 || key == 241 || key == 45 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	}
}

function onlyTextoArea(e, spacerOk) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	// 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = ''
	if (spacerOk == 'spOk') {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 32 || key == 58 || key == 46 || key == 209 || key == 225 || key == 233 || key == 237 || key == 241 || key == 243 || key == 250 || key == 47 || key == 45 || key == 44 || key == 40 || key == 41 || key == 58 || key == 59 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	} else {
		if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 58 || key == 46 || key == 209 || key == 225 || key == 233 || key == 237 || key == 241 || key == 243 || key == 250 || key == 47 || key == 45 || key == 44 || key == 40 || key == 41 || key == 58 || key == 59 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	}
}

function onlyNumTextoSinPunto(e, spacerOk) {
	// note: backspace = 8, enter = 13, '0' = 48, '9' = 57 
	// 'A' = 65, 'Z' = 90, 'a' = 97, 'z' = 122
	if (!e) e = window.event;
	var key; key = !e.keyCode ? e.which : e.keyCode;
	if (spacerOk == undefined) spacerOk = ''
	if (spacerOk == 'spOk') {
		if (key == 13 || (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 209 || key == 241 || key == 32 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	} else {
		if (key == 13 || (key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 209 || key == 241 || keySpecial(key)) { __hiddenInfo(e); }
		else { stopEvent(e); cancelEvent(e); __showInfo(e, 100); }
	}
}


// registra un evento de acuerdo a IE y Firefox(DOM)
function agregarEvento(elemento, nombre_evento, funcion, captura) {
	// para IE
	if (elemento.attachEvent) {
		elemento.attachEvent('on' + nombre_evento, funcion);
		return true;
	} else   // para navegadores respetan Estándares DOM(Firefox,safari)
		if (elemento.addEventListener) {
			elemento.addEventListener(nombre_evento, funcion, captura);
			return true;
		} else
			return false;
}

function verfExp(campo, tipo) {

	switch (tipo) {
		case 'p':
			var checkOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú" + "0123456789";
			break;
		case 'a':
			var checkOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú " + "/";
			break;
		case 'n':
			var checkOK = "0123456789-";
			break;
		default:
			var checkOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú " + "0123456789" + "()_@-,./";
			break;
	}

	//var checkStr = new string;
	var checkStr = campo.value;
	var allValid = true;
	longi = checkStr.length;
	for (i = 0; i < checkStr.length; i++) {
		ch = checkStr.charAt(i);
		for (j = 0; j < checkOK.length; j++)
			if (ch == checkOK.charAt(j))
				break;
		if (j == checkOK.length) {
			//campo.value=Left(campo.value,(longi-1))	
			campo.value = clearChars(campo, ch);
			allValid = false;
			break;
		}
	}
	if (!allValid) {
		// alert("Escriba sólo letras en el campo \"Nombre\"."); 
		// campo.focus(); 
		return (false);
	}
	return (true);
}

function clearChars(campo, lt) {
	out = lt.toUpperCase(); // reemplazar esto
	add = ""; // por esto

	var entry = campo.value;
	temp = "" + entry;

	while ((temp.toUpperCase()).indexOf(out) > -1) {
		pos = (temp.toUpperCase()).indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
			temp.substring((pos + out.length), temp.length));
	}
	return temp;
}

function verDec(campo, lt) {
	out = lt; // reemplazar esto
	add = ""; // por esto

	var entry = campo.value;
	temp = "" + entry;
	pnt = 0

	while (temp.indexOf(out) > -1) {
		pos = temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
			temp.substring((pos + out.length), temp.length));
	}
	return temp;
}

function verNeg(campo, lt) {
	out = lt; // reemplazar esto
	add = ""; // por esto
	var entry = campo.value;
	temp = "" + entry;
	temp = "" + (temp.substring(0, 0) + add + temp.substring((0 + out.length), temp.length));
	while (temp.indexOf(out) > -1) {
		pos = temp.indexOf(out);
		temp = "" + (temp.substring(0, pos) + add +
			temp.substring((pos + out.length), temp.length));
	}
	return temp;
}

//Funciones de Texto
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: trim
//Parametros:
// s = texto
//Anotación:
// saca espacios repetidos dejando solo uno
// saca espacios blanco principio y final
//Uso:
// trim('texto');
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function trim(s) {
	s = s.replace(/\s+/gi, ' '); //sacar espacios repetidos dejando solo uno
	s = s.replace(/^\s+|\s+$/gi, ''); //sacar espacios blanco principio y final
	return s;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: String.trim
//Parametros:
//
//Anotación:
// Asignación de función trim al objeto String
//Uso:
// 'texto '.trim();
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
String.prototype.trim =
	function () {
		return this.replace(/^\s+|\s+$/g, ''); //sacar espacios blanco principio y final
	};
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: String.allTrim
//Parametros:
//
//Anotación:
// Asignación de función allTrim al objeto String
//Uso:
// 'texto '.allTrim();
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
String.prototype.allTrim =
	function () {
		var str;
		str = this.replace(/\s+/gi, ' '); //sacar espacios repetidos dejando solo uno
		str = str.replace(/^\s+|\s+$/g, ''); //sacar espacios blanco principio y final
		return str;
	};
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬


function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function () {
			oldonload();
			func();
		}
	}
}

function __onBlur(e) {
	var _this;
	if (!e) e = window.event;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	_this.value = clearChars(_this, "'");
	_this.value = clearChars(_this, "´");
	_this.value = clearChars(_this, '+');
	_this.value = clearChars(_this, "script");
	_this.value = clearChars(_this, "</");
	_this.value = clearChars(_this, '"');

	var _valExp = _this.getAttribute('valExp');

	switch (_valExp) {
		case 'login':
			_this.value = clearChars(_this, "-");
			_this.value = clearChars(_this, "(");
			_this.value = clearChars(_this, ")");
			_this.value = clearChars(_this, "^");
			_this.value = clearChars(_this, "[");
			_this.value = clearChars(_this, "]");
			_this.value = clearChars(_this, '[]');
			_this.value = clearChars(_this, '()');
			_this.value = clearChars(_this, '{}');
			_this.value = clearChars(_this, '}');
			_this.value = clearChars(_this, '{');
			_this.value = clearChars(_this, ',');
			_this.value = clearChars(_this, ';');
			break;
		case 'correo':
			verifyMail(e);
			break;
		case 'numero':
			var _ingreso = _this.value;
			var _i = 0;
			for (_i = 0; _i < _ingreso.length; _i++) {
				if (_ingreso.charAt(_i).charCodeAt(0) == 13 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
		case 'numero2':
			var _ingreso = _this.value;
			var _i = 0;
			for (_i = 0; _i < _ingreso.length; _i++) {
				if (_ingreso.charAt(_i).charCodeAt(0) == 44 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
		case 'moneda1':
			var _ingreso = _this.value;
			var _i = 0;
			var _punto = 0;
			var _entero = "";
			var _decimal = "";
			for (_i = 0; _i < _ingreso.length; _i++) {
				//alert(_ingreso.charAt(_i).charCodeAt(0));
				if (_ingreso.charAt(_i).charCodeAt(0) == 13 || _ingreso.charAt(_i).charCodeAt(0) == 46 || _ingreso.charAt(_i).charCodeAt(0) == 45 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
					if (_ingreso.charAt(_i).charCodeAt(0) == 46) {
						_punto++;
						if (_punto > 1) {
							_this.value = clearChars(_this, _ingreso.charAt(_i));
						}
					}
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
		case 'moneda2':
			var _ingreso = _this.value;
			var _i = 0;
			var _punto = 0;
			var _entero = "";
			var _decimal = "";
			for (_i = 0; _i < _ingreso.length; _i++) {
				if (_ingreso.charAt(_i).charCodeAt(0) == 13 || _ingreso.charAt(_i).charCodeAt(0) == 46 || _ingreso.charAt(_i).charCodeAt(0) == 45 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
					if (_ingreso.charAt(_i).charCodeAt(0) == 46) {
						_punto++;
						if (_punto > 1) {
							_this.value = clearChars(_this, _ingreso.charAt(_i));
						}
					}
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
		//            _entero = _this.value.substring(_this.value.indexOf("."));
		//            _decimal = _this.value.substring(0, _this.value.indexOf(".") - 1);
		//            _this.value = _entero + '.' + _decimal;
		//            break;
		//        case 'fecha': 
		//            var cont = _this.value.length;
		//            if (cont > 1 )
		//                alert('cantidad ' + cont);
		//            break;    
	}

}

function __onBlurTAre(e) {
	var _this;
	if (!e) e = window.event;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	_this.value = clearChars(_this, "'");
	_this.value = clearChars(_this, "´");
	_this.value = clearChars(_this, '+');
	_this.value = clearChars(_this, '=');
	_this.value = clearChars(_this, '"');
	_this.value = clearChars(_this, "script");
	_this.value = clearChars(_this, "</");

	var _valExp = _this.getAttribute('valExp');

	switch (_valExp) {
		case 'numero':
			var _ingreso = _this.value;
			var _i = 0;
			for (_i = 0; _i < _ingreso.length; _i++) {
				if (_ingreso.charAt(_i).charCodeAt(0) == 13 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
		case 'numero2':
			var _ingreso = _this.value;
			var _i = 0;
			for (_i = 0; _i < _ingreso.length; _i++) {
				if (_ingreso.charAt(_i).charCodeAt(0) == 44 || (_ingreso.charAt(_i).charCodeAt(0) >= 48 && _ingreso.charAt(_i).charCodeAt(0) <= 57)) {
				} else {
					_this.value = clearChars(_this, _ingreso.charAt(_i));
				}
			}
			break;
	}
}



function __onKeyPress(e) {
	/*-----------------------------------------------------------------
	valExp
		* texto
		* stexto - sin espacion
		* numero
		* correo
		* moneda
		* login
	-----------------------------------------------------------------*/
	var _this;
	if (!e) e = window.event;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	var _valExp = _this.getAttribute('valExp');

	switch (_valExp.toLowerCase()) {
		case 'texto':
			onlyNumTexto(e, 'spOk');
			break;
		case 'texto1':
			onlyNumTexto(e, '');
			break;
		case 'textosa':
			onlyNumTextoSinAcento(e, 'spOk');
			break;
		case 'textosa1':
			onlyNumTextoSinAcento(e, '');
			break;
		/*case 'texto2':
			onlyNumTextoSinPunto(e,'');
			break;	*/
		case 'stexto':
			onlyTexto(e, 'spOk');
			break;
		case 'stexto1':
			onlyTexto(e, '');
			break;
		/*case 'stexto2':
			onlyTexto1(e,'');
			break;*/
		case 'numero':
			onlyNum(e);
			break;
		case 'correo':
			onlyEmail(e);
			break;
		case 'moneda':
			onlyDecimal(e);
			break;
		case 'moneda1':
			onlyDecimalCP(e);
			break;
		case 'moneda2':
			onlyDecimalCP2(e);
			break;
		case 'login':
			onlyNumTexto(e, 'spNo');
			break;
		case 'numero2': //usado para el ingreso de DNI's separados por coma
			onlyNumConComa(e);
			break;
		case 'otrodocumento':
			onlyOtroDocumento(e, 'spOk');
			break;
		case 'otrodocumento1':
			onlyOtroDocumento(e, '');
			break;
	}
}

function __onKeyPressTArea(e) {
	var _this;
	if (!e) e = window.event;
	if (e.target) _this = e.target;
	else if (e.srcElement) _this = e.srcElement;
	if (_this.nodeType == 3) // defeat Safari bug
		_this = targ.parentNode;

	var _valExp = _this.getAttribute('valExp');
	switch (_valExp) {
		case 'texto':
			onlyNumTexto(e, 'spOk');
			break;
		case 'numero2': //usado para el ingreso de DNI's separados por coma
			onlyNumConComa(e);
			break;
		default:
			//onlyNumTexto(e,'spOk');
			onlyTextoArea(e, 'spOk');
			break;
	}
}

function asignarEvents() {
	var _inputs = document.getElementsByTagName("INPUT"); //-- Array de Objetos Input
	var _textareas = document.getElementsByTagName("TEXTAREA"); //-- Array de Objetos TextArea

	var _div = document.createElement('DIV');
	_div.id = 'div_infoErroKey';
	_div.name = 'div_infoErroKey';
	_div.className = 'hideErrInputType';
	document.body.appendChild(_div);

	for (var i = 0; i < _inputs.length; i++) {
		_input = _inputs[i];
		if (_input.type == 'text' || _input.type == 'password') {
			_valExp = _input.getAttribute('valExp');

			if (_valExp == undefined) _valExp = '';
			_valExp = _valExp.toLowerCase();
			_input.setAttribute('valExp', _valExp);

			//evento Blur (Fuera de Foco)
			agregarEvento(_input, 'blur', __onBlur, false);
			agregarEvento(_input, 'blur', __hiddenInfo, false);
			//---------------------------------------------------------------------<
			//evento KeyPress (Presionar Tecla)
			agregarEvento(_input, 'keypress', __onKeyPress, false);
			//---------------------------------------------------------------------<
		}
	}

	//	for(var i=0;i<_textareas.length;i++){
	//		_textarea = _textareas[i];
	//		_valExp = _textarea.getAttribute('valExp');
	//		
	//		if (_valExp == undefined) _valExp = '';
	//		_valExp = _valExp.toLowerCase();
	//		_textarea.setAttribute('valExp',_valExp);
	//		
	//		//evento Blur (Fuera de Foco)
	//		agregarEvento(_textarea, 'blur', __onBlurTAre, false);
	//		agregarEvento(_textarea, 'blur', __hiddenInfo, false);
	//		//---------------------------------------------------------------------<
	//		//evento KeyPress (Presionar Tecla)
	//		agregarEvento(_textarea, 'keypress', __onKeyPressTArea, false);
	//		//---------------------------------------------------------------------<
	//	}
}

function whichButton(event) {
	if (!event) event = window.event;
	if (event.button == 2) {
		alert("You clicked the right mouse button!")
	} else {
		alert("You clicked the left mouse button!")
	}
}

function right(e) {
	if (navigator.appName == 'Netscape' && e.which == 3) {
		return false;
	} else {
		if (navigator.appName == 'Microsoft Internet Explorer' && event.button == 2) {
			return false;
		}
		return true;
	}
}

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: keyDisabledCtrl
//Parametros:
// k = Codigo key
//Anotación:
// Retorna true, si se encuentra en la lista de key desactivados con la combinación
// del teclado Ctrl
//Uso:
// keyDisabledCtrl(45);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function keyDisabledCtrl(k) {
	/*
		Se Cancela la combinación:
			Ctrl + N
			Ctrl + V
			Ctrl + U
		|| k == 70 || k == 102
	*/
	if (k == 86 || k == 118 || k == 110 || k == 78 || k == 85 || k == 117)
		return true;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: keyDisabledAlt
//Parametros:
// k = Codigo key
//Anotación:
// Retorna true, si se encuentra en la lista de key desactivados con la combinación
// del teclado Alt
//Uso:
// keyDisabledAlt(45);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function keyDisabledAlt(k) {
	if ((k >= 65 && k <= 90) || (k >= 97 && k <= 122))
		return true;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: keyDisabledShift
//Parametros:
// k = Codigo key
//Anotación:
// Retorna true, si se encuentra en la lista de key desactivados con la combinación
// del teclado Alt
//Uso:
// keyDisabledShift(45);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function keyDisabledShift(k) {
	if ((k >= 37 && k <= 39))
		return true;
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: disabledkeypress
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Desactiva el Ctrl y Alt, más los key asignados, al precionar las teclas
//Uso:
// disabledkeypress(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function disabledkeypress(e) {
	try {
		if (!e) e = window.event;
		var key; key = !e.keyCode ? e.which : e.keyCode;

		if (e.ctrlKey && keyDisabledCtrl(key)) { stopEvent(e); cancelEvent(e); }
		if (e.altKey && keyDisabledAlt(key)) { stopEvent(e); cancelEvent(e); }
		if (e.shiftKey && keyDisabledShift(key)) { stopEvent(e); cancelEvent(e); }
		/*if (key == 114)
			{stopEvent(e);cancelEvent(e);}*/
	} catch (e) {
		//alert(e.message)
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//Función: disabledkeydown
//Parametros:
// e = Evento ejecutado (event)
//Anotación:
// Desactiva el Ctrl y Alt, más los key asignados, al precionar las teclas
//Uso:
// disabledkeydown(event);
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
function disabledkeydown(e) {
	try {
		if (!e) e = window.event;
		var key; key = !e.keyCode ? e.which : e.keyCode;

		if (e.ctrlKey && keyDisabledCtrl(key)) { stopEvent(e); cancelEvent(e); }
		if (e.altKey && keyDisabledAlt(key)) { stopEvent(e); cancelEvent(e); }
		if (e.shiftKey && keyDisabledShift(key)) { stopEvent(e); cancelEvent(e); }
		/*if (key == 114)
			{stopEvent(e);cancelEvent(e);}*/
	} catch (e) {
		//alert(e.message)
	}
}
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//desactivar shiftKey
agregarEvento(window, 'load', asignarEvents, false);
//agregarEvento(document,'keypress',disabledkeypress,false);
//agregarEvento(document,'keydown',disabledkeydown,false);
//agregarEvento(document,'mousedown',whichButton,false);