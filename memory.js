let cards1_2=["black", "white", "blue", "yellow", "green", "red"];
let cardsList=cards1_2.concat([...cards1_2]);
let cardsLenght=cardsList.length;
let cards=[];
//draw cards
for(let i=cardsLenght;i>0; i--)
{
    var rand_id=Math.floor(Math.random() *i)
    cards.push(cardsList[rand_id])
    cardsList.splice(rand_id,1);
}

var score =0;

drawBoard(cardsLenght);

function drawBoard(x)
{
    let board=document.querySelector('.board');
    let div="";
 for(let i =0;i<x; i++)
 {
     div+=`<div class="card" id="card${i}" onclick="revealCard(${i});"></div>`;
 }
div+=`<div class="score">Score: ${score}</div>`;
div+=`<div class="turn">Turns: 0</div>`;
board.innerHTML=div;
}





let lock= false;
let firstCard=false;
let firstCard_nr;
var turn=0;
let pairsLeft=(cardsLenght /2);


function revealCard(i)
{
    let card=document.querySelector(`#card${i}`);
    let computerStyle=window.getComputedStyle(card);
    let opacityValue=computerStyle.getPropertyValue("opacity")


if(opacityValue!=0 && lock==false && i!=firstCard_nr)
    {

    lock = true;
    card.style.background=cards[i]
    card.classList.add("cardV");
    
    //First card
    if(firstCard === false)
        {
            firstCard=true;
            firstCard_nr =i;
            lock=false;
        } 
        //second card
        else 
        {   
            //pair
            if(cards[firstCard_nr] == cards[i])
            {
                setTimeout( () => {hideCards(i, firstCard_nr)}, 800)
                score++;
                let scoreDiv=document.querySelector('.score');
                scoreDiv.innerText=`Score: ${score}`;
            }
            //miss
            else
            {
                setTimeout( () => {restoreCards(i, firstCard_nr)}, 800)
            }
            firstCard=false;
            turn++;
            let turnDiv=document.querySelector('.turn');
            turnDiv.innerText=`Turn: ${turn}`;
        }
        


        

    }
}

function hideCards(nr1, nr2)
{
    let board=document.querySelector('.board');
let one= document.querySelector(`#card${nr1}`);
let two= document.querySelector(`#card${nr2}`);
one.style.opacity=0;
two.style.opacity=0;
pairsLeft--;
if(pairsLeft == 0)
{
    board.innerHTML=`<h1>You win!</br>Congrats</h1></br>
    <div class="end">Succeeded in ${turn} turns</div>`;
}
lock=false;
}

function restoreCards(nr1, nr2)
{
let one=document.querySelector(`#card${nr1}`);
let two=document.querySelector(`#card${nr2}`);



one.classList.remove("cardV");
one.style.background=0;
one.classList.add("card");
one.style.backgroundImage="url('./card0.png')";
one.style.backgroundSize="10rem 12rem";
one.style.backgroundRepeat="no-repeat";
one.style.backgroundPosition="center center";


two.classList.remove("cardV");
two.style.background=0;
two.classList.add("card");
two.style.backgroundImage="url('./card0.png')";
two.style.backgroundSize="10rem 12rem";
two.style.backgroundRepeat="no-repeat";
two.style.backgroundPosition="center center";


lock=false;
}