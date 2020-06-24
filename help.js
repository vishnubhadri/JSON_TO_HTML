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
						"text": "variables"
					},
					{
						"tag": "li",
						"text": "ctdn"
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
					}
				]
			},
			{
				"tag": "div",
				"id": "variable",
				"child": [
					{
						"text": "Variables",
						"tag": "h2"
					},
					{
						"tag": "p",
						/*DOLLOR SYMBLE NOT WORKING*/
						"text": "JTH uses variables that can use across the json as same as other programming language. It support both primitive and non-primitive variables." +
							"In JTH the variable can be define and access with $ symbol."
					},
					{
						"tag": "code",
						"text": '{"tag":"textarea"}'
					}
				]
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
			}
		]
	},
	{
		"title": "Div",
		"content": [
			{
				class: "title",
				"tag": "h1",
				"text": "Div"
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
			}
		]
	}
]
