const dbPromised = idb.open("clasemen-liga", 1, (upgradeDB) => {
  const clasemenObjectStore = upgradeDB.createObjectStore("clasemens", {
    keyPath: "ID",
  });
  clasemenObjectStore.createIndex("clasemen_title", "clasemen_title", {
    unique: false,
  });
});

function saveForLater(clasemen) {
  dbPromised
    .then((db) => {
      const tx = db.transaction("clasemens", "readwrite");
      const store = tx.objectStore("clasemens");
      store.put(clasemen);
      return tx.complete;
    })
    .then(() => {
      console.log("Clasemen Berhasil disimpan!");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then((db) => {
        let tx = db.transaction("clasemens", "readonly");
        let store = tx.objectStore("clasemens");
        return store.getAll();
      })
      .then((clasemens) => {
        resolve(clasemens);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clasemens", "readonly");
        let store = tx.objectStore("clasemens");
        console.log(store);
        console.log(id);
        return store.get(id);
      })
      .then(function (clasemen) {
        resolve(clasemen);
      });
  });
}

function deleteSaved(id) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("clasemens", "readwrite");
      let store = tx.objectStore("clasemens");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      console.log("Item deleted");
    });
}

function checkSaved(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("clasemens", "readonly");
        let store = tx.objectStore("clasemens");
        return store.get(id);
      })
      .then(function (clasemenSaved) {
        if (clasemenSaved === undefined) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
}
