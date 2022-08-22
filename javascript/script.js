'use strict';

const wrapper = document.querySelector(".wrapper"),
musicImg = document.querySelector(".img-area img"),
musicName = document.querySelector(".song-details .name"),
musicArtist = document.querySelector(".song-details .artist"),
mainAudio = document.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = document.querySelector("#prev"),
nextBtn = document.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
repeatIcon = wrapper.querySelector("#repeat-icon"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = wrapper.querySelector("#close"),
musicLists = wrapper.querySelector(".music-list"), 
progressBar = wrapper.querySelector(".progress-bar");


let indexNumber = Math.floor((Math.random() * allMusicList.length) + 1);


window.addEventListener("load", function () {
	loadMusic(indexNumber);
});





const loadMusic  = (musicNumber) => {
	musicName.innerHTML = allMusicList[musicNumber - 1].name;
	musicArtist.innerHTML = allMusicList[musicNumber - 1].artist;
	musicImg.src = allMusicList[musicNumber - 1].image;
	mainAudio.src = `songs/${allMusicList[musicNumber - 1].src}`;

}

const playMusic = () => {
	wrapper.classList.add("paused");
	playPauseBtn.querySelector("i").innerHTML = "pause";
	mainAudio.play();
}

const pauseMusic = () => {
	wrapper.classList.remove("paused");
	playPauseBtn.querySelector("i").innerHTML = "play_arrow";
	mainAudio.pause();
}

playPauseBtn.addEventListener("click",function() {
	const isMusicPaused = wrapper.classList.contains("paused");
	isMusicPaused ? pauseMusic() : playMusic() ;
})


const nextSong = () => {
	indexNumber++;
	indexNumber > allMusicList.length ? indexNumber = 1 : indexNumber = indexNumber;
	loadMusic(indexNumber);
	playMusic();
}

const nextMusic = () => {
	indexNumber++;
	loadMusic(indexNumber);
	playMusic();
}

const prevSong = () => {
	indexNumber--;
	indexNumber < 1 ? indexNumber = allMusic.length : indexNumber = indexNumber ;
	loadMusic(indexNumber);
	playMusic();
}
	
nextBtn.addEventListener("click",() => {
	nextSong();
})

prevBtn.addEventListener("click",() => {
	prevSong();
})



mainAudio.addEventListener("timeupdate", (e) => {
	const currentTime = e.target.currentTime;
	const duration = e.target.duration;
	
	let progressWidth = (currentTime / duration) * 100;
	progressBar.style.width = `${progressWidth}%`

	let musicCurrentTime = wrapper.querySelector(".current-time"),
  	musicDuartion = wrapper.querySelector(".max-duration");
  	
  	mainAudio.addEventListener("loadeddata", ()=>{
    	let mainAdDuration = mainAudio.duration;
    	let totalMin = Math.floor(mainAdDuration / 60);
    	let totalSec = Math.floor(mainAdDuration % 60);
    	if(totalSec < 10) { 
      		totalSec = `0${totalSec}`;
   	 	}
    	musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });


 	let currentMin = Math.floor(currentTime / 60);
  	let currentSec = Math.floor(currentTime % 60);
  	if(currentSec < 10){ 
    	currentSec = `0${currentSec}`;
  	}
  	
  	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

progressArea.addEventListener('click',(e) => {
	const progressWidthVal = progressArea.clientWidth;
	let clickOffSetX = e.offsetX;
	let songDuration = mainAudio.duration;

	mainAudio.currentTime = ( clickOffSetX / progressWidthVal ) * songDuration; 
	playMusic()
})

repeatIcon.addEventListener('click',() => {
	let repeatIconValue = repeatIcon.innerHTML;
	switch (repeatIconValue) {
		case "repeat":
			repeatIcon.innerHTML = "repeat_one";
		break;
		case "repeat_one":
			repeatIcon.innerHTML = "shuffle";
		break;
		case "shuffle":
			repeatIcon.innerHTML = "repeat";
		break;
	}
})

mainAudio.addEventListener('ended',() => {
	let repeatIconValue = repeatIcon.innerHTML;
	switch (repeatIconValue) {
		case "repeat":
			nextMusic();
		break;
		case "repeat_one":
			mainAudio.CurrentTime = 0;
			loadMusic(indexNumber);
			playMusic();
		break;
		case "shuffle":
			let randomIndex = Math.floor((Math.random() * allMusicList.length) + 1);
			do {
				randomIndex = Math.floor((Math.random() * allMusicList.length) + 1);
			} while ( indexNumber == randomIndex ){
				indexNumber = randomIndex;
				loadMusic(indexNumber);
				playMusic();

			}
		break;
	}

}) ;

window.addEventListener('keydown',(e) => {
	if ( e.key == " " ) {
		if ( mainAudio.paused ) {
			playMusic();
		} else {
			pauseMusic();
		}
	}
})

showMoreBtn.addEventListener('click',() => {
	musicLists.classList.toggle('show');
})

hideMusicBtn.addEventListener('click',() => {
	musicLists.classList.toggle('show');
})




for (let i = 0; i < allMusicList.length; i++) {
  const ulTag = wrapper.querySelector("ul");
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusicList[i].name}</span>
                  <p>${allMusicList[i].artist}</p>
                </div>
                <span id="${allMusicList[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusicList[i].src}" src="songs/${allMusicList[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeEnd", liTag); 
  }