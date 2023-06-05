import { Timer } from '/timer.js';

function createFieldBtn() {
  const field = document.createElement('div');
  field.classList.add('p-3');

  return field;
}

function createInput(value) {
  const input = document.createElement('input');
  input.value = value;
  input.style.maxWidth = '100px';
  input.style.display = 'inline-block';
  input.style.marginRight = '30px';

  return input;
}

function createFieldValueTime() {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'justify-content-center');

  const inputPromodoro = createInput(25);
  const inputShortBreak = createInput(5);
  const inputLongBreak = createInput(15);
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-danger');
  btn.textContent = 'Install';

  form.append(inputPromodoro);
  form.append(inputShortBreak);
  form.append(inputLongBreak);
  form.append(btn);

  return { form, inputPromodoro, inputShortBreak, inputLongBreak };
}

function createBtn(type, value, parent, boolean = false) {
  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn-danger');

  if (type === 'Promodoro') {
    btn.classList.add('active');
  }

  btn.textContent = type;

  if (boolean) {
    btn.classList.add('mr');
  }

  btn.addEventListener('click', () => {
    const timerValue = document.getElementById('timer');
    document
      .querySelectorAll('.btn-danger')
      .forEach((el) => el.classList.remove('active'));

    if (type === 'Promodoro') {
      document.title = type;
      btn.classList.add('active');
      const timer = new Timer(value);
      timerValue.remove();
      parent.append(timer.createTimer());
    } else if (type === 'Long Break') {
      document.title = type;
      btn.classList.add('active');
      const timer = new Timer(value);
      timerValue.remove();
      parent.append(timer.createTimer());
    } else {
      document.title = type;
      btn.classList.add('active');
      const timer = new Timer(value);
      timerValue.remove();
      parent.append(timer.createTimer());
    }
  });

  return btn;
}

function createApp() {
  const app = document.getElementById('app');
  app.classList.add(
    'p-3',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column'
  );
  const field = createFieldBtn();
  const form = createFieldValueTime();

  const timer = new Timer(25);
  field.append(createBtn('Promodoro', 25, app, true));
  field.append(createBtn('Short Break', 5, app, true));
  field.append(createBtn('Long Break', 15, app));

  form.form.addEventListener('submit', (e) => {
    e.preventDefault();
    field.innerHTML = '';
    document.getElementById('timer').remove();
    const timer = new Timer(form.inputPromodoro.value);
    field.append(createBtn('Promodoro', form.inputPromodoro.value, app, true));
    field.append(
      createBtn('Short Break', form.inputShortBreak.value, app, true)
    );
    field.append(createBtn('Long Break', form.inputLongBreak.value, app));
    app.append(timer.createTimer());
  });

  app.append(form.form);
  app.append(field);
  app.append(timer.createTimer());
}

createApp();
