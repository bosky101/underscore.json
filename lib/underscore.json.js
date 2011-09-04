// Underscore.json
// 
// http://github.com/bosky101/underscore.json
//
// Version 0.0.2

( function($){
    var _jstor = function (obj){ 
	var orig_args = [].slice.call(arguments,0);
	if(orig_args.length == 1){
	    if(obj instanceof _json){
		obj.$set(obj.data, obj);
		return obj;
	    }else{
		return orig_args.shift();
	    }
	}else{  
	    var args = [].splice.call(arguments,1);
	    var next = args.shift();
	    var rest = args;
	    var obj_data = (obj instanceof _json ) ? obj.data : obj;
	    if(obj_data[next]){
		var data= [obj_data[next]];
		var data_next = Object.create(_json.prototype);
		data_next.$set(data.shift(),obj);
		var result = [data_next].concat(rest);
		return this.apply( this, result );
	    }else{
		var found=0,all_new_data=[];
		var obj_list = (obj instanceof _json) ? obj.data : obj;
		for(var subobj=0;subobj< obj_list.length; subobj++){
		    if(obj_list[subobj][next]){
			found=1;
			var data = [obj_list[subobj][next]];
			var new_data = Object.create(_json.prototype,data);
			new_data.$set(data.shift(),obj);
			all_new_data.push(new_data);
		    }
		}
		if(!found){
		    var data =  [obj_data[next]].concat( rest);
		    return this.apply(this, data) ;
		}else{
		    all_new_data = (all_new_data.length == 1 ) ? all_new_data : [all_new_data];
		    return this.apply( this, all_new_data.concat(rest) );
		}
	    }
	    
	}
    };
    
    var jstor = function (obj){
	return function(msg){ return _jstor.apply(_jstor,[obj].concat(msg.split(' ')));}; 
    };
    
    var _json = function(obj){ 
	if( this instanceof arguments.callee) {
	    this.obj = jstor(obj);
            return this; 
	}else{
	    return new arguments.callee(obj);
	}
    }; 
    
    _json.prototype = { 
	$: function(msg){ 
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
    Object.create = function (o) {
	function F() {}
	F.prototype = o;
	return new F();
    };
    var _null = "undefined";
    if (typeof window == _null  && typeof module != _null) {
     	module.exports =  _json;
    }else{
	if (typeof this._ != _null && this._.mixin != _null) {
            this._.mixin({_json : _json});
        }
        //this._json = _json; 
	if(typeof $ != _null){
	    $._json = _json;
	}
    }
    
})(jQuery);