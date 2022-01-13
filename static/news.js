const newsdiv = document.getElementById('newsdiv')
console.log(newsdiv)

fetch('http://localhost:5000/newsfeed')
    .then((r) => r.json())
    .then((response) => {
        console.log(response)
        time = (new Date(response['date'])).toLocaleString()
        title = response['title']
        url = response['lastNews_href']
        newsdiv.innerHTML = time + "<br/>" + "<a target=\"_blank\" href=" + url + ">" + title + "</a>"
    })


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function fetchnews() {        
//     console.log('sleep')
//     await sleep(10000);
//     console.log('run');
//     // fetch('http://localhost:5000/crawler')
// }

// fetchnews();

setInterval( () => {
    // console.log(fetch('http://localhost:5000/crawler'))
    fetch('http://localhost:5000/crawler')
} , 10000)