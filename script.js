document.getElementById('ovr-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let currentOVR = parseFloat(document.getElementById('current-ovr').value);
    let trainedOVR = parseFloat(document.getElementById('trained-ovr').value);
    let trainedSkill = parseFloat(document.getElementById('trained-skill').value);

    // Sprawdź, czy wartości są liczbami
    if (isNaN(currentOVR) || isNaN(trainedOVR) || isNaN(trainedSkill)) {
        document.getElementById('result').innerHTML = 'Proszę wprowadzić poprawne wartości.';
        document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
        return;
    }

    // Sprawdź, czy wytrenowany OVR nie jest większy niż obecny OVR
    if (trainedOVR > currentOVR) {
        document.getElementById('result').innerHTML = 'Wytrenowany OVR nie może być większy od obecnego OVR.';
        document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
        return;
    }

    let result = calculateOVR(currentOVR, trainedOVR, trainedSkill);
    let roundedResult = Math.round(result);

    // Aktualizuj zawartość i styl kontenera wyniku
    document.getElementById('result').innerHTML = `Wynik OVR: <span class="rounded-result">${roundedResult}</span>`;
    document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
});

function calculateOVR(current, trainedOVR, trainedSkill) {
    return current + (trainedOVR * 0.33) + ((trainedSkill * 0.33) / 8);
}
