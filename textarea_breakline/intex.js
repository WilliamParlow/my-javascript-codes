window.onload = () => {
  document.querySelector('#textarea').onkeyup = e => {
    let result = '';

    e.target.value.split('').forEach(v => {
      result = result.concat(v);
      console.log(v);
    });

    console.log(result);
    document.querySelector('#result').textContent = result;
  }
}