function mixin(receiver, supplier) {
    let keys = Object.keys(supplier);
    for (let i = 0; i < keys.length; i++) {
        receiver[keys[i]] = supplier[keys[i]];
    }
}

function mixout(receiver, supplier) {
    let keys = Object.keys(supplier);
    for (let i = 0; i < keys.length; i++) {
        receiver[keys[i]] = undefined;
    }
}