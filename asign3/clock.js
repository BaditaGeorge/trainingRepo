function Clock(){
    let page_body = document.getElementsByTagName('body')[0];
    page_body.style.width = window.innerWidth + 'px';
    page_body.style.height = window.innerHeight + 'px';
    function create_Shape(){
        let shape = document.createElement('div');
        shape.style.width='750px';
        shape.style.height = '750px';
        shape.style.borderRadius = '50%';
        shape.style.border = '2px solid black';
        page_body.appendChild(shape);
        return shape;
    }
    function draw_arrow(){
        
    }
    this.execute = function(){
        clock_shape = create_Shape();
        
    }
}

let clock_object = new Clock();
clock_object.execute();