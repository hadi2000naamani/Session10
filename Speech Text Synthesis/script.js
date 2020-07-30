const main = document.querySelector('main');
const VoicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readbtn = document.getElementById('read');
const togglebtn = document.getElementById('toggle');
const closebtn = document.getElementById('close');

const data =[
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
    
    },  
    {
  image: './img/eat.jpg',
  text: "I'm Hungry"
  
  },  
  {
image: './img/tired.jpg',
text: "I'm Tired"

},  
{
image: './img/hurt.jpg',
text: "I'm Hurt"

},  
{
image: './img/happy.jpg',
text: "I'm Happy"

},  
{
image: './img/angry.jpg',
text: "I'm Angry"

},  
{
image: './img/sad.jpg',
text: "I'm Sad"

},  
{
image: './img/scared.jpg',
text: "I'm Scared"
},  
{
image: './img/outside.jpg',
text: 'I want to go outside'

},  
{
image: './img/home.jpg',
text: 'I want to go home'

},  
{
image: './img/school.jpg',
text: 'I want to go to school'

},  
{
image: './img/grandma.jpg',
text: 'I want to go to grandmas'

}
];

data.forEach(createBox);

function createBox(item){
const box= document.createElement('div');
const {image , text}= item;

box.classList.add('box');

box.innerHTML = `
<img src="${image}" alt="${text}" />
<p class = "info ">${text}</p>
`;
box.addEventListener('click', () => {
  setTextMessage(text);
  speakText();
  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'), 800);
})
// todo speak event
main.appendChild(box);

}

const message = new SpeechSynthesisUtterance();

let voices =[];

function getvoices(){
  voices = speechSynthesis.getVoices();
  voices.forEach(voices => {

    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    VoicesSelect.appendChild(option);
});
}
function setTextMessage(text){
  message.text = text;
}
function speakText(){
  speechSynthesis.speak(message);
}
function setvoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value);
}
speechSynthesis.addEventListener('voiceschanged', getvoices);

togglebtn.addEventListener('click',() => 
document.getElementById('text-box').classList.toggle('show')
);
closebtn.addEventListener('click', () => 
document.getElementById('text-box').classList.remove('show')
);
VoicesSelect.addEventListener('change', setvoice);

readbtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});
getvoices();