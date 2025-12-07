/* ===================================
   Sistema de Cadastro de Projetos de Pesquisa
   JavaScript - Funcionalidades (Sem Autenticação)
   =================================== */

// Dados estáticos de projetos
const projectsData = [
  {
    id: 1,
    titulo: "Análise de Dados Climáticos com Machine Learning",
    descricao: "Projeto de pesquisa focado no desenvolvimento de modelos de machine learning para análise e previsão de padrões climáticos na região amazônica.",
    objetivos: "Desenvolver algoritmos de ML para previsão climática; Analisar dados históricos dos últimos 50 anos; Publicar resultados em periódicos científicos.",
    responsavel: "Dr. Maria Silva",
    dataInicio: "2024-01-15",
    dataFim: "2025-06-30",
    status: "em_andamento",
    progresso: 45,
    area: "Ciência de Dados",
    financiamento: "R$ 250.000,00",
    resultados: "Coleta de dados concluída. Modelos preliminares em desenvolvimento."
  },
  {
    id: 2,
    titulo: "Desenvolvimento de Vacina contra Dengue",
    descricao: "Pesquisa biomédica para desenvolvimento de nova vacina tetravalente contra os quatro sorotipos do vírus da dengue.",
    objetivos: "Isolar antígenos virais; Desenvolver formulação vacinal; Realizar testes pré-clínicos.",
    responsavel: "Dr. Carlos Mendes",
    dataInicio: "2023-06-01",
    dataFim: "2026-12-31",
    status: "em_andamento",
    progresso: 30,
    area: "Biomedicina",
    financiamento: "R$ 1.500.000,00",
    resultados: "Fase de isolamento de antígenos concluída com sucesso."
  },
  {
    id: 3,
    titulo: "Energias Renováveis em Comunidades Rurais",
    descricao: "Estudo sobre a implementação de sistemas de energia solar fotovoltaica em comunidades rurais isoladas do nordeste brasileiro.",
    objetivos: "Mapear comunidades sem acesso à energia; Instalar sistemas piloto; Avaliar impacto socioeconômico.",
    responsavel: "Dra. Ana Oliveira",
    dataInicio: "2023-03-01",
    dataFim: "2024-02-28",
    status: "concluido",
    progresso: 100,
    area: "Engenharia",
    financiamento: "R$ 500.000,00",
    resultados: "15 comunidades beneficiadas. Redução de 80% nos custos de energia. 3 artigos publicados."
  },
  {
    id: 4,
    titulo: "Inteligência Artificial na Educação Básica",
    descricao: "Pesquisa sobre o uso de ferramentas de IA para personalização do ensino em escolas públicas.",
    objetivos: "Desenvolver plataforma adaptativa; Treinar professores; Avaliar desempenho dos alunos.",
    responsavel: "Prof. Roberto Santos",
    dataInicio: "2024-08-01",
    dataFim: "2026-07-31",
    status: "planejado",
    progresso: 0,
    area: "Educação",
    financiamento: "R$ 350.000,00",
    resultados: "Projeto em fase de planejamento. Equipe sendo formada."
  },
  {
    id: 5,
    titulo: "Biodiversidade da Mata Atlântica",
    descricao: "Catalogação e estudo de espécies endêmicas em fragmentos remanescentes da Mata Atlântica no estado de São Paulo.",
    objetivos: "Catalogar espécies de fauna e flora; Identificar espécies ameaçadas; Propor áreas de preservação.",
    responsavel: "Dra. Juliana Costa",
    dataInicio: "2022-09-01",
    dataFim: "2024-08-31",
    status: "concluido",
    progresso: 100,
    area: "Biologia",
    financiamento: "R$ 180.000,00",
    resultados: "523 espécies catalogadas. 12 novas espécies descobertas. Livro publicado."
  }
];

// Estado da aplicação
let projects = [...projectsData];

// ===================================
// Funções de Utilidade
// ===================================

function formatDate(dateString) {
  if (!dateString) return '-';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function getStatusBadge(status) {
  const statusMap = {
    'planejado': { class: 'badge-info', text: 'Planejado' },
    'em_andamento': { class: 'badge-warning', text: 'Em Andamento' },
    'concluido': { class: 'badge-success', text: 'Concluído' },
    'cancelado': { class: 'badge-error', text: 'Cancelado' }
  };
  const statusInfo = statusMap[status] || statusMap['planejado'];
  return `<span class="badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

function getStatusIcon(status) {
  const icons = {
    'planejado': '📋',
    'em_andamento': '🔄',
    'concluido': '✅',
    'cancelado': '❌'
  };
  return icons[status] || '📋';
}

function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  if (!alertContainer) return;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  alertContainer.innerHTML = `
    <div class="alert alert-${type} animate-fade-in" role="alert">
      <span class="alert-icon">${icons[type]}</span>
      <div class="alert-content">${message}</div>
    </div>
  `;
  
  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 5000);
}

// ===================================
// Projetos
// ===================================

function renderProjects(projectsList = projects) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  
  if (projectsList.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3 class="empty-title">Nenhum projeto encontrado</h3>
        <p class="empty-description">Não há projetos que correspondam aos filtros selecionados.</p>
        <button class="btn btn-primary" onclick="openProjectModal()">
          ➕ Novo Projeto
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = projectsList.map((project, index) => `
    <article class="card project-card animate-fade-in" style="animation-delay: ${index * 0.1}s" aria-labelledby="project-title-${project.id}">
      <div class="project-status">
        ${getStatusBadge(project.status)}
      </div>
      <div class="project-image" aria-hidden="true">
        ${getStatusIcon(project.status)}
      </div>
      <div class="card-body">
        <h3 class="card-title" id="project-title-${project.id}">${project.titulo}</h3>
        <p class="card-subtitle">${project.area}</p>
        <p style="margin-top: var(--spacing-md); color: var(--text-secondary); font-size: var(--font-size-sm);">
          ${project.descricao.substring(0, 150)}...
        </p>
        <div class="project-meta">
          <div class="project-meta-item">
            👤 <span>${project.responsavel}</span>
          </div>
          <div class="project-meta-item">
            📅 <span>${formatDate(project.dataInicio)}</span>
          </div>
        </div>
        <div style="margin-top: var(--spacing-md);">
          <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); margin-bottom: var(--spacing-xs);">
            <span>Progresso</span>
            <span>${project.progresso}%</span>
          </div>
          <div class="progress-bar" role="progressbar" aria-valuenow="${project.progresso}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width: ${project.progresso}%"></div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-secondary btn-sm" onclick="viewProject(${project.id})" aria-label="Ver detalhes do projeto ${project.titulo}">
          👁️ Detalhes
        </button>
        <button class="btn btn-primary btn-sm" onclick="editProject(${project.id})" aria-label="Editar projeto ${project.titulo}">
          ✏️ Editar
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteProject(${project.id})" aria-label="Excluir projeto ${project.titulo}">
          🗑️ Excluir
        </button>
      </div>
    </article>
  `).join('');
  
  // Atualizar contador
  const countElement = document.getElementById('projectsCount');
  if (countElement) {
    countElement.textContent = `${projectsList.length} projeto(s) encontrado(s)`;
  }
}

function renderStats() {
  const total = projects.length;
  const emAndamento = projects.filter(p => p.status === 'em_andamento').length;
  const concluidos = projects.filter(p => p.status === 'concluido').length;
  const planejados = projects.filter(p => p.status === 'planejado').length;
  
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statAndamento').textContent = emAndamento;
  document.getElementById('statConcluidos').textContent = concluidos;
  document.getElementById('statPlanejados').textContent = planejados;
}

function filterProjects() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('filterStatus')?.value || '';
  const areaFilter = document.getElementById('filterArea')?.value || '';
  
  let filtered = projects.filter(project => {
    const matchSearch = project.titulo.toLowerCase().includes(searchTerm) ||
                        project.descricao.toLowerCase().includes(searchTerm) ||
                        project.responsavel.toLowerCase().includes(searchTerm);
    const matchStatus = !statusFilter || project.status === statusFilter;
    const matchArea = !areaFilter || project.area === areaFilter;
    
    return matchSearch && matchStatus && matchArea;
  });
  
  renderProjects(filtered);
}

function openProjectModal(projectId = null) {
  const modal = document.getElementById('projectModal');
  const form = document.getElementById('projectForm');
  const title = document.getElementById('modalTitle');
  
  if (!modal || !form) return;
  
  form.reset();
  document.getElementById('projectId').value = '';
  
  if (projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      title.textContent = 'Editar Projeto';
      document.getElementById('projectId').value = project.id;
      document.getElementById('projectTitulo').value = project.titulo;
      document.getElementById('projectDescricao').value = project.descricao;
      document.getElementById('projectObjetivos').value = project.objetivos;
      document.getElementById('projectResponsavel').value = project.responsavel;
      document.getElementById('projectArea').value = project.area;
      document.getElementById('projectDataInicio').value = project.dataInicio;
      document.getElementById('projectDataFim').value = project.dataFim;
      document.getElementById('projectStatus').value = project.status;
      document.getElementById('projectFinanciamento').value = project.financiamento;
      document.getElementById('projectResultados').value = project.resultados;
    }
  } else {
    title.textContent = 'Novo Projeto';
  }
  
  modal.classList.add('active');
  document.getElementById('projectTitulo').focus();
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleProjectSubmit(event) {
  event.preventDefault();
  
  const projectId = document.getElementById('projectId').value;
  const projectData = {
    titulo: document.getElementById('projectTitulo').value.trim(),
    descricao: document.getElementById('projectDescricao').value.trim(),
    objetivos: document.getElementById('projectObjetivos').value.trim(),
    responsavel: document.getElementById('projectResponsavel').value.trim(),
    area: document.getElementById('projectArea').value,
    dataInicio: document.getElementById('projectDataInicio').value,
    dataFim: document.getElementById('projectDataFim').value,
    status: document.getElementById('projectStatus').value,
    financiamento: document.getElementById('projectFinanciamento').value.trim(),
    resultados: document.getElementById('projectResultados').value.trim()
  };
  
  // Validações
  if (!projectData.titulo || projectData.titulo.length < 5) {
    showAlert('O título deve ter pelo menos 5 caracteres.', 'error');
    return;
  }
  
  if (!projectData.descricao || projectData.descricao.length < 20) {
    showAlert('A descrição deve ter pelo menos 20 caracteres.', 'error');
    return;
  }
  
  if (!projectData.responsavel) {
    showAlert('Informe o responsável pelo projeto.', 'error');
    return;
  }
  
  if (!projectData.dataInicio) {
    showAlert('Informe a data de início.', 'error');
    return;
  }
  
  // Calcular progresso baseado no status
  const progressoMap = {
    'planejado': 0,
    'em_andamento': 50,
    'concluido': 100,
    'cancelado': 0
  };
  projectData.progresso = progressoMap[projectData.status] || 0;
  
  if (projectId) {
    // Editar projeto existente
    const index = projects.findIndex(p => p.id === parseInt(projectId));
    if (index !== -1) {
      projects[index] = { ...projects[index], ...projectData };
      showAlert('Projeto atualizado com sucesso!', 'success');
    }
  } else {
    // Novo projeto
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      ...projectData
    };
    projects.push(newProject);
    showAlert('Projeto criado com sucesso!', 'success');
  }
  
  closeProjectModal();
  renderProjects();
  renderStats();
}

function viewProject(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  const modal = document.getElementById('viewModal');
  if (!modal) return;
  
  document.getElementById('viewTitle').textContent = project.titulo;
  document.getElementById('viewContent').innerHTML = `
    <div style="margin-bottom: var(--spacing-lg);">
      ${getStatusBadge(project.status)}
      <span style="margin-left: var(--spacing-sm); color: var(--text-secondary);">${project.area}</span>
    </div>
    
    <section style="margin-bottom: var(--spacing-xl);">
      <h4 style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-sm);">DESCRIÇÃO</h4>
      <p>${project.descricao}</p>
    </section>
    
    <section style="margin-bottom: var(--spacing-xl);">
      <h4 style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-sm);">OBJETIVOS</h4>
      <p>${project.objetivos}</p>
    </section>
    
    <section style="margin-bottom: var(--spacing-xl);">
      <h4 style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-sm);">CRONOGRAMA</h4>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-marker ${project.progresso > 0 ? 'completed' : ''}"></div>
          <div class="timeline-content">
            <div class="timeline-date">${formatDate(project.dataInicio)}</div>
            <div class="timeline-title">Início do Projeto</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker ${project.progresso === 100 ? 'completed' : 'pending'}"></div>
          <div class="timeline-content">
            <div class="timeline-date">${formatDate(project.dataFim)}</div>
            <div class="timeline-title">Conclusão Prevista</div>
          </div>
        </div>
      </div>
    </section>
    
    <section style="margin-bottom: var(--spacing-xl);">
      <h4 style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-sm);">RESULTADOS</h4>
      <p>${project.resultados || 'Nenhum resultado registrado ainda.'}</p>
    </section>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-md); padding: var(--spacing-lg); background: var(--bg-main); border-radius: var(--radius-md);">
      <div>
        <div style="color: var(--text-muted); font-size: var(--font-size-xs);">Responsável</div>
        <div style="font-weight: 600;">${project.responsavel}</div>
      </div>
      <div>
        <div style="color: var(--text-muted); font-size: var(--font-size-xs);">Financiamento</div>
        <div style="font-weight: 600;">${project.financiamento || 'Não informado'}</div>
      </div>
      <div>
        <div style="color: var(--text-muted); font-size: var(--font-size-xs);">Progresso</div>
        <div style="font-weight: 600;">${project.progresso}%</div>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeViewModal() {
  const modal = document.getElementById('viewModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function editProject(projectId) {
  openProjectModal(projectId);
}

function deleteProject(projectId) {
  if (confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
    projects = projects.filter(p => p.id !== projectId);
    showAlert('Projeto excluído com sucesso!', 'success');
    renderProjects();
    renderStats();
  }
}

// ===================================
// Menu Mobile
// ===================================

function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// ===================================
// Inicialização
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar projetos e estatísticas
  renderProjects();
  renderStats();
  
  // Configurar filtros
  const searchInput = document.getElementById('searchInput');
  const filterStatus = document.getElementById('filterStatus');
  const filterArea = document.getElementById('filterArea');
  
  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }
  if (filterStatus) {
    filterStatus.addEventListener('change', filterProjects);
  }
  if (filterArea) {
    filterArea.addEventListener('change', filterProjects);
  }
  
  // Fechar modal com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeViewModal();
    }
  });
  
  // Fechar modal clicando fora
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
});
