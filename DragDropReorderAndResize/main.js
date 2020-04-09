let eventTarget = new EventTarget();
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'red' };
let svgBox = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgBox.setAttribute('width', 1600);
svgBox.setAttribute('height', 1600);

document.body.appendChild(svgBox);
let dotConfig = { number: 8, data: [{ position: 'l', color: 'black' }, { position: 'r', color: 'black' }, { position: 'u', color: 'black' }, { position: 'd', color: 'black' }, { position: 'ul', color: 'black' }, { position: 'ur', color: 'black' }, { position: 'dl', color: 'black' }, { position: 'dr', color: 'black' }] };
let lst = new ListView(svgBox, dotConfig);
lst.addElement(a);
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'blue' };

lst.addElement(a);
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'green' };
lst.addElement(a);
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'black' };
lst.addElement(a);
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'yellow' };
lst.addElement(a);
a = { startX: 10, startY: 0, endX: 110, endY: 100, color: 'purple' };
lst.addElement(a);
lst.addListeners();