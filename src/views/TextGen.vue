

<template>
  <body>
    <main>
 <h1>Генератор текста</h1>
       
        <div class="centration-modif">
            <div style="display: flex;">
                <div class="controls-container control-group">
                    <label>Облачная база данных:</label>
                    <div class="firebase-status">
                        <div>
                            <p id="connection-status" style="margin: 0px; font-size: 0.9rem; color: green;">🟢
                                Подключено.
                                Разделов: 6</p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label>Выберите категорию:</label>
                        <div class="custom-dropdown" id="custom-parent-select">
                            <div class="select-selected">
                                <span id="selected-parent-text">Выберите категорию</span>
                                <div class="select-arrow"></div>
                            </div>
                            <div class="select-items select-hide" id="parent-options-container">
                                <div class="option-item">Алкоголизм</div>
                                <div class="option-item">Кодирование</div>
                                <div class="option-item">Наркомания</div>
                                <div class="option-item">Психиатрия</div>
                                <div class="option-item">Реабилитация</div>
                                <div class="option-item">Статьи - ИНФО</div>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label>Выберите раздел:</label>
                        <div class="custom-dropdown" id="custom-child-select">
                            <div class="select-selected disabled">
                                <span id="selected-category-text">Выберите раздел</span>
                                <div class="select-arrow"></div>
                            </div>
                            <div class="select-items select-hide">
                                <input type="text" placeholder="Поиск..." id="category-search-input" autocomplete="off">
                                <div id="category-options-container">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="results-count">Количество элементов:</label>
                        <input type="number" id="results-count" class="custom-input" value="5" min="1">
                    </div>
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label for="toponym-input">Топоним для замены:</label>
                            <button class="info-icon-btn" data-info="toponim" title="Показать подсказку">?</button>
                        </div>
                        <input type="text" id="toponym-input" class="custom-input" placeholder="например, владикавказ">
                    </div>
                    <div class="button-group">
                        <button id="add-data-modal-btn" class="btn">➕ Добавить запись</button>
                        <button id="randomize-btn" class="btn">Рандомизировать</button>
                        <button id="copy-btn" class="btn">Копировать</button>
                    </div>
                    <div id="result-container" class="result-container">
                        <ul id="result-list"></ul>
                    </div>
                </div>
                <div class="controls-container">
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label for="github-token">Токен GitHub (Personal Access Token):</label>
                            <button class="info-icon-btn" data-info="token" title="Показать подсказку">?</button>
                        </div>
                        <input type="password" id="github-token" class="custom-input" placeholder="ghp_...">
                        <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
                            Токен нужен для доступа к GitHub Models.
                            <a href="https://github.com/settings/tokens" target="_blank">Создать токен</a>.
                        </p>
                    </div>
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label>Тип контента:</label>
                            <button class="info-icon-btn" data-info="content" title="Показать подсказку">?</button>
                        </div>

                        <div style="display: flex; gap: 20px;">
                            <label><input type="radio" name="content-type" value="service" checked> Услуга</label>
                            <label><input type="radio" name="content-type" value="article"> Статья</label>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label for="prompt-template">Шаблон промпта для структуры:</label>
                            <button class="info-icon-btn" data-info="maket" title="Показать подсказку">?</button>
                        </div>
                        <textarea id="prompt-template" class="custom-input custom-area" rows="8"></textarea>
                    </div>
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label for="text-prompt-template">Шаблон промпта для текста:</label>
                            <button class="info-icon-btn" data-info="textprompt" title="Показать подсказку">?</button>
                        </div>
                        <textarea id="text-prompt-template" class="custom-input custom-area" rows="10"></textarea>
                    </div>
                    <div class="control-group">
                        <div class="label-wrapper">
                            <label for="prompt-template">Модель:</label>
                            <button class="info-icon-btn" data-info="model" title="Показать подсказку">?</button>
                        </div>
                        <div class="custom-dropdown" id="custom-model-select">
                            <div class="select-selected">
                                <span id="selected-model-text">gpt-4o</span>
                                <div class="select-arrow"></div>
                            </div>
                            <div class="select-items select-hide" id="model-options-container">
                                <div class="option-item" data-value="gpt-4o">gpt-4o</div>
                                <div class="option-item" data-value="gpt-4o-mini">gpt-4o-mini</div>
                                <div class="option-item" data-value="Llama-3.3-70B">Llama-3.3-70B</div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="model" id="model-input" value="gpt-4o">
                    <div class="button-group" style="justify-content: space-between;">
                        <div class="rate-limit-container">
                            <span id="rate-limit-display">Сегодня использовано: -- из --</span>
                        </div>
                        <button id="generate-structure-btn" class="btn">Сгенерировать структуру</button>
                    </div>
                    <div id="structure-result"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="controls-container" style="max-width:980px; margin:40px auto 20px;">
            <h3 style="text-align:center; margin-bottom:16px;">Таблица заданий</h3>

            <div style="margin-bottom:16px; display:flex; gap:16px; flex-wrap:wrap; justify-content:center;">
                <div>
                    <div class="label-wrapper">
                            <label for="prompt-template">Заголовков за один запрос:</label>
                            <input type="number" id="headers-per-request" value="5" min="1" max="10"
                            style="width:70px; text-align:center;" class="custom-input">
                            <button class="info-icon-btn" data-info="titleatonce" title="Показать подсказку">?</button>

                    </div> 
                </div>
                <div style="display: flex; gap: 15px;">
                    <button id="generate-text-btn" class="btn">Сгенерировать текст</button>
                    <button id="download-result-btn" class="btn" disabled>Скачать .doc</button>
                    <button id="copy-table-btn" class="btn">Скопировать таблицу</button>
                    <button id="clear-table-btn" class="btn" >Очистить таблицу</button>
                </div>
            </div>

            <div style="overflow-x:auto;">
                <table id="task-table"
                    style="width:100%; border-collapse:collapse; background:white; font-size:0.95rem;">
                    <thead>
                        <tr style="background:#f0f0f0;">
                            <th style="border:1px solid #ccc; padding:8px;">A — Название (H1)</th>
                            <th style="border:1px solid #ccc; padding:8px;">B — Запросы (Ключи)</th>
                            <th style="border:1px solid #ccc; padding:8px;">C — LSI </th>
                            <th style="border:1px solid #ccc; padding:8px;">D — Структура (H2)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- 5 пустых строк по умолчанию -->
                        <tr>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                        </tr>
                        <tr>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                        </tr>
                        <tr>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                        </tr>
                        <tr>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                        </tr>
                        <tr>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                            <td contenteditable="true"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="text-generation-panel">
                <div style="margin-bottom:12px;">
                    <progress id="generation-progress" value="0" max="100"
                        style="width:100%; height:10px; border-radius:4px;"></progress>
                </div>
                <div id="generation-status-text" ></div>
            </div>
        </div>

        <!-- Место для большого результата (можно скрыть или вообще убрать) -->
        <div id="final-text-result"
            style="display:none; margin:20px auto; max-width:980px; padding:20px; background:white; border:1px solid #ccc; white-space:pre-wrap;">
        </div>
        <div class="tool-description">
            <p class="intro">Этот инструмент позволяет генерировать случайные списки поисковых запросов из различных
                категорий, по которым нам необходимо откликаться.<br> А также генерировать, с помощью нейросети, на
                основе
                полученных списков,
                стурктуры. </p>
            <p class="intro">Инструмент не делает всю работу за вас, а лишь ускоряет там, где уже была собрана БД
                запросов.<br> Там, где их нет - вы должны собирать их самостоятельно. <br>Вы так же можете дополнять
                БД
                запросов, для облегчения своей работы и работы коллег в будущем.</p>
        </div>
    </main>

    <div id="add-data-modal" class="modal-overlay">
        <div class="modal-content" style="text-align: left;">
            <button class="modal-close-btn" id="close-add-modal">×</button>
            <h3>Добавить новый запрос</h3>
            <div class="control-group">
                <label>Категория:</label>
                <input type="text" id="new-parent-input" class="custom-input" list="parent-list-hints"
                    placeholder="Например: Алкоголизм" autocomplete="off">
                <datalist id="parent-list-hints">
                    <option value="Алкоголизм"></option>
                    <option value="Кодирование"></option>
                    <option value="Наркомания"></option>
                    <option value="Психиатрия"></option>
                    <option value="Реабилитация"></option>
                    <option value="Статьи - ИНФО"></option>
                </datalist>
            </div>
            <div class="control-group">
                <label>Раздел:</label>
                <input type="text" id="new-child-input" class="custom-input" list="child-list-hints"
                    placeholder="Например: Вывод из запоя" autocomplete="off">
                <datalist id="child-list-hints"></datalist>
            </div>
            <div class="control-group">
                <label>Поисковый запрос:</label>
                <input type="text" id="new-query-input" class="custom-input"
                    placeholder="Например: вывод из запоя москва">
            </div>
            <div class="control-group">
                <label>Частотность:</label>
                <input type="number" id="new-freq-input" class="custom-input" value="100">
            </div>
            <button class="btn" id="save-new-data-btn" style="width: 100%; margin-top: 10px;">Сохранить в
                облако</button>
        </div>
    </div>
    <div id="info-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close-btn modal-close-trigger">×</button>
            <h3>Подсказка</h3>
            <p id="info-modal-text" ></p>
            <button class="btn modal-close-trigger">Понятно</button>
        </div>
    </div>
    <div id="clear-confirm-modal" class="modal-overlay">
        <div class="modal-content">
            <span class="modal-close-btn modal-close-trigger">×</span>
            <h2>Очистить таблицу?</h2>
            <p>Все данные в таблице будут безвозвратно удалены.</p>
            <div style="margin-top:24px; text-align:center;">
                <button id="confirm-clear-btn" class="btn" style="background:#dc3545; color:white; border:none;">Да,
                    очистить</button>
                <button class="btn modal-close-trigger" style="margin-left:12px;">Отмена</button>
            </div>
        </div>
    </div>

</body>
</template>






<script setup>

import { ref, onMounted } from 'vue';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, onSnapshot, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCxEBDlOBK2QwduPO1S5ri9DpRBnoMhtt8",
    authDomain: "yatvig-a0214.firebaseapp.com",
    projectId: "yatvig-a0214",
    storageBucket: "yatvig-a0214.firebasestorage.app",
    messagingSenderId: "1049548595731",
    appId: "1:1049548595731:web:7fc9ca611648fc31ead5e6"
};
if (!firebaseConfig.apiKey) {
    showModal('Ошибка конфигурации', 'Вы не вставили firebaseConfig в код скрипта. Откройте файл в редакторе и добавьте ключи.');
    throw new Error("Config missing");
}
onMounted(() => {
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION_NAME = "search_sections";
let globalData = {};
const connectionStatus = document.getElementById('connection-status');
const parentSelect = document.getElementById('custom-parent-select');
const parentSelectedText = document.getElementById('selected-parent-text');
const parentOptionsContainer = document.getElementById('parent-options-container');
const childSelect = document.getElementById('custom-child-select');
const childSelectedText = document.getElementById('selected-category-text');
const childOptionsContainer = document.getElementById('category-options-container');
const searchInput = document.getElementById('category-search-input');
const resultsCountInput = document.getElementById('results-count');
const toponymInput = document.getElementById('toponym-input');
const randomizeBtn = document.getElementById('randomize-btn');
const copyBtn = document.getElementById('copy-btn');
const resultList = document.getElementById('result-list');
const addModal = document.getElementById('add-data-modal');
const addBtn = document.getElementById('add-data-modal-btn');
const closeAddBtns = document.querySelectorAll('#close-add-modal');
const saveNewDataBtn = document.getElementById('save-new-data-btn');
const newParentInput = document.getElementById('new-parent-input');
const newChildInput = document.getElementById('new-child-input');
const newQueryInput = document.getElementById('new-query-input');
const newFreqInput = document.getElementById('new-freq-input');
const parentHints = document.getElementById('parent-list-hints');
const childHints = document.getElementById('child-list-hints');
const taskTable = document.getElementById('task-table');
const generateTextBtn = document.getElementById('generate-text-btn');
const downloadBtn = document.getElementById('download-result-btn');
const statusDiv = document.getElementById('text-generation-status');
const headersPerRequestInput = document.getElementById('headers-per-request');
const finalTextResult = document.getElementById('final-text-result');
let currentParentValue = '';
let currentChildValue = '';
let currentListData = [];
let generatedHTML = '';   // сюда собираем весь результат
const originalCopyBtnText = copyBtn.textContent;
const savedText = localStorage.getItem('last_generated_text');
if (savedText) {
    generatedHTML = savedText;
    document.getElementById('download-result-btn').disabled = false;
}

// ==== Сохранение и загрузка таблицы в localStorage ====
const TABLE_STORAGE_KEY = 'task_table_data';

function cleanDuplicatesHTML(html) {
    // Разделяем по <hr> (с любыми атрибутами)
    const parts = html.split(/(<hr\b[^>]*>)/i);
    // Обрабатываем каждую часть: чётные индексы — блоки статей, нечётные — разделители
    const processed = parts.map((part, index) => {
        if (index % 2 === 1) return part; // оставляем <hr> как есть
        return cleanBlock(part);
    });
    return processed.join('');
}

/**
 * Очищает один блок (одну статью)
 */
function cleanBlock(blockHTML) {
    if (!blockHTML.trim()) return blockHTML;

    const parser = new DOMParser();
    // Оборачиваем во временный div для сохранения всей структуры
    const doc = parser.parseFromString(`<div id="root">${blockHTML}</div>`, 'text/html');
    const root = doc.getElementById('root');
    const h1Nodes = root.querySelectorAll('h1');

    if (h1Nodes.length < 2) return blockHTML; // дублей нет

    const children = Array.from(root.childNodes);
    const newRoot = doc.createElement('div');
    const seenH1Text = new Set();

    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        // Если это элемент H1
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H1') {
            const text = node.textContent.trim().toLowerCase();
            if (seenH1Text.has(text)) {
                // Дубль – пропускаем этот H1 и все последующие узлы до следующего H2
                let j = i + 1;
                while (j < children.length) {
                    const nextNode = children[j];
                    if (nextNode.nodeType === Node.ELEMENT_NODE && nextNode.tagName === 'H2') {
                        break; // остановились перед H2
                    }
                    j++;
                }
                i = j - 1; // после цикла i++ перейдёт на индекс j (следующий после H2)
                continue;
            } else {
                seenH1Text.add(text);
                newRoot.appendChild(node.cloneNode(true)); // копируем H1 со всем содержимым
            }
        } else {
            // Не H1 – просто копируем узел
            newRoot.appendChild(node.cloneNode(true));
        }
    }

    return newRoot.innerHTML;
}

// Сохранить таблицу
function saveTableToLocalStorage() {
    const tbody = taskTable.tBodies[0];
    const rows = tbody.rows;
    const data = [];
    for (let row of rows) {
        const rowData = [];
        for (let cell of row.cells) {
            rowData.push(cell.innerText);
        }
        data.push(rowData);
    }
    localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(data));
}

// Загрузить таблицу
function loadTableFromLocalStorage() {
    const saved = localStorage.getItem(TABLE_STORAGE_KEY);
    if (!saved) return;

    try {
        const data = JSON.parse(saved);
        const tbody = taskTable.tBodies[0];
        // Очищаем текущие строки
        tbody.innerHTML = '';

        // Восстанавливаем строки
        data.forEach(rowData => {
            const tr = document.createElement('tr');
            for (let cellText of rowData) {
                const td = document.createElement('td');
                td.contentEditable = true;
                td.innerText = cellText;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.warn('Ошибка загрузки таблицы из localStorage', e);
    }
}

// Автоматическое сохранение при изменении любой ячейки
taskTable.tBodies[0].addEventListener('input', saveTableToLocalStorage);

// Загружаем сохранённые данные при старте
loadTableFromLocalStorage();


function showModal(title, message) {
    const modal = document.getElementById('info-modal');
    const modalTitle = modal.querySelector('h3');
    const modalText = document.getElementById('info-modal-text');
    if (modalTitle) modalTitle.textContent = title;
    if (modalText) modalText.textContent = message;
    modal.classList.add('active');
}
onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const newData = {};
    let isEmpty = true;
    snapshot.forEach((doc) => {
        // doc.id = Название раздела (например, "Кулинария")
        // doc.data() = Объект с категориями (например, { "Супы": [...] })
        newData[doc.id] = doc.data();
        isEmpty = false;
    });
    globalData = newData;
    connectionStatus.textContent = `🟢 Подключено разделов: ${Object.keys(globalData).length}`;
    connectionStatus.style.color = 'light-gray';
    if (isEmpty) {
        parentSelectedText.textContent = "База пуста";
    } else {
        refreshUI();
    }
}, (error) => {
    console.error("Ошибка Firebase:", error);
    connectionStatus.textContent = `🔴 Ошибка: ${error.message}`;
    connectionStatus.style.color = 'red';
});
function refreshUI() {
    renderParentOptions();
    updateHints();
    if (currentParentValue && globalData[currentParentValue]) {
        renderChildOptions(currentParentValue);
        // Если выбрана категория, пробуем обновить результат
        if (currentChildValue && globalData[currentParentValue][currentChildValue]) {
            // Опционально: можно не делать авто-рандом, чтобы не сбивать пользователя
        }
    } else {
        // Сброс, если категорию удалили
        parentSelectedText.textContent = "Выберите категорию";
        currentParentValue = '';
    }
}
function updateHints() {
    parentHints.innerHTML = '';
    childHints.innerHTML = '';
    Object.keys(globalData).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        parentHints.appendChild(opt);
    });
}
newParentInput.addEventListener('input', () => {
    const val = newParentInput.value;
    childHints.innerHTML = '';
    if (globalData[val]) {
        Object.keys(globalData[val]).forEach(childKey => {
            const opt = document.createElement('option');
            opt.value = childKey;
            childHints.appendChild(opt);
        });
    }
});
function renderParentOptions() {
    parentOptionsContainer.innerHTML = '';
    const parentKeys = Object.keys(globalData).sort();

    if (parentKeys.length === 0) return;

    parentKeys.forEach((key) => {
        const div = document.createElement('div');
        div.textContent = key;
        div.className = 'option-item';
        div.addEventListener('click', () => selectParent(key));
        parentOptionsContainer.appendChild(div);
    });
}
function selectParent(value, closeMenu = true) {
    currentParentValue = value;
    parentSelectedText.textContent = value;
    if (closeMenu) toggleSelect(parentSelect, false);
    renderChildOptions(value);
    // Сброс ребенка
    childSelectedText.textContent = "Выберите категорию";
    currentChildValue = '';
    childSelect.querySelector('.select-selected').classList.remove('disabled');
}
function renderChildOptions(parentKey) {
    childOptionsContainer.innerHTML = '';
    const subCategories = globalData[parentKey];
    if (!subCategories) return;
    const childKeys = Object.keys(subCategories).sort();
    childKeys.forEach((key) => {
        const div = document.createElement('div');
        div.textContent = key;
        div.className = 'option-item';
        div.addEventListener('click', () => selectChild(key));
        childOptionsContainer.appendChild(div);
    });
}
function selectChild(value, closeMenu = true) {
    currentChildValue = value;
    childSelectedText.textContent = value;
    if (closeMenu) toggleSelect(childSelect, false);
    searchInput.value = '';
    filterOptions('');
    handleRandomize();
}
function toggleSelect(selectElement, forceState) {
    const items = selectElement.querySelector('.select-items');
    const selectedDiv = selectElement.querySelector('.select-selected');
    if (!items.classList.contains('select-hide') === false && forceState !== false) {
        closeAllSelects(selectElement);
    }
    if (forceState !== undefined) {
        if (forceState) {
            items.classList.remove('select-hide');
            selectedDiv.classList.add('select-arrow-active');
        } else {
            items.classList.add('select-hide');
            selectedDiv.classList.remove('select-arrow-active');
        }
    } else {
        items.classList.toggle('select-hide');
        selectedDiv.classList.toggle('select-arrow-active');
    }
}
function closeAllSelects(exceptElement) {
    [parentSelect, childSelect].forEach(sel => {
        if (sel !== exceptElement) {
            sel.querySelector('.select-items').classList.add('select-hide');
            sel.querySelector('.select-selected').classList.remove('select-arrow-active');
        }
    });
}
parentSelect.querySelector('.select-selected').addEventListener('click', (e) => { e.stopPropagation(); toggleSelect(parentSelect); });
childSelect.querySelector('.select-selected').addEventListener('click', (e) => {
    if (currentParentValue) {
        e.stopPropagation();
        toggleSelect(childSelect);
        if (!childSelect.querySelector('.select-items').classList.contains('select-hide')) searchInput.focus();
    }
});
document.addEventListener('click', () => closeAllSelects(null));
searchInput.addEventListener('click', (e) => e.stopPropagation());
searchInput.addEventListener('input', (e) => filterOptions(e.target.value));
function filterOptions(text) {
    const filter = text.toLowerCase();
    const options = childOptionsContainer.getElementsByClassName('option-item');
    for (let div of options) {
        div.style.display = (div.textContent || div.innerText).toLowerCase().indexOf(filter) > -1 ? "" : "none";
    }
}
function handleRandomize() {
    const resultsCount = parseInt(resultsCountInput.value, 10);
    const toponym = toponymInput.value.trim();
    if (currentParentValue && currentChildValue &&
        globalData[currentParentValue] && globalData[currentParentValue][currentChildValue]) {
        const data = globalData[currentParentValue][currentChildValue];
        let randomized = [...data].sort(() => 0.5 - Math.random()).slice(0, resultsCount);
        if (toponym) {
            const targets = ["москва", "москве", "москвы"];
            randomized = randomized.map(item => {
                let q = item.query;
                targets.forEach(t => {
                    const regex = new RegExp(`(^|[\\s])(${t})(?=$|[\\s.,!?])`, 'gi');
                    q = q.replace(regex, `$1${toponym}`);
                });
                return { ...item, query: q };
            });
        }
        displayResults(randomized);
    } else {
        displayResults([]);
    }
}
function displayResults(list) {
    resultList.innerHTML = '';
    currentListData = [];
    if (!list || list.length === 0) {
        resultList.innerHTML = '<li>Нет данных.</li>';
        copyBtn.disabled = true;
        return;
    }
    list.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.query}</span><span class="frequency-span">Частотность: </br> ${item.frequency}</span>`;
        resultList.appendChild(li);
        currentListData.push(item.query);
    });
    copyBtn.disabled = false;
}
randomizeBtn.addEventListener('click', handleRandomize);
copyBtn.addEventListener('click', () => {
    if (copyBtn.disabled || currentListData.length === 0) return;
    navigator.clipboard.writeText(currentListData.join('\n')).then(() => {
        const t = copyBtn.textContent;
        copyBtn.textContent = 'Скопировано!';
        copyBtn.disabled = true;
        setTimeout(() => { copyBtn.textContent = t; copyBtn.disabled = false; }, 2000);
    });
});
function cleanAIResponse(text) {
    if (!text) return text;
    // Удаляет ```html, ```json, ``` и т.д. в начале
    text = text.replace(/^\s*```[\w]*\n?/, ''); 
    // Удаляет ``` в конце
    text = text.replace(/\n?\s*```\s*$/, ''); 
    return text.trim();
}
const generateBtn = document.getElementById('generate-structure-btn');
const structureResult = document.getElementById('structure-result');
const tokenInput = document.getElementById('github-token');
const promptTemplate = document.getElementById('prompt-template');
const modelInput = document.getElementById('model-input');
const rateLimitDisplay = document.getElementById('rate-limit-display');
const typeRadios = document.querySelectorAll('input[name="content-type"]');
const serviceTemplate = `Нужно составить содержание текста для сайта частной наркоклиники. Для этого требуется ориентироваться на ключевые слова в названиях заголовков и подзаголовков. 
Нужно придумать уникальное и интересное содержание, чтобы по итогу аудитории сайта было действительно интересно читать текст, но не перегибать с креативностью. Н3 не требуется.
Желательно видеть такие заголовки как (стадии болезни, этапы лечения, плюсы и минусы, методы, когда нужно, что такое, кому подходит и т.д. (старайся придумать аналогичные заголовки, а не втупую использовать эти в том же порядке)) 
Не делай заголовки слишком длинными (до 11 слов)

Тип текста: Услуга (коммерческая)

Кол-во заголовков Н2 должно быть 16 шт, без учета H1.

Название: “{{title}}”

Keywords: “{{keys}}”

Ответ пиши без маркировок, табуляций и прочих символов, кроме тире, вот пример  и стиль написания:

H2 - * заголовок *
H2 - * заголовок *
H2 - * заголовок *`;

const articleTemplate = `Нужно составить содержание текста для сайта частной наркоклиники. Для этого требуется ориентироваться на ключевые слова в названиях заголовков и подзаголовков. 
Нужно придумать уникальное и интересное содержание, чтобы по итогу аудитории сайта было действительно интересно читать текст, но не перегибать с креативностью. Н3 не требуется.
Желательно видеть такие заголовки как (стадии болезни, этапы лечения, плюсы и минусы, методы, когда нужно, что такое, кому подходит и т.д.) 

Тип текста: Статья (информационная)

Кол-во заголовков Н2 должно быть 16 шт, без учета H1.

Название: “{{title}}”

Keywords: “{{keys}}”


Ответ пиши без маркировок, табуляций и прочих символов, кроме тире, вот пример  и стиль написания:

H2 - *какой-то заголовок*
H2 - *какой-то заголовок*`;

const STORAGE_KEY_SERVICE = 'saved_prompt_service';
const STORAGE_KEY_ARTICLE = 'saved_prompt_article';
function loadPromptForType(type) {
    const key = type === 'service' ? STORAGE_KEY_SERVICE : STORAGE_KEY_ARTICLE;
    const saved = localStorage.getItem(key);
    const defaultValue = type === 'service' ? serviceTemplate : articleTemplate;
    if (saved && saved.trim() !== '') {
        promptTemplate.value = saved;
    } else {
        promptTemplate.value = defaultValue;
    }
}
function savePromptForCurrentType() {
    const currentType = document.querySelector('input[name="content-type"]:checked').value;
    const key = currentType === 'service' ? STORAGE_KEY_SERVICE : STORAGE_KEY_ARTICLE;
    const value = promptTemplate.value;
    localStorage.setItem(key, value);
}
loadPromptForType('service');
typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        loadPromptForType(e.target.value);
    });
});
promptTemplate.addEventListener('input', savePromptForCurrentType);
const DAILY_LIMIT = 150; // стандартный лимит GitHub Models
function getTodayKey() {
    const now = new Date();
    return `usage_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
function getTodayUsage() {
    const key = getTodayKey();
    const val = localStorage.getItem(key);
    return val ? parseInt(val, 10) : 0;
}
function incrementUsage() {
    const key = getTodayKey();
    const current = getTodayUsage();
    localStorage.setItem(key, current + 1);
}// ====================== АВТОЗАПОЛНЕНИЕ ТАБЛИЦЫ ======================
function autoFillTableFromStructure(resultText) {
    try {
        const lines = resultText
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.startsWith('H2 -'));

        if (lines.length === 0) return;

        const cleanHeaders = lines.map(line => {
            return line.replace(/^H2\s*-\s*\*\s*(.*?)\s*\*$/, '$1').trim();
        }).filter(Boolean);

        // Ищем первую пустую строку или добавляем новую
        let targetRow = Array.from(taskTable.tBodies[0].rows).find(row =>
            !row.cells[0].innerText.trim()
        );

        if (!targetRow) {
            const newRow = taskTable.tBodies[0].insertRow();
            for (let i = 0; i < 4; i++) {
                const td = newRow.insertCell();
                td.contentEditable = true;
            }
            targetRow = newRow;
        }

        targetRow.cells[0].innerText = currentChildValue;                    // A — Название
        targetRow.cells[1].innerText = currentListData.join('\n');           // B — Ключи
        targetRow.cells[3].innerText = cleanHeaders.join('\n');              // D — Структура
        saveTableToLocalStorage();
    } catch (err) {
        console.warn("Не удалось автоматически заполнить таблицу", err);
    }
}
function updateRateLimitDisplay() {
    const used = getTodayUsage();
    document.getElementById('rate-limit-display').textContent =
        `Сегодня использовано: ${used} из ${DAILY_LIMIT}`;
}
updateRateLimitDisplay();
async function callGitHubModels(prompt, token, model) {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: 'Ты помощник, который составляет структуру статей на основе ключевых слов.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    if (response.ok) {
        incrementUsage();
        updateRateLimitDisplay();
    }
    if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
            const error = await response.json();
            errorMsg = error.error?.message || errorMsg;
        } catch (e) { }
        throw new Error(errorMsg);
    }
    const data = await response.json();
    return data.choices[0].message.content;
}

updateRateLimitDisplay();
addBtn.addEventListener('click', () => {
    addModal.classList.add('active');
    updateHints();
});
closeAddBtns.forEach(b => b.addEventListener('click', () => addModal.classList.remove('active')));
saveNewDataBtn.addEventListener('click', async () => {
    const p = newParentInput.value.trim();
    const c = newChildInput.value.trim();
    const q = newQueryInput.value.trim();
    const f = parseInt(newFreqInput.value, 10);
    if (!p || !c || !q) {
        showModal('Ошибка', 'Заполните все поля!');
        return;
    }
    const originalBtnText = saveNewDataBtn.textContent;
    saveNewDataBtn.textContent = "Сохранение...";
    saveNewDataBtn.disabled = true;
    try {
        const sectionRef = doc(db, COLLECTION_NAME, p);
        const docSnap = await getDoc(sectionRef);
        let currentSectionData = {};
        if (docSnap.exists()) {
            currentSectionData = docSnap.data();
        }
        if (!currentSectionData[c]) {
            currentSectionData[c] = [];
        }
        const exists = currentSectionData[c].some(item => item.query === q);
        if (exists) {
            showModal('Дубликат', 'Такой запрос уже есть в базе!');
            saveNewDataBtn.textContent = originalBtnText;
            saveNewDataBtn.disabled = false;
            return;
        }
        currentSectionData[c].push({ query: q, frequency: f || 0 });
        await setDoc(sectionRef, currentSectionData, { merge: true });
        newQueryInput.value = '';
        showModal('Успешно', `✓ Запрос "${q}" сохранен в облако!`);
        saveNewDataBtn.textContent = originalBtnText;
        saveNewDataBtn.disabled = false;
        currentParentValue = p;
        currentChildValue = c;
    } catch (e) {
        console.error("Ошибка сохранения:", e);
        showModal('Ошибка сохранения', 'Ошибка при сохранении: ' + e.message);
        saveNewDataBtn.textContent = originalBtnText;
        saveNewDataBtn.disabled = false;
    }
});
const infoBtn = document.getElementById('info-btn');
const infoModal = document.getElementById('info-modal');
if (infoBtn) infoBtn.addEventListener('click', () => infoModal.classList.add('active'));
document.querySelectorAll('.modal-close-trigger').forEach(b => b.addEventListener('click', () => infoModal.classList.remove('active')));
function showInfoModal(text) {
    const modal = document.getElementById('info-modal');
    const modalText = document.getElementById('info-modal-text');
    if (modalText) {
        modalText.textContent = text;
    }
    modal.classList.add('active');
}
document.querySelectorAll('.info-icon-btn[data-info]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // чтобы не закрывалось сразу
        const type = btn.getAttribute('data-info');
        let message = '';
        switch (type) {
            case 'token':
                message = 'Вставьте ваш классический токен GitHub, который начинается с ghp_. \n\nСоздать можно на github.com/settings/tokens (выберите "Classic token", бессрочный, без прав).';
                break;
            case 'model':
                message = 'Выберите модель для генерации. gpt-4o — лучший вариант. gpt-4o-mini — быстрее, качество ниже. Llama-3.3-70B — хз вообще. У всех общий лимит 150 запросов в день.';
                break;
            case 'content':
                message = 'Вы можете записать ваши собственные шаблоны промптов для генерации структур "Услуг" и "Инфостатей", а также в любой момент переключаться между ними.';
                break;
            case 'toponim':
                message = 'Напиши свой топоним, который будет подменять "Москву"';
                break;
            case 'maket':
                message = 'Промпт используемый для генерации структуры.\n\n H1: {{title}} \n\nКлючевые слова: {{keys}} \n\n Промпт можно изменять.';
                break;
            case 'textprompt':
                message = 'Промпт используемый для генерации текста.\n\nH1: {{title}} \n\nКлючевые слова: {{keys}}\n\n LSI-фразы: {{lsi}}\n\n Структура: {{current_h2}}\n\n Предыдущий сгенерированный текст статьи\n (используй как контекст): {{previous_content}} - складывается в рамках 1й статьи и сбрасывается\n при работе с новым H1\n\n Промпт можно изменять.';
                break;
            case 'titleatonce':
                message = 'Число заголовков, которые будут браться из ячейки структуры для генерации за один запрос.\n\nПомните, у нейронки есть ограничения:\n\nНа запрос - 8,000–16,000 токенов (от модели);\n\nЗапросов в минуту - 15;\n\nЗапросы в день - 50 на каждую модель;\n\nНа ответ - 4,000 токенов на один ответ;\n\n ';
                break;
            default:
                message = 'Подсказка';
        }
        showInfoModal(message);
    });
});
(function () {
    const modelWrapper = document.getElementById('custom-model-select');
    const modelSelectedDiv = modelWrapper.querySelector('.select-selected');
    const modelSelectedText = document.getElementById('selected-model-text');
    const modelOptionsContainer = document.getElementById('model-options-container');
    const modelHiddenInput = document.getElementById('model-input');
    const modelOptionItems = modelOptionsContainer.querySelectorAll('.option-item');
    modelSelectedDiv.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.select-items').forEach(container => {
            if (container !== modelOptionsContainer) {
                container.classList.add('select-hide');
                container.previousElementSibling.classList.remove('select-arrow-active');
            }
        });
        modelOptionsContainer.classList.toggle('select-hide');
        modelSelectedDiv.classList.toggle('select-arrow-active');
    });
    modelOptionItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            const value = this.getAttribute('data-value') || this.textContent;
            modelSelectedText.textContent = this.textContent;
            modelHiddenInput.value = value;
            modelOptionsContainer.classList.add('select-hide');
            modelSelectedDiv.classList.remove('select-arrow-active');
        });
    });
})();
document.addEventListener('click', function () {
    document.querySelectorAll('.select-items').forEach(container => {
        container.classList.add('select-hide');
        container.previousElementSibling.classList.remove('select-arrow-active');
    });
});// --------------------- Новые переменные ---------------------




// Шаблон по умолчанию для текста
const defaultTextTemplate = `Роль и задача:
Ты — экспертный медицинский копирайтер с 10+ летним опытом в наркологии и психотерапии. Пишешь глубокий, человечный, доверительный и профессиональный текст для страницы услуги наркологической клиники. Текст должен полностью соответствовать принципам E-E-A-T и быть конкурентоспособным в поисковой выдаче (в том числе в региональной).
Входные данные:
H1: {{title}}
Ключевые слова: {{keys}}
LSI-фразы: {{lsi}}
Структура: {{current_h2}}
Объём: от 1300 символов до 1500 на каждый заголовок h2
Название клиники: [Название-Клиники]
Город: [Ваш-Город]
Телефон: 8(XXX)-XXX-XX-XX
Предыдущий сгенерированный текст статьи (используй как контекст для continuity): {{previous_content}} (игнорировать, если значение пустое. Если контекст есть: то твоя задача - ДОПИСАТЬ статью, НЕ ПОВТОРЯЯ h1 )
Жёсткие требования к стилю и форматированию
Ограничение на списки — ключевое правило:
Используй маркированные и нумерованные списки максимум 2–3 раза за весь текст и только в самых подходящих местах.
Примеры оправданного использования списков: • основные противопоказания • короткий перечень самых тревожных симптомов (4–6 пунктов максимум) • 4–5 ключевых этапов программы (если их действительно удобно представить именно так)
Запрещено превращать в списки: • признаки и симптомы • преимущества клиники / лечения • методы терапии • показания • причины развития зависимости • что входит в программу
Вместо списков пиши связный, плавный текст с абзацами, переходами, примерами из практики и пояснениями.
Остальные требования (без изменений, но с уточнениями):
Полный разбор проблемы: суть состояния, как оно развивается, явные и скрытые признаки, критические моменты, когда уже нельзя тянуть с обращением.
Медицинская точность: показания, противопоказания, группы препаратов (без дозировок), актуальные методы лечения 2024–2026 гг.
SEO: естественное вхождение ключей и LSI, разные словоформы, нулевая «вода», конкурентный объём и плотность.
Таблицы: 0–2 штуки, только если действительно полезны (например, сравнение сроков / подходов). Краткие, 2–3 колонки.
Цитаты: 1–2 экспертные цитаты (главврач / клинические рекомендации) в теге blockquote.
Тон: поддерживающий, серьёзный, честный, без приукрашиваний и ложных гарантий.
(Выполнять ТОЛЬКО ЕСЛИ НЕТ КОНТЕКСТА - После H1 заголовка и перед первым H2 должен быть анонс)
Последний H2 обязательно содержит топоним (город или «в [городе]»).
Ответ выдавай виде текста с html разметкой, (ты можешь использовать такие теги как: <p>,</p>,<b>,</b>,<h>,</h>,<ul>,</ul>,<ol>,</ol>,<li>,</li>,<blockquote>,</blockquote>,<table>,</table>,<td>,</td>,<tr>,</tr>,<td>,</td> ) 
Строгие запреты:
Пустые фразы «лучшая клиника», «гарантируем результат», «навсегда избавим» и т.п.
Канцеляризмы и сухой медицинский жаргон без пояснений.
Искусственное раздувание текста списками вместо нормального повествования.
Более 3 списков в статье (это жёсткий лимит).
Не используй markdown разметку, не оборачивай текст в блоки кода (\`\`\`)`;

let textTemplate = localStorage.getItem('text_prompt_template') || defaultTextTemplate;
document.getElementById('text-prompt-template').value = textTemplate;

document.getElementById('text-prompt-template').addEventListener('input', e => {
    textTemplate = e.target.value;
    localStorage.setItem('text_prompt_template', textTemplate);
});

// Вспомогательная функция — получение всех непустых строк таблицы
function getTableData() {
    const rows = taskTable.tBodies[0].rows;
    const data = [];
    for (let row of rows) {
        const cells = row.cells;
        const title = cells[0].innerText.trim();
        const keys = cells[1].innerText.trim();
        const lsi = cells[2].innerText.trim();
        let structure = cells[3].innerText.trim();

        if (!title || !keys || !structure) continue; // пропускаем пустые строки

        // Чистим структуру от лишних пустых строк и убираем H1 если есть
        let headers = structure
            .split('\n')
            .map(h => h.trim())
            .filter(h => h && !h.match(/^H1/i)); // убираем H1 и пустые

        if (headers.length === 0) continue;

        data.push({ title, keys, lsi, headers });
    }
    return data;
}

// ====================== ГЕНЕРАЦИЯ СТРУКТУРЫ + АВТОЗАПОЛНЕНИЕ ТАБЛИЦЫ ======================
generateBtn.addEventListener('click', async () => {
    if (!currentChildValue) {
        showModal('Внимание', 'Сначала выберите категорию!');
        return;
    }
    const keyItems = document.querySelectorAll('#result-list li span:first-child');
    if (keyItems.length === 0) {
        showModal('Внимание', 'Сначала сгенерируйте список ключей (кнопка "Рандомизировать")');
        return;
    }

    const keys = Array.from(keyItems).map(span => span.textContent).join(', ');
    let template = promptTemplate.value;
    template = template.replace(/\{\{keys\}\}/g, keys);
    template = template.replace(/\{\{title\}\}/g, currentChildValue);

    const token = tokenInput.value.trim();
    if (!token) {
        showModal('Ошибка', 'Введите токен GitHub');
        return;
    }

    const model = modelInput.value;
    generateBtn.disabled = true;
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Генерация...';
    structureResult.style.display = 'block';
    structureResult.textContent = 'Отправка запроса...';

    try {
        const result = await callGitHubModels(template, token, model);
        structureResult.textContent = result;

        // ←←← АВТОМАТИЧЕСКОЕ ЗАПОЛНЕНИЕ ТАБЛИЦЫ ←←←
        autoFillTableFromStructure(result);

    } catch (error) {
        structureResult.textContent = `Ошибка: ${error.message}`;
        console.error(error);
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = originalText;
    }
});

generateTextBtn.addEventListener('click', async () => {
    const token = document.getElementById('github-token').value.trim();
    if (!token) return showModal('Ошибка', 'Введите GitHub токен');

    const data = getTableData();
    if (data.length === 0) return showModal('Ошибка', 'Нет заполненных строк в таблице');

    const model = document.getElementById('model-input').value;
    const nHeaders = parseInt(headersPerRequestInput.value) || 1;

    let totalChunks = 0;
    data.forEach(item => totalChunks += Math.ceil(item.headers.length / nHeaders));

    if (totalChunks === 0) return;

    generatedHTML = '';

    const panel = document.getElementById('text-generation-panel');
    const progressBar = document.getElementById('generation-progress');
    const statusText = document.getElementById('generation-status-text');

    panel.style.display = 'block';
    progressBar.value = 0;
    statusText.textContent = 'Подготовка...';
    generateTextBtn.disabled = true;
    downloadBtn.disabled = true;

    let completedChunks = 0;

    // Защита от повторного запуска
    generateTextBtn.textContent = 'Генерация... (не прерывать)';

    function updateProgress() {
        const percent = Math.round((completedChunks / totalChunks) * 100);
        progressBar.value = percent;
        statusText.textContent = `Генерируется текст... (${completedChunks}/${totalChunks} блоков)`;
    }

    const delay = ms => new Promise(r => setTimeout(r, ms));

    try {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            statusText.textContent = `Статья: «${item.title}» (${item.headers.length} заголовков)`;

            let pos = 0;
            let currentContext = ''; // можно ограничить длину, например последние 8000 символов

            if (i > 0) generatedHTML += '\n\n<hr>\n\n';
           // generatedHTML += `<h1>${item.title}</h1>\n\n`;

            while (pos < item.headers.length) {
                const chunk = item.headers.slice(pos, pos + nHeaders);
                pos += nHeaders;

                const currentH2s = chunk.map(h => `H2 - *${h}*`).join('\n');

                let prompt = textTemplate
                    .replace(/\{\{title}}/g, item.title)
                    .replace(/\{\{keys}}/g, item.keys)
                    .replace(/\{\{lsi}}/g, item.lsi || '')
                    .replace(/\{\{previous_content}}/g, currentContext.slice(-6000)) // ← ограничение контекста
                    .replace(/\{\{current_h2}}/g, currentH2s);

                statusText.textContent = `Генерация ${Math.ceil(pos / nHeaders)}/${Math.ceil(item.headers.length / nHeaders)} → «${item.title}»`;

                const response = await callGitHubModels(prompt, token, model);

                // Задержка после запроса (можно уменьшить до 10000–12000)
                await delay(30000);

                completedChunks++;
                updateProgress();
                
                const cleaned = cleanAIResponse(response);
                const trimmed = cleaned.trim(); 

                generatedHTML += trimmed + '\n\n';
                currentContext += trimmed + '\n\n';
                
            }

            generatedHTML += '<h6>КОНЕЦ СТАТЬИ</h6>\n\n';
        }
        generatedHTML = cleanDuplicatesHTML(generatedHTML);
        localStorage.setItem('last_generated_text', generatedHTML);
        progressBar.value = 100;
        statusText.textContent = 'Готово! Можно скачать.';
        downloadBtn.disabled = false;

    } catch (err) {
        statusText.textContent = `Ошибка: ${err.message}`;
        statusText.style.color = '#dc3545';
        progressBar.value = Math.min(95, progressBar.value);
        console.error(err);
        showModal('Ошибка генерации', err.message);
    } finally {
        generateTextBtn.disabled = false;
        generateTextBtn.textContent = 'Сгенерировать текст'; // возвращаем исходный текст
    }
});

// Скачивание
downloadBtn.addEventListener('click', () => {
    if (!generatedHTML) return;

    // Меняем расширение и немного подправляем заголовок
    const content = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <title>${document.querySelector('#task-table tbody tr td')?.innerText.trim() || 'Сгенерированные статьи'}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
${generatedHTML}
<\/body>
<\/html>`;

    const blob = new Blob([content], { type: 'application/msword' });  // ← важная строка

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `статьи_${new Date().toISOString().slice(0, 10)}.doc`;   // ← .doc вместо .html
    a.click();
    URL.revokeObjectURL(url);
});

// Очистить таблицу — через модал
document.getElementById('clear-table-btn').addEventListener('click', () => {
    document.getElementById('clear-confirm-modal').classList.add('active');
});

// Подтверждение очистки
document.getElementById('confirm-clear-btn').addEventListener('click', () => {
    const rows = taskTable.tBodies[0].rows;
    while (rows.length > 5) rows[rows.length - 1].remove();
    for (let row of rows) {
        for (let cell of row.cells) cell.innerText = '';
    }
    generatedHTML = '';
    downloadBtn.disabled = true;
    saveTableToLocalStorage();
    // скрываем модал
    document.getElementById('clear-confirm-modal').classList.remove('active');

    // можно показать уведомление
    showModal('Готово', 'Таблица очищена');
});

document.getElementById('copy-table-btn').addEventListener('click', async () => {
    const rows = taskTable.tBodies[0].rows;
    let tsv = '';

    // Собираем данные в формате TSV (tab-separated values) с правильным экранированием
    for (let row of rows) {
        const cells = Array.from(row.cells).map(cell => {
            let text = cell.innerText.trim();

            // Если в ячейке есть кавычки — экранируем их удвоением (стандарт CSV/TSV)
            text = text.replace(/"/g, '""');

            // Оборачиваем в кавычки, если в тексте есть таб, перенос строки или кавычки
            if (text.includes('\t') || text.includes('\n') || text.includes('"')) {
                return `"${text}"`;
            }
            return text;
        });

        // Пропускаем полностью пустые строки
        if (cells.every(c => c === '')) continue;

        tsv += cells.join('\t') + '\n';
    }

    if (!tsv.trim()) {
        showModal('Пусто', 'В таблице нет данных для копирования');
        return;
    }

    try {
        await navigator.clipboard.writeText(tsv);

        // Визуальная обратная связь
        const btn = document.getElementById('copy-table-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Скопировано!';
        btn.style.backgroundColor = '#28a745'; // зелёный на 2 секунды (опционально)
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = ''; // возвращаем исходный цвет
            btn.disabled = false;
        }, 2000);
    } catch (err) {
        console.error('Ошибка копирования:', err);
        showModal('Ошибка', 'Не удалось скопировать в буфер обмена.\nПопробуйте выделить таблицу вручную.');
    }
});
// В конец скрипта (после всех addEventListener)
document.addEventListener('click', function (e) {
    // Закрытие по крестику .modal-close-btn
    if (e.target.classList.contains('modal-close-btn') ||
        e.target.classList.contains('modal-close-trigger')) {

        // Находим ближайшую модалку и скрываем её
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
        }
    }
});
})



</script>
