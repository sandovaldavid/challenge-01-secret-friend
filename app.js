// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

function agregarAmigo() {
	const nombreInput = document.getElementById('amigo');
	const nombre = nombreInput.value.trim();

	if (nombre === '') {
		alert('Por favor, ingrese un nombre válido');
		return;
	}

	amigos.push(nombre);
	actualizarListaAmigos();

	nombreInput.value = '';
	nombreInput.focus();
}

function sortearAmigo() {
	if (amigos.length === 0) {
		alert('Debe agregar al menos un amigo a la lista');
		return;
	}

	const indiceAleatorio = Math.floor(Math.random() * amigos.length);
	const amigoSeleccionado = amigos[indiceAleatorio];
	34;
	const resultado = document.getElementById('resultado');
	resultado.innerHTML = `<li>¡Tu amigo secreto es: ${amigoSeleccionado}!</li>`;
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

	const botonesContainer = document.createElement('div');
	botonesContainer.className = 'amigo-botones';

	const botonEditar = document.createElement('button');
	botonEditar.innerHTML = '<i class="fas fa-edit"></i>';
	botonEditar.className = 'boton-editar';
	botonEditar.onclick = function () {
		editarAmigo(index);
	};

	const botonEliminar = document.createElement('button');
	botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
	botonEliminar.className = 'boton-eliminar';
	botonEliminar.onclick = function () {
		eliminarAmigo(index);
	};

	botonesContainer.appendChild(botonEditar);
	botonesContainer.appendChild(botonEliminar);
	nuevoAmigo.appendChild(nombreSpan);
	nuevoAmigo.appendChild(botonesContainer);

	return nuevoAmigo;
}

function editarAmigo(index) {
	const nuevoNombre = prompt('Editar nombre:', amigos[index]);

	if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
		amigos[index] = nuevoNombre.trim();
		actualizarListaAmigos();
	}
}

function eliminarAmigo(index) {
	if (confirm('¿Estás seguro de que deseas eliminar este amigo?')) {
		amigos.splice(index, 1);
		actualizarListaAmigos();
	}
}

function actualizarListaAmigos() {
	const listaAmigos = document.getElementById('listaAmigos');
	listaAmigos.innerHTML = '';

	amigos.forEach((amigo, index) => {
		const nuevoItem = crearItemAmigo(amigo, index);
		listaAmigos.appendChild(nuevoItem);
	});
}

function agregarEstilos() {
	const estiloCSS = document.createElement('style');
	estiloCSS.textContent = `
        
    `;
	document.head.appendChild(estiloCSS);
}
