const display=document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');
let displayValue='0';
let firstValue=null;
let operator= null;
let controlSecondValue=false;

updateValue();

function updateValue(){
    display.value=displayValue;
}

keys.addEventListener('click',function(e){
    const element=e.target;
    if(!element.matches('button')) return;

    if(element.classList.contains('operator')){
        handleOperaor(element.value);
        updateValue();
        return;
    }
    if(element.classList.contains('decimal')){
        inputDecimal();
        updateValue();
        return;
    }
    if(element.classList.contains('clear')){
        clear();
        updateValue();
        return;
    }


    inputNumber(element.value)
    updateValue();
})

function handleOperaor(nextOperator){
    if(operator && controlSecondValue){
        operator=nextOperator;
        return;
    }
    const value = parseFloat(displayValue);
    if(firstValue===null){
        firstValue=value;
    }
    else if(operator){
        const result = calculate(firstValue,value,operator);
        displayValue=`${parseFloat(result.toFixed(13))}`;
        firstValue=result;
    }
    controlSecondValue=true;
    operator=nextOperator;
}

function calculate(first,second,op){
    if (op==='+') {
        return first + second;
    }
    else if(op==='-'){
        return first - second;
    }
    else if(op==='*'){
        return first* second;
    }
    else if(op==='/'){
        return first/second;
    }
    return second;
}
function inputNumber(num){
    if(controlSecondValue){
        displayValue=num;
        controlSecondValue=false;
    }
    else{
        displayValue=(displayValue==='0'?num:displayValue+num);
    }
    
}
function inputDecimal(){
    if(!displayValue.includes('.'))
    displayValue+='.';
}
function clear(){
    displayValue='0';
    firstValue='0';
}

//1.1
/*document.addEventListener('keypress',function(e){
    keydownValue=e.key;
    if(keydownValue>=0 && keydownValue<=9){
        inputNumber(keydownValue);
        updateValue();
    }
})*/
    
