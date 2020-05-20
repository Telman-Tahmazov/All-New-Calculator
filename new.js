function result() {
    var numbers = [];
    var action = [];
    var m = document.form.textview.value;

    var prior;

    for (var i = 0; i < m.length; i++) {
        var act = AddNumber(m, i, numbers, action);

        if (!isNaN(m[i]) || m[i] == "." || m[i] == '-' && i == 0 || m[i] == '-' && m[i - 1] == action[action.length - 1]) {
            if (AddNumber(m, i, numbers, action) != 0) {
                numbers.push(m.substring(i, i + act));
                i += act - 1;
            }
        } else {
            prior = Prior(m[i]);

            if (action.length == 0) {
                action.push(m[i]);
            } else if (prior > 2 && Prior(m[i - 1]) > 2) {
                action.pop();
                action.push(m[i]);
            } else {
                if (prior != Prior(action[action.length - 1])) {
                    if (prior > Prior(action[action.length - 1])) {
                        action.push(m[i]);
                    } else {
                        if (prior < Prior(action[action.length - 1])) {
                            if (prior == 2) {
                                FindBracket(numbers, action, m);
                            } else {
                                if (prior == 1) {
                                    action.push(m[i]);
                                } else {
                                    while (action.length != 0 && action[action.length - 1] != "(") {
                                        Calculation(numbers, action);
                                    }
                                    action.push(m[i]);

                                }
                            }
                        }

                    }
                } else {
                    while (action.length != 0 && prior == Prior(action[action.length - 1]) && Prior(m[i + 1]) < 2) {
                        Calculation(numbers, action);
                    }
                    action.push(m[i]);
                }
            }


        }
    }


    while (action.length != 0) {
        Calculation(numbers, action);
    }
    document.form.textview.value =document.form.textview.value+'=';
	document.form.textresults.value = numbers;

}




function Calculation(numbers, action) {
    var lastnumber1 = numbers.pop();
    var lastnumber2 = numbers.pop();

    switch (action.pop()) {
        case '*':
            lastnumber1 = lastnumber2 * lastnumber1;
            numbers.push(lastnumber1);
            break;
        case '/':
            if (lastnumber1 == 0) {
                lastnumber1 = 0;
            } else {
                lastnumber1 = lastnumber2 / lastnumber1;
            }
            numbers.push(lastnumber1);
            break;
        case '+':
            lastnumber1 = Number(lastnumber2) + Number(lastnumber1);
            numbers.push(lastnumber1);
            break;
        case '-':
            lastnumber1 = lastnumber2 - lastnumber1;
            numbers.push(lastnumber1);
            break;
    }
}


function AddNumber(m, i, numbers, action) {
    var count = 0;
    if (i <= m.length - 1) {
        if (!isNaN(m[i]) || m[i] == "." || (m[i] == '-' && i == 0) || m[i] == '-' && m[i - 1] == action[action.length - 1]) {
            count++;
            count = count + AddNumber(m, i + 1, numbers, action);

        }
    }
    return count;
}


function FindBracket(numbers, action, m) {
    {
        while (action[action.length - 1] != "(") {
            Calculation(numbers, action);
        }
        action.pop();
    }
}

function Prior(a) {
    switch (a) {
        case '^':
            return 6;
        case '*':
            return 5;
        case '/':
            return 5;
        case '+':
            return 4;
        case '-':
            return 4;
        case ')':
            return 2;
        case '(':
            return 1;
        default:
            return 0;
    }
}

function input(elem) {
		insert(elem);

}

function insert(elem) {
    var exp = document.form.textview.value;
    if(exp[exp.length-1]=='=')
    {
        document.form.textview.value = "";
        insert(elem);
    }
 else if (isNaN(exp[0]) && Prior(elem.textContent) > 2 && exp.length == 1)
     {

    } 
    else if (Prior(elem.textContent) > 2 && Prior(exp[exp.length - 1]) > 2 && elem.textContent != '-') {
        backspace();
        document.form.textview.value = document.form.textview.value + elem.textContent;
        onclick = "insert('')"
    } 
    else if (exp.length < 1 && Prior(elem.textContent) > 2 && elem.textContent != '-') 
    {

    } 
    else 
    {	
        document.form.textview.value = document.form.textview.value + elem.textContent;
        onclick = "insert('')"
    }
}

function reset() {
    document.form.textview.value = "";
    document.form.textresults.value = "";
    ;
}

function backspace() {
    var exp = document.form.textview.value;
    document.form.textview.value = exp.substring(0, exp.length - 1);
}