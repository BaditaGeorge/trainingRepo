function AlienFactory(){

    function createAlien(type){
        let basicObj = {
            state:1,
            display:true
        };
        if(type === 'small'){
            basicObj.className = 'smallAlien';
            basicObj.width = 24;
            basicObj.height = 24;
            return basicObj;
        }else if(type === 'medium'){
            basicObj.className = 'mediumAlien';
            basicObj.width = 33;
            basicObj.height = 24;
            return basicObj;
        }else if(type === 'big'){
            basicObj.className = 'bigAlien';
            basicObj.width = 36;
            basicObj.height = 24;
            return basicObj;
        }
    }

    return {
        createAlien:createAlien
    };
}