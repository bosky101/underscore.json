var _jstor = /*module.exports._jstor =*/ function (obj){ 
    var orig_args = [].slice.call(arguments,0);
    //console.log('args.length=' + orig_args.length +', obj=');console.log(orig_args);console.log(obj);
    if(orig_args.length == 1){
	//console.log('finally!');console.log(obj);
	return obj; 
    }else{  
	//console.log(arguments.length);
	var args = [].splice.call(arguments,1);
	var next = args.shift();
	var rest = args;
	if(obj[next]){
	    return this.apply(this, [obj[next]].concat( rest)) ;
	}else{
	    var found=0;
	    for(var subobj in obj){
		if(obj[subobj][next]){
		    //console.log('found ' +subobj +'->'+next );found=1;
		    return this.apply( this, [obj[subobj][next]].concat(rest) );
		}
	    }
	    if(!found){
		//console.log('not found');
		return this.apply(this, [obj[next]].concat( rest)) ;
	    }
	}
	
    }
};

var jstor = /*module.exports.jstor =*/ function (obj){
    return function(msg){ return _jstor.apply(_jstor,[obj].concat(msg.split(' ')));}; 
};

var _json = /*module.exports._json =*/ function(obj){ 
    if( this instanceof arguments.callee) {
	    //console.log('is inst, return obj with fns');
	    this.obj = jstor(obj);
            return this; 
	}else{
	    //console.log('not instance,so create'); 
	    return new arguments.callee(obj);
	}
}; 

_json.prototype.find = function(msg){ return this.obj(msg); };

/*
var a = function(obj){ 
    console.log(arguments.callee); console.log(arguments.caller); console.log(arguments.name);
    return function(msg){
	if( this instanceof arguments.callee) {
	    console.log('is inst, return obj with fns');
	    this.obj = jstor(obj)(msg);
	    return this; 
	}else{
	    console.log('not instance'); 
	    return new a(obj);
	}
    };
}; 

a.prototype = jstor;
*/


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