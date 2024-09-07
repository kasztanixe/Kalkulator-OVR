document.addEventListener('DOMContentLoaded', function() {
    let selectedEngagement = 0;
    const activeBoosts = new Set();

    const engagementSelect = document.getElementById('engagement-select');
    engagementSelect.value = selectedEngagement;

    engagementSelect.addEventListener('change', function() {
        selectedEngagement = parseFloat(this.value);
    });

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

    document.getElementById('playstyle-button').addEventListener('click', function() {
        toggleBoost('playstyle');
    });

    document.getElementById('ovr-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const currentOVR = parseFloat(document.getElementById('current-ovr').value);
        const trainedOVR = parseFloat(document.getElementById('trained-ovr').value);
        const trainedSkill = parseFloat(document.getElementById('trained-skill').value);

        if (isNaN(currentOVR) || isNaN(trainedOVR) || isNaN(trainedSkill)) {
            displayResult('Proszę wprowadzić poprawne wartości liczbowej.');
            return;
        }

        if (trainedOVR > currentOVR) {
            displayResult('Wytrenowany OVR nie może być większy od obecnego OVR.');
            return;
        }

        if (selectedEngagement === null) {
            displayResult('Proszę wybrać zaangażowanie.');
            return;
        }

        let baseResult = calculateOVR(currentOVR, trainedOVR, selectedEngagement);
        let finalResult = baseResult;

        let boostTotal = 0;
        if (activeBoosts.has('playstyle')) {
            boostTotal += (trainedSkill * 0.33) / 8;
        }
        if (activeBoosts.has('hero-drink')) {
            boostTotal += trainedOVR * 0.33;
        }
        if (activeBoosts.has('hero-boost')) {
            boostTotal += trainedOVR * 0.33;
        }
        if (activeBoosts.has('hero-voice')) {
            boostTotal += trainedOVR * 0.33;
        }
        if (activeBoosts.has('team-boost')) {
            boostTotal += trainedOVR * 0.12;
        }

        finalResult += boostTotal;

        const roundedResult = Math.round(finalResult);
        displayResult(`Wynik OVR: <span class="rounded-result">${formatNumber(roundedResult)}</span>`);
    });

    function calculateOVR(current, trainedOVR, engagement) {
        return current + (trainedOVR * engagement);
    }

    function displayResult(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = message;
        resultDiv.style.display = 'block';
    }

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

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
});