const MAX = 5;
let mode = "array";
let values = [];

const $ = id => document.getElementById(id);
const status = $("status");
function setStatus(message, type = "") {
  status.textContent = message;
  status.className = "status" + (type ? " " + type : "");
}
function renderStack() {
  const visual = $("stackVisual");
  visual.innerHTML = "";
  if (values.length === 0) {
    visual.innerHTML = '<div class="empty-state">Your stack is empty.<br><span>Push a value to add the first item.</span></div>';
  } else {
    values.forEach((value, index) => {
      const item = document.createElement("div");
      item.className = "stack-item" + (index === values.length - 1 ? " top-item" : "");
      const indexText = mode === "array" ? `Index ${index}` : `Node ${index + 1}`;
      item.innerHTML = `<span class="index">${indexText}</span><span class="value"></span>${index === values.length - 1 ? '<span class="top-tag">TOP</span>' : ""}`;
      item.querySelector(".value").textContent = value;
      visual.appendChild(item);
    });
  }
  $("count").textContent = values.length;
  $("topValue").textContent = values.length ? values[values.length - 1] : "—";
  $("capacity").textContent = mode === "array" ? MAX : "Dynamic";
  $("modeLabel").textContent = mode === "array" ? "Array" : "Linked list";
  $("indexNote").textContent = mode === "array"
    ? "Array indexes start at 0; the top index is size − 1."
    : "Each node points to the node below it; TOP points to the newest node.";
}
document.querySelectorAll(".tab").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b === button));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === button.dataset.tab));
}));
document.querySelectorAll(".mode").forEach(button => button.addEventListener("click", () => {
  mode = button.dataset.mode;
  document.querySelectorAll(".mode").forEach(b => b.classList.toggle("active", b === button));
  setStatus(mode === "array" ? "Array stack selected. Maximum capacity is five." : "Linked-list stack selected. Capacity grows with available memory.", "success");
  renderStack();
}));
$("pushBtn").addEventListener("click", () => {
  const raw = $("stackValue").value.trim();
  if (raw === "" || !Number.isFinite(Number(raw))) return setStatus("Enter a valid number before pushing.", "error");
  if (mode === "array" && values.length >= MAX) return setStatus("Stack Overflow! The array stack is full (maximum 5 items).", "error");
  const value = Number(raw);
  values.push(value);
  renderStack();
  setStatus(`${value} pushed onto the stack.`, "success");
});
$("popBtn").addEventListener("click", () => {
  if (!values.length) return setStatus("Stack Underflow! There is no item to remove.", "error");
  const value = values.pop();
  renderStack();
  setStatus(`${value} popped from the stack.`, "success");
});
$("peekBtn").addEventListener("click", () => {
  if (!values.length) return setStatus("The stack is empty; there is no top element.", "error");
  setStatus(`Top element is ${values[values.length - 1]}. No item was removed.`, "success");
});
$("clearBtn").addEventListener("click", () => {
  values = [];
  renderStack();
  setStatus("Stack cleared.", "success");
});
$("stackValue").addEventListener("keydown", e => { if (e.key === "Enter") $("pushBtn").click(); });
renderStack();

// Undo editor application: store the previous text state before applying a saved change.
const editor = $("editorText");
let undoHistory = [];
let lastSavedText = editor.value;
function renderHistory() {
  const list = $("historyList");
  list.innerHTML = "";
  $("historyCount").textContent = `${undoHistory.length} saved state${undoHistory.length === 1 ? "" : "s"}`;
  if (!undoHistory.length) {
    list.innerHTML = '<li class="history-empty">No saved states yet.</li>';
    return;
  }
  undoHistory.slice().reverse().forEach((state, i) => {
    const li = document.createElement("li");
    const preview = state.replace(/\s+/g, " ").trim();
    li.textContent = ` ${i === 0 ? "TOP — " : ""}${preview.length > 65 ? preview.slice(0, 65) + "…" : (preview || "(empty text)")}`;
    list.appendChild(li);
  });
}
function setUndoStatus(message, type = "") {
  $("undoStatus").textContent = message;
  $("undoStatus").className = "status" + (type ? " " + type : "");
}
$("saveChangeBtn").addEventListener("click", () => {
  const current = editor.value;
  if (current === lastSavedText) return setUndoStatus("No new change detected. Edit the text before saving a change.", "error");
  undoHistory.push(lastSavedText);
  lastSavedText = current;
  renderHistory();
  setUndoStatus("Change saved. The previous text state was pushed onto the undo stack.", "success");
});
$("undoBtn").addEventListener("click", () => {
  if (!undoHistory.length) return setUndoStatus("Nothing to undo. The undo stack is empty.", "error");
  const previous = undoHistory.pop();
  editor.value = previous;
  lastSavedText = previous;
  renderHistory();
  setUndoStatus("Undo complete. The most recently saved state was restored.", "success");
});
$("resetEditorBtn").addEventListener("click", () => {
  editor.value = "";
  undoHistory = [];
  lastSavedText = "";
  renderHistory();
  setUndoStatus("Editor reset and undo history cleared.", "success");
});
renderHistory();
