(function initialize() {
    let startConfirmed = confirm("Приступаем?");
    let initialMessageDiv = document.getElementById('initialMessage');
    let calculatorDiv = document.getElementById('calculator');

    if (startConfirmed) {
        initialMessageDiv.innerHTML = "Расчет длины каблука";
        calculatorDiv.classList.remove('hidden');
    } else {
        initialMessageDiv.innerHTML = "Ходите босиком.";
    }
})();

document.getElementById('calculateButton').onclick = function () {
    let footLength = document.getElementById('footLength').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    let resultDiv = document.getElementById('resultValue');
    let shoeImage = document.getElementById('shoeImage');

    if (footLength <= 0) {
        alert("Неверное значение длины стопы!");
        return;
    }

    if (!footLength || !gender) {
        alert("Необходимо выбрать пол и длину стопы!");
        return;
    }

    let heelHeight;
    if (gender.value === "male") {
        heelHeight = 1;
        shoeImage.src = "images/boot2.png"; // Мужские ботинки
    } else if (gender.value === "female") {
        heelHeight = (footLength / 7).toFixed(2);

        if (heelHeight > 5) {
            shoeImage.src = "images/boot3.png"; // Высокий каблук
        } else {
            shoeImage.src = "images/boot1.png"; // Низкий каблук
        }
    }

    resultDiv.innerHTML = `Высота каблука ${heelHeight} см.`;
    shoeImage.classList.remove('hidden');
};