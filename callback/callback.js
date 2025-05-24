function getdata(id, getNextData) {
  setTimeout(() => {
    console.log("the data is", id);
    if (getNextData) {
      getNextData();
    }
  }, 5000);
}

getdata(102, () => {
  getdata(103, () => {
    getdata(104, () => {
      getdata(105, () => {
        getdata(106);
      });
    });
  });
});
