export const setStorage = (data) => {
  //Veriyi locale göndermek için stringe çevirme
  const strData = JSON.stringify(data);

  // localstorage güncelleme
  localStorage.setItem("notes", strData);
};
