<template>
  <div class="page-layout">
    <aside class="sidebar controls-container">
      <h3>Сгенерированные статьи</h3>
      <div v-if="tableItems.length === 0" class="empty-state">
        Пока нет статей.
      </div>
      <ul class="article-list">
        <li
          v-for="(item, index) in tableItems"
          :key="index"
          :class="{ active: selectedIndex === index }"
          @click="selectArticle(index)"
        >
          {{ item.title || `Статья ${index + 1}` }}
          <small>({{ item.keysCount }} ключей)</small>
        </li>
      </ul>
    </aside>

    <main class="main-content">
      <h1>Проверка вхождений</h1>

      <div class="centration-modif">
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; max-width: 980px; margin: 20px auto;">
          <!-- LSI -->
          <div class="controls-container" style="max-width: 400px;">
            <div class="control-group">
              <label for="lsi-input">Список LSI-слов:</label>
              <textarea
                id="lsi-input"
                class="custom-input custom-area"
                rows="8"
                v-model="lsiText"
                placeholder="LSI фраза 1&#10;LSI фраза 2&#10;..."
              ></textarea>
            </div>
          </div>

          <!-- Ключи -->
          <div class="controls-container" style="max-width: 400px;">
            <div class="control-group">
              <label for="keys-input">Список ключевых запросов:</label>
              <textarea
                id="keys-input"
                class="custom-input custom-area"
                rows="8"
                v-model="keysText"
                placeholder="основной ключ&#10;ключ в скобках&#10;..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Toolbar + Rich Editor -->
        <div class="controls-container" style="max-width: 980px; margin: 20px auto;">
        <div style = "display:flex; max-height: 50px; justify-content: space-between; align-items: center; margin-bottom:24px;">
          <!-- <div class="editor-toolbar">
            <button @click="format('bold')" title="Жирный">𝐁</button>
            <button @click="format('italic')" title="Курсив">𝑖</button>
            <button @click="format('underline')" title="Подчёркнутый">𝐔</button>
            <button @click="format('insertUnorderedList')" title="Маркированный список">ul</button>
            <button @click="format('insertOrderedList')" title="Нумерованный список">ol</button>
            <button @click="format('formatBlock', 'h2')" title="H2">H2</button>
            <button @click="format('formatBlock', 'h3')" title="H3">H3</button>
          </div> -->
      <!-- Статистика -->
          <div class="counts" style=" font-weight: bold; ">
            LSI : {{ lsiFound }} из {{ lsiList.length }}<br>
            Ключи : {{ keyFound }} из {{ keyList.length }}
          </div> 
</div>

          <div
            id="rich-editor"
            contenteditable="true"
            class="rich-editor"
            @input="onEditorChange"
          ></div>

    
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const TABLE_STORAGE_KEY = 'task_table_data';
const GENERATED_HTML_KEY = 'last_generated_text';

const tableItems = ref([]);
const selectedIndex = ref(-1);

const lsiText = ref('');
const keysText = ref('');
const currentHTML = ref('');

// Вычисляемые списки для подсчёта
const lsiList = computed(() => lsiText.value.split('\n').map(s => s.trim()).filter(Boolean));
const keyList = computed(() => keysText.value.split('\n').map(s => s.trim()).filter(Boolean));

const lsiFound = ref(0);
const keyFound = ref(0);

// ────────────────────────────────────────────────
// Простой debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// ────────────────────────────────────────────────
function loadTableData() {
  const saved = localStorage.getItem(TABLE_STORAGE_KEY);
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    tableItems.value = data
      .map((row, i) => ({
        title: row[0]?.trim() || '',
        keys: row[1]?.trim() || '',
        lsi: row[2]?.trim() || '',
        keysCount: row[1] ? row[1].split('\n').filter(Boolean).length : 0
      }))
      .filter(item => item.title);
  } catch (e) {}
}

function loadGeneratedHTML() {
  currentHTML.value = localStorage.getItem(GENERATED_HTML_KEY) || '';
}

// ────────────────────────────────────────────────
function extractSectionByTitle(fullHTML, title) {
  if (!fullHTML || !title) return '<p>Текст не найден</p>';

  const parser = new DOMParser();
  const doc = parser.parseFromString(fullHTML, 'text/html');
  const h1s = Array.from(doc.querySelectorAll('h1'));

  const targetIndex = h1s.findIndex(h1 => h1.textContent.trim() === title.trim());
  if (targetIndex === -1) return fullHTML;

  let html = '';
  let current = h1s[targetIndex];

  while (current && (!current.nextElementSibling || current.nextElementSibling.tagName !== 'H1')) {
    html += current.outerHTML || current.textContent + '\n';
    current = current.nextSibling;
  }
  // добавляем следующий h1, если он есть (граница)
  if (current && current.tagName === 'H1') {
    html += current.outerHTML;
  }

  return html || '<p>Раздел не удалось извлечь</p>';
}

// ────────────────────────────────────────────────
function selectArticle(index) {
  if (index < 0 || index >= tableItems.value.length) return;

  selectedIndex.value = index;
  const item = tableItems.value[index];

  lsiText.value = item.lsi || '';
  keysText.value = item.keys || '';

  const sectionHTML = extractSectionByTitle(currentHTML.value, item.title);
  const editor = document.getElementById('rich-editor');
  
  if (editor) {
    editor.innerHTML = sectionHTML;
  }

  // После подгрузки статьи — запускаем подсветку
  setTimeout(() => {
    highlightInEditor();
    updateCounts(); // <--- ДОБАВИТЬ ЭТУ СТРОКУ: принудительно обновить счетчики
  }, 150);
}

// ────────────────────────────────────────────────
function format(command, value = null) {
  document.execCommand(command, false, value);
  onEditorChange();
}

// ────────────────────────────────────────────────
// Подсветка через Range и TreeWalker (без полной перезаписи)
function highlightInEditor() {
  const editor = document.getElementById('rich-editor');
  if (!editor) return;

  // 1. Убираем старую подсветку (удаляем наши span'ы, сохраняем текст)
  const oldSpans = editor.querySelectorAll('.lsi-highlight, .key-highlight, .non-cyrillic');
  oldSpans.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  });
  editor.normalize(); // сливаем соседние текстовые узлы

  // 2. Собираем все текстовые узлы
  const textNodes = [];
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, {
    acceptNode: node => {
      // Пропускаем узлы внутри уже существующих span (чтобы не зациклиться)
      if (node.parentElement.closest('.lsi-highlight, .key-highlight, .non-cyrillic')) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });

  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  // 3. Обрабатываем каждый текстовый узел
  textNodes.forEach(textNode => {
    let text = textNode.nodeValue;
    if (!text.trim()) return;

    const matches = [];

    // non-cyrillic
    
    let regexNonCyr = /([^а-яА-ЯёЁ0-9\s.,!?;:"'«»()—–\-]+)/gi;
    let match;
    while ((match = regexNonCyr.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'non-cyrillic',
        text: match[0]
      });
    }

    // LSI
    lsiList.value.forEach(phrase => {
      if (!phrase) return;
      const re = new RegExp(escapeRegExp(phrase), 'gi');
      while ((match = re.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'lsi-highlight',
          text: match[0]
        });
      }
    });

    // Ключи (последними — перекрывают LSI при совпадении)
    keyList.value.forEach(phrase => {
      if (!phrase) return;
      const re = new RegExp(escapeRegExp(phrase), 'gi');
      while ((match = re.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'key-highlight',
          text: match[0]
        });
      }
    });

    if (matches.length === 0) return;

    // Сортируем по началу, более длинные имеют приоритет при пересечении
    matches.sort((a, b) => a.start - b.start || b.end - a.end);

    const filtered = [];
    let prevEnd = -1;
    for (const m of matches) {
      if (m.start >= prevEnd) {
        filtered.push(m);
        prevEnd = m.end;
      }
    }

    // Разбиваем и оборачиваем
    let lastIndex = 0;
    const parent = textNode.parentNode;
    const nextSibling = textNode.nextSibling;

    filtered.forEach(m => {
      if (lastIndex < m.start) {
        parent.insertBefore(
          document.createTextNode(text.slice(lastIndex, m.start)),
          textNode
        );
      }

      const span = document.createElement('span');
      span.className = m.type;
      span.textContent = text.slice(m.start, m.end);
      parent.insertBefore(span, textNode);

      lastIndex = m.end;
    });

    if (lastIndex < text.length) {
      parent.insertBefore(
        document.createTextNode(text.slice(lastIndex)),
        textNode
      );
    }

    parent.removeChild(textNode);
    // normalize после всех изменений в этом узле
    parent.normalize();
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ────────────────────────────────────────────────
function updateCounts() {
  const editor = document.getElementById('rich-editor');
  if (!editor) return;

  const text = editor.innerText || '';

  lsiFound.value = lsiList.value.filter(phrase =>
    phrase && new RegExp(escapeRegExp(phrase), 'gi').test(text)
  ).length;

  keyFound.value = keyList.value.filter(phrase =>
    phrase && new RegExp(escapeRegExp(phrase), 'gi').test(text)
  ).length;
}

// ────────────────────────────────────────────────
function saveCurrentText() {
  const editor = document.getElementById('rich-editor');
  if (!editor || selectedIndex.value === -1) return;

  const title = tableItems.value[selectedIndex.value].title;
  let full = currentHTML.value;

  // Простая замена секции (не идеально, но работает для большинства случаев)
  const regex = new RegExp(`(<h1[^>]*>${escapeRegExp(title)}[^<]*</h1>)[\\s\\S]*?(?=<h1|$)`, 'i');
  //full = full.replace(regex, `$1${editor.innerHTML}`);
  full = full.replace(regex, editor.innerHTML); // теперь ниче не заменяется и текст не раздувается 


  currentHTML.value = full;
  localStorage.setItem(GENERATED_HTML_KEY, full);
}

// ────────────────────────────────────────────────
const debouncedHighlight = debounce(highlightInEditor, 700);

function onEditorChange() {
  updateCounts();
  saveCurrentText();
  debouncedHighlight();
}

// ────────────────────────────────────────────────
onMounted(() => {
  loadTableData();
  loadGeneratedHTML();

  const editor = document.getElementById('rich-editor');
  if (editor) {
    editor.addEventListener('input', onEditorChange);
    editor.addEventListener('keyup', updateCounts);
    editor.addEventListener('paste', () => setTimeout(debouncedHighlight, 400));
    editor.addEventListener('blur', highlightInEditor);
  }

  watch(selectedIndex, () => {
    setTimeout(highlightInEditor, 120);
  }, { immediate: true });

  watch([lsiList, keyList], () => {
    setTimeout(debouncedHighlight, 300);
  });
});
</script>