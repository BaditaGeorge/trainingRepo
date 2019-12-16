function ListManager(){
    let myList = [];
    let htmlList;
    function addOrRemove(e){
        if(e.target.contentEditable === 'false'){
            if(e.target.innerText === '+'){
                let li = document.createElement('li');
                li.style.position = "relative";
                li.style.listStyleType = "none";
                let model = createBasicModel();
                li.style.marginBottom = '10px';
                li.appendChild(model);
                htmlList.insertBefore(li,e.currentTarget.parentNode.nextSibling);
            }else if(e.target.innerText === '-'){
                htmlList.removeChild(e.currentTarget.parentNode);
            }
        }
    }
    function createBasicModel(){
        let myDiv = document.createElement('div');
        let upperDiv = document.createElement('div');
        let lowerDiv = document.createElement('div');
        myDiv.style.width = '150px';
        myDiv.style.height = '50px';
        myDiv.style.backgroundColor = 'gray';
        upperDiv.style.backgroundColor = 'blue';
        lowerDiv.style.backgroundColor = 'black';
        upperDiv.style.position = 'absolute';
        lowerDiv.style.position = 'absolute';
        upperDiv.style.width = '100px';
        lowerDiv.style.width = '100px';
        upperDiv.style.height = '25px';
        lowerDiv.style.height = '25px';
        upperDiv.style.top = '0px';
        upperDiv.style.left = '0px';
        lowerDiv.style.top = '25px';
        lowerDiv.style.left = '0px';
        let plus = document.createElement('div');
        let minus = document.createElement('div');
        plus.style.position = 'absolute';
        minus.style.position = 'absolute';
        plus.style.fontSize = '20px';
        minus.style.fontSize = '20px';
        plus.style.height = '25px';
        minus.style.height = '25px';
        plus.style.width = '25px';
        minus.style.width = '25px';
        minus.innerText += '-';
        plus.innerText += '+';
        plus.style.top = '0px';
        plus.style.left = '100px';
        minus.style.top = '25px';
        minus.style.left = '100px';
        plus.style.border = '0.7px solid black';
        minus.style.border = '0.7px solid black';
        upperDiv.innerText += 'name';
        lowerDiv.innerText += 'desc';
        lowerDiv.style.color = 'white';
        plus.contentEditable = false;
        minus.contentEditable = false;
        upperDiv.contentEditable = true;
        lowerDiv.contentEditable = true;
        plus.style.marginLeft = '10px';
        minus.style.marginLeft = '10px';
        plus.style.backgroundColor = 'black';
        plus.style.color = 'white';
        minus.style.backgroundColor = 'blue';
        myDiv.addEventListener('click',function(e){
            addOrRemove(e);
        })
        myDiv.appendChild(upperDiv);
        myDiv.appendChild(lowerDiv);
        myDiv.appendChild(plus);
        myDiv.appendChild(minus);
        return myDiv;
    }
    this.putList = function(){
        htmlList = document.createElement('ul');
        let li = document.createElement('li');
        li.style.position = "relative";
        li.style.listStyleType = "none";
        document.getElementsByTagName('body')[0].appendChild(htmlList);
        let model = createBasicModel();
        li.style.marginBottom = '10px';
        htmlList.style.marginLeft = '-20px';
        li.appendChild(model);
        htmlList.appendChild(li);
    }
}
let a = new ListManager();
a.putList();
