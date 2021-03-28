(function () {
    "use strict";
    
    //kell 12h formaat

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let aeg = "PL";
            if (h < 12) {
                aeg = "EL"
            }
            if (h > 12) {
                h = h - 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            
            if (h == 0){
                h = 12;
            }
            c.innerHTML = h + ":" + m + ":" + s + " " + aeg;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let arvsees = /\d/;
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        }
        else if(fname.value == "" || lname.value == "") {
            alert("Palun sisestage oma täisnimi");
            return;
        }
        else if (arvsees.test(fname.value) || arvsees.test(lname.value)) {
            alert("Täisnimes ei tohi olla arvu");
            return;
        }
        else if (document.getElementById("lhv").checked == false && document.getElementById("seb").checked == false && document.getElementById("swed").checked == false) {
            alert("Valige makseviis");
            return;
        }
        else {
            let arvuta = 0;
            let x = document.getElementById("v1");
            let y = document.getElementById("v2");
            if (x.checked == true) {
                arvuta += 5;
            }
            if (y.checked == true){
                arvuta += 1;
            }
            if (linn.value == "tln") {
                arvuta += 0;
            }
            else if (linn.value == "trt" || linn.value == "nrv" ) {
                arvuta += 2.50;
            }
            else if (linn.value = "prn") {
                arvuta += 3;
            }
            linn.focus()
            e.innerHTML = arvuta.toFixed(2) + "€";
            arvuta = 0;
            
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let uuspaik = new Microsoft.Maps.Location(
        58.529910, 26.643106);
    let kesk = new Microsoft.Maps.Location(58.458211, 26.672903);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: kesk,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let uuspin = new Microsoft.Maps.Pushpin(uuspaik, {
        title: 'Teine koht',
    })
    map.entities.push(uuspin);
    map.entities.push(pushpin);
    let tartubox = new Microsoft.Maps.Infobox(centerPoint, {
        title: "tere",
        description: "See on Tartu Ülikool",
        visible: false
    })
    let uusbox = new Microsoft.Maps.Infobox(uuspin, {
        title: "tere",
        description: "See on teine koht",
        visible: false
    })
    tartubox.setMap(map);
    uusbox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
            tartubox.setOptions({ visible: true });
        });
    Microsoft.Maps.Events.addHandler(uuspin, 'click', function () {
            uusbox.setOptions({ visible: true });
        });
    }

    

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

