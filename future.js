document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('future-ovr-form');
    const resultDiv = document.getElementById('result');  // Poprawa: używamy poprawnego ID

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemsOVR = parseFloat(document.getElementById('items-ovr').value);
        const otherBonusesInput = document.getElementById('other-bonuses').value;
        const cardSlotsOVR = parseFloat(document.getElementById('card-slots-ovr').value);
        const dailyBonus = parseFloat(document.getElementById('daily-bonus').value);
        const desiredOVR = parseFloat(document.getElementById('desired-ovr').value);

        // Walidacja wejść
        if (isNaN(itemsOVR) || isNaN(cardSlotsOVR) || isNaN(dailyBonus) || isNaN(desiredOVR)) {
            displayResult('Proszę wprowadzić poprawne wartości liczbowe.');
            return;
        }

        // Przetwarzanie OVR innych bonusów
        const otherBonusesArray = otherBonusesInput.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
        const sumOtherBonuses = otherBonusesArray.reduce((acc, curr) => acc + curr, 0);

        // Sprawdzenie, czy Chciany OVR jest większy od sumy OVR przedmiotów, bonusów i slotów kart
        const totalExistingOVR = itemsOVR + sumOtherBonuses + cardSlotsOVR;

        if (desiredOVR <= totalExistingOVR) {
            displayResult('Chciany OVR musi być większy od sumy OVR Przedmiotów, OVR Innych Bonusów i OVR Slotów Kart.');
            return;
        }

        // Obliczenia
        const x = (desiredOVR - totalExistingOVR) / (1 + dailyBonus);

        if (isNaN(x)) {
            displayResult('Błąd w obliczeniach. Proszę sprawdzić wprowadzone dane.');
            return;
        }

        const roundedX = Math.round(x);

        displayResult(`Wytrenowany OVR: <span class="rounded-result">${formatNumber(roundedX)}</span>`);
    });

    function displayResult(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = message;
        resultDiv.style.display = 'block';
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
});
