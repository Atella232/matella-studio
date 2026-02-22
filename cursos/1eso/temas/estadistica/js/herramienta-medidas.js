document.addEventListener('DOMContentLoaded', () => {
    const toolContainer = document.getElementById('calculadora-medidas-tool');
    if (!toolContainer) return;

    const dataInput = document.getElementById('calc-data-input');
    const calcButtons = document.querySelectorAll('.calc-buttons button');
    const resultMean = document.getElementById('result-mean');
    const resultMedian = document.getElementById('result-median');
    const resultMode = document.getElementById('result-mode');
    const resultRange = document.getElementById('result-range');

    function parseData() {
        const rawData = dataInput.value.trim();
        if (rawData === '') return [];
        // Usar una expresión regular para separar por comas, espacios o saltos de línea
        const dataArray = rawData.split(/[\s,]+/);
        return dataArray.map(d => parseFloat(d)).filter(d => !isNaN(d));
    }

    function calculateMean(data) {
        if (data.length === 0) return '--';
        const sum = data.reduce((acc, val) => acc + val, 0);
        return (sum / data.length).toFixed(2);
    }

    function calculateMedian(data) {
        if (data.length === 0) return '--';
        const sortedData = [...data].sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        if (sortedData.length % 2 === 0) {
            return ((sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(2);
        } else {
            return sortedData[mid].toFixed(2);
        }
    }

    function calculateMode(data) {
        if (data.length === 0) return '--';
        const frequencyMap = {};
        data.forEach(num => {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        });

        let maxFreq = 0;
        let modes = [];
        for (const num in frequencyMap) {
            if (frequencyMap[num] > maxFreq) {
                modes = [num];
                maxFreq = frequencyMap[num];
            } else if (frequencyMap[num] === maxFreq) {
                modes.push(num);
            }
        }

        if (modes.length === Object.keys(frequencyMap).length) {
            return 'No hay moda'; // Si todos los números aparecen la misma cantidad de veces
        }

        return modes.join(', ');
    }

    function calculateRange(data) {
        if (data.length === 0) return '--';
        const min = Math.min(...data);
        const max = Math.max(...data);
        return (max - min).toFixed(2);
    }

    calcButtons.forEach(button => {
        button.addEventListener('click', () => {
            const data = parseData();
            const calcType = button.dataset.calc;

            if (data.length === 0) {
                resultMean.textContent = '--';
                resultMedian.textContent = '--';
                resultMode.textContent = '--';
                resultRange.textContent = '--';
                return;
            }

            if (calcType === 'mean' || calcType === 'all') {
                resultMean.textContent = calculateMean(data);
            }
            if (calcType === 'median' || calcType === 'all') {
                resultMedian.textContent = calculateMedian(data);
            }
            if (calcType === 'mode' || calcType === 'all') {
                resultMode.textContent = calculateMode(data);
            }
            if (calcType === 'range' || calcType === 'all') {
                resultRange.textContent = calculateRange(data);
            }
        });
    });
});
