const app = document.getElementById('app')
const myip  = document.getElementById('myip')
const websiteip = document.getElementById('websiteip')
let tabUrl='';
chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    console.log('tabs',tabs[0])
    const currentURL = tabs[0].url;
    tabUrl = getDomain(currentURL);   
if(tabUrl){
    const info = await getIPinfo(tabUrl)
    console.log(info)
    if(info.status==='success'){
        let emoji = getFlagEmoji(info.countryCode)
        websiteip.innerText=`當前網站IP為:
        ${info.query}${emoji}
        `
    }else{
        // websiteip.innerText=`錯誤:
        // ${info.message}
        // `
        console.error(error)
    }
}
    console.log("當前網頁的URL是：" + tabUrl);
});

// 取得目前使用者IP
fetch("https://api.ipify.org")
.then((response)=>{
return response.text()
})
.then(async (response)=>{
    let info = await getIPinfo(response)
    let emoji = getFlagEmoji(info.countryCode)
myip.innerText=`你的IP為:
${response}${emoji||''}`;
console.log(response)
})
.catch((error)=>{
//     myip.innerText=`錯誤:
// ${error}`;
console.error(error);
})

// 篩選出域名
const getDomain = (url)=>{
let match =  url.match(/^(?:https?:\/\/)?([^/]+)/);
if (match) {
    return  match[1];
} else {
    return false
}
}
// 輸出url||ip取得相關資訊
const getIPinfo= async (ip)=>{
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

const getFlagEmoji = countryCode=>String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt()))