const ul = document.getElementById('ul-stocks')

for (var i = 0; i < ul.children.length; i++) {
  const tagStock = ul.children[i].id
  const li = document.getElementById(tagStock)

  for (var j = 0; j < li.children.length; j++) {
    let perc = document.getElementById(`${tagStock}-perc`).innerHTML.replace(',', '.')
    // perc = perc.substring(0, perc.length - 1)

    if (parseFloat(perc) > 0) {
      li.style.cssText =
        'color: white;' +
        'background-color: #42942F;';

    } else if (parseFloat(perc) < 0) {
      li.style.cssText =
        'color: white;' +
        'background-color: #BE2929;';      
    }
  }  
}

