function ListManager(){
    let myList = [];
    let htmlList;
    let frag;

    function addOrRemove(e){
        if(e.target.contentEditable === 'false'){
            if(e.target.innerText === '+'){
                let li = document.createElement('li');
                li.style.position = "relative";
                li.style.listStyleType = "none";
                let model = createBasicModel();
                li.style.marginBottom = '10px';
                li.appendChild(model);
                frag.appendChild(li);
                htmlList.insertBefore(li,e.currentTarget.parentNode.nextSibling);
                htmlList.appendChild(frag);
            }else if(e.target.innerText === '-'){
                if(e.currentTarget.parentNode.parentNode.childNodes.length > 1){
                    htmlList.removeChild(e.currentTarget.parentNode);
                    htmlList.appendChild(frag);
                }
            }
        }
    }

    function createBasicModel(){
        let myDiv = document.createElement('div');
        let upperDiv = document.createElement('div');
        let lowerDiv = document.createElement('div');
        myDiv.classList.add('forMyDiv');
        upperDiv.classList.add('forUpperDiv');
        lowerDiv.classList.add('forUpperDiv');
        lowerDiv.style.backgroundColor = 'black';
        lowerDiv.style.top = '25px';
        let plus = document.createElement('div');
        let minus = document.createElement('div');
        plus.classList.add('forOperator');
        minus.classList.add('forOperator');
        minus.style.top = '25px';
        upperDiv.innerText += 'name';
        lowerDiv.innerText += 'desc';
        lowerDiv.style.color = 'white';
        plus.contentEditable = false;
        minus.contentEditable = false;
        upperDiv.contentEditable = true;
        lowerDiv.contentEditable = true;
        plus.style.color = 'white';
        minus.style.backgroundColor = 'blue';
        plus.innerText = '+';
        minus.innerText = '-';
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
        frag = document.createDocumentFragment();
        let li = document.createElement('li');
        li.style.position = "relative";
        li.style.listStyleType = "none";
        document.getElementsByTagName('body')[0].appendChild(htmlList);
        let model = createBasicModel();
        li.style.marginBottom = '10px';
        htmlList.style.marginLeft = '-20px';
        li.appendChild(model);
        frag.appendChild(li);
        htmlList.appendChild(frag);
    }
}
let a = new ListManager();
a.putList();
