Underscore.json
===============
Underscore.json is a json library written in javascript that can apply jQuery style selectors to access JSON objects. It can be used on server-side environment such as nodejs, as well as the browser. What's more, just like $ in jQuery, underscore.json envourages self-referencing style chaining of calls. Currently in version 0.0.1

NOTE: not production ready until 0.0.3 

<pre><code>
var _json = require("underscore.json");
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
var _json = require("underscore.json"); // minified version, see lib folder for un-minified version 
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
&lt;script src="underscore.json.js"&gt;&lt;/script&gt;
&lt;script&gt;
// example 1
// goodbye to square-bracketed nesting, hello to chaining

var sample_json = {
 ...
};

$('#city_label').html (
  $._json(shortcode_directory_json).$(
     $._json(sample_json).$('work employer pincode') 
  ).$toJSON().name
);

// example 2
// also useful within backbone.js
myModels.Map = Backbone.Model.extend({
    name:0,lat:0,long:0
}); 

new myViews.MapView( {
    model: new myModels.Map( $._json(sample_json).$('home location') )
});   
&lt;/script&gt;
</code></pre>

Using with npm
--------------
Will be available from 0.0.3
<pre><code>
npm install underscore.json
</code></pre>