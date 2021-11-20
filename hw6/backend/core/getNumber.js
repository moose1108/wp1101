let number;

const getNumber = (Restart = false) => {
  if(number === undefined || Restart === true){
      number = Math.floor((Math.random() * 100) + 1);
  }
  return number;
}

export default getNumber;