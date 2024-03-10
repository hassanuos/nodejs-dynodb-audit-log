function compareJSONNew(obj1, obj2) {
    let oldChanges = {};
    let newChanges = {};

    // Check if both arguments are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        if (obj1 !== obj2) {
            oldChanges = obj1;
            newChanges = obj2;
        }
        return { oldChanges, newChanges };
    }

    // Check if both arguments are arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            oldChanges = obj1;
            newChanges = obj2;
            return { oldChanges, newChanges };
        }
        for (let i = 0; i < obj1.length; i++) {
            const { oldChanges: oldArr, newChanges: newArr } = compareJSONNew(obj1[i], obj2[i]);
            if (Object.keys(oldArr).length !== 0) {
                oldChanges[i] = oldArr;
            }
            if (Object.keys(newArr).length !== 0) {
                newChanges[i] = newArr;
            }
        }
        return { oldChanges, newChanges };
    }

    // Check if both arguments have the same keys
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    if (JSON.stringify(obj1Keys) !== JSON.stringify(obj2Keys)) {
        oldChanges = obj1;
        newChanges = obj2;
        return { oldChanges, newChanges };
    }

    // Compare each key-value pair recursively
    for (let key of obj1Keys) {
        if (typeof obj1[key] === 'boolean' && typeof obj2[key] === 'boolean' && obj1[key] !== obj2[key]) {
            oldChanges[key] = obj1[key];
            newChanges[key] = obj2[key];
        } else {
            const { oldChanges: oldVal, newChanges: newVal } = compareJSONNew(obj1[key], obj2[key]);
            if (Object.keys(oldVal).length !== 0) {
                oldChanges[key] = oldVal;
            }
            if (Object.keys(newVal).length !== 0) {
                newChanges[key] = newVal;
            }
        }
    }

    return { oldChanges, newChanges };
}

module.exports = compareJSONNew;