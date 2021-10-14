#!/usr/bin/env node

const vorpal = require('vorpal')()
const intro = require('./intro')

// Call intro
intro()

vorpal.delimiter('rpn-calc$').show();

// usage represents the help guide

vorpal
    .command('calc [expression]', 'Will calculate the given expression .')
    .action(function(args, callback) {
        this.log(reversePolishCalculator(args.expression));
        callback();
    });

function reversePolishCalculator (value) {

    if (value === undefined) {
        return 0
    }

    const exp = value.split(" ")
    const stack = []

    for (let i = 0; i<exp.length; i++) {
        if (!isNaN(exp[i]) && isFinite(exp[i])) {
            stack.push(exp[i])
        } else {

            const operandA = stack.pop()
            const operandB = stack.pop()

            switch (exp[i]) {
                case '+':
                    stack.push(parseInt(operandA) + parseInt(operandB))
                    break
                case '-':
                    stack.push(parseInt(operandA) - parseInt(operandB))
                    break
                case '*':
                    stack.push(parseInt(operandA) * parseInt(operandB))
                    break
                case '/':
                    stack.push(parseInt(operandA) / parseInt(operandB))
                    break
                case '^':
                    stack.push(Math.pow(parseInt(operandB), parseInt(operandA)))
                    break
            }
        }
    }

    if (stack.length > 1) {
        return "ERROR";
    } else {
        return stack[0];
    }
}
