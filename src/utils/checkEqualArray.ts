const checkEqualArray = (array1: string[], array2: string[]) => {
    if (array1.length != array2.length) {
        return false
    }

    for (let i = 0; i < array2.length; i++) {
        if (!array1.includes(array2[i])) {
            return false;
        }
    }

    return true;
}

export default checkEqualArray;