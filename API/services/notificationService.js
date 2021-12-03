const {Server} = require("socket.io"),
    io = new Server(3010, {cors: {
        origin: '*',
      }});

let devices  = [];

module.exports.main = () => {

    io.on("connection", function (socket) {
        console.log(`Connecté au client ${socket.id}`);

        socket.on("subscribeDevice", function (uuid) {
            devices.push({id: socket.id, uuid: uuid});
            console.log(devices)
        });

        socket.on("disconnect", (reason) => {
            console.log(`Déconnecté du client ${socket.id}`);
            devices.splice(devices.map(e => e.id).indexOf(socket.id), 1);
        });
    });

};

module.exports.sendNotification = (devicesUuid, status, nom) => {
    console.log("------ENVOI NOTIFICATION------");
    if (status == 1) {
        var notification = {
            titre: "Portillon ouvert",
            texte : 'Le portillon ' + nom + ' a été ouvert',
            portillon: nom
        }    
    
        if (devicesUuid != null) {
            var devicesUUID = devicesUuid.split(";");
            var devicesToNotif = devices.filter(function(d) { return devicesUUID.includes(d.uuid) == true});
        
            devicesToNotif.forEach(device => {
                io.to(device.id).emit(notification);
            })
        }        
    }    
}
