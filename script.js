const start = document.querySelector(`.js-start`);
const container = document.querySelector(`.js-container`);
const delay = 700;


start.addEventListener(`submit`, startGame);

function startGame(evt) {
    evt.preventDefault();
    const arrSmile = [];
    const arrDol = [];
    const childrenLength = container.children.length;
    const {
        level: {
            value: level
        }, start
    } = evt.currentTarget.elements;
    // console.log(level.value);
    start.disabled = true;

    for (let i = 0; i < childrenLength; i += 1) {    
        const item = container.children[i];
        item.textContent = ``;
        createPromise(Number(level), '🤩', '🤑', delay * i)
            .then(resp => {
                markfield(item, resp);
                arrSmile.push(resp);
            })
            .catch(resp => {
                markfield(item, resp)
                arrDol.push(resp);
            })
            .finally(() => {
                if (i === childrenLength - 1) {
                    start.disabled = false;
                }
                const result = arrSmile.length === childrenLength || arrDol.length === childrenLength;
                if (result) {
                    console.log(`You are the WINNER!`)
                }
            })
    };
}
    
function markfield(item, smile) {
    item.textContent = smile;
    }

function createPromise(level, win, lose) {
    const random = Math.random();
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (random > level) {
            res(win)
        } else {
            rej(lose)
        }
       }, delay)
        
    })
    return promise;
}