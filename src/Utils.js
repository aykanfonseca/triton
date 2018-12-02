import Firebase from './firebase.js';

export const quarter_abbreviations = {'Fall': 'FA', 'Winter': 'WI', 'Spring': 'SP', 'Summer Med School': 'SU', 'Summer Session 1': 'S1', 'Summer Session 2': 'S2', 'Summer Session 3': 'S3', 'Summer': 'SA'};
export const quarter_expansions = {'FA': 'Fall', 'WI': 'Winter', 'SP': 'Spring', 'SU': 'Summer Med School', 'S1': 'Summer Session 1', 'S2': 'Summer Session 2', 'S3': 'Summer Session 3', 'SA': 'Summer'}
export const quarter_precedence = {'SU': 0, 'S1': 1, 'S2': 2, 'S3': 3, 'SA': 4, 'FA': 5, 'WI': 6, 'SP': 7};

export const convertBlank = arg => {
    return arg !== 'Blank' ? arg : null;
}

export const handleTime = (startTime, endTime) => {
    if (startTime !== "TBA") {
        return convertTime(startTime) + ' - ' + convertTime(endTime);
    }

    return "TBA";
}

export const handleLocation = (building, room) => {
    const buildingConverted = convertBlank(building);
    const roomConverted = convertBlank(room);

    if (buildingConverted === 'TBA') {
        return "TBA";
    }

    if (buildingConverted !== null) {
        return buildingConverted + " " + roomConverted;
    }

    return "TBA";
}

export const handleSeats = (available, taken) => {
    const availableConverted = convertBlank(available);
    const takenConverted = convertBlank(taken);

    if (takenConverted === 9223372036854776000) {
        return "Unlimited"
    }

    if (takenConverted === null) {
        return null;
    }

    if (takenConverted >= availableConverted) {
        return takenConverted + " / " + availableConverted;
    }

    else {
        return takenConverted + " / " + availableConverted;
    }
}

export const handleDays = days => {
    if (days === '-') {
        return null;
    }

    return days.replace('T', 'Tu').replace('R', 'Th');
}

export const convertTime = time => {
    const timeSplit = time.split(':');
    const hour = Number(timeSplit[0]);

    if (hour > 12) {
        return String(hour - 12) + ':' + timeSplit[1] + 'pm';
    }

    return time + (hour === 12 ? ' pm' : ' am');
}

export const sortByMilitaryTime = (a, b) => {
    const first = a['start time'].split(':').map(x => parseInt(x, 10));
    const second = b['start time'].split(':').map(x => parseInt(x, 10));

    // Compare hours.
    if (first[0] > second[0]) return 1;

    else if (first[0] < second[0]) return -1;

    // Compare minutes.
    else {
        if (first[1] > second[1]) return 1;

        else if (first[1] < second[1]) return -1;

        else return 0;
    }
}

export const sortByMilitaryTimeEnd = (a, b) => {
    const first = a['end time'].split(':').map(x => parseInt(x, 10));
    const second = b['end time'].split(':').map(x => parseInt(x, 10));

    // Compare hours.
    if (first[0] > second[0]) return -1;

    else if (first[0] < second[0]) return 1;

    // Compare minutes.
    else {
        if (first[1] > second[1]) return -1;

        else if (first[1] < second[1]) return 1;

        else return 0;
    }
}

export const generateIntervals = (start, end, isFinal) => {
    // Generates half hour intervals, and hour intervals.
    const startHour = start.split(':').map(x => parseInt(x, 10))[0];
    const endHour = end.split(':').map(x => parseInt(x, 10))[0];

    let interval = [];
    let interval2 = [];
    for (let i = startHour; i <= endHour; i++) {
        interval.push(i + ':00');

        interval2.push(i + ':00');
        interval2.push(i + ':30');
    }

    if (isFinal) {
        interval.push(endHour+1 + ':00');
        interval2.push(endHour+1 + ':00');
        interval2.push(endHour+1 + ':30');
    }

    return [interval, interval2];
}

export const convert = (value) => {
    if (value >= 4.0) {
        return 'A';
    } else if (value >=  3.7) {
        return 'A-';
    } else if (value >= 3.3) {
        return 'B+';
    } else if (value >= 3.0) {
        return 'B';
    } else if (value >= 2.7) {
        return 'B-';
    } else if (value >= 2.3) {
        return 'C+';
    } else if (value >= 2.0) {
        return 'C';
    } else if (value >= 1.7) {
        return 'C-';
    } else if (value >= 1.0) {
        return 'D';
    } else {
        return 'F';
    }
}

export const getNumRows = (loading, resultLength) => {
    if (loading) {
        return 100;
    }

    else if (resultLength === 0) {
        return 1;
    }

    return resultLength;
}

export const getRowHeight = (height, isMobile, width, loading, resultLength) => {
    if (!loading && resultLength === 0) {
        return height;
    }

    else if (isMobile && width <= 200) {
        return 60;
    }

    else if (isMobile && width <= 400) {
        return 80;
    }

    else if (isMobile && width <= 450) {
        return 85;
    }

    return 95;
}

export const quarterSort = (a, b) => {
    const yearA = parseInt(a.slice(-2), 10);
    const yearB = parseInt(b.slice(-2), 10);

    if (yearA > yearB) {
        return -1;
    }

    else if (yearA < yearB) {
        return 1;
    }

    else { // Same year.
        if (quarter_precedence[a.slice(0, 2)] > quarter_precedence[b.slice(0, 2)]) {
            return -1;
        }

        return 1;
    }
}

// Sorts strings first and then by number.
export const naturalSort = (a, b) => {
    let ax = [], bx = [];

    a["code"].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b["code"].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

    while (ax.length && bx.length) {
        const an = ax.shift();
        const bn = bx.shift();
        const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) return nn;
    }
}

export const fetchQuarters = () => {
    const result = [];

    Firebase.database().ref("quarter/").once('value', snapshot => {
        const quarters = Object.keys(snapshot.val());

        // Do two things, filter out the quarters that have 'teacher' in them, and sort in order.
        const filteredQuarters = quarters.filter((quarter) => (quarter.indexOf('teacher') === -1)).sort(quarterSort);

        filteredQuarters.forEach(quarter => 
            result.push({
                'value': quarter_expansions[quarter.slice(0, 2)] + ' 20' + quarter.slice(-2), 
                'abbreviation': quarter
            })
        );
    });

    return result;
}

// https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args)
        };
    };
};