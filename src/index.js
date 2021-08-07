function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  function priority(op) {
    return op === "+" || op === "-"
      ? 1
      : op === "*" || op === "/" || op == "%"
      ? 2
      : -1;
  }
  function is_op(op) {
    switch (op) {
      case "+":
        return true;
      case "-":
        return true;
      case "*":
        return true;
      case "/":
        return true;
      case "(":
        return true;
      case ")":
        return true;
      default:
        return false;
    }
  }
  var stack = [];
  let mas = expr.split("");
  let open_br = 0;
  let cl_br = 0;
  mas.forEach(function (element) {
    if (element === "(") ++open_br;
    if (element === ")") ++cl_br;
  });
  if (open_br !== cl_br) throw "ExpressionError: Brackets must be paired";

  for (let i = 0; i < mas.length; i++) {
    if (i === 0 && is_op(mas[i])) mas.splice(i, 0, " ");
    if (i === mas.length - 1 && is_op(mas[i])) {
      mas.splice(i, 0, " ");
      break;
    }
    if (is_op(mas[i]) && mas[i - 1] != " ") {
      mas.splice(i, 0, " ");
    }
    if (is_op(mas[i]) && mas[i + 1] != " ") {
      mas.splice(i + 1, 0, " ");
    }
  }
  let exprmas = mas.join("").split(" ");

  // var brackets = arr1.reduce(function (acc, element) {
  //   if (element === "(" || element === ")") {
  //     return ++acc;
  //   } else return acc;
  // }, 0);
  // if (brackets != 0 && brackets % 2 != 0)
  //   return "ExpressionError: Brackets must be paired";

  let res = [];
  let length = exprmas.length;
  for (let i = 0; i < length; i++) {
    if (exprmas[i] === "") continue;
    if (!is_op(exprmas[i])) {
      res.push(exprmas[i]);
    } else {
      if (stack.length === 0) {
        stack.push(exprmas[i]);
      } else {
        if (exprmas[i] === "(") {
          stack.push(exprmas[i]);
          continue;
        }
        if (exprmas[i] === ")") {
          let a;
          while (a !== "(" && stack.length !== 0) {
            a = stack.pop();
            if (a !== "(") res.push(a);
          }
          continue;
        }
        if (priority(stack[stack.length - 1]) >= priority(exprmas[i])) {
          while (priority(stack[stack.length - 1]) >= priority(exprmas[i])) {
            res.push(stack.pop());
          }
          stack.push(exprmas[i]);
        } else {
          stack.push(exprmas[i]);
        }
      }
    }
  }
  while (stack.length) {
    res.push(stack.pop());
  }
  const operators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => {
      if (y === 0) throw "TypeError: Division by zero.";
      else return x / y;
    },
  };

  stack = [];

  res.forEach((token) => {
    if (token in operators) {
      let [y, x] = [stack.pop(), stack.pop()];
      stack.push(operators[token](x, y));
    } else {
      stack.push(parseFloat(token));
    }
  });

  return stack.pop();

  // write your solution here
}

module.exports = {
  expressionCalculator,
};
// const expr1 =
//   " 31 * 21 + 14 / (  (  18 * 52 / (  43 - 74 / 89 - 12  ) + 8  ) + 3 / 0 + (  9 + 81 + 19 * 94 / (  0 * 71 + 53 - 20 * 94  )  )  ) ";

// console.log(expressionCalculator(expr1));
