var bddService = require("../services/bddService")

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

module.exports.inscriptionPortillon = async (idPortillon, UUID) => {
    return new Promise(async (resolve, reject) => {
        bddService.executeSQLCommand('SELECT * FROM portillon WHERE id = ' + idPortillon).then((portillon) => {
            
            var uuids = [];
            if (portillon[0].uuid != null) {
                uuids = portillon[0].uuid.split(';');
            };
            console.log("test ", uuids);
            uuids.push(UUID);
            bddService.executeSQLCommand('UPDATE portillon SET uuid = ' + uuids.join(";") + ' WHERE id = ' + idPortillon).then(() => {
                resolve("OK");
            });
        });         
    });
};