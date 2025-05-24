async function getdata(id) {
  return new Promise((resolve, reject) => {
    if (id !== 103) {
      setTimeout(() => {
        console.log("the data is", id);
        resolve("success");
      }, 2000);
    } else {
      reject("Not Found");
    }
  });
}

// getdata(101)
//   .then(() => getdata(102))
//   .then(() => getdata(103))
//   .then(() => getdata(104))
//   .then(() => getdata(105))
//   .catch(()=>{console.log("error in Process");
//   });


await getdata(101)
await getdata(102)
await getdata(103)
await getdata(104)
await getdata(105)

