(function () {
  var roles = [
    { key: 'Occupant', label: 'Người sử dụng tòa nhà', file: 'occupant-dashboard.html' },
    { key: 'Operator', label: 'Nhân viên vận hành', file: 'operator-energy-monitor.html' },
    { key: 'Facility Manager', label: 'Quản lý cơ sở', file: 'manager-energy-kpis.html' },
    { key: 'Admin', label: 'Quản trị viên', file: 'admin-zone-management.html' }
  ];

  function mountRoleSwitcher() {
    if (document.querySelector('.role-switcher')) return;

    var inHtmlFolder = /\/html\/[^/]+$/i.test(window.location.pathname);
    var prefix = inHtmlFolder ? '' : 'html/';
    var currentFile = window.location.pathname.split('/').pop();
    var selectedRole = '';
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].file === currentFile) selectedRole = roles[i].key;
    }
    if (!selectedRole) {
      try {
        var session = JSON.parse(localStorage.getItem('sb_session') || 'null');
        if (session && roles.some(function (role) { return role.key === session.role; })) selectedRole = session.role;
      } catch (error) { selectedRole = ''; }
    }

    var nav = document.createElement('nav');
    nav.className = 'role-switcher';
    nav.setAttribute('aria-label', 'Chuyển nhanh vai trò demo');

    var caption = document.createElement('span');
    caption.className = 'role-switcher-caption';
    caption.textContent = 'Chuyển vai trò';
    nav.appendChild(caption);

    var select = document.createElement('select');
    select.setAttribute('aria-label', 'Chọn vai trò demo');
    for (var j = 0; j < roles.length; j++) {
      var option = document.createElement('option');
      option.value = roles[j].file;
      option.textContent = roles[j].label;
      option.selected = roles[j].key === selectedRole;
      select.appendChild(option);
    }
    nav.appendChild(select);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-secondary btn-sm';
    button.textContent = 'Mở';
    button.addEventListener('click', function () {
      window.location.href = prefix + select.value;
    });
    nav.appendChild(button);

    var sidebar = document.querySelector('.sidebar');
    var topbarRight = document.querySelector('.topbar-right');
    if (sidebar) {
      nav.classList.add('sidebar-role-switcher');
      var sidebarFooter = sidebar.querySelector('.sidebar-footer');
      if (sidebarFooter) sidebar.insertBefore(nav, sidebarFooter);
      else sidebar.appendChild(nav);
    } else if (document.body.classList.contains('page-style-index-001')) {
      var portalActions = document.querySelector('header > div > div:last-child');
      if (portalActions) portalActions.appendChild(nav);
      else document.body.insertBefore(nav, document.body.firstChild);
    } else {
      nav.classList.add('role-switcher-floating');
      document.body.insertBefore(nav, document.body.firstChild);
    }
  }

  mountRoleSwitcher();
})();



