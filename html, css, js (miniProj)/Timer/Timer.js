export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer--btn__control"),
      reset: root.querySelector(".timer__btn--reset"),
    };

    this.interval = 40;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes:");
      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateIntefaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-symbols-outlined">
      pause
      </span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateIntefaceControls();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;

    this.updateIntefaceControls();
  }

  static getHTML() {
    return `
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part--dots">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        
        <button
        type="button"
        class="timer__btn timer--btn__control timer__btn--start"
        >
        <span class="material-symbols-outlined"> play_arrow </span>
        </button>
        <button
        type="button"
        class="timer__btn timer--btn__control timer__btn--reset"
        >
          <span class="material-symbols-outlined"> timer </span>
        </button>
    `;
  }
}
