function BulletFactory(){

    function createBullet(type){
        if(type === 'alien'){
            return {
                width:9,
                height:27,
                className:'alienBullet',
                direction:1,
                yP:0,
                state:1,
                numberOfStates:2,
                fired:true,
                speed:3
            };
        }else if(type === 'player'){
            return {
                width:1,
                height:10,
                className:'bullet',
                direction:-1,
                yP:0,
                numberOfStates:1,
                fired:false,
                speed:8
            }
        }
    }

    return {
        createBullet:createBullet
    };

}