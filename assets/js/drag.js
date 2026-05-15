import {
    responder
} from "./quiz.js";

const dragState = {

    active: false,

    item: null,

    ghost: null,

    offsetX: 0,

    offsetY: 0
};

function criarFantasma(item, clientX, clientY) {

    const rect =
        item.getBoundingClientRect();

    const clone =
        item.cloneNode(true);

    clone.style.cssText = [

        "position: fixed",
        "pointer-events: none",
        "z-index: 9999",
        "opacity: 0.85",

        "width: " + rect.width + "px",

        "height: " + rect.height + "px",

        "left: " + rect.left + "px",

        "top: " + rect.top + "px",

        "margin: 0",

        "transition: none",

        "transform: scale(1.08)"

    ].join(";");

    document.body.appendChild(clone);

    dragState.offsetX =
        clientX - rect.left;

    dragState.offsetY =
        clientY - rect.top;

    return clone;
}

function moverFantasma(clientX, clientY) {

    if (!dragState.ghost) return;

    dragState.ghost.style.left =
        (clientX - dragState.offsetX) + "px";

    dragState.ghost.style.top =
        (clientY - dragState.offsetY) + "px";
}

function removerFantasma() {

    if (dragState.ghost) {

        document.body.removeChild(
            dragState.ghost
        );

        dragState.ghost = null;
    }
}

function caixaEmbaixo(x, y) {

    if (dragState.ghost) {

        dragState.ghost.style.display = "none";
    }

    let el =
        document.elementFromPoint(x, y);

    if (dragState.ghost) {

        dragState.ghost.style.display = "";
    }

    if (!el) return null;

    while (
        el &&
        !el.classList.contains("caixa-data")
    ) {

        el = el.parentElement;
    }

    return el || null;
}

function feedbackCaixa(caixa, acertou) {

    caixa.classList.remove("drag-over");

    caixa.classList.add(
        acertou ? "acerto" : "erro"
    );

    setTimeout(function () {

        caixa.classList.remove(
            "acerto",
            "erro"
        );

    }, 600);
}

export function resetarDragItems() {

    const items =
        document.querySelectorAll(".drag-item");

    for (let i = 0; i < items.length; i++) {

        items[i].style.opacity = "";

        items[i].style.visibility = "";
    }

    removerFantasma();

    dragState.active = false;

    dragState.item = null;
}

function iniciarDrag(event) {

    event.preventDefault();

    let clientX;
    let clientY;

    if (event.touches) {

        clientX =
            event.touches[0].clientX;

        clientY =
            event.touches[0].clientY;

    } else {

        clientX = event.clientX;

        clientY = event.clientY;
    }

    dragState.active = true;

    document.body.classList.add(
        "dragging"
    );

    dragState.item = this;

    dragState.ghost =
        criarFantasma(
            this,
            clientX,
            clientY
        );

    this.style.opacity = "0.4";
}

function duranteDrag(event) {

    if (!dragState.active) return;

    event.preventDefault();

    let clientX;
    let clientY;

    if (event.touches) {

        clientX =
            event.touches[0].clientX;

        clientY =
            event.touches[0].clientY;

    } else {

        clientX = event.clientX;

        clientY = event.clientY;
    }

    moverFantasma(clientX, clientY);

    const caixa =
        caixaEmbaixo(clientX, clientY);

    const todas =
        document.querySelectorAll(".caixa-data");

    for (let i = 0; i < todas.length; i++) {

        todas[i].classList.remove(
            "drag-over"
        );
    }

    if (caixa) {

        caixa.classList.add("drag-over");
    }
}

function terminarDrag(event) {

    if (!dragState.active) return;

    dragState.active = false;

    document.body.classList.remove(
        "dragging"
    );

    let clientX;
    let clientY;

    if (
        event.changedTouches &&
        event.changedTouches.length > 0
    ) {

        clientX =
            event.changedTouches[0].clientX;

        clientY =
            event.changedTouches[0].clientY;

    } else {

        clientX = event.clientX;

        clientY = event.clientY;
    }

    removerFantasma();

    if (dragState.item) {

        dragState.item.style.opacity = "";
    }

    const todas =
        document.querySelectorAll(".caixa-data");

    for (let i = 0; i < todas.length; i++) {

        todas[i].classList.remove(
            "drag-over"
        );
    }

    const caixa =
        caixaEmbaixo(clientX, clientY);

    if (caixa) {

        const correto =
            caixa.dataset.correto === "true";

        feedbackCaixa(caixa, correto);

        setTimeout(function () {

            responder(correto);

        }, correto ? 400 : 600);
    }

    dragState.item = null;
}

function cancelarDrag() {

    if (!dragState.active) return;

    dragState.active = false;

    document.body.classList.remove(
        "dragging"
    );

    removerFantasma();

    if (dragState.item) {

        dragState.item.style.opacity = "";

        dragState.item = null;
    }

    const todas =
        document.querySelectorAll(".caixa-data");

    for (let i = 0; i < todas.length; i++) {

        todas[i].classList.remove(
            "drag-over"
        );
    }
}

export function inicializarDrag() {

    const items =
        document.querySelectorAll(".drag-item");

    for (let i = 0; i < items.length; i++) {

        items[i].addEventListener(
            "mousedown",
            iniciarDrag,
            { passive: false }
        );

        items[i].addEventListener(
            "touchstart",
            iniciarDrag,
            { passive: false }
        );
    }

    document.addEventListener(
        "mousemove",
        duranteDrag,
        { passive: false }
    );

    document.addEventListener(
        "touchmove",
        duranteDrag,
        { passive: false }
    );

    document.addEventListener(
        "mouseup",
        terminarDrag
    );

    document.addEventListener(
        "touchend",
        terminarDrag
    );

    document.addEventListener(
        "touchcancel",
        cancelarDrag
    );

    document.addEventListener(
        "mouseleave",
        cancelarDrag
    );
}