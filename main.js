// This file contains logic for the timer

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0
};
const modeButtons = document.querySelector('#js-mode-buttons');
const mainButton = document.getElementById('js-btn');
const buttonSound = new Audio('audio/im-pomu.mp3');
const min = document.getElementById('js-minutes');
const sec = document.getElementById('js-seconds');
let sessionsDisplay = document.getElementById('sessions');
let sliders = document.querySelectorAll('input');
let sliderDisplay;
let interval;

modeButtons.addEventListener('click', handleMode);
mainButton.addEventListener('click', () => {
  buttonSound.play();
  const { action } = mainButton.dataset;
  if (action === 'start') {
    startTimer();
  
    // Disable changing timer while running
    sliders.forEach(function(s) {
      s.disabled = true;
    })
  } else {
    stopTimer();

    // Enable changing timer when not running
    sliders.forEach(function(s) {
      s.disabled = false;
    })
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window) {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification(
            'Awesome! You will be notified at the start of each session!'
          )
        }
      })
    }
  }

  switchMode('pomodoro');
});

sliders.forEach(function(s) {
  s.addEventListener('input', function(event) {
    const { mode } = event.target.dataset;
    timer[mode] = this.value;
    timer.remainingTime.total= this.value * 60;

    // Only if mode of slider clicked matches current mode, update clock text
    if (mode === timer.mode) {
      min.textContent = this.value.padStart(2, '0');
      sec.textContent = '00';
    }

    sliderDisplay = document.querySelector(`p[data-mode='${mode}']`);
    sliderDisplay.textContent = `${mode}: ${this.value}`;
  })
})

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;
  // console.log(`difference= ${difference}`);

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);
  // console.log(total, minutes, seconds);

  return {
    total,
    minutes,
    seconds
  };
}

function startTimer() {
  let total;

  // Handling case where timer set to less than a minute
  if (timer.remainingTime.total === 0) {
    total = timer.remainingTime.seconds;
  } else {
    total = timer.remainingTime.total;
  }
  
  const endTime = Date.parse(new Date()) + total * 1000;
  // console.log("timer.remainingTime.total= " + timer.remainingTime.total);
  // console.log('endTime= ' + endTime);

  mainButton.dataset.action = 'stop';
  mainButton.textContent = 'stop';
  mainButton.classList.add('active');

  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          timer.sessions++;
          sessionsDisplay.textContent = `sessions: ${timer.sessions}`;

          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }

      if (Notification.permission === 'granted') {
        const text =
          timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        console.log(text);
        console.log('Displaying notification!');
        new Notification(text).onshow = () => console.log('Showing notification');
      }

      document.querySelector(`[data-sound="${timer.mode}"]`).play();

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = 'start';
  mainButton.textContent = 'start';
  mainButton.classList.remove('active');
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
  // const min = document.getElementById('js-minutes');
  // const sec = document.getElementById('js-seconds');
  const progress = document.getElementById('js-progress');
  const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
  
  min.textContent = minutes;
  sec.textContent = seconds;
  progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
  document.title = `${minutes}:${seconds} - ${text}`;
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  // document.body.style.backgroundColor = `var(--${mode})`;
  document.body.style.backgroundImage = `var(--${mode})`
  document
    .getElementById('js-progress')
    .setAttribute('max', timer.remainingTime.total);

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;
  if (!mode) return;
  switchMode(mode);
  stopTimer();
}