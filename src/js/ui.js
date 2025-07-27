import '../styles.css';

export function showLoader(container) {
  container.innerHTML = '<div class="loader"></div>';
}

export function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function renderTickets(tickets, container) {
  container.innerHTML = '';
  tickets.forEach(ticket => {
    const row = document.createElement('div');
    row.className = 'ticket-row';
    if (ticket.status) row.classList.add('selected');
    row.innerHTML = `
      <div class="ticket-checkbox${ticket.status ? ' checked' : ''}" data-id="${ticket.id}">${ticket.status ? '✔' : ''}</div>
      <div class="ticket-name" data-id="${ticket.id}">${ticket.name}</div>
      <div class="ticket-date">${formatDate(ticket.created)}</div>
      <div class="ticket-actions">
        <button class="ticket-action-btn edit-btn" data-id="${ticket.id}" title="Редактировать">✎</button>
        <button class="ticket-action-btn delete-btn" data-id="${ticket.id}" title="Удалить">×</button>
      </div>
    `;
    container.appendChild(row);
  });
}

export function renderDescription(row, description) {
  const next = row.nextElementSibling;
  if (next && next.classList.contains('ticket-description')) {
    next.remove();
    return;
  }
  const desc = document.createElement('div');
  desc.className = 'ticket-description';
  desc.textContent = description;
  row.insertAdjacentElement('afterend', desc);
} 