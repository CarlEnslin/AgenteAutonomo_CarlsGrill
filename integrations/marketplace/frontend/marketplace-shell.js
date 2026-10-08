/* INFINITY Marketplace — host-integrated presentation; no credentials or network calls. */
'use strict';
(() => {
  const node = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = String(text);
    return el;
  };
  const items = value => Array.isArray(value?.items) ? value.items : Array.isArray(value) ? value : [];
  const safeCount = value => Number.isFinite(value) && value >= 0 ? value : 0;

  const NAV_ITEM = Object.freeze({
    id: 'marketplace',
    route: 'marketplace',
    label: 'Marketplace',
    icon: '🛍',
    section: 'primary',
    priority: 10,
    persistent: true,
    requiredCapability: 'marketplace:view'
  });

  const categoryLabels = Object.freeze({
    tourism: 'Turismo',
    realestate: 'Inmobiliaria',
    outdoor: 'Grill & Outdoor',
    dental: 'Dental',
    events: 'Eventos',
    professionals: 'Profesionales'
  });

  function navItem({canAccess} = {}) {
    if (typeof canAccess === 'function' && !canAccess(NAV_ITEM.requiredCapability)) return null;
    return {...NAV_ITEM};
  }

  function makeButton(label, onClick, primary = false) {
    const button = node('button', primary ? 'im-button im-primary' : 'im-button', label);
    button.type = 'button';
    button.addEventListener('click', onClick);
    return button;
  }

  function normalizeCatalog(catalog) {
    return items(catalog).filter(entry => entry && entry.status !== 'HIDDEN');
  }

  function render({
    catalog,
    navigate,
    openItem,
    money,
    canAccess,
    selectedCategory = 'all',
    metrics = {}
  }) {
    if (typeof canAccess === 'function' && !canAccess('marketplace:view')) {
      throw new Error('No tienes permiso para ver INFINITY Marketplace.');
    }
    if (typeof navigate !== 'function') throw new Error('Falta la función de navegación del anfitrión.');
    if (typeof openItem !== 'function') throw new Error('Falta la función para abrir fichas del Marketplace.');

    const formatMoney = typeof money === 'function'
      ? money
      : (amountMinor, currency = 'PEN') => new Intl.NumberFormat('es-PE', {
          style: 'currency', currency
        }).format((Number(amountMinor) || 0) / 100);

    const all = normalizeCatalog(catalog);
    const visible = selectedCategory === 'all'
      ? all
      : all.filter(entry => entry.category === selectedCategory);

    const section = node('section', 'im-marketplace');
    section.setAttribute('aria-label', 'INFINITY Marketplace');

    const masthead = node('div', 'im-masthead');
    const title = node('div');
    title.append(
      node('span', 'im-kicker', 'INFINITY MARKETPLACE'),
      node('h1', '', 'Todo el ecosistema, un solo punto de venta.'),
      node('p', 'im-lede', 'Experiencias, propiedades, productos y profesionales conectados con CRM, atribución y seguimiento.')
    );
    const actions = node('div', 'im-actions');
    actions.append(
      makeButton('Mis oportunidades', () => navigate('pipeline'), true),
      makeButton('Mis ventas', () => navigate('sales'))
    );
    masthead.append(title, actions);
    section.append(masthead);

    const stats = node('div', 'im-stats');
    const available = all.filter(entry => entry.status === 'AVAILABLE').length;
    const serviceCount = all.filter(entry => entry.kind === 'service').length;
    const propertyCount = all.filter(entry => entry.kind === 'property').length;
    const productCount = all.filter(entry => entry.kind === 'product').length;
    [
      ['Disponibles', safeCount(metrics.available || available)],
      ['Propiedades', safeCount(metrics.properties || propertyCount)],
      ['Productos', safeCount(metrics.products || productCount)],
      ['Servicios', safeCount(metrics.services || serviceCount)]
    ].forEach(([label, value]) => {
      const card = node('div', 'im-stat');
      card.append(node('span', 'im-stat-label', label), node('strong', '', value));
      stats.append(card);
    });
    section.append(stats);

    const filters = node('div', 'im-filters');
    const filterEntries = [['all', 'Todo'], ...Object.entries(categoryLabels)];
    for (const [key, label] of filterEntries) {
      const btn = makeButton(label, () => navigate(`marketplace?category=${encodeURIComponent(key)}`));
      btn.classList.toggle('active', key === selectedCategory);
      filters.append(btn);
    }
    section.append(filters);

    const grid = node('div', 'im-grid');
    if (!visible.length) {
      const empty = node('div', 'im-empty');
      empty.append(
        node('strong', '', 'Todavía no hay ofertas publicables en esta categoría.'),
        node('span', '', 'INFINITY solo muestra fichas aprobadas y no inventa precios, disponibilidad ni condiciones.')
      );
      grid.append(empty);
    }

    visible.forEach(entry => {
      const card = node('article', 'im-card');
      const top = node('div', 'im-card-top');
      const kind = entry.kind === 'property' ? 'Propiedad'
        : entry.kind === 'service' ? 'Servicio'
        : entry.kind === 'experience' ? 'Experiencia'
        : 'Producto';
      top.append(
        node('span', 'im-pill', categoryLabels[entry.category] || 'Marketplace'),
        node('span', 'im-kind', kind)
      );
      card.append(top);

      const body = node('div', 'im-card-body');
      body.append(
        node('h2', '', entry.title || 'Oferta sin título'),
        node('p', 'im-description', entry.summary || 'Información pendiente de completar.')
      );

      const meta = node('div', 'im-meta');
      if (entry.location) meta.append(node('span', '', `📍 ${entry.location}`));
      if (entry.provider_name) meta.append(node('span', '', `Por ${entry.provider_name}`));
      if (entry.price_minor !== undefined && entry.price_minor !== null) {
        meta.append(node('strong', 'im-price', formatMoney(entry.price_minor, entry.currency || 'PEN')));
      } else {
        meta.append(node('span', 'im-price im-price-pending', 'Precio por confirmar'));
      }
      body.append(meta);
      card.append(body);

      const footer = node('div', 'im-card-footer');
      const status = entry.status === 'AVAILABLE' ? 'Disponible'
        : entry.status === 'TO_CONFIRM' ? 'Por confirmar'
        : entry.status === 'DRAFT' ? 'Borrador'
        : 'Revisar';
      footer.append(node('span', 'im-status', status));
      footer.append(makeButton('Ver ficha →', () => openItem(entry.id), true));
      card.append(footer);
      grid.append(card);
    });
    section.append(grid);

    const note = node('div', 'im-note');
    note.append(
      node('strong', '', 'Regla comercial'),
      node('span', '', 'Una ficha visible no equivale a disponibilidad, reserva o pago confirmado. El resultado debe quedar respaldado por la fuente o herramienta correspondiente.')
    );
    section.append(note);
    return section;
  }

  window.InfinityMarketplace = Object.freeze({NAV_ITEM, navItem, render});
})();