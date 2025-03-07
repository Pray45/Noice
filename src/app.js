let playlistName = "eng"
let URL = `http://127.0.0.1:3000/component/songs-container/${playlistName}/`
let section = document.querySelector(".songsAppend").getElementsByTagName('ul')[0]
let dull = document.querySelector("#dullPlaylist")
let white = document.querySelector("#whitePlaylist")
let headPhone = document.querySelector(".headPhone")
let rightArrow = document.querySelector(".right")
let downArrow = document.querySelector(".down")
let songs = []
let temp = true


// <<<<<<<<<<<<<<<<<< fetching data >>>>>>>>>>>>>>>>>>>>

const findSongs = async () =>{

    let dir = await fetch(URL)
    let responce = await dir.text()
    let div = document.createElement("div")
    div.innerHTML = responce
    let aTags = div.getElementsByTagName("a")
    for(let i=0 ; i< aTags.length ; i++)
    {
        let elem = aTags[i]
        if(elem.href.endsWith('.mp3')){
            songs.push(elem.href)
        }
    }
    for (const ganaa of songs) {
        let start = ganaa.indexOf(`${playlistName}/`) + 4
        let end = ganaa.indexOf(".mp3")
        let extracted = ganaa.slice(start, end)
        let decoded = decodeURIComponent(extracted)
        section.innerHTML =  section.innerHTML + `<li><img src="../component/song pic/song.jpg" alt=""> <p>${decoded}</p></li>`
    }
}


// <<<<<<<<<<<<<<<<<< headphone btn >>>>>>>>>>>>>>>>>>>>



headPhone.addEventListener("mouseover" , () =>{
    dull.style.display = 'none'
    white.style.display = 'flex'
})

headPhone.addEventListener("mouseout" , () =>{
    dull.style.display = 'flex'
    white.style.display = 'none'
})

headPhone.addEventListener("click" , () =>{
    if(temp == true){
        findSongs()
        downArrow.style.display = 'flex'
        rightArrow.style.display = 'none'
        temp = false
    }
    else{
        downArrow.style.display = 'none'
        rightArrow.style.display = 'flex'
        section.innerHTML =  ``
        songs = []
        temp = true
    }
})
