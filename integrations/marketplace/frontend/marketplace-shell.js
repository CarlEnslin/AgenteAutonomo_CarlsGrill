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


  // Media are host-filtered. Requiring explicit approval prevents a stale or
  // imported private asset from appearing accidentally in this public UI.
  function safeMediaUrl(raw) {
    if (typeof raw !== 'string' || !raw.trim() || raw.startsWith('//')) return null;
    if (!raw.startsWith('/') && !/^https:\/\//i.test(raw)) return null;
    try {
      const url = new URL(raw, document.baseURI);
      const base = new URL(document.baseURI);
      if (url.username || url.password) return null;
      if (url.protocol !== 'https:' && !(url.protocol === 'http:' && url.origin === base.origin)) return null;
      return url.href;
    } catch (_) {
      return null;
    }
  }

  function mediaPreview(source, mobile, alt, isPoster) {
    const dialog = node('dialog', 'im-lightbox');
    dialog.setAttribute('aria-label', 'Fotografía ampliada');
    const close = makeButton('Cerrar imagen', () => dialog.close());
    close.classList.add('im-lightbox-close');
    const viewport = node('div', 'im-lightbox-viewport');
    const picture = node('picture');
    if (mobile) {
      const alternate = node('source');
      alternate.media = '(max-width: 640px)';
      alternate.srcset = mobile;
      picture.append(alternate);
    }
    const image = node('img');
    image.src = source;
    image.alt = alt;
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.className = isPoster ? 'im-preview-poster' : 'im-preview-photo';
    picture.append(image);
    viewport.append(picture);
    dialog.append(close, viewport);
    dialog.addEventListener('close', () => dialog.remove(), {once:true});
    document.body.append(dialog);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function mediaFor(entry) {
    const media = Array.isArray(entry.images) ? entry.images.find(item =>
      item && item.approved === true && safeMediaUrl(item.src)
    ) : null;
    if (!media) return null;
    const source = safeMediaUrl(media.src);
    const mobile = safeMediaUrl(media.mobile_src);
    const orientation = ['portrait', 'square', 'landscape', 'wide'].includes(media.orientation)
      ? media.orientation : 'landscape';
    const isPoster = media.kind === 'poster';
    const fit = media.fit === 'contain' || (isPoster && media.fit !== 'cover') ? 'contain' : 'cover';
    const alt = typeof media.alt === 'string' && media.alt.trim() ? media.alt : (entry.title || 'Fotografía de la experiencia');
    const frame = node('div', 'im-media');
    frame.dataset.orientation = orientation;
    frame.dataset.fit = fit;
    const button = node('button', 'im-media-button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Ampliar fotografía: ' + alt);
    const picture = node('picture');
    if (mobile) {
      const alternate = node('source');
      alternate.media = '(max-width: 640px)';
      alternate.srcset = mobile;
      picture.append(alternate);
    }
    const image = node('img');
    image.src = source;
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    picture.append(image);
    button.append(picture);
    button.addEventListener('click', () => mediaPreview(source, mobile, alt, isPoster));
    frame.append(button);
    return frame;
  }

  function priceFor(entry, formatMoney) {
    // A recovered or historical price may be useful internally, but must
    // never become a customer-facing quote without a verified current source.
    if ((entry.status === 'AVAILABLE' || entry.status === 'RESERVATION_ONLY') &&
        entry.source_status === 'VERIFIED' &&
        Number.isSafeInteger(entry.price_minor) && entry.price_minor >= 0) {
      const amount = formatMoney(entry.price_minor, entry.currency || 'PEN');
      return (entry.price_from === true ? 'Desde ' : '') + amount + (typeof entry.price_unit === 'string' && entry.price_unit.trim()
        ? ' / ' + entry.price_unit : '');
    }
    return null;
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
        : entry.kind === 'service' ? (entry.category === 'tourism' ? 'Experiencia' : 'Servicio')
        : entry.kind === 'experience' ? 'Experiencia'
        : 'Producto';
      top.append(
        node('span', 'im-pill', categoryLabels[entry.category] || 'Marketplace'),
        node('span', 'im-kind', kind)
      );
      card.append(top);
      const media = mediaFor(entry);
      if (media) card.append(media);

      const body = node('div', 'im-card-body');
      body.append(
        node('h2', '', entry.title || 'Oferta sin título'),
        node('p', 'im-description', entry.summary || 'Información pendiente de completar.')
      );

      const meta = node('div', 'im-meta');
      if (entry.location) meta.append(node('span', '', `📍 ${entry.location}`));
      if (entry.provider_name) meta.append(node('span', '', `Por ${entry.provider_name}`));
      const validPrice = priceFor(entry, formatMoney);
      if (validPrice !== null) {
        meta.append(node('strong', 'im-price', validPrice));
      } else {
        const text = entry.source_status === 'STALE'
          ? 'Referencia histórica: confirmar tarifa'
          : 'Tarifa por confirmar';
        meta.append(node('span', 'im-price im-price-pending', text));
      }
      if (entry.source_status === 'VERIFIED' &&
          (entry.status === 'AVAILABLE' || entry.status === 'RESERVATION_ONLY') &&
          Array.isArray(entry.price_variants)) {
        entry.price_variants
          .filter(v => v && Number.isSafeInteger(v.amount_minor) && v.amount_minor >= 0 &&
            typeof v.label === 'string' && v.label.trim())
          .slice(0, 5).forEach(v => {
            const amount = formatMoney(v.amount_minor, v.currency || entry.currency || 'PEN');
            meta.append(node('span', 'im-variant-price', v.label + ': ' + amount));
          });
      }
      if (typeof entry.conditions_public === 'string' && entry.conditions_public.trim()) {
        meta.append(node('span', 'im-conditions', entry.conditions_public));
      }
      body.append(meta);
      card.append(body);

      const footer = node('div', 'im-card-footer');
      const status = entry.status === 'AVAILABLE' ? 'Disponible'
        : entry.status === 'RESERVATION_ONLY' ? 'Solo con reserva (por confirmar)'
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