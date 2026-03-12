const createElement = (arr) => {
    const htmlElement = arr.map((el) => `
    <span class= "btn"> ${el}</span>
    `)
    return (htmlElement.join(" "));
}

const manageSpinner = (status) => {
    if (status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }

}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then (json => displayContainer(json.data));
}
loadLessons();



const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    manageSpinner (true);
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then (data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    });
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}` ;
    const res = await fetch (url);
    const detail = await res.json();
    displayWordDetail(detail.data);
   
}

// "data": {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
// }

const displayWordDetail =(word) => {
    const detailBox = document.getElementById("detail-container");
    detailBox.innerHTML =   `
     <div>
                <h2 class="text-2xl font-bold">${word.word} (  <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation} )</h2>
              </div>
              <div>
                <h2  class=" font-bold">Meaning</h2>
                <p>${word.meaning}</p>
              </div>
              <div>
                <h2>${word.sentence}</h2>
                
              </div>
              <div>
                ${createElement(word.synonyms)}
              </div>
              <div class="modal-action">
      <form method="dialog">
        
        <button class="btn">Close</button>
      </form>
    
    `
    document.getElementById("word_modal").showModal()
   
   
     

}

// {
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"
// },

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
   wordContainer.innerHTML = "";
   
   if (words.length == 0){
    wordContainer.innerHTML = `
    <div class="text-center items-center col-span-full space-y-2">
            <img src="assets/alert-error.png" class="mx-auto" alt="">
            <p class="text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-[32px] font-semibold">নেক্সট Lesson এ যান</h1>
         </div>
    `;
   }

    words.forEach (word =>{
        const card = document.createElement("div");
        // conditional rendering --> ${word.meaning ? word.meaning : "No meaning found" } / ${word.pronunciation}</h3>
        card.innerHTML = `
        <div class="bg-white  rounded-lg shadow-sm py-10 px-2 text-center space-y-4 ">
            <h2 class="text-[32px] font-bold">${word.word ? word.word : 'No word found'}</h2>
            <p class="text-[20px] font-bangla"> Meaning /pronunciation </p>
            <h3 class="text-[26px]">${word.meaning ? word.meaning : "No meaning found" } / ${word.pronunciation
                ? word.pronunciation : "No pronunciation"
            }</h3>
            

            <div class="flex justify-between items-center ">
                <button onclick= "loadWordDetail(${word.id})" class="btn  bg-[#1A91FF]/10"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn  bg-[#1A91FF]/10 "><i class="fa-solid fa-volume-low"></i></i></button>
            </div>
         </div>
        `
        wordContainer.append(card);
        manageSpinner(false);
    })

}
const displayContainer = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons){
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class=" lesson-btn btn btn-outline btn-primary">
             <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no} 
        </button>

        `
    levelContainer.append(btnDiv);

    }
}

const searchWords = document.getElementById("searchBtn").addEventListener('click', ()=>{
    const inputWords = document.getElementById("searchInput");
    const input = inputWords.value;
    //console.log (input);
    fetch("https://openapi.programming-hero.com/api/words/all").
    then ((res) => res.json())
    .then ((data) => {
        const allWords = data.data;
        const filterWords = allWords.filter(word => word.word.trim().toLowerCase().includes(input)
    ) 
        displayLevelWord(filterWords);
    })

})

