let loading = document.getElementsByClassName('loading')
let body = document.getElementsByClassName('elem')
let dirURL = 'http://127.0.0.1:3000/component/songs-container/'
let URL = "http://127.0.0.1:3000/component/songs-container/90s/"
let songURL ='http://127.0.0.1:3000/component/songs-container/90s/'
let playlistName = []
let playlists = []
let playName = document.querySelectorAll(".play")
let play = document.querySelector(".playlists")
let Name = "90s"
let section = document.querySelector(".songsAppend").getElementsByTagName('ul')[0]
let dull = document.querySelector("#dullPlaylist")
let white = document.querySelector("#whitePlaylist")
let headPhone = document.querySelector(".headPhone")
let rightArrow = document.querySelector(".right")
let downArrow = document.querySelector(".down")
let songs = [] 
let temp = true
// <<<<<<<<<<<<<<<<<< fetching playlist >>>>>>>>>>>>>>>>>>>>


const findPlaylist = async () =>{
    
    let dir = await fetch(dirURL)
    let responce = await dir.text()
    let div = document.createElement("div")
    div.innerHTML = responce
    let aTags = div.getElementsByTagName("a")
    for(let i=0 ; i< aTags.length ; i++)
        {
            let elem = aTags[i]
            if(elem.href.endsWith('/')){
                let start = elem.href.indexOf("container/")
                let remove = elem.href.slice(start)
                let remove1 = remove.replace("container/" , "")
                let remove2 = remove1.replace("/" , "")
                playlists.push(remove2)
            }
        }

        for (const list of playlists) {
            if(list == ''){
                continue
            }

            play.innerHTML =  play.innerHTML + `
                    
                    <div data-folder="${list}" class="play flex flex-col justify-center items-center gap-5 p-3">
                        <img class="w-32 h-32" src="./component/song pic/song.jpg" alt="">
                        <div class="text-center">
                            <h2>${list}</h2>
                            <p>drscription lorem15</p>
                        </div>
                    </div>`
                    playlistName.push(`${list}`)                    
        }
        console.log(playlistName)

        Array.from(document.getElementsByClassName("play")).forEach(e=>{
            
            e.addEventListener("click" , async item =>{
                delSongs()
                pray = item.currentTarget.dataset;
                console.log(pray);
                const str = JSON.stringify(pray);
                console.log(str)
                console.log(typeof(str))
                let colan = str.indexOf(":")
                let lastSecond = str.slice(colan)
                console.log(lastSecond)
                let last = lastSecond.replace(/"/g, "" ).replace(":" , "").replace("}" , "")
                console.log(last)
                Name = last
                songURL = URL.replace("90s" , last)
                console.log(songURL);
                findSongs()
            })
           })
           
    }

   

    document.addEventListener("load" , findPlaylist())




// <<<<<<<<<<<<<<<<<< fetching data >>>>>>>>>>>>>>>>>>>>

const findSongs = async () =>{
    let dir = await fetch(songURL)
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
        let start = ganaa.indexOf(`${Name}`)
        let end = ganaa.indexOf(".mp3")
        let extracted = ganaa.slice(start, end)
        let decoded = decodeURIComponent(extracted)
        let last = decoded.replace(`${Name}` , "").replace("/" , "")
        section.innerHTML =  section.innerHTML + `<li><img src="../component/song pic/song.jpg" alt=""> <p>${last}</p></li>`
    }
}


// <<<<<<<<<<<<<<<<<< headphone btn >>>>>>>>>>>>>>>>>>>>


let delSongs = () =>{
    rightArrow.style.display = 'flex'
    downArrow.style.display = 'none'
    section.innerHTML =  ``
    songs = []
    temp = false
}


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
        delSongs()
        temp = true
    }
})



