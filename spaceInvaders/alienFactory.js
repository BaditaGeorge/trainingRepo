function AlienFactory(){

    function createAlien(type){
        if(type === 'small'){
            return {
                className:'smallAlien',
                state:1,
                display:true
            };
        }else if(type === 'medium'){
            return {
                className:'mediumAlien',
                state:1,
                display:true
            }
        }else if(type === 'big'){
            return {
                className:'bigAlien',
                state:1,
                display:true
            }
        }
    }

    return {
        createAlien:createAlien
    };
}