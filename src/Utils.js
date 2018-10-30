import Firebase from './firebase.js';

export const quarter_abbreviations = {'Fall': 'FA', 'Winter': 'WI', 'Spring': 'SP', 'Summer Med School': 'SU', 'Summer Session 1': 'S1', 'Summer Session 2': 'S2', 'Summer Session 3': 'S3', 'Summer': 'SA'};
export const quarter_expansions = {'FA': 'Fall', 'WI': 'Winter', 'SP': 'Spring', 'SU': 'Summer Med School', 'S1': 'Summer Session 1', 'S2': 'Summer Session 2', 'S3': 'Summer Session 3', 'SA': 'Summer'}
export const quarter_precedence = {'SU': 0, 'S1': 1, 'S2': 2, 'S3': 3, 'SA': 4, 'FA': 5, 'WI': 6, 'SP': 7};

// Sort quarters.
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