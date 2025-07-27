export function showTicketModal({ mode, ticket = {}, onOk, onCancel }) {
  const old = document.querySelector('.modal-overlay');
  if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-title">${mode === 'add' ? 'Добавить тикет' : 'Изменить тикет'}</div>
      <label class="modal-label">Краткое описание
        <input class="modal-input" name="name" value="${ticket.name || ''}" />
      </label>
      <label class="modal-label">Подробное описание
        <textarea class="modal-textarea" name="description">${ticket.description || ''}</textarea>
      </label>
      <div class="modal-actions">
        <button class="modal-btn cancel-btn">Отмена</button>
        <button class="modal-btn ok-btn">Ok</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.cancel-btn').onclick = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };
  overlay.querySelector('.ok-btn').onclick = () => {
    const name = overlay.querySelector('input[name="name"]').value.trim();
    const description = overlay.querySelector('textarea[name="description"]').value.trim();
    if (!name) {
      alert('Введите краткое описание');
      return;
    }
    overlay.remove();
    if (onOk) onOk({ name, description });
  };
}

export function showDeleteModal({ onOk, onCancel }) {
  const old = document.querySelector('.modal-overlay');
  if (old) old.remove();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-title">Удалить тикет</div>
      <div style="margin-bottom: 24px;">Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>
      <div class="modal-actions">
        <button class="modal-btn cancel-btn">Отмена</button>
        <button class="modal-btn ok-btn">Ok</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.cancel-btn').onclick = () => {
    overlay.remove();
    if (onCancel) onCancel();
  };
  overlay.querySelector('.ok-btn').onclick = () => {
    overlay.remove();
    if (onOk) onOk();
  };
} 