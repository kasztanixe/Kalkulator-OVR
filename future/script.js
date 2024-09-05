document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('future-ovr-form');
    const resultDiv = document.getElementById('result');
    let activeBoosts = new Set();

    // Obsługa przycisków boostów
    document.getElementById('hero-drink-button').addEventListener('click', function() {
        toggleBoost('hero-drink');
    });

    document.getElementById('hero-boost-button').addEventListener('click', function() {
        toggleBoost('hero-boost');
    });

    document.getElementById('hero-voice-button').addEventListener('click', function() {
        toggleBoost('hero-voice');
    });

    document.getElementById('team-boost-button').addEventListener('click', function() {
        toggleBoost('team-boost');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemsOVR = parseFloat(document.getElementById('items-ovr').value);
        const otherBonusesInput = document.getElementById('other-bonuses').value;
        const cardSlotsOVR = parseFloat(document.getElementById('card-slots-ovr').value);
        const dailyBonus = parseFloat(document.getElementById('daily-bonus').value);
        const desiredOVR = parseFloat(document.getElementById('desired-ovr').value);

        // Nowy bonus zaangażowania (engagement bonus)
        const engagementBonus = parseFloat(document.getElementById('engagement-select').value);

        if (isNaN(itemsOVR) || isNaN(cardSlotsOVR) || isNaN(dailyBonus) || isNaN(desiredOVR) || isNaN(engagementBonus)) {
            displayResult('Proszę wprowadzić poprawne wartości liczbowe.');
            return;
        }

        // Parsowanie i suma innych bonusów
        const otherBonusesArray = otherBonusesInput.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
        const sumOtherBonuses = otherBonusesArray.reduce((acc, curr) => acc + curr, 0);

        // Obliczenie istniejącego OVR
        const totalExistingOVR = itemsOVR + sumOtherBonuses + cardSlotsOVR;

        // Sprawdzenie, czy chciany OVR jest większy od istniejącego
        if (desiredOVR <= totalExistingOVR) {
            displayResult('Chciany OVR musi być większy od sumy OVR Przedmiotów, OVR Innych Bonusów i OVR Slotów Kart.');
            return;
        }

        // Różnica między chcianym OVR a istniejącym OVR
        const difference = desiredOVR - totalExistingOVR;

        // Inicjalizacja wartości boostów
        let boostMultiplier = 1 + dailyBonus + engagementBonus;

        if (activeBoosts.has('hero-drink')) {
            boostMultiplier += 0.33;
        }
        if (activeBoosts.has('hero-boost')) {
            boostMultiplier += 0.33;
        }
        if (activeBoosts.has('hero-voice')) {
            boostMultiplier += 0.33;
        }
        if (activeBoosts.has('team-boost')) {
            boostMultiplier += 0.12;
        }

        // Obliczanie wytrenowanego OVR
        const x = difference / boostMultiplier;

        if (isNaN(x)) {
            displayResult('Błąd w obliczeniach. Proszę sprawdzić wprowadzone dane.');
            return;
        }

        const roundedX = Math.round(x);

        displayResult(`Wytrenowany OVR: <span class="rounded-result">${formatNumber(roundedX)}</span>`);
    });

    // Funkcja do przełączania stanu boostów
    function toggleBoost(boostType) {
        const button = document.getElementById(`${boostType}-button`);
        if (activeBoosts.has(boostType)) {
            activeBoosts.delete(boostType);
            button.classList.remove('active');
            button.classList.add('inactive');
        } else {
            activeBoosts.add(boostType);
            button.classList.add('active');
            button.classList.remove('inactive');
        }
    }

    // Funkcja wyświetlania wyniku
    function displayResult(message) {
        resultDiv.innerHTML = message;
        resultDiv.style.display = 'block';
    }

    // Funkcja formatowania wyniku
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
});
