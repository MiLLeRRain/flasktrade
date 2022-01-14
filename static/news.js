const newsdiv = document.getElementById('newsdiv')
console.log(newsdiv)

fetch('https://flasktrade-service.s5ei5ipq3r2cq.ap-southeast-2.cs.amazonlightsail.com/newsfeed')
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
    fetch('https://flasktrade-service.s5ei5ipq3r2cq.ap-southeast-2.cs.amazonlightsail.com/crawler')
} , 10000)