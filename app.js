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

	const listaAmigos = document.getElementById('listaAmigos');
	const nuevoAmigo = document.createElement('li');
	nuevoAmigo.textContent = nombre;
	listaAmigos.appendChild(nuevoAmigo);

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
