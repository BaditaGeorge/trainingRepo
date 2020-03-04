function ShieldFactory() {

    function createShield(type) {
        let basicObj = {
            hitCount:0,
            hitLimit:4,
            width:18,
            height:12,
            display:true
        }
        if(type === 'upRight'){
            basicObj.className = 'shieldFullBrickUpRight';
            return basicObj;
        }else if(type === 'upLeft'){
            basicObj.className = 'shieldFullBrickUpLeft';
            return basicObj;
        }else if(type === 'down'){
            basicObj.className = 'shieldFullBrickBottomMiddle';
            return basicObj;
        }else if(type === 'n'){
            basicObj.className = 'shieldFullBrick';
            return basicObj;
        }else if(type === 'shield'){
            return {
                className:'shield',
                width:54,
                height:48,
                blocks:[]
            }
        }else if(type === 'none'){
            return {
                className:'none',
                display:false
            };
        }
    }

    return {
        createShield: createShield
    };
}