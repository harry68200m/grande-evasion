var bddService = require("../services/bddService");
var notificationService = require("../services/notificationService");

module.exports.getAllPortillons = async () => {
    return new Promise(async (resolve, reject) => {
       bddService.executeSQLCommand('SELECT * FROM portillon').then(portillons => {
            console.log(portillons);
            resolve(portillons);
       });       
    });
};

module.exports.getPortillonById = async (id) => {
    return new Promise(async (resolve, reject) => {
       bddService.executeSQLCommand('SELECT * FROM portillon WHERE id = ' + id).then(portillon => {
            console.log(portillon);
            resolve(portillon);
       });       
    });
};

module.exports.addPortillon = async (portillon) => {
    return new Promise(async (resolve, reject) => {

        // var guid = Math.floor(1000 + Math.random() * 9000).toString();
        // guid = guid.substring(-2);

       bddService.executeSQLCommand('INSERT INTO portillon (nom, guid, uuid, status) VALUES (\'' + portillon.nom + '\', '+ portillon.guid +', \'\' , 0)').then(() => {
            resolve("OK");
       });    
    });
};

module.exports.deletePortillon = async (idPortillon) => {
    return new Promise(async (resolve, reject) => {
        bddService.executeSQLCommand('DELETE FROM evenement WHERE idPortillon = ' + idPortillon).then(() => {
            bddService.executeSQLCommand('DELETE FROM portillon WHERE portillon.id = ' + idPortillon).then(() => {
                resolve("OK");
           }); 
       }); 
    });
};

module.exports.editPortillon = async (idPortillon, portillon) => {
    return new Promise(async (resolve, reject) => {
       bddService.executeSQLCommand('UPDATE portillon SET nom = \'' + portillon.nom + '\', guid = ' + portillon.guid + ' WHERE id = ' + idPortillon).then(() => {
            resolve("OK");
       });    
    });
};

module.exports.inscriptionPortillon = async (idPortillon, UUID, body) => {
    return new Promise(async (resolve, reject) => {
        bddService.executeSQLCommand('SELECT * FROM portillon WHERE id = ' + idPortillon).then((portillon) => {
            
            var uuids = [];
            if (portillon[0].uuid != null) {
                uuids = portillon[0].uuid.split(';');
            };
            console.log("test ", uuids);
            if (body.register == true) {
                if(uuids.indexOf(UUID) == -1){
                    uuids.push(UUID); 
                }
            }else if(body.register == false) {
                if(uuids.indexOf(UUID) != -1){
                    uuids.splice(uuids.indexOf(UUID), 1);
                }
            }
            
            bddService.executeSQLCommand('UPDATE portillon SET uuid = \'' + uuids.join(";") + '\' WHERE id = ' + idPortillon).then(() => {
                resolve("OK");
            });
        });         
    });
};

module.exports.ajoutEvenement = async (guid, status) => {
    return new Promise(async (resolve, reject) => {
        bddService.executeSQLCommand('SELECT * FROM portillon WHERE guid = ' + guid).then((portillon) => {
            var date = new Date();
            date.setTime(date.getTime() + (60*60*1000));
            bddService.executeSQLCommand('INSERT INTO evenement (date, status, idPortillon) VALUES (\'' + date.toISOString().replace("T", " ").replace("Z", "") + '\', ' + status + ', ' + portillon[0].id + ')').then(() => {
                resolve("OK");
            });
            bddService.executeSQLCommand('UPDATE portillon SET status = \'' + status + '\' WHERE id = ' + portillon[0].id).then(() => {});
            notificationService.sendNotification(portillon[0].uuid, status, portillon[0].nom);
        });    
        
        
    });
};

module.exports.historiqueEvents = async (idPortillon) => {
    return new Promise(async (resolve, reject) => {
        bddService.executeSQLCommand('SELECT * FROM evenement WHERE idPortillon = ' + idPortillon + ' ORDER BY id DESC LIMIT 10').then((events) => {
            var eventsCorrect = [];
            events.forEach(event => {
                var d = new Date(event.date)
                event.date = d.toLocaleString()
            });
           resolve(events)
        });          
    });
};


