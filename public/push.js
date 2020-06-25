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
    "https://fcm.googleapis.com/fcm/send/cZc-MmOZmWA:APA91bF0mG6ENQxk6nfyxh3Y8ObYhhVmeJO1LIq5cDqXSa8Z4amWnnbU2aOmC73LbKn8Vjac9NdhdsyHdJTbYkJ3cGyav_Nf10eQrtQBiYDWQ0eBEmXqCGdlUn1CjO3Gy1Lmrgb3TJoq",
  keys: {
    p256dh:
      "BPMO7ojxCclVEnCbtcbE2VArf3g9zfsL4egdzKOtqccYfRtO69DA7Mk42VK7WGsOJIABb6khhX4XxgthXb66of4=",
    auth: "b/P47uAEoVtAnc5M79aDyw==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "873965595324",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
