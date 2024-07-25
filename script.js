document.addEventListener('DOMContentLoaded', function() {
    let selectedEngagement = null; // Domyślne zaangażowanie (brak zaangażowania)

    // Funkcja do obsługi kliknięcia na obrazki zaangażowania
    document.querySelectorAll('.engagement-img').forEach(img => {
        img.addEventListener('click', function() {
            // Usuń klasę 'active' ze wszystkich obrazków
            document.querySelectorAll('.engagement-img').forEach(image => image.classList.remove('active'));
            // Dodaj klasę 'active' do klikniętego obrazka
            this.classList.add('active');
            // Przechowaj wybraną wartość zaangażowania
            selectedEngagement = parseFloat(this.getAttribute('data-value'));
        });
    });

    document.getElementById('ovr-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let currentOVR = parseFloat(document.getElementById('current-ovr').value);
        let trainedOVR = parseFloat(document.getElementById('trained-ovr').value);
        let trainedSkill = parseFloat(document.getElementById('trained-skill').value);

        // Sprawdź, czy wartości są liczbami
        if (isNaN(currentOVR) || isNaN(trainedOVR) || isNaN(trainedSkill)) {
            document.getElementById('result').innerHTML = 'Proszę wprowadzić poprawne wartości liczbowej.';
            document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
            return;
        }

        // Sprawdź, czy wytrenowany OVR nie jest większy niż obecny OVR
        if (trainedOVR > currentOVR) {
            document.getElementById('result').innerHTML = 'Wytrenowany OVR nie może być większy od obecnego OVR.';
            document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
            return;
        }

        // Sprawdź, czy wybrane zaangażowanie jest prawidłowe
        if (selectedEngagement === null) {
            document.getElementById('result').innerHTML = 'Proszę wybrać zaangażowanie.';
            document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
            return;
        }

        let result = calculateOVR(currentOVR, trainedOVR, trainedSkill, selectedEngagement);
        let roundedResult = Math.round(result);

        // Aktualizuj zawartość i styl kontenera wyniku
        document.getElementById('result').innerHTML = `Wynik OVR: <span class="rounded-result">${roundedResult}</span>`;
        document.getElementById('result').style.display = 'block'; // Wyświetl kontener z wynikiem
    });

    function calculateOVR(current, trainedOVR, trainedSkill, engagement) {
        return current + (trainedOVR * engagement) + ((trainedSkill * 0.33) / 8);
    }
});
