function Shape() {}
Shape.prototype = {
    //confDraw este un obiect care tine date despre dimensiunea si culoarea formei
    draw: function(confDraw) {
        throw new Error("Not overwritten!");
    },

    //un obiect cu noile pozitii, toate cele 4 pozitii ale formei
    resize: function(dimObj) {
        throw new Error("Not overwritten resize function!");
    },

    //noua mozitie unde a fost mutat elementul - posObj
    move: function(posObj) {
        throw new Error("Not overwritten move function!");
    }
}