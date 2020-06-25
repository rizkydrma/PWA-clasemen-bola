var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BNecR4hIeXBy_jUEavLOv4obgO--D04poB2lmlrZuacJ9AUEqDCZM9lk6S4bHQ8AQmEeT7WD3StV78dBr8K5cWc",
  privateKey: "CNbVtYwjLIfxGVBfUpVgFuLCan40noZldeQSdev8XoI",
};

webPush.setVapidDetails(
  "mailto:rdarmarazak93@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fT6VbqaS_cg:APA91bHyBBgsKyl4HC2yng7raX5ym-rHcF_znyUHA-IaUabg0DlJn9bgVIGZEnlzpbiS-Z_0NZ8AdZzIZVuI7Dtsmlqivuo5rs7xZd-WYm8v4XLyShGMPnQXeTrOO3TY5v9TyH5ida4T",
  keys: {
    p256dh:
      "BMc7EojobTLfsAxwsby2FyfrZzkzlDHkGJDcLGDwiemVgdK1/EgaTTG80Hiez+Y0RlVCBbHWGwfMmSGZyj6Avg8=",
    auth: "Cv0HFrTrVrVtC+0dgoCoAQ==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "873965595324",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
