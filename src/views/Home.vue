<template>
   <h1>СЕО-КОТ</h1>
    <h2>Надоело копипастить с вордстата и таблиц а потом еще и в нейронку? </h2>
    <h2>Оставь это коту!</h2>
    <div  class="home_container wrapper ">
      <div class="home_intro-container">
        <p class="home_intro">Сервис создан для упрощения генерации текстов и быстрой их проверки на вхождения.</p>
        <p class="home_intro">На сайте есть подсказки - <button class="info-icon-btn"  title="Показать подсказку">?</button> - которые прояснят некоторые нюансы.</p>
        <p class="home_intro">Промпты, данные занесенные в таблицу, а также последний сгенерированный документ с текстом, сохраняются в памяти вашего браузера. Завершая сессию - вы ничего не потеряете.</p>
        <p class="home_intro">Генерация нового текста - удаляет предыдущий.</p>
        <p class="home_intro">Подключение к БД Google Firebase не всегда происходит удачно, пока сондинения не произошло - вы не сможете выбирать категории и их подразделы.<br> Решение проблемы: Ожидание; Перезагрузить / переоткрыть страницу</p>
      <p class="home_intro">Не забудь погладить кота!</p>
      </div>
<div class="home_img-wrapper">
  <!-- Убрали ref, чтобы избежать конфликтов -->
  <img class="home_img light-img" src="../assets/img/kitik.png" alt="Кисик" title="СЕО говорит - Мяв!">
  <img class="home_img dark-img" src="../assets/img/kitik-dark.png" alt="Кисик" title="СЕО говорит - Мяв!">
  <div class="cat-message"></div>
</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let homeImgs = [];
const catMessageSelector = '.cat-message';
const homeImgSelector = '.home_img';

// Вынесли функцию наружу, чтобы можно было корректно удалить слушатель
const showMessage = () => {
  const messages = ['МЯВ', 'МЯЯ..', 'МЯ!', 'МЯУ', 'МЯЯЯ', 'МРРР', 'МЯ~','Прекращай)', 'ПРРР', 'MEOW', 'NYA', 'PURR', 'MEW', 'MROW', 'MAU', 'MEW MEW', 'PURRR'];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const label = document.querySelector(catMessageSelector);
  
  if (label) {
    label.textContent = randomMessage;
    label.style.opacity = '1';
    
    if (label.timeoutId) clearTimeout(label.timeoutId);

    label.timeoutId = setTimeout(() => {
      label.style.opacity = '0';
    }, 1000);
  }
};

onMounted(() => {
  // Находим элементы только после монтирования компонента
  homeImgs = document.querySelectorAll(homeImgSelector);
  
  // Навешиваем обработчики
  homeImgs.forEach(img => {
    img.addEventListener('click', showMessage);
  });
});

onUnmounted(() => {
  // Обязательно удаляем обработчики при уходе со страницы
  homeImgs.forEach(img => {
    img.removeEventListener('click', showMessage);
  });
});
</script>