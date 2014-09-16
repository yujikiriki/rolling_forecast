'use strict';

angular.module('frontendApp').controller('ActualizarCuentaController', [
	'$scope',
	'accountServices',
	function($scope, accountServices) {
		/* Feedback messages */
		$scope.feedbackMessages = [];

		/* Departamens and cities */
		$scope.departaments = [{
			'name': 'Antioquia',
			'cities': ['Medellin','Abejorral','Abriaquí','Alejandría','Amagá','Amalfi','Andes','Angelópolis','Angostura','Anorí','Anza','Apartadó','Arboletes','Argelia','Armenia','Barbosa','Bello','Belmira','Betania','Betulia','Briceño','Buriticá','Cáceres','Caicedo','Caldas','Campamento','Cañasgordas','Caracolí','Caramanta','Carepa','Carolina','Caucasia','Chigorodó','Cisneros','Ciudad Bolívar','Cocorná','Concepción','Concordia','Copacabana','Dabeiba','Don Matías','El Bagre','El Carmen De Viboral','El Santuario','Entrerrios','Envigado','Fredonia','Frontino','Giraldo','Girardota','Gómez Plata','Granada','Guadalupe','Guarne','Guatape','Hispania','Itagui','Ituango','Jardín','Jericó','La Ceja','La Estrella','La Pintada','La Unión','Liborina','Maceo','Marinilla','Montebello','Murindó','Mutatá','Nariño','Nechí','Necoclí','Olaya','Peñol','Peque','Pueblorrico','Puerto Berrío','Puerto Nare','Puerto Triunfo','Retiro','Rionegro','Sabanalarga','Sabaneta','Salgar','San Andrés','San Carlos','San Francisco','San Jerónimo','San José De La Montaña','San Juan De Urabá','San Luis','San Pedro','San Pedro De Uraba','San Rafael','San Roque','San Vicente','Santa Bárbara','Santa Rosa De Osos','Santafé De Antioquia','Sonson','Sopetrán','Tarso','Titiribí','Toledo','Turbo','Uramita','Urrao','Valdivia','Vegachí','Venecia','Vigía Del Fuerte','Yalí','Yarumal','Yolombó','Yondó']
		}, {
			'name': 'Amazonas',
			'cities': ['Leticia','El Encanto','La Chorrera','La Pedrera','Miriti - Paraná','Puerto Arica','Puerto Nariño','Puerto Santander','Tarapacá']
		}, {
			'name': 'Cauca',
			'cities': ['Saravena','Arauca','Arauquita','Cravo Norte','Fortul','Puerto Rondón','Tame']			
		}, {
			'name': 'Atlántico',
			'cities': ['Baranoa','Barranquilla','Campo De La Cruz','Candelaria','Galapa','Juan De Acosta','Luruaco','Malambo','Manatí','Palmar De Varela','Piojó','Polonuevo','Ponedera','Puerto Colombia','Repelón','Sabanagrande','Sabanalarga','Santa Lucía','Santo Tomás','Soledad','Suan','Tubará','Usiacurí']
		}, {
			'name': 'Bolivar',
			'cities': ['Achí','Altos Del Rosario','Altos Del Rosario','Arenal','Arjona','Arjona','Arroyohondo','Barranco De Loba','Calamar','Cantagallo','Cartagena','Cicuco','Clemencia','Córdoba','El Carmen De Bolívar','El Guamo','El Peñón','Hatillo De Loba','Magangué','Mahates','Margarita','María La Baja','Mompós','Montecristo','Morales','Pinillos','Regidor','Río Viejo','San Cristóbal','San Estanislao','San Fernando','San Jacinto','San Jacinto Del Cauca','San Juan Nepomuceno','San Martín De Loba','San Pablo','Santa Catalina','Santa Rosa','Santa Rosa Del Sur','Simití','Soplaviento','Talaigua Nuevo','Tiquisio','Turbaco','Turbana','Villanueva','Zambrano']		
		}, {
			'name': 'Boyacá',
			'cities': ['Aquitania','Chiquinquirá','Coper','Cubará','Duitama','El Cocuy','Garagoa','Guateque','Güicán','Labranzagrande','Macanal','Maripí','Miraflores','Monguí','Moniquirá','Muzo','Otanche','Paipa','Pauna','Pisba','Puerto Boyacá','Ramiriquí','Samacá','San Luis De Gaceno','Santa María','Santa Rosa De Viterbo','Soatá','Socha','Socotá','Sogamoso','Toca','Tunja','Turmequé','Umbita','Villa De Leyva']		
		}, {
			'name': 'Caldas',
			'cities': ['Aguadas','Aranzazu','Belalcázar','Chinchiná','Filadelfia','La Dorada','La Merced','Manizales','Marmato','Marquetalia','Marulanda','Neira','Norcasia','Pácora','Palestina','Pensilvania','Riosucio','Risaralda','Salamina','Samaná','Supía','Victoria','Viterbo']		
		}, {
			'name': 'Caquetá',
			'cities': ['Albania','Belén De Los Andaquies','Cartagena Del Chairá','Curillo','El Doncello','El Paujil','Florencia','La Montañita','Milán','Morelia','Puerto Rico','San José Del Fragua','San Vicente Del Caguán','Solano','Solita','Valparaíso']		
		}, {
			'name': 'Casanare',
			'cities': ['Aguazul','Chameza','Hato Corozal','La Salina','Maní','Monterrey','Nunchía','Orocué','Paz De Ariporo','Pore','Recetor','Sabanalarga','Sácama','San Luis De Palenque','Támara','Tauramena','Villanueva','Yopal']		
		}, {
			'name': 'Cauca',
			'cities': ['Almaguer','Argelia','Balboa','Bolívar','Buenos Aires','Cajibío','Caldono','Caloto','Corinto','El Tambo','Florencia','Guapi','Inzá','Jambaló','La Sierra','La Vega','López','Mercaderes','Miranda','Morales','Padilla','Paez','Patía','Piamonte','Piendamó','Popayán','Puerto Tejada','Puracé','Rosas','San Sebastián','Santa Rosa','Santander De Quilichao','Silvia','Sotara','Suárez','Sucre','Timbío','Timbiquí','Toribio','Totoró','Villa Rica']
		}, {
			'name': 'Cesar',
			'cities': ['Aguachica','Agustín Codazzi','Astrea','Becerril','Bosconia','Chimichagua','Chiriguaná','Curumaní','El Copey','El Paso','Gamarra','González','La Gloria','La Jagua De Ibirico','La Paz','Manaure','Pailitas','Pelaya','Pueblo Bello','Río De Oro','San Alberto','San Diego','San Martín','Tamalameque','Valledupar']
		}, {
			'name': 'Chocó',
			'cities': ['Alto Baudo','Atrato','Bagadó','Bajo Baudó','Bojaya','Carmen Del Darien','Cértegui','Condoto','El Cantón Del San Pablo','El Carmen De Atrato','El Litoral Del San Juan','Istmina','Juradó','Lloró','Medio Baudó','Medio San Juan','Nóvita','Nuquí','Quibdó','Río Iro','Río Quito','Riosucio','San José Del Palmar','Sipí','Tadó','Unión Panamericana']
		}, {
			'name': 'Córdoba',
			'cities': ['Ayapel','Buenavista','Canalete','Cereté','Chimá','Chinú','Cotorra','La Apartada','Lorica','Los Córdobas','Momil','Moñitos','Montelíbano','Montería','Planeta Rica','Pueblo Nuevo','Puerto Escondido','Puerto Libertador','Purísima','Sahagún','San Andrés Sotavento','San Antero','San Bernardo Del Viento','San Carlos','San Pelayo','Tierralta','Tuchín','Valencia']
		}, {
			'name': 'Cundinamarca',
			'cities': ['Bogotá', 'Agua De Dios','Anolaima','Apulo','Arbeláez','Cajicá','Caparrapí','Caqueza','Carmen De Carupa','Chía','Chocontá','El Colegio','Facatativá','Fomeque','Fosca','Funza','Fusagasugá','Gachetá','Girardot','Guachetá','Guaduas','Guasca','Guatavita','Junín','La Calera','La Mesa','La Palma','La Vega','Madrid','Medina','Mosquera','Nemocón','Pacho','Puerto Salgar','San Antonio Del Tequendama','San Francisco','Sasaima','Sesquilé','Sibaté','Silvania','Soacha','Sopó','Suesca','Tabio','Tenjo','Tocaima','Une','Vergara','Vianí','Villa De San Diego De Ubate','Villeta','Viotá','Yacopí','Zipaquirá']
		}, {
			'name': 'Guanía',
			'cities': ['Barranco Minas','San Felipe','Inírida']
		}, {
			'name': 'Guaviare',
			'cities': ['Calamar','San José Del Guaviare','El Retorno','Miraflores','El Retorno']
		}, {
			'name': 'Huila',
			'cities': ['Acevedo','Agrado','Aipe','Algeciras','Altamira','Baraya','Campoalegre','Colombia','Elías','Garzón','Gigante','Guadalupe','Hobo','Iquira','Isnos','La Argentina','La Plata','Nátaga','Neiva','Oporapa','Paicol','Palermo','Palestina','Pital','Pitalito','Rivera','Saladoblanco','San Agustín','Santa María','Suaza','Tarqui','Tello','Teruel','Tesalia','Villavieja','Yaguará']
		}, {
			'name': 'La Guajira',
			'cities': ['Albania','Barrancas','Dibulla','Distracción','El Molino','Fonseca','Hatonuevo','La Jagua Del Pilar','Maicao','Manaure','Riohacha','San Juan Del Cesar','Uribia','Urumita','Villanueva']
		}, {
			'name': 'Magdalena',
			'cities': ['Algarrobo','Aracataca','Ariguaní','Cerro San Antonio','Chibolo','Ciénaga','Concordia','El Banco','El Piñon','El Retén','Fundación','Guamal','Nueva Granada','Pedraza','Pijiño Del Carmen','Pivijay','Plato','Puebloviejo','Remolino','Sabanas De San Angel','Salamina','San Sebastián De Buenavista','San Zenón','Santa Ana','Santa Bárbara De Pinto','Santa Marta','Sitionuevo','Tenerife','Zapayán','Zona Bananera']
		}, {
			'name': 'Meta',
			'cities': ['Acacías', 'Barranca De Upía', 'Cabuyaro', 'Castilla La Nueva', 'Cubarral', 'Cumaral', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente De Oro', 'Granada', 'Guamal', 'La Macarena', 'Lejanías', 'Mapiripán', 'Mesetas', 'Puerto Concordia', 'Puerto Gaitán', 'Puerto Lleras', 'Puerto López', 'Puerto Rico', 'Restrepo', 'San Carlos De Guaroa', 'San Juan De Arama', 'San Juanito', 'San Martín', 'Uribe', 'Villavicencio', 'Vistahermosa']
		}, {
			'name': 'Nariño',
			'cities': ['Albán','Aldana','Ancuyá','Arboleda','Barbacoas','Belén','Buesaco','Chachagüí','Colón','Consaca','Contadero','Córdoba','Cuaspud','Cumbal','Cumbitara','El Charco','El Rosario','El Tablón De Gómez','El Tambo','Francisco Pizarro','Funes','Guachucal','Guaitarilla','Gualmatán','Iles','Imués','Ipiales','La Cruz','La Florida','La Unión','Leiva','Linares','Los Andes','Magüi','Mosquera','Nariño','Olaya Herrera','Ospina','Pasto','Policarpa','Potosí','Providencia','Puerres','Pupiales','Ricaurte','Roberto Payán','Samaniego','San Lorenzo','San Pablo','San Pedro De Cartago','Sandoná','Santa Bárbara','Santacruz','Sapuyes','Taminango','Tangua','Tumaco','Túquerres','Yacuanquer']
		}, {
			'name': 'Norte de Santander',
			'cities': ['Bochalema','Bucarasica','Tibú','Cácota','Chitagá','Mutiscua','Pamplonita','San Cayetano','Santiago','Silos','Teorama','Cucutilla','El Tarra','Toledo','Tibú','Cachirá','Labateca','Sardinata','Lourdes','Los Patios','Puerto Santander','Ragonvalia','Toledo','Villa Caro','Hacarí','Cúcuta','Cúcuta','Los Patios','Cúcuta','Cúcuta','Cúcuta','Ocaña','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Ocaña','Chinácota','Abrego','Cúcuta','Herrán','Villa Del Rosario','Cachirá','La Playa','Ocaña','El Zulia','Los Patios','Pamplona','Cúcuta','Cúcuta','Tibú','Salazar','Arboledas','Pamplona','El Zulia','Ocaña','Durania','Cúcuta','Toledo','Cúcuta','Convención','El Carmen','Tibú','Sardinata','Cúcuta','Teorama','Cúcuta','Cúcuta','Cúcuta','Toledo','Pamplona','Cúcuta','Ocaña','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Cúcuta','Ocaña','Cúcuta','Ocaña']
		}, {
			'name': 'Putumayo',
			'cities': ['Colón','Leguízamo','Mocoa','Orito','Puerto Asís','Puerto Caicedo','Puerto Guzmán','San Miguel','Sibundoy','Valle Del Guamuez','Villagarzón']
		}, {
			'name': 'Quindío',
			'cities': ['Armenia', 'Filandia', 'La Tebaida', 'Montenegro', 'Pijao', 'Salento']
		}, {
			'name': 'Risaralda',
			'cities': ['Balboa','Dosquebradas','Guática','La Virginia','Marsella','Mistrató','Pereira','Quinchía','Santa Rosa De Cabal']
		}, {
			'name': 'San Andrés y Providencia',
			'cities': ['San Andrés', 'Providencia']
		}, {
			'name': 'Santander',
			'cities': ['Aguada','Albania','Aratoca','Barichara','Barrancabermeja','Betulia','Bolívar','Bucaramanga','Cabrera','California','Capitanejo','Carcasí','Cepitá','Cerrito','Charalá','Charta','Chima','Chipatá','Cimitarra','Concepción','Confines','Contratación','Coromoro','Curití','El Carmen De Chucurí','El Guacamayo','El Peñón','El Playón','Encino','Enciso','Florián','Floridablanca','Galán','Gambita','Girón','Guadalupe','Guapotá','Guavatá','Güepsa','La Belleza','La Paz','Landázuri','Lebríja','Los Santos','Macaravita','Málaga','Matanza','Mogotes','Molagavita','Ocamonte','Onzaga','Páramo','Piedecuesta','Puente Nacional','Puerto Parra','Puerto Wilches','Rionegro','Sabana De Torres','San Andrés','San Benito','San Gil','San Joaquín','San José De Miranda','San Miguel','San Vicente De Chucurí','Santa Bárbara','Simacota','Socorro','Suaita','Sucre','Suratá','Tona','Vélez','Vetas','Villanueva','Zapatoca']
		}, {
			'name': 'Sucre',
			'cities': ['Buenavista','Caimito','Chalán','Coloso','Corozal','Coveñas','El Roble','Galeras','Guaranda','La Unión','Los Palmitos','Majagual','Morroa','Ovejas','Palmito','Sampués','San Benito Abad','San Juan De Betulia','San Marcos','San Onofre','San Pedro','Santiago De Tolú','Sincé','Sincelejo','Sucre','Tolú Viejo']
		}, {
			'name': 'Tolima',
			'cities': ['Alpujarra','Alvarado','Ambalema','Anzoátegui','Armero','Ataco','Cajamarca','Carmen De Apicalá','Casabianca','Chaparral','Coello','Coyaima','Cunday','Dolores','Espinal','Falan','Flandes','Fresno','Guamo','Herveo','Honda','Ibagué','Icononzo','Lérida','Líbano','Mariquita','Melgar','Murillo','Natagaima','Ortega','Palocabildo','Piedras','Planadas','Purificación','Rioblanco','Roncesvalles','Rovira','Saldaña','San Antonio','San Luis','Santa Isabel','Suárez','Valle De San Juan','Venadillo','Villahermosa','Villarrica']
		}, {
			'name': 'Valle del Cauca',
			'cities': ['Alcalá','Andalucía','Ansermanuevo','Argelia','Bolívar','Buenaventura','Bugalagrande','Caicedonia','Cali','Calima','Candelaria','Cartago','Dagua','El Águila','El Cairo','El Cerrito','El Dovio','Florida','Ginebra','Guacarí','Guadalajara De Buga','Jamundí','La Cumbre','La Unión','La Victoria','Obando','Palmira','Pradera','Restrepo','Riofrío','Roldanillo','San Pedro','Sevilla','Toro','Trujillo','Tuluá','Ulloa','Vijes','Yotoco','Yumbo','Zarzal']
		}, {
			'name': 'Vaupés',
			'cities': ['Caruru','Taraira']
		}, {
			'name': 'Vichada',
			'cities': ['Cumaribo','La Primavera','Puerto Carreño','Santa Rosalía']
		}];

		/* Servicios */
		$scope.actualizarCuenta = function(isValid) {
			if (isValid) {
				$scope.account.departament = $scope.account.departament.name;
				accountServices.create($scope.account);
				$scope.feedbackMessages.push({
					type: 'success',
					text: 'La cuenta [' + $scope.account.name + '] ha sido creada correctamente.'
				});
				$scope.account = null;
			} else
				$scope.feedbackMessages.push({
					type: 'warning',
					text: 'Falta diligenciar algunos campos del formulario.'
				});
		};

		$scope.closeAlert = function(index) {
			$scope.feedbackMessages.splice(index, 1);
		};
	}
]);