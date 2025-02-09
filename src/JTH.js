class JTH extends Object {
	constructor(prop) {
		
		super();
		{
			let a = document.createElement('a');
			this.StyleKeys = Object.keys(a.style);
		}
		this.VARIABLE = '$';
		
		if (!prop.hasOwnProperty('data')) {
			throw new Error('Data not defined;')
		}
		this.renderedJSON = [];
		this.templateElement = {};
		this.jsonObj = (prop.data);

		if (this.getRawDataType(this.jsonObj) == "string") {
			this.jsonObj = JSON.parse(this.jsonObj);
		}

		if (this.getRawDataType(this.jsonObj) == "object") {
			this.jsonObj = [(this.jsonObj)];
		}

		this.templates = prop.templates || prop.template || {};

		this.defaultElement = prop.defaultElement || "div";
		this.HTMLdata = this.__createElement__(this.jsonObj, true);
		this.div = prop.div || "document.body.innerHTML";

		window['draw'] = function (obj, div) {
			history.pushState({ data: document.body.innerHTML, url: document.URL }, document.title);
			if (JTH.getRawDataType(obj) == "jth") {
				obj.render();
				return;
			}
			new JTH({
				"data": obj,
				"div": div || "document.body.innerHTML",
			}).render();
		}

		window.onpopstate = function (e) {
			if (e.state != null) {
				document.body.innerHTML = e.state.data;
			}
		}

		{
			JTH.prototype.toString = function () {
				return ("[object JTH]");
			}
		}
	}
	render() {
		this.renderedJSON = JSON.parse('[' + this.renderedJSON.join(',') + ']')
		let pathFinder, splitedDev = this.div.split('.');
		let lastElement = splitedDev.pop();
		for (let obj of splitedDev) {
			if (!pathFinder) {
				pathFinder = eval(obj);
				continue;
			}
			if (obj.indexOf('(') > -1) {
				pathFinder = eval(splitedDev.join('.'));
				break;
			}
			pathFinder = pathFinder[obj];
		}
		pathFinder[lastElement] = this.HTMLdata;
	}

	__key_child(child) {
		return this.__createElement__(child);
	}

	__key_ctdn(ctdn) {
		if (ctdn.hasOwnProperty('switch') && ctdn.hasOwnProperty('if')) {
			throw new Error("Multiple Control Statement");
		}
		if ((!ctdn.hasOwnProperty('switch')) && (!ctdn.hasOwnProperty('if'))) {
			throw new Error("Multiple Control Statement");
		}
		//IF Statement
		if (ctdn.hasOwnProperty('if')) {
			return this.__render_if(ctdn);
		}
		if (ctdn.hasOwnProperty('switch')) {
			return this.__render_switch(ctdn['switch']);
		}
		return "";
	}

	__render_switch(ctdn) {
		if ((!ctdn.hasOwnProperty('key')) || (!ctdn.key)) {
			throw new Error("Missing key in switch");
		}
		if (!ctdn.hasOwnProperty('case')) {
			throw new Error("Missing case in switch");
		}

		if (Object.keys(ctdn['case']).indexOf(ctdn.key) > -1) {
			this.renderedJSON.push(JSON.stringify(ctdn['case'][ctdn.key]));
			return this.__createElement__(ctdn['case'][ctdn.key]);
		}

		if (ctdn['case'].hasOwnProperty('def')) {
			this.renderedJSON.push(JSON.stringify(ctdn['case']['def']));
			return this.__createElement__(ctdn['case']['def']);
		}
		console.warn('Cannot find value in switch')
		return '';
	}

	__render_if(ctdn) {
		if (!ctdn.hasOwnProperty('if')) {
			throw new Error("Missing if Statement");
		}

		let __if = ctdn['if'], __elif = ctdn['elif'], __else = ctdn['else'];
		let objkeyIf = Object.keys(__if);
		if (objkeyIf.length != 1) {
			throw new Error("Multiple Condition inside If object");
		}
		let __render_child_ele = [];

		if (eval(objkeyIf[0])) {
			this.renderedJSON.push(JSON.stringify(__if[objkeyIf[0]]));
			return this.__createElement__(__if[objkeyIf[0]]);
		}
		if (ctdn.hasOwnProperty('elif')) {
			let objkeyElif = Object.keys(__elif);
			if (eval(objkeyElif[0])) {
				this.renderedJSON.push(JSON.stringify(__elif[objkeyElif[0]]));
				return this.__createElement__(__elif[objkeyElif[0]]);
			}
		}
		if (ctdn.hasOwnProperty('else')) {
			this.renderedJSON.push(JSON.stringify(__else));
			return this.__createElement__(__else);
		}
		console.warn('Cannot find value in if')
		return "";
	}

	__key_var(_var) {
		for (let __var of _var.split(';')) {
			let __var_name, __var_val;
			__var_name = __var;
			if (__var.indexOf('=') > -1) {
				let __obj = __var.split('=');
				__var_name = __obj[0];
				__var_val = __obj[1];
				if (__var_val.startsWith(this.VARIABLE)) {
					__var_val = __var_val.substring(1);
				}
				else {
					__var_val = '\"' + __var_val + '\"'
				}
			}
			eval("window['" + __var_name + "']" + ((!!__var_val) ? ('=' + __var_val) : '') + "");
		}
	}

	__key_code(__code, __let) {
		for (let ___code___ of __code.split(';')) {
			let __tmp_var = this.__split_to_variable(___code___);
			let key = Object.keys(__tmp_var)[0];
			let val = __tmp_var[key];
			let __letGlobalObject = Object.keys(__let)
			if ((!!__letGlobalObject[0]) && (__letGlobalObject[0]).indexOf(key) > -1) {
				__let[key] = val;
			}
			else {
				//REMOVE $ 
				if (___code___.startsWith(this.VARIABLE)) {
					___code___ = ___code___.substring(1);
				}
				try {
					this.__key_var(___code___);
				} catch (e) {
				}
			}
		}
		return __let;
	}

	__split_to_variable(__let) {
		let __let_var = {}, __var_name = __let, __var_val;
		if (__let.indexOf('=') > -1) {
			let __arr = __let.split("=");
			__var_name = __arr[0];
			if (__arr[1][0] == "'" || __arr[1][0] == '"') {
				__var_val = __arr[1].substring(1, (__arr.length - 1));
			} else {
				__var_val = __arr[1];
			}
		}

		if (__var_name.startsWith(this.VARIABLE)) {
			__var_name = __var_name.substring(1);
		}
		__let_var[__var_name];
		if (!!__var_val) {
			__let_var[__var_name] = __var_val;
		}
		return __let_var;
	}
	
	/** function that parse data*/
	___0x0001(obj)
	{
		for (let __var__ in obj) {
			if (['code', 'let', 'var'].indexOf(__var__) == -1 && this.getRawDataType(obj[__var__]) == 'string' && obj[__var__].indexOf(this.VARIABLE) > -1) {
				let _____0x00002=false;//SKIP ITERATION
				let variable = obj[__var__].split(this.VARIABLE)
				if(variable[0].endsWith("\\"))
				{
					variable[0]=variable[0].substring(0,variable[0].length-1)
					_____0x00002=true;
					Object.defineProperty(obj, __var__, { "value": variable.join('$'), "writable": false });
				}
				for (let _____i = 1; ( _____i < variable.length)&&(!_____0x00002); _____i++) {
					if(variable[_____i].endsWith("\\"))
					{
						variable[_____i]=variable[_____i].substring(0,variable[_____i].length-1)+this.VARIABLE+variable[_____i+1];
						Object.defineProperty(obj, __var__, { "value": variable.join('$'), "writable": false });
						_____0x00002=true;
						continue;
					}
					_____0x00002=false;
					let keyWord = variable[_____i].split(new RegExp('[\\ \\' + this.VARIABLE + ']', 'g'))[0];
					if(keyWord.length<1||keyWord[0]==" "||keyWord.indexOf("\ ")>0)
					{
						continue;
					}
					let ____replace = this.VARIABLE + keyWord;
					//let ____re = new RegExp(____replace,"g");
					try {
						Object.defineProperty(obj, __var__, { "value": (obj[__var__].replace(____replace, eval(keyWord))), "writable": false })
					} catch (e) {
						console.warn('String to code convertion failed. Retrying using JavaScript eval.', e);

						let keyWord = obj[__var__].replace(new RegExp('[\\' + this.VARIABLE + ']', 'g'), '');
						let function_name = keyWord.split('\(')[0];
						if(!(/\s/g.test(function_name)))
						{
							try{
								if (eval(function_name + ' instanceof Function')) {
									let __param = obj[__var__].substring(obj[__var__].indexOf('(') + 1., obj[__var__].lastIndexOf(')')).split(',');
									for (let ___param = 0; ___param < __param.length; ___param++) {
										if (__param[___param].indexOf(this.VARIABLE) > -1) {
											__param[___param] = JSON.stringify(eval(__param[___param].replace(new RegExp('[\\' + this.VARIABLE + ']', 'g'), '')));
										}
									}
		
									Object.defineProperty(obj, __var__, { "value": function_name + '(' + __param.join(',') + ')', "writable": false });
								} else {
									Object.defineProperty(obj, __var__, { "value": eval(keyWord), "writable": false });
								}
							}
							catch(e)
							{
								throw new Error ('String to code convertion failed', e);
							}
						}
						break;
					}
				}
			}
		}
		return obj;
	}
	
	__createElement__(resp,___canEval) {
		let __HTMLTEXT__ = "";
		if (this.getRawDataType(resp) == "object") {
			resp = [resp];
		}

		for (let obj of resp) {
			let __let_var = {};
			let __element__;
			let tag, __var, __let, child, ctdn, code, loop, template,comments, prop = [];
			__var = obj['var'];
			__let = obj['let'];
			code = obj['code'];
			comments = obj['comments'];

			//CREATE LOCAL VARIABLE(let)
			if (!!__let) {
				__let_var = this.__split_to_variable(__let);
			}

			if (!!code) {
				if (this.getRawDataType(code) == "array") {
					for (let codeStr of code) {
						__let_var = this.__key_code(codeStr, __let_var);
						if (!!___canEval) {
							eval(codeStr.replace(new RegExp('\\' + this.VARIABLE, 'g'), ''));
						}
					}
				}
				if (this.getRawDataType(code) == "string") {
					__let_var = this.__key_code(code, __let_var);
					if (!!___canEval) {
						eval(code.replace(new RegExp('\\' + this.VARIABLE, 'g'), ''));
					}
				}
			}
			//CREATE GLOBAL VARIABLE(var)
			if (!!__var) {
				this.__key_var(__var);
			}
			//CONVERT VALUE TO VARIABLE DATA
			for (let __var__ in obj) {
				if ((!!obj[__var__]) && this.getRawDataType(obj[__var__]) == 'string' && (obj[__var__]).startsWith(this.VARIABLE) && (!!__let_var[(obj[__var__]).slice(1)])) {
					Object.defineProperty(obj, __var__, { value: __let_var[(obj[__var__]).slice(1)], writable: false });
				}
				if ((!!obj[__var__]) && this.getRawDataType(obj[__var__]) == 'string' && (obj[__var__]).startsWith(this.VARIABLE) && (!!window[(obj[__var__]).slice(1)])) {
					Object.defineProperty(obj, __var__, { value: window[(obj[__var__]).slice(1)], writable: false });
				}
			}
			//CONVERT VARIABLE TO VALUE
			obj=this.___0x0001(obj)
			
			this.renderedJSON.push(JSON.stringify(obj));
			//({tag,child,ctdn,loop,code,...prop}=obj);
			let tempObject = Object.assign({}, obj);
			/*MOVED CHILD TO __defineProperties*/
			//({tag,ctdn,child,loop,code,template}=tempObject);

			({ tag, ctdn, loop, code, template } = tempObject);
			delete tempObject.tag;
			//delete tempObject.child;
			delete tempObject.ctdn;
			delete tempObject.loop;
			delete tempObject.code;
			delete tempObject.template;
			prop = tempObject;
			
			if (!!comments) {
				let rendered = this.__key_comments(comments);
				__HTMLTEXT__ += rendered;

			}
			if (!!template) {
				let rendered = this.__key_template(template);
				__HTMLTEXT__ += rendered;

			}
			if (!!ctdn) {
				let rendered = this.__key_ctdn(ctdn);
				__HTMLTEXT__ += rendered;
			}
			if (!!loop) {
				let rendered = this.__key_loop(loop);
				__HTMLTEXT__ += rendered;
			}
			if (!!tag) {
				__element__ = document.createElement(tag || this.defaultElement);
				__element__ = this.__defineProperties(__element__, prop);
				__HTMLTEXT__ += __element__;
			}
			/*MOVED CHILD TO __defineProperties*/
			/*if(!!child)
			{
				//recursion
				__HTMLTEXT__+=this.__key_child(child);
			}*/
		}
		return __HTMLTEXT__;
	}

	__key_loop(loop) {
		if ((!loop.hasOwnProperty('for')) && (!loop.hasOwnProperty('do')) && (!loop.hasOwnProperty('while'))) {
			throw new Error("No condition found inside loop");
		}
		if (Object.keys(loop).length != 1) {
			throw new Error("Multiple found inside loop");
		}
		if (loop.hasOwnProperty('for')) {
			return this.__key_for(loop['for']);
		}
		if (loop.hasOwnProperty('do')) {
			return this.__key_do(loop['do']);
		}
		if (loop.hasOwnProperty('while')) {
			return this.__key_while(loop['while']);
		}
		return "";
	}

	__key_for(__loop) {
		let inz__var, inz__let, tem, code, stmt;

		if (__loop.hasOwnProperty('var')) {
			this.__key_var(__loop['var']);
		}

		if (__loop.hasOwnProperty('tem')) {
			tem = __loop['tem'];
			tem = tem.replace(new RegExp('\\' + this.VARIABLE, 'g'), '');
		}
		if (__loop.hasOwnProperty('code')) {
			code = __loop['code'];
			code = code.replace(new RegExp('\\' + this.VARIABLE, 'g'), '');
		}
		if (__loop.hasOwnProperty('stmt')) {
			stmt = __loop['stmt'];
		}
		let ret_ele = [];
		while (eval(tem)) {
			this.renderedJSON.push(JSON.stringify(stmt));
			ret_ele.push(this.__createElement__(JSON.parse(JSON.stringify(stmt))));
			eval(code);
		}
		return ret_ele.join('');
	}

	__key_do(__loop) {
		let __data = Object.keys(__loop), ret_ele = [];
		if (__data.length > 1) {
			throw new Error("Multiple found inside Do while");
		}
		if (__data.length < 1) {
			throw new Error("Invalid Object inside Do while");
		}
		__data = __data[0];

		if (JSON.stringify(__loop[__data]).indexOf('code') < 0) {
			throw new Error("Code key not found inside do while");
		}
		let __eval__code = __data.replace(new RegExp('\\' + this.VARIABLE, 'g'), '');

		do {
			this.renderedJSON.push(JSON.stringify(__loop[__data]));
			ret_ele.push(this.__createElement__(JSON.parse(JSON.stringify(__loop[__data])), 'loop'));
		} while (eval(__eval__code));

		return ret_ele.join('');
	}

	__key_while(__loop) {
		let __data = Object.keys(__loop), ret_ele = [];
		if (__data.length > 1) {
			throw new Error("Multiple found inside While loop");
		}
		if (__data.length < 1) {
			throw new Error("Invalid Object inside While loop");
		}
		__data = __data[0];
		if (JSON.stringify(__loop[__data]).indexOf('code') < 0) {
			throw new Error("Code key not found inside while");
		}

		let __eval__code = __data.replace(new RegExp('\\' + this.VARIABLE, 'g'), '');

		while (eval(__eval__code)) {
			this.renderedJSON.push(JSON.stringify(__loop[__data]));
			ret_ele.push(this.__createElement__(JSON.parse(JSON.stringify(__loop[__data])), 'loop'));
		}
		return ret_ele.join('');
	}

	__defineProperties(__element__, prop) {
		let props = [];
		for (let __prop__ in prop) {
			if (!__prop__.indexOf("on")) {
				if (this.getRawDataType(prop[__prop__]) == 'array') {
					let __func = [];
					for (let ___value of prop[__prop__]) {
						__func.push((___value).replace(/([\s])/g, String.fromCharCode(160)));
					}
					props.push(__prop__ + '=' + __func.join(";"))
				} else {
					props.push(__prop__ + '=' + (prop[__prop__]).replace(/([\s])/g, String.fromCharCode(160)));
				}

				continue;
			}
			switch (__prop__.toLowerCase()) {
				case ("child"):
					{
						__element__["innerHTML"] = this.__key_child(prop[__prop__]);
						break;
					}
				case ("value"):
					{
						__element__["defaultValue"] = prop[__prop__];
						break;
					}
				case ("text"):
					{
						__element__["innerHTML"] = prop[__prop__];
						break;
					}
				case ("checked"):
					{
						__element__["defaultChecked"] = prop[__prop__.toLowerCase()];
						break;
					}
				case ("tabindex"):
					{
						__element__["tabIndex"] = prop[__prop__.toLowerCase()];
						break;
					}
				case ("class"):
					{
						if (this.getRawDataType(prop[__prop__]) == "array") {
							__element__["classList"] = prop[__prop__].join(' ');
						}
						if (this.getRawDataType(prop[__prop__]) == "string") {
							__element__["classList"] = prop[__prop__].toString();
						}
						break;
					}
				default:
					{
						//SET STYLE ATTR
						if (this.StyleKeys.indexOf(__prop__) > -1) {
							__element__['style'][__prop__] = prop[__prop__];
						}
						__element__[__prop__] = prop[__prop__];
					}
			}
		}
		if (props.length > 0) {
			return this.insertStringAt(__element__.outerHTML, __element__.outerHTML.indexOf('>'), " " + props.join(" "));
		}
		return __element__.outerHTML;
	}

	__key_template(__template) {
		if (!this.templates[__template]) {
			throw new Error("Template " + __template + " undefined");
		}
		//MAKE OBJ AS ARRAY
		this.renderedJSON.push(JSON.stringify(this.templates[__template]));
		return this.__createElement__(this.templates[__template]);
	}
	
	__key_comments(__comments) {
		return "<!--"+ __comments +"-->"
	}
	getRawDataType(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	static getRawDataType(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	insertStringAt(org, pos, str) {
		return org.slice(0, pos) + str + org.slice(pos);
	}

}