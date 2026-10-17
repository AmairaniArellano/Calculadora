const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let primerNumero = "";
let operacion = "";
let esperandoSegundoNumero = false;

function calcular(num1, num2, op) {
    let resultado = 0;
    switch (op) {
        case "+":
            resultado = num1 + num2;
            break;
        case "-":
            resultado = num1 - num2;
            break;
        case "*":
            resultado = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                return "Error";
            }
            resultado = num1 / num2;
            break;
        default:
            return num2;
    }
    return Math.round(resultado * 100000000) / 100000000;
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonSeleccionado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            primerNumero = "";
            operacion = "";
            esperandoSegundoNumero = false;
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (["+", "-", "*", "/"].includes(botonSeleccionado)) {
            if (operacion && !esperandoSegundoNumero && primerNumero !== "") {
                const resParcial = calcular(parseFloat(primerNumero), parseFloat(pantalla.textContent), operacion);
                pantalla.textContent = resParcial;
                primerNumero = resParcial.toString();
            } else {
                primerNumero = pantalla.textContent;
            }
            operacion = botonSeleccionado;
            esperandoSegundoNumero = true;
            return;
        }

        if (boton.id === "igual") {
            if (operacion && primerNumero !== "") {
                const num1 = parseFloat(primerNumero);
                const num2 = parseFloat(pantalla.textContent);
                const resultado = calcular(num1, num2, operacion);

                pantalla.textContent = resultado;
                if (resultado === "Error") {
                    primerNumero = "";
                    operacion = "";
                    esperandoSegundoNumero = false;
                } else {
                    primerNumero = resultado.toString();
                    operacion = "";
                    esperandoSegundoNumero = true;
                }
            }
            return;
        }

        if (esperandoSegundoNumero) {
            pantalla.textContent = botonSeleccionado === "." ? "0." : botonSeleccionado;
            esperandoSegundoNumero = false;
        } else {
            if (botonSeleccionado === ".") {
                if (!pantalla.textContent.includes(".")) {
                    pantalla.textContent += ".";
                }
            } else if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
                pantalla.textContent = botonSeleccionado;
            } else {
                pantalla.textContent += botonSeleccionado;
            }
        }
    });
});