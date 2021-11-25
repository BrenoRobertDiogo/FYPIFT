// Icones de Mark
const cinemaIcon = L.icon({
    iconUrl: '../static/img/cinemaIco.png',
    iconSize: [30, 30]
});

const parqueIcon = L.icon({
    iconUrl: '../static/img/parqueIcon.png',
    iconSize: [30, 30]
});

const turismoIcon = L.icon({
    iconUrl: '../static/img/turismoIcon.png',
    iconSize: [30, 30]
});

// Inicialização de Variaveis
var localInicial = [-17.9392089508829, -40.5478813835762]
var todosMark    = []
var todosPontos  = []

// Layer Map
var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="#">Os guris de Nicolas Cage</a> '
});

var map = L.map('map')
    .addLayer( mapboxTiles )
    .setView(localInicial, 12);

// Função para pegar a localização atual da pessoa
navigator.geolocation.getCurrentPosition((data) => {
    localInicial[0] = data.coords.latitude
    localInicial[1] = data.coords.longitude
    /* DESCOMENTAR DEPOIS */
    map.setView(new L.LatLng(data.coords.latitude, data.coords.longitude), 12)
    L.marker(localInicial).addTo(map)
})

// Funções Necessarias
function createButton(label, container) {
    var btn = L.DomUtil.create('button', 'btn btn-success', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

const criarMarcador = (iconeMark, lat, lng) => {
    return L.marker( [ lat, lng ] , { icon: iconeMark })
        .addTo(map)
        .on('click', irLocalizacao )
}
// Inicialização das Marcações
const MarkAllPoints = async () => {
    const dadosCinema = await BuscaDadosApi(document.location.origin + "/dados/cinema");
    dadosCinema.dados.forEach( element => {
        todosMark.push( criarMarcador(cinemaIcon, element.lat, element.lng) )
    });

    const dadosParque = await BuscaDadosApi(document.location.origin + "/dados/parque");
    dadosParque.dados.forEach( element => {
        console.log(element);
        todosMark.push( criarMarcador(parqueIcon, element.lat, element.lng) )
    });

    const dadosTurismo = await BuscaDadosApi(document.location.origin + "/dados/turismo");
    dadosTurismo.dados.forEach( element => {
        todosMark.push( criarMarcador(turismoIcon, element.lat, element.lng) )
    });
}

function irLocalizacao(e) {
    var container = L.DomUtil.create('div');
    var irPosicao = createButton('Ir para localização', container);
    var reseta = createButton('R', container);
    // Clicou em ir prosição
    var routing;
    L.DomEvent.on( irPosicao , 'click', function () {
        resetarPontos();
        
        routing = L.Routing.control({
            waypoints: [
                L.latLng(localInicial),
                L.latLng(e.latlng.lat, e.latlng.lng)
            ],
            plan: L.Routing.plan([
                L.latLng(localInicial),
                L.latLng(e.latlng.lat, e.latlng.lng)
            ], {
                createMarker: function (i, wp) {
                    return false;
                }
            }),
            show: true
        }).addTo(map);
        todosPontos.push(routing);
        document.getElementsByClassName('leaflet-bar')[1].remove();
    });

    // Clicou em resetar
    L.DomEvent.on( reseta , 'click', function () {
        routing.spliceWaypoints(0, 2); // <-- removes your route
        resetarPontos();
    });

    console.log(e.latlng);
    
    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

}

function resetarPontos() {
    todosPontos.forEach((v, index) => {
        v.spliceWaypoints(0, 2); // <-- removes your route
    })
}

MarkAllPoints();