var _jstor = /*module.exports._jstor =*/ function (obj){ 
    var orig_args = [].slice.call(arguments,0);
    console.log('_jstor: orig_args = ');console.log(orig_args);
    if(orig_args.length == 1){

	if(obj instanceof _json){
	    console.log('finish: return _json, having $data:');
	    console.log(obj.$data());
	    obj.$set(obj.data, obj);
	    return obj;
	}else{
	    return orig_args.shift();
	}
    }else{  
	console.log('orig_args len = ' + orig_args.length);
	var args = [].splice.call(arguments,1);
	var next = args.shift();
	var rest = args;
	var obj_data = (obj instanceof _json ) ? obj.data : obj;
	console.log('obj instanceof _json:'+(obj instanceof _json ) +', obj :');
	console.log(obj);
	if(obj_data[next]){
	    var data= [obj_data[next]];
	    var data_next = Object.create(_json.prototype);
	    console.log('found:data_next instanceof _json='+( data_next instanceof _json ));
	    data_next.$set(data.shift(),obj);
	    var result = [data_next].concat(rest);
	    return this.apply( this, result );
	}else{
	    var found=0,all_new_data=[];
	    console.log('not found ' + next + ' at root,obj is ');console.log(obj);
	    var obj_list = (obj instanceof _json) ? obj.data : obj;
	    console.log('not found:obj instanceof _json='+( obj instanceof _json )+' of length' + obj_list.length); 
	    for(var subobj=0;subobj< obj_list.length; subobj++){
		console.log(obj_list[subobj]);
		if(obj_list[subobj][next]){
		    found=1;
		    var data = [obj_list[subobj][next]];
		    var new_data = Object.create(_json.prototype,data);
		    new_data.$set(data.shift(),obj);
		    all_new_data.push(new_data);
		    console.log('found at [' + next+']: instanceof _json='+( new_data instanceof _json )+',data=');
		}else{
		    console.log(obj[subobj] );console.log(' |-> doesnt have '  + next); 
		}
	    }
	    if(!found){
		var data =  [obj_data[next]].concat( rest);
		console.log('not found: data = ');console.log(data);
		return this.apply(this, data) ;
	    }else{
		all_new_data = (all_new_data.length == 1 ) ? all_new_data : [all_new_data];
		console.log('all_new_data: '+ all_new_data.length);console.log(all_new_data);
		return this.apply( this, all_new_data.concat(rest) );
	    }
	}
	
    }
};

var jstor = /*module.exports.jstor =*/ function (obj){
    return function(msg){ return _jstor.apply(_jstor,[obj].concat(msg.split(' ')));}; 
};

var _json = /*module.exports._json =*/ function(obj){ 
    if( this instanceof arguments.callee) {
	    console.log('is inst, return obj with fns');
	    this.obj = jstor(obj);
            return this; 
	}else{
	    console.log('not instance,so create'); 
	    return new arguments.callee(obj);
	}
}; 

_json.prototype = { 
    $: function(msg){ 
	console.log('asked to find ' + msg);
	return this.obj(msg);
    },
    $find : function(msg){
	this.data = this.obj(msg).data;
	return this.data;
    },
    $set: function(data,obj){
	this.data = data;
	if(obj) { this.obj = jstor(obj); }
	return this;
    },
    $get: function(){
	return this;
    },
    $data: function(){
	return this.data;
    },
    $toJSON: function(){
	return this.data;
    }
};
  
Array.create = function (o,data) {
    function F() {
	if(data){
	    for(var i=0;i<data.length;i++){
		this[i] = data[i];
	    }
	}
    };
    F.prototype = o;
    return new F();
};
  
Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
};

// working
// _json(json1).$('work employer').$toJSON()
// _json(json1).$('work').$toJSON()
// _json(json1).$('work').$('employer').$toJSON()
// _json(json2).$('following name')

// not working
// _json(json2).$('following name first')

var json2 = { "id":"bosky101", "following": [ { name: {first:"someone",last:"major"}}, { name:{first:"someone else",last:"clnl"}} ] };
var json1 = {
  "id": "796930229",
  "name": "Bhasker V Kode",
  "first_name": "Bhasker",
  "middle_name": "V",
  "last_name": "Kode",
  "link": "http://www.facebook.com/bhaskervk",
  "username": "bhaskervk",
  "hometown": {
    "id": "106275192744139",
    "name": "Cochin, Kerala"
  },
  "location": {
    "id": "114759761873412",
    "name": "Mumbai, Maharashtra"
  },
  "bio": "being there...doing that ...",
  "work": [{
    "employer": {
      "id": "105312866173608",
      "name": "Hover.in"
    },
    "location": {
      "id": "106442706060302",
      "name": "Pune, Maharashtra"
    },
    "position": {
      "id": "109788242421268",
      "name": "Founder & Chief Architect"
    },
    "description": "user-engagement platform for brands & publishers\n\nmore at http://hover.in , http://start.hover.in, http://twitter.com/bosky101",
    "start_date": "2007-09",
    "end_date": "2011-06"
  }],
  "education": [{
    "school": {
      "id": "114490795230458",
      "name": "SVCE"
    },
    "concentration": [{
      "id": "110969368990632",
      "name": "IT"
    }],
    "type": "College"
  }],
  "gender": "male",
  "timezone": 5.5,
  "locale": "en_US",
  "verified": true,
  "updated_time": "2011-08-12T04:53:24+0000"
};