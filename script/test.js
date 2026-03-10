const createElement = (arr) => {
    const htmlElement = arr.map((el) => `
    <span class= "btn"> ${el}</span>
    `)
    console.log (htmlElement.join(" "));


}

const syns = ['hi', 'hello' , 'yoo'];
createElement(syns);