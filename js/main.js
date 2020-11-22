const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

// CONSTRUCTOR
class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }

    // Inicia el juego.
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            green,
            red,
            yellow,
            blue
        } // Si el atributo y el valor es el mismo, no hace falta ponerlo así: celeste: celeste. Se pone solo el valor y js lo hace automáticamente.
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains("hide")) {
            btnEmpezar.classList.remove('hide');

        } else {
            btnEmpezar.classList.add("hide");
        }
    

    }

    // Generala secuencia de números que hay querepetir en el juego.
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0: return "green";
            case 1: return "red";
            case 2: return "yellow";
            case 3: return "blue";
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case "green": return 0;
            case "red": return 1;
            case "yellow": return 2;
            case "blue": return 3;
        }
    }

    iluminarSecuencia() {
        for(let i=0; i<this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            console.log(color);
            setTimeout(() => this.iluminarColor(color), 1000 * i); 
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light");
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light");
    }

    agregarEventosClick() {
        this.colores.green.addEventListener("click", this.elegirColor);
        this.colores.red.addEventListener("click", this.elegirColor);
        this.colores.yellow.addEventListener("click", this.elegirColor);
        this.colores.blue.addEventListener("click", this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.green.removeEventListener("click", this.elegirColor);
        this.colores.red.removeEventListener("click", this.elegirColor);
        this.colores.yellow.removeEventListener("click", this.elegirColor);
        this.colores.blue.removeEventListener("click", this.elegirColor);

    }

    elegirColor(ev) {
        console.log(ev);
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor===this.secuencia[this.subnivel]) {
            this.subnivel ++;
            if (this.subnivel===this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel, 1500); // El setTimeout cambia el this.
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal("Simon dice", "¡Felicidades, has ganado!", "success")
            .then(this.inicializar); // Cuando solo hay una línea se puede poner así.
    }

    perdioElJuego() {
        swal("Simon dice", "¡Mala suerte, has perdido!", "error")
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            })
    }
}

// Llamada de la función de inicio, se crea un nuevo objeto Juego con el constructor.
function empezarJuego() {
    window.juego = new Juego();
}

/* 
GENERANDO UNA SECUENCIA DE NÚMEROS
Para generar la secuencia del juego usaremos un array con números aleatorios, que representarán el color del botón que se iluminará cada vez. Usamos new Array() para crear el arreglo de manera dinámica, y llamamos al método fill para rellenar ese array con ceros y poder luego iterar sobre este con map(). 

*/



