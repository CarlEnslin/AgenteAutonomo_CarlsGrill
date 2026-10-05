/* INFINITY / Carl's Grill — tenant-scoped presentation; no credentials or network calls. */
'use strict';
(() => {
  const node = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = String(text);
    return el;
  };
  const isCarlsGrill = tenant => String(tenant?.name || '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '') === 'carlsgrill';
  const list = value => Array.isArray(value?.items) ? value.items : [];
  const count = (value, fallback) => Number.isFinite(value) && value >= 0 ? value : fallback;
  const button = (label, page, navigate, primary = false) => {
    const el = node('button', primary ? 'cg-button cg-primary' : 'cg-button', label);
    el.type = 'button';
    el.addEventListener('click', () => navigate(page));
    return el;
  };
  function render({tenant, metrics = {}, leads, tasks, opportunities, navigate, money}) {
    if (!isCarlsGrill(tenant)) throw new Error('Esta vista requiere el negocio Carl’s Grill.');
    const section = node('section', 'cg-command');
    section.setAttribute('aria-label', 'Centro de operaciones de Carl’s Grill');
    const now = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    }).format(new Date());
    const masthead = node('div', 'cg-masthead');
    masthead.append(node('span', 'cg-kicker', 'INFINITY / CARL’S GRILL'), node('span', 'cg-stamp', `Actualizado ${now} · Lima`));
    section.append(masthead);
    const hero = node('div', 'cg-hero');
    const copy = node('div', 'cg-hero-copy');
    copy.append(node('span', 'cg-eyebrow', 'CENTRO DE OPERACIONES'), node('h1', '', 'El futuro se cocina aquí.'),
      node('p', 'cg-lede', 'De cada conversación a la siguiente experiencia. Tu negocio, tus oportunidades y tu equipo en una sola vista.'));
    const actions = node('div', 'cg-actions');
    actions.append(button('Ver oportunidades ↗', 'pipeline', navigate, true), button('Abrir marketing', 'marketing', navigate));
    copy.append(actions);
    const orbital = node('div', 'cg-orbital');
    orbital.setAttribute('aria-hidden', 'true');
    orbital.append(node('div', 'cg-orbit cg-orbit-one'), node('div', 'cg-orbit cg-orbit-two'),
      node('div', 'cg-orbit cg-orbit-three'), node('div', 'cg-core', '∞'), node('span', 'cg-orbit-caption', 'INCA · COWBOY'));
    hero.append(copy, orbital); section.append(hero);
    const open = list(tasks).filter(task => task.status === 'OPEN');
    const opps = list(opportunities);
    const revenue = Array.isArray(metrics.revenue_verified) ? metrics.revenue_verified : null;
    const revenueText = revenue === null ? 'No disponible' : revenue.length ? revenue.map(row => money(row.amount_minor, row.currency)).join(' · ') : 'Sin cierres';
    const cards = node('div', 'cg-metrics');
    const cardData = [
      ['01', 'Contactos', count(metrics.leads, list(leads).length), 'Registrados en este negocio', 'leads'],
      ['02', 'Oportunidades', count(metrics.opportunities, opps.length), 'Todas las etapas registradas', 'pipeline'],
      ['03', 'Tareas pendientes', count(metrics.tasks_open, open.length), 'Acciones para tu equipo', 'tasks'],
      ['04', 'Cierres con evidencia', revenueText, 'Importes registrados; no conciliados con banco', 'pipeline']
    ];
    for (const [number, label, value, help, page] of cardData) {
      const card = node('button', 'cg-metric'); card.type = 'button';
      card.addEventListener('click', () => navigate(page));
      const top = node('span', 'cg-metric-top'); top.append(node('span', '', label), node('span', 'cg-index', number));
      card.append(top, node('strong', 'cg-value', value), node('span', 'cg-help', help)); cards.append(card);
    }
    section.append(cards);
    const grid = node('div', 'cg-grid');
    const pipeline = node('article', 'cg-panel');
    const ph = node('div', 'cg-panel-head');
    ph.append(node('h2', '', 'El recorrido de tus ventas'), button('Abrir ↗', 'pipeline', navigate)); pipeline.append(ph);
    pipeline.append(node('p', 'cg-help', 'Distribución de las oportunidades cargadas. Una oportunidad no equivale a una reserva confirmada.'));
    const stages = [['NEW', 'Nuevas'], ['QUALIFIED', 'Calificadas'], ['PROPOSAL', 'Propuesta'], ['WON', 'Ganadas'], ['LOST', 'Sin venta']];
    const rows = node('div', 'cg-stages');
    for (const [key, label] of stages) {
      const value = opps.filter(item => item.stage === key).length;
      const row = node('div', 'cg-stage'); const title = node('div', 'cg-stage-title');
      title.append(node('span', '', label), node('strong', '', value));
      const meter = node('progress', `cg-progress cg-${key.toLowerCase()}`);
      meter.max = Math.max(opps.length, 1); meter.value = value; meter.setAttribute('aria-label', `${label}: ${value}`);
      row.append(title, meter); rows.append(row);
    }
    pipeline.append(rows);
    if (!opps.length) pipeline.append(node('p', 'cg-empty', 'Todavía no hay oportunidades registradas. Añade un contacto para comenzar.'));
    const pending = node('article', 'cg-panel'); const th = node('div', 'cg-panel-head');
    th.append(node('h2', '', 'Tu siguiente movimiento'), button('Ver tareas ↗', 'tasks', navigate)); pending.append(th);
    if (!open.length) pending.append(node('div', 'cg-empty-state', 'No hay tareas abiertas en los registros cargados.'));
    for (const [i, task] of open.slice(0, 4).entries()) {
      const row = node('div', 'cg-task'); const body = node('div');
      body.append(node('strong', '', task.title || 'Tarea pendiente'), node('span', 'cg-help', 'Pendiente de revisión'));
      row.append(node('span', 'cg-task-number', String(i + 1).padStart(2, '0')), body); pending.append(row);
    }
    pending.append(button('Ir a contactos', 'leads', navigate)); grid.append(pipeline, pending); section.append(grid);
    const quick = node('div', 'cg-quick');
    const quickLinks = [
      ['Conversaciones', 'Revisa consultas y su contexto.', 'inbox', '↗'],
      ['Contenido y campañas', 'Prepara el próximo mensaje de tu marca.', 'marketing', '✦'],
      ['Conexiones', 'Comprueba cuentas, permisos y canales.', 'connections', '⌘'],
      ['Asistente web', 'Prueba una consulta antes de usarla.', 'assistant', '∞']
    ];
    for (const [title, description, page, symbol] of quickLinks) {
      const link = button('', page, navigate); link.className = 'cg-quick-card';
      link.append(node('span', 'cg-quick-symbol', symbol), node('strong', '', title), node('span', 'cg-help', description)); quick.append(link);
    }
    section.append(quick);
    const footer = node('div', 'cg-development');
    footer.append(node('span', '', 'INFINITY × CARL’S GRILL'), node('span', 'cg-help', 'Un espacio conectado a tu operación.'));
    const repo = node('a', 'cg-repo', 'Repositorio de desarrollo ↗');
    repo.href = 'https://github.com/CarlEnslin/AgenteAutonomo_CarlsGrill'; repo.target = '_blank'; repo.rel = 'noopener noreferrer';
    footer.append(repo); section.append(footer);
    return section;
  }
  window.InfinityCarlsDashboard = Object.freeze({isCarlsGrill, render});
})();
