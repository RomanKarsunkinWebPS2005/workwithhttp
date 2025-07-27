import { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } from './js/api';
import { showLoader, renderTickets, renderDescription } from './js/ui';
import { showTicketModal, showDeleteModal } from './js/modal';

const ticketsList = document.querySelector('.tickets-list');
const addTicketBtn = document.querySelector('.add-ticket-btn');

async function loadTickets() {
  showLoader(ticketsList);
  try {
    const tickets = await getAllTickets();
    renderTickets(tickets, ticketsList);
  } catch (e) {
    ticketsList.innerHTML = '<div style="color:red">Ошибка загрузки тикетов</div>';
  }
}

addTicketBtn.addEventListener('click', () => {
  showTicketModal({
    mode: 'add',
    onOk: async ({ name, description }) => {
      await createTicket({ name, description, status: false });
      loadTickets();
    },
  });
});

ticketsList.addEventListener('click', async (e) => {
  const target = e.target;
  const row = target.closest('.ticket-row');
  if (!row) return;
  const id = target.dataset.id;

  if (target.classList.contains('ticket-checkbox')) {
    const ticket = await getTicketById(id);
    await updateTicket(id, { name: ticket.name, description: ticket.description, status: !ticket.status });
    loadTickets();
    return;
  }

  if (target.classList.contains('edit-btn')) {
    const ticket = await getTicketById(id);
    showTicketModal({
      mode: 'edit',
      ticket,
      onOk: async ({ name, description }) => {
        await updateTicket(id, { name, description, status: ticket.status });
        loadTickets();
      },
    });
    return;
  }

  if (target.classList.contains('delete-btn')) {
    showDeleteModal({
      onOk: async () => {
        await deleteTicket(id);
        loadTickets();
      },
    });
    return;
  }

  if (target.classList.contains('ticket-name')) {
    const ticket = await getTicketById(id);
    renderDescription(row, ticket.description);
    return;
  }
});

loadTickets(); 