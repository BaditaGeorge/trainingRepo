function ShieldFactory() {

    function createShield(type) {
        if(type === 'upRight'){
            return {
                className:'shieldFullBrickUpRight',
                hitCount:0,
                hitLimit:4,
                display:true
            };
        }else if(type === 'upLeft'){
            return {
                className:'shieldFullBrickUpLeft',
                hitCount:0,
                hitLimit:4,
                display:true
            }
        }else if(type === 'down'){
            return {
                className:'shieldFullBrickBottomMiddle',
                hitCount:0,
                hitLimit:4,
                display:true
            };
        }else if(type === 'n'){
            return {
                className:'shieldFullBrick',
                hitCount:0,
                hitLimit:4,
                display:true
            }
        }else if(type === 'shield'){
            return {
                className:'shield',
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