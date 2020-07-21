window['help_menu'] = [
	{
		"title": "Getting Started",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Getting Started",
			},
			{
				"tag": "h3",
				"text": "JTH Stands for JSON TO HTML.",
			},
			{
				"tag": "p",
				"text": "JTH is the small Script that render and execute in DOM. It's work as single page application."
					+ "Compare to other similar library it has extra features like recursion child render, Conditional Statement, Looping Statement, Templates etc."
			},
			{
				"tag": "h3",
				"text": "How to Work."
			},
			{
				"tag": "p",
				"text": "This is the tutorial of how to add script in HTML. Include this library in src in script. you can download or use directly from refering the url in src atttribute."
					+ "JTH is a Class type Library. you have to Create an Object for the library. The sample on below."
			},
			{
				"tag": "code",
				"text": "window.onload=function(){"
					+ "var obj = new JTH\t(\t{\tdata:[...],\tdiv:'...',\ttemplate:{...},\tdefaultElement:'...'}\t);\t}"
			},
			{
				"tag": "p",
				"text": "The every property has it's own usage to process and render the Object in the DOM. These Properties desscription are"
			},
			{
				"tag": "UL",
				"child": [
					{
						"tag": "li",
						"text": "data : Collection of objects that render as HTML in DOM",
						"class": "required"
					},
					{
						"tag": "li",
						"text": "div : Render the data in the div (BY DEFAULT : IT RENDER IN BODY TAG)"
					},
					{
						"tag": "li",
						"text": "template : It\'s like the template that has define single time and used multiple time by using inside data by using template tag"
					},
					{
						"tag": "li",
						"text": "defaultElement : Create new element when the tag property is missing in object(BY DEFAULT : div)"
					}
				]
			},
			{
				"tag": "p",
				"text": 'define property is mandatory.',
				"class": "required"
			},
			{
				"tag": "code",
				"text": '[\n{\n\t"tag":"label",\n\t"text":"Hello World!!!"\n}\n\t]'
			},
			{
				"tag": "p",
				"text": "This is the above example renders Hello World!!! in the DOM. You can see object fields in upcoming tutorial."
			},
			{
				"tag": "b",
				"text": "NOTE : You can Copy & Paste the above example in Playground real-time."
			}
		]
	},
	{
		"title": "Intro",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Intro"
			},
			{
				"tag": "h3",
				"text": "Please check above topic for setup."
			},
			{
				"tag": "p",
				"text": "Here we are discussing about properties."
			},
			{
				"tag": "p",
				"text": "JTH uses properties that render as tags and attribute in HTML. These tags and attribute use HTMLElement Properties to give effective result."
					+ "Objects are rendered in given order. It won\'t getting sort."
			},
			{
				"tag": "p",
				"text": "JTH can automatically accept styles attribute. If you want to use styles like background-color you have to remove the \'-\' from the text and specify in camel-Case and give as backgroundColor."
					+ "The library automatically process and render as background-col	or. In that way you can use all style properties and attribute."
			},
			{
				"tag": "code",
				"text": '[\t{\t"tag":"label"\t,"text":"Hello World!!!"\t,"color":"red"\t,"textTransform":"uppercase"\t}\t]'
			},
			{
				"tag": "p",
				"text": 'JTH has some special properties that make the user easy. These tags are'
			},
			{
				"tag": "UL",
				"child": [
					{
						"tag": "li",
						"text": "tag"
					},
					{
						"tag": "li",
						"text": "child"
					},
					{
						"tag": "li",
						"text": "code"
					},
					{
						"tag": "li",
						"text": "loop"
					},
					{
						"tag": "li",
						"text": "template"
					}
				]
			},
			{
				"tag": "div",
				"id": "child",
				"child": [
					{
						"text": "tag",
						"tag": "h2"
					},
					{
						"tag": "p",
						"text": "TAG is the property that generate the elements like div,h1,h2,textarea,etc.. . "
					},
					{
						"tag": "code",
						"text": '{"tag":"textarea"}'
					}
				]
			},
			{
				"tag": "div",
				"id": "tags",
				"child": [
					{
						"text": "child",
						"tag": "h2"
					},
					{
						"tag": "p",
						"text": "Child is the Pre-defined property which accepts array of objects that render element inside the parent element."
							+ "It is recursive which means you can define n number of child inside child element."
					},
					{
						"tag": "code",
						"text": '{"tag":"div", "backgroundColor":"red", "text":"Parent" ,"child":[{"tag":"label", "text":"child" }]}'
					},
					{
						"tag": "p",
						"text": "The above example create a div element and the label inside the div as a child and so on."
					},
					{
						"tag": "code",
						"text": 'eg: {"child":[{"child":[{...}]}]}'
					}
				]
			}
		]
	},
	{
		"title": "Variables",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Variables"
			},
			{
				"text": "Variables",
				"tag": "h2"
			},
			{
				"tag": "p",
				"text": "JTH uses variables that can use across the json as same as other programming language. It support both primitive and non-primitive variables." +
					"In JTH the variable can be define and access with $ symbol."
			},
			{
				"tag":"code",
				"text":"[{'code':'_a=10'},{'tag':'textarea','text':'\\$a'}]"
			},
			{
				"tag":"ul",
				"child":[
					{
						tag:"li",
						"text":"var"
					},
					{
						tag:"li",
						"text":"let"
					},
					{
						tag:"li",
						"text":"window"
					}
				]
			},
			{
				"text": "\\var",
				"tag": "h4"
			},
			{
				"tag": "p",
				"text": "\\var is used to define variable. The var can be access in any place of javascript and template. The scope of var will maintain till the process get compiled."
				+"var can be declared and it cannot in different files and after the program got executed. The scope will be destroyed"
			},
			{
				"tag":"code",
				"text":"[{'var':'_a=10'},{'tag':'textarea','text':'$a'}]"
			},
			{
				"text": "let",
				"tag": "h4"
			},
			{
				"tag": "p",
				"text": "let is similar but the scope of let is different from var. the let variable can only access inside the object and cannot access over the child object."
			},
			{
				"tag":"code",
				"text":"[{'let':'_a=10'},{'let':'_a=20','tag':'textarea','text':'$a'}] //print 20"
			}
			,
			{
				"text": "window[]",
				"tag": "h4"
			},
			{
				"tag": "p",
				"text": "window is the global keyword which hold the data across the tab. it holds all the global classes variables and other properties."
				+" When you want to access the variable from other file or after the class got executed use window[]."
			},
			{
				"tag": "p",
				"class":["required"],
				"text": "Syntax: window['function_name/variabel_name']=value"
			},
			{
				"tag":"code",
				"text":"{'code':'window[\"a\"]=10'}"
			}
		]
	},
	{
		"title": "Conditional Statements",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Conditional Statements"
			},
			{
				"tag":"ul",
				"child":
				[
					{
						"tag":"li",
						"text":"if"
					},
					{
						"tag":"li",
						"text":"if else"
					},
					{
						"tag":"li",
						"text":"switch"
					}
				]
			}
		]
	},
	{
		"title": "Looping Statements",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Looping Statements"
			},
			{
				"tag":"ul",
				"child":
				[
					{
						"tag":"li",
						"text":"for"
					},
					{
						"tag":"li",
						"text":"do"
					},
					{
						"tag":"li",
						"text":"while"
					}
				]
			}
		]
	},
	{
		"title": "Templates",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Templates"
			}
		]
	},
	{
		"title": "In-Build Functions",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "In-Build Functions"
			},
			{
				"tag": "ul",
				"child": [
					{
						tag:"li",
						text:"render",
					}
				]
			},
			{
				"tag":"h3",
				"text":"render"
			},
			{
				"tag":"p",
				"text":"render is an function from the JTH class. it is function that render the JTH."
				+"Whenever you create an JTH object by default it won't render. you must call render function from the object to draw the JSON as HTML in the given element"
			},
			{
				"tag":"code",
				"text":"let o=new JTH({...}).render(); let o=new JTH({...}); o.render();"
			}
		]
	},
	{
		"title": "Miscellaneous",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Miscellaneous"
			},
			{
				"tag": "ul",
				"child": [
					{
						tag:"li",
						text:"draw",
					}
				]
			},
			{
				"tag":"br"
			},
			{
				"tag": "h2",
				"text": "draw"
			},
			{
				"tag":"p",
				"text":"Draw is the internal function that used inside the json value. Draw is used to write/over-write the page with new content."
			},
			{
				"tag":"code",
				"text":"{'onclick':'draw('{\"tag\":\"textarea\"}','document.body')'}"
			},
			{
				"tag":"p",
				"text":"The above code used to remove and render the textarea in the body of the html."
				+"draw function takes two arguments."
			},
			{
				"tag":"ul",
				"child":[
					{
						"tag":"li",
						"class":["required"],
						"text":"first argument: it is the json object or the JTH object which is the data that used to draw on the page."
					},
					{
						"tag":"li",
						"text":"second argument: it takes the page element to render the given input. Default: document.body"
					}
				]
			}
		]
	}
]
