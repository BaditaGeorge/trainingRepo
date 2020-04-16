function startGame(){
    var msg = document.getElementById('message');
    msg!.innerText = 'Mesaj Nou!';
}
document.getElementById('message')!.addEventListener('click',startGame);