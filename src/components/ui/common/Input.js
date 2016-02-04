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

    function getText(){
        return base.getText();
    }

    this.type = type;
    this.clear = clear;
    this.getText = getText;
}
module.exports = Input;
