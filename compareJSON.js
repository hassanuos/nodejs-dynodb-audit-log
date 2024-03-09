function compareJSON(obj1, obj2) {
    var diffs = {};

    // Recursive function to compare nested objects
    function compareObjects(obj1, obj2, path) {
        for (var key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                var newPath = (path ? path + '.' : '') + key;
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    compareObjects(obj1[key], obj2[key], newPath);
                } else if (obj1[key] !== obj2[key]) {
                    diffs[newPath] = [obj1[key], obj2[key]];
                }
            }
        }
    }

    compareObjects(obj1, obj2, '');

    return diffs;
}

module.exports = compareJSON;