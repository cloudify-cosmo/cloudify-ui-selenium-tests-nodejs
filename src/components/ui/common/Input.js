'use strict';

function Input (baseElement){
    var base = baseElement;

    function type(text){
        if(!text || text === ''){
            base.clear();
        }
        else{
            base.sendKeys(text);
        }
    }

    function clear(){
        base.clear();
    }

    function getValue(){
        return base.getAttribute('value');
    }

    this.type = type;
    this.clear = clear;
    this.getValue = getValue;
}
module.exports = Input;
