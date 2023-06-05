export class Timer {
  run = false;

  constructor(time, seconds = 0) {
    this.minutes = time;
    this.startTime = time;
    this.seconds = seconds;
  }

  set startTime(value) {
    this._startTime = value;
  }

  get startTime() {
    return this._startTime;
  }

  set seconds(value) {
    this._seconds = value;
    if (this.display)
      this.display.textContent = `${this.display.textContent.slice(
        0,
        `${this.minutes >= 10 ? 3 : 2}`
      )}${value < 10 ? '0' + value : value}`;
  }

  get seconds() {
    return this._seconds;
  }

  set minutes(value) {
    this._minutes = value;
    if (this.display) this.display.textContent = `${value}:`;
  }

  get minutes() {
    return this._minutes;
  }

  tick() {
    if (this.seconds === 0) {
      this.seconds = 60;
      --this.minutes;
    }

    if (this.minutes >= 0) {
      --this.seconds;

      if (this.seconds === 0) {
        --this.minutes;
        if (this.minutes === 0 && this.seconds === 0) {
          clearInterval(this.interval);
          this.run = false;
          this.minutes = this.startTime;
          this.seconds = 0;
          return;
        }
        this.seconds = 59;
      }
    }
  }

  start() {
    if (this.run) {
      this.btnStart.textContent = 'Start';
      this.run = false;
      this.pause();
    } else {
      this.btnStart.textContent = 'Pause';
      this.run = true;
      this.interval = setInterval(() => this.tick(), 500);
    }
  }

  pause() {
    clearInterval(this.interval);
  }

  reset() {
    this.btnStart.textContent = 'Start';
    this.run = false;
    this.pause();
    this.minutes = this.startTime;
    this.seconds = 0;
  }

  createTimer() {
    const timerField = document.createElement('div');
    timerField.classList.add(
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'flex-column'
    );
    const btnField = document.createElement('div');
    btnField.classList.add(
      'd-flex',
      'align-items-center',
      'justify-content-center'
    );
    const startBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    // const resetBtn = document.createElement('button');
    const timer = document.createElement('span');
    timer.classList.add('mb-2');
    timerField.id = 'timer';
    startBtn.classList.add('btn', 'btn-danger', 'mr');
    startBtn.textContent = 'Start';
    nextBtn.classList.add('btn', 'btn-danger', 'mr');
    nextBtn.textContent = 'Next';
    // resetBtn.classList.add('btn', 'btn-danger');
    // resetBtn.textContent = 'Reset';

    startBtn.addEventListener('click', () => this.start());

    resetBtn.addEventListener('click', () => this.reset());

    btnField.append(startBtn);
    btnField.append(nextBtn);
    btnField.append(resetBtn);
    timerField.append(timer);
    timerField.append(btnField);

    this.btnStart = startBtn;
    this.display = timer;
    this.display.textContent = `${this.minutes}:00`;

    return timerField;
  }
}
