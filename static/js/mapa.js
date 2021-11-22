var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '<a href="#">Os guris de Nicolas Cage</a> '
});

var onibusMakers = new L.FeatureGroup();

var localInicial = [-17.9392089508829, -40.5478813835762]
navigator.geolocation.getCurrentPosition((data) => {
    localInicial[0] = data.coords.latitude
    localInicial[1] = data.coords.longitude
    /* DESCOMENTAR DEPOIS */
    map.setView(new L.LatLng(data.coords.latitude, data.coords.longitude), 12)
    L.marker(localInicial).addTo(map)
})
var map = L.map('map')
    .addLayer(mapboxTiles)
    .setView(localInicial, 12);

var cinemaIco = L.icon({
    iconUrl: '../static/img/cinemaIco.png',
    iconSize: [30, 30]
});

var marcadorAtual = [localInicial[0], localInicial[1]]

function createButton(label, container) {
    var btn = L.DomUtil.create('button', 'btn btn-success', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;

    return btn;
}
var todosPontos = []
function irLocalizacao(e) {
    var container = L.DomUtil.create('div');
    var irPosicao = createButton('Ir para localização', container);
    var reseta = createButton('R', container);
    // Clicou em ir prosição
    var routing;
    L.DomEvent.on(irPosicao, 'click', function () {
        resetarPontos();
        const a = document.getElementsByClassName('leaflet-right');
        console.log(a[0].children);
        a[0].children.forEach()
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

    });
    // Clicou em resetar
    L.DomEvent.on(reseta, 'click', function () {
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

function resetarLocalizacao(e) {

}

var x = L.marker(localInicial, { icon: cinemaIco })
    .addTo(map)
    .on('click', irLocalizacao)

var x = L.marker([localInicial[0], localInicial[1] + 1], { icon: cinemaIco })
    .addTo(map)
    .on('click', irLocalizacao)

/* map.on('click', function (e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Ir para localização', container)//,
    // destBtn = createButton('Go to this location', container);
    console.log(e.latlng);
    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
}); */



/*
L.Routing.control({
    waypoints: [
      L.latLng(localInicial),
      L.latLng(marcadorAtual)
    ]
  }).addTo(map);


L.Routing.control({
    waypoints: [
        L.latLng(localInicial[0], localInicial[1]),
        L.latLng(marcadorAtual)
    ]
}) */


/* .bindPopup("<p1><b>The White House</b><br>Landmark, historic home & office of the United States president, with tours for visitors.</p1>")
.openPopup(); */
// x.draggable = true
/* .on('mouseover', function () {
    console.log('asdasdasd');
    L.Routing.control({
        waypoints: [
            L.latLng(localInicial[0], localInicial[1]),
            L.latLng(marcadorAtual)
        ]
    }).addTo(map);

}) */
