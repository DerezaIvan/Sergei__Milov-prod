$(document).ready(function () {
  $(".author__slider").slick({
    autoplay: false,
    autoplaySpeed: 2000, // Скорость автоматической прокрутки в миллисекундах
    dots: false, // Показывать точки навигации
    speed: 800,
    prevArrow: '<button class="slick-prev">Previous</button>', // Кнопка "Предыдущий слайд"
    nextArrow: '<button class="slick-next">Next</button>', // Кнопка "Следующий слайд"
  });
});

// Бургер меню

const burgerMenuBtn = document.getElementById("burger-menu");
const burgerMenu = document.getElementById("header__menu");

burgerMenuBtn.onclick = function () {
  burgerMenuBtn.classList.toggle("active");
  burgerMenu.classList.toggle("open");
};

// Плавная прокрутка

function scrollToElement(element) {
  window.scrollTo({
    behavior: "smooth",
    top: element.offsetTop,
  });
}

// Обработчик события для нажатия на ссылки
document.addEventListener("DOMContentLoaded", function () {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        scrollToElement(targetElement);
        burgerMenuBtn.classList.toggle("active");
        burgerMenu.classList.toggle("open");
      }
    });
  });
});

// Плеер

const player = document.querySelector(".player"),
  playBtn = document.querySelector(".play"),
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next"),
  audio = document.querySelector(".audio"),
  progressContainer = document.querySelector(".progress__container"),
  progress = document.querySelector(".progress"),
  title = document.querySelector(".song"),
  soundTime = document.querySelector(".current-time"),
  soundEndTime = document.querySelector(".duration"),
  imgSrc = document.querySelector(".img__src");

// Треки
const songs = [
  // 1ый блок песен

  "Разве это беда",
  "Заповедай мне лес",
  "Это время",
  "Свет",
  "Время прощать",
  "Последний вагон",
  "Свечи",
  "Весьма хорошо",
  "Друг твой старый",
  "Друг закадычный",
  "Доброе имя",
  "До свидания",
  "Веруй",
  "Аннушка",
  "За вас!",
  "Лев",
  "На воздушном шаре",
  "Не встану я на колени",
  "Не отлита еще пуля для меня",
  "Не тот сильный кто не падает",
  "Небо голубое",
  "Недолюбил",
  "Последняя осень",
  "Постели мне", // !!!!!!!!!!! не работает
  "Пой гитара",
  "Там где ждут",
  "У общего стола",
  "С чистого листа",
  "Научи меня мама молиться",
  "Вашими молитвами",
  "Притуши свечу, мамаша",
  "С лёта",
  "Улетай",
  "Покосились кресты",
  "Август",
  "Петербург",
  "Шнурки",
  "Вольный ветер",
  "Я пытался залезть к вам в душу",
  "Игры для взрослых",
  "А что, вы, плачете...",
  "У камина",
  "Он был из тех",
  "При встрече",
  "Ласточкины гнезда",
  "Утром меня Бог целовал",
  "Если б только в этом счет",
  "На войне",
  "Картина маслом",
  "SOS",
  "Говорят что в одну воду дважды не войти",
  "Там",
  "Здравствуй, Крым!",
  "Арбат",
  "Волк в овечьей шкуре",
  "Школьный историк",
  "Погода",
  "Пустые гнезда",
  "Пока не грянет гром",
  "Мир сотворенный для любви",
];

// Песня по умолчанию

let songIndex = 0;

// init

function lodaSong(song) {
  title.innerHTML = song;
  audio.src = `audio/${song}.MP3`;
}

lodaSong(songs[songIndex]);

// Воспроизведение песни

function playSong() {
  player.classList.add("play");
  playBtn.classList.add("active");
  audio.play();
}

// Пауза песни

function pauseSong() {
  player.classList.remove("play");
  playBtn.classList.remove("active");
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlayng = player.classList.contains("play");
  if (isPlayng) {
    pauseSong();
  } else {
    playSong();
  }
});

// Следующая песня

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  lodaSong(songs[songIndex]);
  playSong();
  updateTrackList();
}

nextBtn.addEventListener("click", nextSong);

// Предидущая песня

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  lodaSong(songs[songIndex]);
  playSong();
  updateTrackList();
}

prevBtn.addEventListener("click", prevSong);

// Перевод времени песни секунды в минуты

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Прогресс песни

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  soundTime.innerHTML = formatTime(Math.round(currentTime));
}
audio.addEventListener("timeupdate", updateProgress);

// Конечное время трека

function timeEndSound() {
  const timeSound = formatTime(Math.round(audio.duration));
  soundEndTime.innerHTML = timeSound;
}
audio.addEventListener("loadeddata", timeEndSound);

// Управление прогрессом

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener("click", setProgress);

// Автовоспроизведение

audio.addEventListener("ended", nextSong);

// Список треков
const trackList = document.querySelector(".track-list");

// Функция для создания элемента списка треков
function createTrackElement(song, index) {
  const trackElement = document.createElement("li");
  trackElement.textContent = `${index + 1}. ${song}`;
  trackElement.addEventListener("click", () => {
    songIndex = index;
    lodaSong(songs[songIndex]);
    playSong();
    updateTrackList(); // Обновляем состояние списка треков
  });
  return trackElement;
}

// Функция для обновления списка треков (подсветка активного трека)
function updateTrackList() {
  const trackElements = trackList.querySelectorAll("li");
  trackElements.forEach((trackElement, index) => {
    if (index === songIndex) {
      trackElement.classList.add("active");
    } else {
      trackElement.classList.remove("active");
    }
  });
}

// Добавление треков в список
songs.forEach((song, index) => {
  const trackElement = createTrackElement(song, index);
  trackList.appendChild(trackElement);
});

function displayTrack() {
  const trackElements = trackList.querySelectorAll("li"); // Получаем все элементы списка треков
  const trackListBtn = document.getElementById("load-list");
  const trackListBtnReload = document.getElementById("reload-list");

  // Проходим по элементам с индексами с 19 по 59 (это 20-60 элементы)
  for (let i = 20; i < 60; i++) {
    trackElements[i].classList.add("display"); // Присваиваем указанный класс
  }

  trackListBtn.addEventListener("click", function () {
    for (let i = 20; i < 60; i++) {
      trackElements[i].classList.remove("display"); // Присваиваем указанный класс
    }
    trackListBtn.style.display = "none";
    trackListBtnReload.style.display = "flex";
  });

  trackListBtnReload.addEventListener("click", function () {
    for (let i = 20; i < 60; i++) {
      trackElements[i].classList.add("display"); // Присваиваем указанный класс
    }
    trackListBtn.style.display = "flex";
    trackListBtnReload.style.display = "none";
  });
}

displayTrack();
