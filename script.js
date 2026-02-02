(function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const body = document.body;
  const links = document.querySelectorAll('.chapter-list a');

  const DESKTOP_BREAKPOINT = 900;

  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  function openSidebar() {
    body.classList.add('sidebar-open');
    if (!isDesktop()) {
      body.classList.remove('sidebar-collapsed');
    }
    sidebarOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    body.classList.remove('sidebar-open');
    sidebarOverlay.setAttribute('aria-hidden', 'true');
  }

  function collapseSidebar() {
    body.classList.add('sidebar-collapsed');
    closeSidebar();
  }

  function expandSidebar() {
    body.classList.remove('sidebar-collapsed');
    if (isDesktop()) {
      openSidebar();
    }
  }

  function toggleSidebar() {
    if (isDesktop()) {
      if (body.classList.contains('sidebar-collapsed')) {
        expandSidebar();
      } else {
        collapseSidebar();
      }
    } else {
      if (body.classList.contains('sidebar-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  }

  sidebarToggle.addEventListener('click', toggleSidebar);

  sidebarOverlay.addEventListener('click', function () {
    closeSidebar();
  });

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        if (!isDesktop()) {
          closeSidebar();
        }
      }
    });
  });

  function setActiveLink() {
    const sections = document.querySelectorAll('.chapter');
    const scrollY = window.scrollY;

    let current = null;
    sections.forEach(function (section) {
      const top = section.offsetTop - 80;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(function (link) {
      const id = link.getAttribute('href').slice(1);
      link.classList.toggle('active', id === current);
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  window.addEventListener('resize', function () {
    if (isDesktop()) {
      sidebarOverlay.setAttribute('aria-hidden', 'true');
      if (!body.classList.contains('sidebar-collapsed')) {
        body.classList.remove('sidebar-open');
      }
    } else {
      body.classList.remove('sidebar-collapsed');
      if (!body.classList.contains('sidebar-open')) {
        sidebarOverlay.setAttribute('aria-hidden', 'true');
      }
    }
    setActiveLink();
  });
})();
