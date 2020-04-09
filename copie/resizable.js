function Resizable() {

}

//functia ce se ocupa de partea de resize a elementului
//toata clasa Resizable e legata doar de punctele de pe marginile si colturile elementului, dots-urile practic
//in momentul in care aceste puncte se misca, elementul isi face resize
//resize-ul consta in redesenarea la fiecare pas, adica, resetez coordonatele elementului de coltul caruia trag, si redesenez elementul cu noile coordonate
//apelul acestei functii este prins in mouseMove-ul din functia de drag, este apelata cu ajutorul eventTarget-ului, prin functia fire
Resizable.prototype.resizeElement = function(valueObject) {

    let element = valueObject.element;
    let dotManager = valueObject.dotManager;

    let configurationObject = {};

    //o functie care se ocupa de setarea acestui obiect de configurare, pe care il trimit care functia de desenare a obiectului, la finalul logicii din cadrul functiei mari

    function setFields(startX, startY, endX, endY) {
        configurationObject.startX = startX;
        configurationObject.startY = startY;
        configurationObject.endX = endX;
        configurationObject.endY = endY;
    }

    if (this.startToDrag === undefined) {
        element.oldY = element.startY;
        element.oldHeight = element.height;
        this.startToDrag = true;
    }

    this.list = valueObject.list;

    //vad pe ce axa se misca elementul, pe x treaba e simpla, pur si simplu obiectul se redimensioneaza la stanga sau la dreapta
    if (this.direction === 'x') {
        if (this.position === 'r') {
            if (element.startX < this.startX + this.size / 2) {
                setFields(element.startX, element.startY, this.startX + this.size / 2, element.startY + element.height);
            }
        } else if (this.position === 'l') {
            if (this.startX + this.size / 2 < element.startX + element.width) {
                setFields(this.startX + this.size / 2, element.startY, element.startX + element.width, element.startY + element.height);
            }
        }
    } else if (this.direction === 'y') {
        //pe y este ceva mai complicat, deoarece sunt 6 puncte de care pot trage, si bineinteles, trebuie sa mut elementele de sub elementul caruia ii modific marimea
        //border este practic noua limita superioara a elementului, limita superioara adica limita care e mai departe de partea de sus a ecranului(in partea de sus fiind coordonate 0 pe y)
        //o folosesc pentru a sti de unde incep sa mut elementele, si a face mai usor recalcularile noilor limite
        if (this.position === 'd') {
            if (element.startY < this.startY + this.size / 2) {
                setFields(element.startX, element.startY, element.startX + element.width, this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;

            }
        } else if (this.position === 'u') {
            if (this.startY + this.size / 2 < element.startY + element.height) {
                setFields(element.startX, this.startY + this.size / 2, element.startX + element.width, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;

            }
        }

    } else {
        if (this.position === 'ul') {
            if (this.startX + this.size / 2 < element.startX + element.width && this.startY + this.size / 2 < element.startY + element.height) {
                setFields(this.startX + this.size / 2, this.startY + this.size / 2, element.startX + element.width, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;

            }
        } else if (this.position === 'ur') {
            if (this.startY + this.size / 2 < element.startY + element.height && this.startX + this.size / 2 > element.startX) {
                setFields(element.startX, this.startY + this.size / 2, this.startX + this.size / 2, element.startY + element.height);
                this.border = configurationObject.startY;
                this.isDotUp = 1;

            }
        } else if (this.position === 'dl') {
            if (this.startX + this.size / 2 < element.startX + element.width && element.startY < this.startY + this.size / 2) {
                setFields(this.startX + this.size / 2, element.startY, element.startX + element.width, this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;

            }
        } else if (this.position === 'dr') {
            if (this.startX + this.size / 2 > element.startX && this.startY + this.size / 2 > element.startY) {
                setFields(element.startX, element.startY, this.startX + this.size / 2, this.startY + this.size / 2);
                this.border = configurationObject.endY;
                this.isDotUp = 0;

            }
        }

    }

    this.oldX = valueObject.mouseX;
    this.oldY = valueObject.mouseY;
    //elementul nu se redeseneaza decat daca s-a facut o redimensionare
    if (configurationObject.startX !== undefined && configurationObject.startY !== undefined && configurationObject.endX !== undefined && configurationObject.endY !== undefined) {
        this.resizing = true;
        element.draw(configurationObject);
        // this.svgPth.setAttribute('transform', 'scale(1.0,0.5)');
    }
    // dotManager.putOnElement(valueObject.container, valueObject.element);
}