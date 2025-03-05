// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

function mostrarMensaje(mensaje, tipo) {
	const mensajeAnterior = document.querySelector('.mensaje-flotante');
	if (mensajeAnterior) {
		mensajeAnterior.remove();
	}

	const nuevoMensaje = document.createElement('div');
	nuevoMensaje.className = `mensaje mensaje-flotante mensaje-${tipo}`;
	nuevoMensaje.textContent = mensaje;

	const icono = document.createElement('i');
	icono.className = tipo === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
	nuevoMensaje.prepend(icono);

	const botonCerrar = document.createElement('span');
	botonCerrar.innerHTML = '&times;';
	botonCerrar.className = 'cerrar-mensaje';
	botonCerrar.onclick = function () {
		nuevoMensaje.classList.add('ocultar');
		setTimeout(() => {
			if (nuevoMensaje.parentNode) {
				nuevoMensaje.remove();
			}
		}, 500);
	};
	nuevoMensaje.appendChild(botonCerrar);

	document.body.appendChild(nuevoMensaje);

	setTimeout(() => {
		nuevoMensaje.classList.add('mostrar');
	}, 10);

	setTimeout(() => {
		if (nuevoMensaje.parentNode) {
			nuevoMensaje.classList.add('ocultar');
			setTimeout(() => {
				if (nuevoMensaje.parentNode) {
					nuevoMensaje.remove();
				}
			}, 500);
		}
	}, 5000);
}

function agregarAmigo() {
	const nombreInput = document.getElementById('amigo');
	const nombre = nombreInput.value.trim();

	if (nombre === '') {
		mostrarMensaje('Por favor, ingrese un nombre válido', 'error');
		return;
	}

	amigos.push(nombre);
	actualizarListaAmigos();

	mostrarMensaje(`¡${nombre} ha sido añadido a la lista!`, 'exito');

	nombreInput.value = '';
	nombreInput.focus();
}

function sortearAmigo() {
	if (amigos.length === 0) {
		mostrarMensaje('Debe agregar al menos un amigo a la lista', 'error');
		return;
	}

	if (amigos.length < 2) {
		mostrarMensaje('Se necesitan al menos 2 amigos para realizar un sorteo', 'error');
		return;
	}

	const indiceAleatorio = Math.floor(Math.random() * amigos.length);
	const amigoSeleccionado = amigos[indiceAleatorio];

	mostrarModalSorteo(amigoSeleccionado);
}

function mostrarModalSorteo(amigoSeleccionado) {
	const modal = document.createElement('div');
	modal.className = 'modal';

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-content modal-sorteo';

	const header = document.createElement('h2');
	header.textContent = '¡Resultado del Sorteo!';

	const resultadoContainer = document.createElement('div');
	resultadoContainer.className = 'resultado-sorteo';

	const icono = document.createElement('i');
	icono.className = 'fas fa-gift resultado-icono';

	const mensaje = document.createElement('p');
	mensaje.className = 'resultado-mensaje';
	mensaje.innerHTML = `Tu amigo secreto es:<br><strong>${amigoSeleccionado}</strong>`;

	const closeButton = document.createElement('button');
	closeButton.textContent = 'Aceptar';
	closeButton.className = 'modal-button save-button';
	closeButton.onclick = function () {
		const resultado = document.getElementById('resultado');
		resultado.innerHTML = `<li>¡Tu amigo secreto es: ${amigoSeleccionado}!</li>`;

		modal.classList.add('salida');
		setTimeout(() => {
			document.body.removeChild(modal);
		}, 300);
	};

	resultadoContainer.appendChild(icono);
	resultadoContainer.appendChild(mensaje);
	modalContent.appendChild(header);
	modalContent.appendChild(resultadoContainer);
	modalContent.appendChild(closeButton);
	modal.appendChild(modalContent);

	document.body.appendChild(modal);

	crearConfeti();
}

function crearConfeti() {
	const confettiContainer = document.createElement('div');
	confettiContainer.className = 'confetti-container';
	document.body.appendChild(confettiContainer);

	const colores = ['#FFC700', '#FF0000', '#2E3191', '#41EAD4', '#FBFF12'];

	for (let i = 0; i < 50; i++) {
		const confeti = document.createElement('div');
		confeti.className = 'confeti';
		confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
		confeti.style.left = Math.random() * 100 + 'vw';
		confeti.style.animationDelay = Math.random() * 3 + 's';
		confeti.style.animationDuration = Math.random() * 2 + 3 + 's';
		confettiContainer.appendChild(confeti);
	}

	setTimeout(() => {
		if (confettiContainer.parentNode) {
			confettiContainer.remove();
		}
	}, 5000);
}

document.getElementById('amigo').addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		agregarAmigo();
	}
});

function crearItemAmigo(nombre, index) {
	const nuevoAmigo = document.createElement('li');
	nuevoAmigo.dataset.index = index;
	nuevoAmigo.className = 'amigo-item';

	const nombreSpan = document.createElement('span');
	nombreSpan.textContent = nombre;
	nombreSpan.className = 'amigo-nombre';

	nombreSpan.addEventListener('dblclick', function () {
		activarEdicionEnLinea(nombreSpan, index);
	});

	const botonesContainer = document.createElement('div');
	botonesContainer.className = 'amigo-botones';

	const botonEditar = document.createElement('button');
	botonEditar.innerHTML = '<i class="fas fa-edit"></i>';
	botonEditar.className = 'boton-editar';
	botonEditar.onclick = function () {
		mostrarModalEdicion(nombre, index);
	};

	const botonEliminar = document.createElement('button');
	botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
	botonEliminar.className = 'boton-eliminar';
	botonEliminar.onclick = function () {
		mostrarModalConfirmacion(index);
	};

	botonesContainer.appendChild(botonEditar);
	botonesContainer.appendChild(botonEliminar);
	nuevoAmigo.appendChild(nombreSpan);
	nuevoAmigo.appendChild(botonesContainer);

	return nuevoAmigo;
}

function activarEdicionEnLinea(nombreSpan, index) {
	const nombre = nombreSpan.textContent;

	const inputEdicion = document.createElement('input');
	inputEdicion.type = 'text';
	inputEdicion.value = nombre;
	inputEdicion.className = 'input-edicion-inline';

	nombreSpan.parentNode.replaceChild(inputEdicion, nombreSpan);
	inputEdicion.focus();

	function guardarEdicion() {
		const nuevoNombre = inputEdicion.value.trim();
		if (nuevoNombre !== '' && nuevoNombre !== nombre) {
			amigos[index] = nuevoNombre;
			actualizarListaAmigos();
		} else {
			nombreSpan.textContent = nombre;
			inputEdicion.parentNode.replaceChild(nombreSpan, inputEdicion);
		}
	}

	inputEdicion.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			guardarEdicion();
		}
	});

	inputEdicion.addEventListener('blur', guardarEdicion);
}

function editarAmigo(index, nuevoNombre) {
	if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
		const nombreAntiguo = amigos[index];
		amigos[index] = nuevoNombre.trim();
		actualizarListaAmigos();

		mostrarMensaje(
			`¡El nombre ha sido actualizado de "${nombreAntiguo}" a "${nuevoNombre.trim()}"!`,
			'exito'
		);
	}
}

function eliminarAmigo(index) {
	const nombreEliminado = amigos[index];
	amigos.splice(index, 1);
	actualizarListaAmigos();

	mostrarMensaje(`¡${nombreEliminado} ha sido eliminado de la lista!`, 'error');
}

function mostrarModalEdicion(nombre, index) {
	const modal = document.createElement('div');
	modal.className = 'modal';

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-content';

	const header = document.createElement('h2');
	header.textContent = 'Editar Amigo';

	const input = document.createElement('input');
	input.type = 'text';
	input.value = nombre;
	input.className = 'modal-input';

	const buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'modal-buttons';

	const saveButton = document.createElement('button');
	saveButton.textContent = 'Guardar';
	saveButton.className = 'modal-button save-button';
	saveButton.onclick = function () {
		editarAmigo(index, input.value);
		document.body.removeChild(modal);
	};

	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cancelar';
	cancelButton.className = 'modal-button cancel-button';
	cancelButton.onclick = function () {
		document.body.removeChild(modal);
	};

	buttonsContainer.appendChild(saveButton);
	buttonsContainer.appendChild(cancelButton);
	modalContent.appendChild(header);
	modalContent.appendChild(input);
	modalContent.appendChild(buttonsContainer);
	modal.appendChild(modalContent);

	document.body.appendChild(modal);

	input.focus();
}

function mostrarModalConfirmacion(index) {
	const modal = document.createElement('div');
	modal.className = 'modal';

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-content';

	const header = document.createElement('h2');
	header.textContent = 'Confirmación';

	const message = document.createElement('p');
	message.textContent = '¿Estás seguro de que deseas eliminar este amigo?';

	const buttonsContainer = document.createElement('div');
	buttonsContainer.className = 'modal-buttons';

	const confirmButton = document.createElement('button');
	confirmButton.textContent = 'Eliminar';
	confirmButton.className = 'modal-button delete-button';
	confirmButton.onclick = function () {
		eliminarAmigo(index);
		document.body.removeChild(modal);
	};

	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cancelar';
	cancelButton.className = 'modal-button cancel-button';
	cancelButton.onclick = function () {
		document.body.removeChild(modal);
	};

	buttonsContainer.appendChild(confirmButton);
	buttonsContainer.appendChild(cancelButton);
	modalContent.appendChild(header);
	modalContent.appendChild(message);
	modalContent.appendChild(buttonsContainer);
	modal.appendChild(modalContent);

	document.body.appendChild(modal);
}

function actualizarListaAmigos() {
	const listaAmigos = document.getElementById('listaAmigos');
	listaAmigos.innerHTML = '';

	amigos.forEach((amigo, index) => {
		const nuevoItem = crearItemAmigo(amigo, index);
		listaAmigos.appendChild(nuevoItem);
	});
}
