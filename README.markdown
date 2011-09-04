Underscore.json
===============
Underscore.json is a json library written in javascript that can apply jQuery style selectors to access JSON objects. It can be used on server-side environment such as nodejs, as well as the browser. What's more, just like $ in jQuery, underscore.json envourages self-referencing style chaining of calls. Currently in version 0.0.1

NOTE: not production ready until 0.0.3 

<pre><code>
var _json = require("./lib/underscore.json.js");
var result1 = _json(sample_json).$('work').$('employer').$toJSON().name;
var result2 = _json(sample_json).$('work employer').$toJSON().name; 
console.log('work employer name: '+ result2 , (result1 == result2 ) );
</code></pre>


Much like jQuery, calling a selector rebuilds the instance, whereas setting it to a variable and then accessing will cache the instance and result of the selector.

The API
-------
<pre><code>
* $
  takes string as a selector, returns an instance of _json 
  eg: _json( {work: { location: {stree:' infinity' }}} ).$('work location street')
  eg: $({error:{ code:500, message:'oops'} }).$('error message')

* $find
  an alias for $

* $get 
  returns the instance

* $toJSON
  returns data property which is the actual JSON property

* $set
  can set the data or instance of _json

</code></pre>
Working Example
---------------

<pre><code>
var _json = require("./lib/underscore.json"); // npm users use, require('underscore.json');
var sys = require('sys');

// querying the fb graph
var json1 = {
    id: "007",
    name: "james bond",
    username: "thenamesbond",
    hometown: {
	"name": "UK"
    },
    bio: "ssh ...",
    work: [{
	"employer": {
	    "name":"M",
	    "division": "secret service"
	},
	"location": {
	    "name": "everywhere"
	}
    }]
};

var resulta = _json(sample_json).$('work').$('employer').$toJSON().name;
var resultb = _json(sample_json).$('work employer').$toJSON().name; 
console.log('work employer name: '+ resulta , (resulta == resultb ) );

// your favourite microblogging site
var json2 = { 
    "id":"bosky101", 
    "following": [ 
	{ name: {first:"someone",last:"major"}},
	{ name:{first:"someone else",last:"col"}}
    ] 
};

var result1 = _json(json2).$find('following name'); 
console.log( 'following:\n' + sys.inspect(result1) ); 
</code></pre>

Using Underscore.json with Underscore.js
----------------------------------------
Underscore and jQuery have been a big inspiration in this project - two amazing projects.

Here's how to use _json with underscore.js
<pre><code>
var _json = require('underscore.json');
_.mixin({ json: _json});
// the symbol or shortcut you want instead, such as $
// _.mixin({$:_json});
</code></pre>

Here's how to use _json in the browser
<pre><code>
<script src="jquery.underscore.json.js"></script>
</code></pre>

You will find the minified source for a jquery plugin will be included from 0.0.2 onwards. This is what it pretty much does:
<pre><code>
(function($){
    // definition of _json
    var _json = .... // source
   
    // binding it as a plugin to $
    $.fn._json = _json
        return this;
    }
})(jQuery);
</code></pre>
