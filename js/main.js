document.addEventListener('DOMContentLoaded', function () {
  my_tel_masker(document.querySelectorAll('input[type=tel]', '+7'));
})


function my_tel_masker(all_phone_selector_array) {
  let temp = '+7(___)__-__-___';

  all_phone_selector_array.forEach(function (item) {
    item.maxLength = temp.length;
    item.addEventListener('keydown', keydownCheck);
    item.addEventListener('input', inputCheck);
  });

  function keydownCheck(e) {
    e.target.dataset.keycode = e.keyCode;
    if ((e.keyCode > 48 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode === 48) || (e.keyCode === 107) || (e.keyCode === 109) || (e.keyCode === 17)) {
      //...
    } else if ((e.keyCode === 8) || (e.keyCode === 46) || (e.keyCode === 37) || (e.keyCode === 39) || (e.keyCode === 32)) {
      //...
    } else if ((e.keyCode === 86) && e.ctrlKey) {
      //...Позволяем вставку
    } else {
      e.preventDefault();
    }
    //console.log(e.keyCode);
  }

  function inputCheck(e) {
    let textArray = e.target.value.split('');

    if (textArray[0] == '+') {
      //...
    } else if (textArray[0] == '7' || textArray[0] == '8') {
      textArray.shift();
      textArray.unshift('(');
      textArray.unshift('7');
      textArray.unshift('+');
    } else if (e.target.value == '') {
      //...На случай, если происходит удаление контента
    } else {
      textArray.unshift('(');
      textArray.unshift('7');
      textArray.unshift('+');
    }
    e.target.value = textArray.join('');

    if (textArray.length == 2 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      //...Вторая цифра всегда 7!
      textArray[1] = '7';
      textArray.push('(')
      e.target.value = textArray.join('');
    }

    if (textArray[3] == '8' || textArray[3] == '7') {
      //...если человек опечатался. Второй цифрой не может быть 7 или 8.
      textArray.splice(3,1);
      e.target.value = textArray.join('');
    }

    if (textArray.length == 6 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push(')');
      e.target.value = textArray.join('');
    }

    if (textArray.length == 9 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push('-');
      e.target.value = textArray.join('');
    }
    if (textArray.length == 12 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push('-');
      e.target.value = textArray.join('');
    }
  }
}
