import React from 'react';
import type { LayoutOptions } from './layoutOptions';
import {
  TwelveSpanGridPreview,
  ThreeByThreeGridPreview,
  HolyGrailPreview,
  SidebarPreview,
  HeaderMainFooterPreview,
  RowPreview,
  RowWrapPreview,
  FillSpacePreview,
  FillRemainingSpacePreview,
  SeparatePreview,
  CardGridPreview,
  MasonryPreview,
  CenteredContentPreview,
  FixedHeaderPreview,
  TwoColumnPreview,
  TabsLayoutPreview,
  ZStackPreview,
  HierarchyPreview
} from '../components/LayoutPreviews';

export interface LayoutTemplate {
  id: string;
  name: string;
  previewComponent: JSX.Element;
  description: string;
  type: 'grid' | 'flexbox' | 'modal';
}

export interface CSSLayout {
  containerCSS: string;
  childrenCSS: string;
  html: string;
}

export const generateGridLayout = (templateId: string, options: LayoutOptions = {}): CSSLayout => {
  switch (templateId) {
    case '12-span-grid':
      return {
        containerCSS: `
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${options.gap || '1rem'};
  width: 100%;
}`,
        childrenCSS: `
.span-12 { grid-column: span 12 / span 12; }
.span-6 { grid-column: span 6 / span 6; }
.span-4 { grid-column: span 4 / span 4; }
.span-3 { grid-column: span 3 / span 3; }
.span-2 { grid-column: span 2 / span 2; }
.span-1 { grid-column: span 1 / span 1; }`,
        html: `
<div class="container">
  <div class="span-12">Full width</div>
  <div class="span-6">Half width</div>
  <div class="span-4">One third</div>
  <div class="span-2">One sixth</div>
</div>`
      };
      
    case '3x3':
      return {
        containerCSS: `
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: ${options.gap || '1rem'};
  width: 100%;
}`,
        childrenCSS: `
.grid-item {
  min-height: 100px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
        html: `
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>`
      };
      
    case 'holy-grail':
      return {
        containerCSS: `
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content sidebar"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: ${options.navWidth || '200px'} 1fr ${options.sidebarWidth || '200px'};
  min-height: 100vh;
  gap: ${options.gap || '1rem'};
}`,
        childrenCSS: `
.header { grid-area: header; }
.nav { grid-area: nav; }
.content { grid-area: content; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }

/* Responsive adjustment */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "nav"
      "content"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto auto;
  }
}`,
        html: `
<div class="holy-grail">
  <header class="header">Header</header>
  <nav class="nav">Navigation</nav>
  <main class="content">Main Content</main>
  <aside class="sidebar">Sidebar</aside>
  <footer class="footer">Footer</footer>
</div>`
      };
      
    case 'sidebar':
      return {
        containerCSS: `
.sidebar-layout {
  display: grid;
  grid-template-columns: ${options.sidebarWidth || '250px'} 1fr;
  min-height: 100vh;
  gap: ${options.gap || '0'};
}`,
        childrenCSS: `
.sidebar {
  background-color: #f5f5f5;
  padding: 1rem;
}

.main-content {
  padding: 1rem;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .sidebar-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none;
  }
}`,
        html: `
<div class="sidebar-layout">
  <aside class="sidebar">Sidebar Content</aside>
  <main class="main-content">Main Content</main>
</div>`
      };
      
    case 'header-main-footer':
      return {
        containerCSS: `
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}`,
        childrenCSS: `
.header {
  padding: 1rem;
  background-color: #f5f5f5;
}

.main-content {
  padding: 1rem;
}

.footer {
  padding: 1rem;
  background-color: #f5f5f5;
}`,
        html: `
<div class="page-layout">
  <header class="header">Header</header>
  <main class="main-content">Main Content</main>
  <footer class="footer">Footer</footer>
</div>`
      };
      
    case 'card-grid':
      return {
        containerCSS: `
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${options.minWidth || '250px'}, 1fr));
  gap: ${options.gap || '1.5rem'};
  width: 100%;
}`,
        childrenCSS: `
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: ${options.imageHeight || '200px'};
  /* Placeholder: swap for background-image or an <img> */
  background: linear-gradient(135deg, #e5e2d4, #c2ba9c);
}

.card-content {
  padding: 1rem;
}`,
        html: `
<div class="card-grid">
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>Card Title</h3>
      <p>Card description text goes here.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>Card Title</h3>
      <p>Card description text goes here.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>Card Title</h3>
      <p>Card description text goes here.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-image"></div>
    <div class="card-content">
      <h3>Card Title</h3>
      <p>Card description text goes here.</p>
    </div>
  </div>
</div>`
      };
      
    case 'masonry':
      return {
        containerCSS: `
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(${options.columns || '3'}, 1fr);
  grid-auto-rows: ${options.rowHeight || '20px'};
  gap: ${options.gap || '1rem'};
}`,
        childrenCSS: `
.masonry-item {
  overflow: hidden;
  border-radius: 0.5rem;
  /* Placeholder: put an <img> inside, sized to 100% */
  background: linear-gradient(135deg, #e5e2d4, #c2ba9c);
}

.masonry-item:nth-child(1) { grid-row: span 8; }
.masonry-item:nth-child(2) { grid-row: span 10; }
.masonry-item:nth-child(3) { grid-row: span 6; }
.masonry-item:nth-child(4) { grid-row: span 9; }
.masonry-item:nth-child(5) { grid-row: span 7; }
.masonry-item:nth-child(6) { grid-row: span 5; }

.masonry-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}`,
        html: `
<div class="masonry-grid">
  <div class="masonry-item"></div>
  <div class="masonry-item"></div>
  <div class="masonry-item"></div>
  <div class="masonry-item"></div>
  <div class="masonry-item"></div>
  <div class="masonry-item"></div>
</div>`
      };
      
    case 'two-column':
      return {
        containerCSS: `
.two-column {
  display: grid;
  grid-template-columns: ${options.leftWidth || '1fr'} ${options.rightWidth || '1fr'};
  gap: ${options.gap || '2rem'};
  width: 100%;
}`,
        childrenCSS: `
.column {
  /* Optional column styling */
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}`,
        html: `
<div class="two-column">
  <div class="column">
    <h2>First Column</h2>
    <p>Content for the first column goes here.</p>
  </div>
  <div class="column">
    <h2>Second Column</h2>
    <p>Content for the second column goes here.</p>
  </div>
</div>`
      };
      
    case 'hierarchy':
      return {
        containerCSS: `
.hierarchy-layout {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: ${options.gap || '1rem'};
  height: 100%;
}

.hierarchy-main {
  display: grid;
  grid-template-columns: ${options.sidebarWidth || '250px'} 1fr;
  gap: ${options.gap || '1rem'};
}`,
        childrenCSS: `
.hierarchy-header {
  padding: 1rem;
  background-color: #f8f8f8;
}

.hierarchy-sidebar {
  background-color: #f0f0f0;
  padding: 1rem;
}

.hierarchy-content {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(${options.contentMinHeight || '150px'}, 1fr));
  gap: ${options.contentGap || '1rem'};
}

.content-section {
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 0.25rem;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .hierarchy-main {
    grid-template-columns: 1fr;
  }
}`,
        html: `
<div class="hierarchy-layout">
  <header class="hierarchy-header">
    <h1>Page Title</h1>
  </header>
  <div class="hierarchy-main">
    <nav class="hierarchy-sidebar">
      <ul>
        <li>Navigation Item 1</li>
        <li>Navigation Item 2</li>
        <li>Navigation Item 3</li>
      </ul>
    </nav>
    <main class="hierarchy-content">
      <section class="content-section">
        <h2>Section One</h2>
        <p>Content for section one.</p>
      </section>
      <section class="content-section">
        <h2>Section Two</h2>
        <p>Content for section two.</p>
      </section>
    </main>
  </div>
</div>`
      };
      
    default:
      return {
        containerCSS: '',
        childrenCSS: '',
        html: ''
      };
  }
};

export const generateFlexboxLayout = (templateId: string, options: LayoutOptions = {}): CSSLayout => {
  switch (templateId) {
    case 'row':
      return {
        containerCSS: `
.flex-row {
  display: flex;
  gap: ${options.gap || '1rem'};
  flex-direction: row;
  ${options.wrap ? 'flex-wrap: wrap;' : ''}
}`,
        childrenCSS: `
.flex-item {
  ${options.growItems ? 'flex: 1;' : ''}
}`,
        html: `
<div class="flex-row">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>`
      };
      
    case 'row-wrap':
      return {
        containerCSS: `
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: ${options.gap || '1rem'};
}`,
        childrenCSS: `
.flex-item {
  flex: 0 0 ${options.itemWidth || 'calc(33.333% - 0.67rem)'};
  min-width: ${options.minWidth || '200px'};
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .flex-item {
    flex: 0 0 ${options.mobileItemWidth || 'calc(50% - 0.5rem)'};
  }
}

@media (max-width: 480px) {
  .flex-item {
    flex: 0 0 100%;
  }
}`,
        html: `
<div class="flex-wrap">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
  <div class="flex-item">Item 4</div>
  <div class="flex-item">Item 5</div>
  <div class="flex-item">Item 6</div>
</div>`
      };
      
    case 'fill-space':
      return {
        containerCSS: `
.fill-space {
  display: flex;
  gap: ${options.gap || '1rem'};
  width: 100%;
}`,
        childrenCSS: `
.fill-item {
  flex: 1;
}`,
        html: `
<div class="fill-space">
  <div class="fill-item">Equal Width</div>
  <div class="fill-item">Equal Width</div>
  <div class="fill-item">Equal Width</div>
</div>`
      };
      
    case 'fill-remaining-space':
      return {
        containerCSS: `
.flex-container {
  display: flex;
  gap: ${options.gap || '1rem'};
  width: 100%;
}`,
        childrenCSS: `
.fixed-item {
  width: ${options.fixedWidth || '200px'};
}

.flex-item {
  flex: 1;
}`,
        html: `
<div class="flex-container">
  <div class="fixed-item">Fixed Width</div>
  <div class="fixed-item">Fixed Width</div>
  <div class="flex-item">Fills Remaining Space</div>
</div>`
      };
      
    case 'separate':
      return {
        containerCSS: `
.flex-separate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}`,
        childrenCSS: `
.left-items {
  display: flex;
  gap: ${options.itemGap || '1rem'};
}

.right-item {
  /* Optional styling */
}`,
        html: `
<div class="flex-separate">
  <div class="left-items">
    <div>Left Item 1</div>
    <div>Left Item 2</div>
  </div>
  <div class="right-item">Right Item</div>
</div>`
      };
      
    case 'centered-content':
      return {
        containerCSS: `
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${options.minHeight || '100vh'};
  width: 100%;
}`,
        childrenCSS: `
.centered-content {
  max-width: ${options.maxWidth || '500px'};
  width: 100%;
  padding: ${options.padding || '2rem'};
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: ${options.shadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
}`,
        html: `
<div class="centered-container">
  <div class="centered-content">
    <h2>Centered Content</h2>
    <p>This content is centered both horizontally and vertically.</p>
  </div>
</div>`
      };
      
    case 'fixed-header':
      return {
        containerCSS: `
.fixed-header-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}`,
        childrenCSS: `
.fixed-header {
  position: sticky;
  top: 0;
  background-color: white;
  padding: 1rem;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fixed-header-content {
  flex: 1;
  padding: 1rem;
}`,
        html: `
<div class="fixed-header-layout">
  <header class="fixed-header">
    <h1>Site Title</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <main class="fixed-header-content">
    <h2>Main Content</h2>
    <p>Content goes here. Scroll down to see the fixed header in action.</p>
    <!-- Add more content to enable scrolling -->
    <div style="height: 1000px;"></div>
  </main>
</div>`
      };
      
    case 'tabs-layout':
      return {
        containerCSS: `
.tabs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}`,
        childrenCSS: `
.tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom-color: #333;
  font-weight: bold;
}

.tab-content {
  padding: 1.5rem;
  display: none;
}

.tab-content.active {
  display: block;
}`,
        html: `
<div class="tabs-container">
  <div class="tabs">
    <div class="tab active">Tab 1</div>
    <div class="tab">Tab 2</div>
    <div class="tab">Tab 3</div>
  </div>
  <div class="tab-content active">
    <h2>Tab 1 Content</h2>
    <p>This is the content for the first tab.</p>
  </div>
  <div class="tab-content">
    <h2>Tab 2 Content</h2>
    <p>This is the content for the second tab.</p>
  </div>
  <div class="tab-content">
    <h2>Tab 3 Content</h2>
    <p>This is the content for the third tab.</p>
  </div>
</div>
<script>
  // Basic JavaScript to handle tab switching
  document.querySelectorAll('.tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      document.querySelectorAll('.tab-content')[index].classList.add('active');
    });
  });
</script>`
      };
      
    case 'z-stack':
      return {
        containerCSS: `
.z-stack {
  position: relative;
  width: ${options.width || '100%'};
  height: ${options.height || 'auto'};
}`,
        childrenCSS: `
.z-stack-item {
  position: absolute;
  /* Items can be positioned individually */
}

.z-stack-item:nth-child(1) {
  z-index: 1;
  top: 0;
  left: 0;
}

.z-stack-item:nth-child(2) {
  z-index: 2;
  top: 20px;
  left: 20px;
}

.z-stack-item:nth-child(3) {
  z-index: 3;
  top: 40px;
  left: 40px;
}`,
        html: `
<div class="z-stack" style="height: 300px;">
  <div class="z-stack-item" style="width: 200px; height: 200px; background-color: #ffe0e0;">
    Bottom Layer
  </div>
  <div class="z-stack-item" style="width: 200px; height: 200px; background-color: #e0ffe0;">
    Middle Layer
  </div>
  <div class="z-stack-item" style="width: 200px; height: 200px; background-color: #e0e0ff;">
    Top Layer
  </div>
</div>`
      };
      
    default:
      return {
        containerCSS: '',
        childrenCSS: '',
        html: ''
      };
  }
};

export const generateModalLayout = (templateId: string, options: LayoutOptions = {}): CSSLayout => {
  switch (templateId) {
    case 'basic-modal':
      return {
        containerCSS: `
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.active {
  display: flex;
}`,
        childrenCSS: `
.modal-container {
  background-color: white;
  padding: ${options.padding || '2rem'};
  border-radius: ${options.borderRadius || '0.5rem'};
  max-width: ${options.maxWidth || '500px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1A1F2C;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #8A898C;
}

.modal-body {
  margin-bottom: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.modal-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
}

.modal-button-primary {
  background-color: #9b87f5;
  color: white;
  border: none;
}

.modal-button-secondary {
  background-color: transparent;
  border: 1px solid #C8C8C9;
  color: #403E43;
}`,
        html: `
<button id="openModalBtn" onclick="document.getElementById('modalOverlay').classList.add('active')">
  Open Modal
</button>

<div id="modalOverlay" class="modal-overlay">
  <div class="modal-container">
    <div class="modal-header">
      <h3 class="modal-title">Basic Modal</h3>
      <button class="modal-close" onclick="document.getElementById('modalOverlay').classList.remove('active')">&times;</button>
    </div>
    <div class="modal-body">
      <p>This is a basic modal dialog. You can add any content here.</p>
    </div>
    <div class="modal-footer">
      <button class="modal-button modal-button-secondary" onclick="document.getElementById('modalOverlay').classList.remove('active')">Cancel</button>
      <button class="modal-button modal-button-primary">Confirm</button>
    </div>
  </div>
</div>

<script>
  // Close modal when clicking outside of it
  document.getElementById('modalOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
      this.classList.remove('active');
    }
  });
</script>`
      };
      
    case 'notification-modal':
      return {
        containerCSS: `
.notification-modal {
  position: fixed;
  top: ${options.position === 'top' ? '1rem' : 'auto'};
  bottom: ${options.position === 'bottom' ? '1rem' : 'auto'};
  right: ${options.position === 'left' ? 'auto' : '1rem'};
  left: ${options.position === 'left' ? '1rem' : 'auto'};
  max-width: ${options.maxWidth || '400px'};
  width: calc(100% - 2rem);
  z-index: 1000;
  transform: translateY(${options.position === 'top' ? '-150%' : '150%'});
  transition: transform 0.3s ease-in-out;
}

.notification-modal.show {
  transform: translateY(0);
}`,
        childrenCSS: `
.notification-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.notification-icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: white;
}

.notification-icon.success {
  background-color: #10B981;
}

.notification-icon.error {
  background-color: #EF4444;
}

.notification-icon.warning {
  background-color: #F59E0B;
}

.notification-icon.info {
  background-color: #3B82F6;
}

.notification-body {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1A1F2C;
}

.notification-message {
  font-size: 0.875rem;
  color: #6B7280;
}

.notification-close {
  background: transparent;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0.25rem;
}`,
        html: `
<button id="showNotification" class="modal-button modal-button-primary">Show Notification</button>

<div id="notification" class="notification-modal">
  <div class="notification-content">
    <div class="notification-icon success">✓</div>
    <div class="notification-body">
      <h4 class="notification-title">Success</h4>
      <p class="notification-message">Your changes have been saved successfully.</p>
    </div>
    <button class="notification-close" onclick="hideNotification()">✕</button>
  </div>
</div>

<script>
  function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    // Automatically hide after 5 seconds
    setTimeout(hideNotification, 5000);
  }
  
  function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
  }
  
  document.getElementById('showNotification').addEventListener('click', showNotification);
</script>`
      };
      
    case 'confirmation-modal':
      return {
        containerCSS: `
.confirmation-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirmation-overlay.active {
  display: flex;
}`,
        childrenCSS: `
.confirmation-modal {
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.confirmation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 0;
  background-color: ${options.iconBgColor || '#FEF2F2'};
}

.confirmation-icon svg {
  height: 4rem;
  width: 4rem;
  color: ${options.iconColor || '#DC2626'};
}

.confirmation-content {
  padding: 1.5rem;
}

.confirmation-title {
  color: #1F2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.confirmation-message {
  color: #6B7280;
  margin-bottom: 1.5rem;
}

.confirmation-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-cancel {
  background-color: white;
  border: 1px solid #E5E7EB;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
}

.btn-confirm {
  background-color: #DC2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
}`,
        html: `
<button id="openConfirmModal" class="modal-button modal-button-secondary">Delete Item</button>

<div id="confirmOverlay" class="confirmation-overlay">
  <div class="confirmation-modal">
    <div class="confirmation-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
    <div class="confirmation-content">
      <h3 class="confirmation-title">Delete Item</h3>
      <p class="confirmation-message">Are you sure you want to delete this item? This action cannot be undone.</p>
      <div class="confirmation-actions">
        <button class="btn-cancel" onclick="closeConfirmModal()">Cancel</button>
        <button class="btn-confirm" onclick="deleteItem()">Delete</button>
      </div>
    </div>
  </div>
</div>

<script>
  function openConfirmModal() {
    document.getElementById('confirmOverlay').classList.add('active');
  }
  
  function closeConfirmModal() {
    document.getElementById('confirmOverlay').classList.remove('active');
  }
  
  function deleteItem() {
    // Perform delete action here
    alert('Item deleted!');
    closeConfirmModal();
  }
  
  document.getElementById('openConfirmModal').addEventListener('click', openConfirmModal);
  
  // Close when clicking outside
  document.getElementById('confirmOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
      closeConfirmModal();
    }
  });
</script>`
      };
      
    case 'fullscreen-modal':
      return {
        containerCSS: `
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${options.bgColor || 'white'};
  z-index: 1000;
  display: none;
  flex-direction: column;
  animation: modalFadeIn 0.3s ease-out;
}

.fullscreen-modal.active {
  display: flex;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`,
        childrenCSS: `
.fullscreen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
}

.fullscreen-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.fullscreen-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #6B7280;
}

.fullscreen-close:hover {
  background-color: #F3F4F6;
}

.fullscreen-body {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.fullscreen-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.fullscreen-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
}

.fullscreen-btn-primary {
  background-color: #2563EB;
  color: white;
  border: none;
}

.fullscreen-btn-secondary {
  background-color: white;
  border: 1px solid #D1D5DB;
  color: #374151;
}`,
        html: `
<button id="openFullscreenModal" class="modal-button modal-button-primary">Open Fullscreen Modal</button>

<div id="fullscreenModal" class="fullscreen-modal">
  <div class="fullscreen-header">
    <h2 class="fullscreen-title">Fullscreen Modal</h2>
    <button class="fullscreen-close" onclick="closeFullscreenModal()">×</button>
  </div>
  
  <div class="fullscreen-body">
    <h3>Main Content</h3>
    <p>This is a fullscreen modal that takes up the entire viewport.</p>
    <p>It's perfect for complex forms, detailed views, or any content that needs more space.</p>
    
    <!-- Add more content here -->
    <div style="height: 1000px; padding-top: 20px;">
      <p>Scroll down to see more content...</p>
      <p>Notice that the header and footer stay fixed while this content scrolls.</p>
    </div>
  </div>
  
  <div class="fullscreen-footer">
    <button class="fullscreen-btn fullscreen-btn-secondary" onclick="closeFullscreenModal()">Cancel</button>
    <button class="fullscreen-btn fullscreen-btn-primary">Save Changes</button>
  </div>
</div>

<script>
  function openFullscreenModal() {
    document.getElementById('fullscreenModal').classList.add('active');
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  function closeFullscreenModal() {
    document.getElementById('fullscreenModal').classList.remove('active');
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }
  
  document.getElementById('openFullscreenModal').addEventListener('click', openFullscreenModal);
</script>`
      };
      
    case 'drawer-modal':
      return {
        containerCSS: `
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.drawer-overlay.active {
  opacity: 1;
  visibility: visible;
}

.drawer {
  position: fixed;
  top: 0;
  ${options.position === 'left' ? 'left: 0; transform: translateX(-100%);' : 'right: 0; transform: translateX(100%);'}
  width: ${options.width || '300px'};
  max-width: 90vw;
  height: 100%;
  background-color: white;
  box-shadow: ${options.position === 'left' ? '2px 0 5px rgba(0, 0, 0, 0.1)' : '-2px 0 5px rgba(0, 0, 0, 0.1)'};
  z-index: 1001;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.drawer-overlay.active .drawer {
  transform: translateX(0);
}`,
        childrenCSS: `
.drawer-header {
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-weight: 600;
  font-size: 1.125rem;
  color: #111827;
}

.drawer-close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #6B7280;
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.drawer-footer {
  padding: 1rem;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.drawer-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
}

.drawer-btn-primary {
  background-color: #4F46E5;
  color: white;
  border: none;
}

.drawer-btn-secondary {
  background-color: white;
  border: 1px solid #D1D5DB;
  color: #374151;
}`,
        html: `
<button id="openDrawer" class="modal-button modal-button-primary">Open Drawer</button>

<div id="drawerOverlay" class="drawer-overlay">
  <div class="drawer">
    <div class="drawer-header">
      <h3 class="drawer-title">Drawer Menu</h3>
      <button class="drawer-close" onclick="closeDrawer()">×</button>
    </div>
    <div class="drawer-body">
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 0.75rem 0; border-bottom: 1px solid #E5E7EB;">
            <a href="#" style="text-decoration: none; color: #374151;">Home</a>
          </li>
          <li style="padding: 0.75rem 0; border-bottom: 1px solid #E5E7EB;">
            <a href="#" style="text-decoration: none; color: #374151;">Products</a>
          </li>
          <li style="padding: 0.75rem 0; border-bottom: 1px solid #E5E7EB;">
            <a href="#" style="text-decoration: none; color: #374151;">Services</a>
          </li>
          <li style="padding: 0.75rem 0; border-bottom: 1px solid #E5E7EB;">
            <a href="#" style="text-decoration: none; color: #374151;">About</a>
          </li>
          <li style="padding: 0.75rem 0;">
            <a href="#" style="text-decoration: none; color: #374151;">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="drawer-footer">
      <button class="drawer-btn drawer-btn-secondary" onclick="closeDrawer()">Close</button>
      <button class="drawer-btn drawer-btn-primary">Apply</button>
    </div>
  </div>
</div>

<script>
  function openDrawer() {
    document.getElementById('drawerOverlay').classList.add('active');
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    document.getElementById('drawerOverlay').classList.remove('active');
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }
  
  document.getElementById('openDrawer').addEventListener('click', openDrawer);
  
  // Close when clicking on overlay
  document.getElementById('drawerOverlay').addEventListener('click', function(event) {
    if (event.target === this) {
      closeDrawer();
    }
  });
</script>`
      };
      
    default:
      return {
        containerCSS: '',
        childrenCSS: '',
        html: ''
      };
  }
};

export const getLayoutCode = (templateId: string, type: 'grid' | 'flexbox' | 'modal', options: LayoutOptions = {}): CSSLayout => {
  if (type === 'grid') {
    return generateGridLayout(templateId, options);
  } else if (type === 'flexbox') {
    return generateFlexboxLayout(templateId, options);
  } else if (type === 'modal') {
    return generateModalLayout(templateId, options);
  }
  
  return {
    containerCSS: '',
    childrenCSS: '',
    html: ''
  };
};

const BasicModalPreview = () => (
  <div className="w-full h-full bg-white rounded-md overflow-hidden">
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      <div className="w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
      </div>
      <div className="flex-1 p-2 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 h-1/2 rounded shadow-sm flex p-1.5">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="w-12 h-1.5 bg-gray-700 rounded-sm mb-1"></div>
              <div className="w-20 h-1 bg-gray-300 rounded-sm"></div>
            </div>
            <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>
          </div>
        </div>
        <div className="h-2 w-12 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-16 bg-gray-200 rounded-md mt-1.5"></div>
        <div className="h-2 w-14 bg-gray-200 rounded-md mt-1"></div>
      </div>
    </div>
  </div>
);

const NotificationModalPreview = () => (
  <div className="w-full h-full bg-white rounded-md overflow-hidden">
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      <div className="w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
      </div>
      <div className="flex-1 p-2 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 right-4 bg-white w-3/4 rounded border border-gray-200 shadow-sm flex p-1.5">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="w-12 h-1.5 bg-gray-700 rounded-sm mb-1"></div>
            <div className="w-20 h-1 bg-gray-300 rounded-sm"></div>
          </div>
          <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>
        </div>
        <div className="h-2 w-12 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-16 bg-gray-200 rounded-md mt-1.5"></div>
        <div className="h-2 w-14 bg-gray-200 rounded-md mt-1"></div>
      </div>
    </div>
  </div>
);

const ConfirmationModalPreview = () => (
  <div className="w-full h-full bg-white rounded-md overflow-hidden">
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      <div className="w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
      </div>
      <div className="flex-1 p-2 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-3/4 rounded shadow-sm flex flex-col overflow-hidden">
            <div className="bg-red-100 h-1/3 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-red-500"></div>
            </div>
            <div className="p-1.5">
              <div className="w-12 h-1.5 bg-gray-700 rounded-sm mb-1"></div>
              <div className="w-20 h-1 bg-gray-300 rounded-sm mb-2"></div>
              <div className="flex justify-end gap-1">
                <div className="w-6 h-2 bg-gray-200 rounded-sm"></div>
                <div className="w-6 h-2 bg-red-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2 w-12 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-16 bg-gray-200 rounded-md mt-1.5"></div>
        <div className="h-2 w-14 bg-gray-200 rounded-md mt-1"></div>
      </div>
    </div>
  </div>
);

const FullscreenModalPreview = () => (
  <div className="w-full h-full bg-white rounded-md overflow-hidden">
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      <div className="w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-6 border-b border-gray-200 flex items-center justify-between px-2">
          <div className="w-12 h-1.5 bg-gray-700 rounded-sm"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-1 p-2">
          <div className="w-full h-2 bg-gray-200 rounded-md mb-1.5"></div>
          <div className="w-3/4 h-2 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-6 border-t border-gray-200 flex items-center justify-end px-2 gap-1.5">
          <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-6 h-2 bg-blue-500 rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>
);

const DrawerModalPreview = () => (
  <div className="w-full h-full bg-white rounded-md overflow-hidden">
    <div className="flex flex-col h-full border border-gray-200 rounded-md">
      <div className="w-full h-5 bg-gray-100 border-b border-gray-200 flex items-center justify-end px-1.5">
        <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
      </div>
      <div className="flex-1 p-2 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex">
          <div className="bg-white w-1/3 h-full flex flex-col">
            <div className="h-6 border-b border-gray-200 flex items-center justify-between px-1.5">
              <div className="w-10 h-1.5 bg-gray-700 rounded-sm"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex-1 p-1.5">
              <div className="w-full h-2 bg-gray-200 rounded-md mb-1.5"></div>
              <div className="w-full h-2 bg-gray-200 rounded-md mb-1.5"></div>
              <div className="w-full h-2 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-6 border-t border-gray-200 flex items-center justify-end px-1.5 gap-1">
              <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
              <div className="w-6 h-2 bg-indigo-500 rounded-sm"></div>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="h-2 w-12 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-16 bg-gray-200 rounded-md mt-1.5"></div>
        <div className="h-2 w-14 bg-gray-200 rounded-md mt-1"></div>
      </div>
    </div>
  </div>
);

export const layoutTemplates: LayoutTemplate[] = [
  // Grid layouts
  {
    id: '12-span-grid',
    name: '12 Span Grid',
    type: 'grid',
    description: 'A responsive 12-column grid system',
    previewComponent: <TwelveSpanGridPreview />
  },
  {
    id: '3x3',
    name: '3 × 3',
    type: 'grid',
    description: 'A simple 3×3 grid layout',
    previewComponent: <ThreeByThreeGridPreview />
  },
  {
    id: 'holy-grail',
    name: 'Holy Grail',
    type: 'grid',
    description: 'Classic header, footer, nav, main, sidebar layout',
    previewComponent: <HolyGrailPreview />
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    type: 'grid',
    description: 'Simple sidebar and main content layout',
    previewComponent: <SidebarPreview />
  },
  {
    id: 'header-main-footer',
    name: 'Header Main Footer',
    type: 'grid',
    description: 'Standard page layout with header and footer',
    previewComponent: <HeaderMainFooterPreview />
  },
  {
    id: 'card-grid',
    name: 'Card Grid',
    type: 'grid',
    description: 'Responsive grid of card elements',
    previewComponent: <CardGridPreview />
  },
  {
    id: 'masonry',
    name: 'Masonry Grid',
    type: 'grid',
    description: 'Pinterest-style masonry grid layout',
    previewComponent: <MasonryPreview />
  },
  {
    id: 'two-column',
    name: 'Two Column',
    type: 'grid',
    description: 'Simple two column layout',
    previewComponent: <TwoColumnPreview />
  },
  {
    id: 'hierarchy',
    name: 'Hierarchy Layout',
    type: 'grid',
    description: 'Complex nested grid layout',
    previewComponent: <HierarchyPreview />
  },
  
  // Flexbox layouts
  {
    id: 'row',
    name: 'Row',
    type: 'flexbox',
    description: 'Simple flexbox row layout',
    previewComponent: <RowPreview />
  },
  {
    id: 'row-wrap',
    name: 'Row Wrap',
    type: 'flexbox',
    description: 'Flexbox row that wraps items to new lines',
    previewComponent: <RowWrapPreview />
  },
  {
    id: 'fill-space',
    name: 'Fill Space',
    type: 'flexbox',
    description: 'Items that equally distribute available space',
    previewComponent: <FillSpacePreview />
  },
  {
    id: 'fill-remaining-space',
    name: 'Fill Remaining Space',
    type: 'flexbox',
    description: 'One item fills all remaining space',
    previewComponent: <FillRemainingSpacePreview />
  },
  {
    id: 'separate',
    name: 'Separate',
    type: 'flexbox',
    description: 'Space items apart (like in navigation bars)',
    previewComponent: <SeparatePreview />
  },
  {
    id: 'centered-content',
    name: 'Centered Content',
    type: 'flexbox',
    description: 'Content centered both horizontally and vertically',
    previewComponent: <CenteredContentPreview />
  },
  {
    id: 'fixed-header',
    name: 'Fixed Header',
    type: 'flexbox',
    description: 'Layout with a sticky/fixed header',
    previewComponent: <FixedHeaderPreview />
  },
  {
    id: 'tabs-layout',
    name: 'Tabs Layout',
    type: 'flexbox',
    description: 'Tabbed interface layout',
    previewComponent: <TabsLayoutPreview />
  },
  {
    id: 'z-stack',
    name: 'Z-Stack',
    type: 'flexbox',
    description: 'Layered elements with z-index positioning',
    previewComponent: <ZStackPreview />
  },
  
  // Modal layouts
  {
    id: 'basic-modal',
    name: 'Basic Modal',
    type: 'modal',
    description: 'Standard dialog with header, body and footer',
    previewComponent: <BasicModalPreview />
  },
  {
    id: 'notification-modal',
    name: 'Notification',
    type: 'modal',
    description: 'Toast/notification popup for alerts and notices',
    previewComponent: <NotificationModalPreview />
  },
  {
    id: 'confirmation-modal',
    name: 'Confirmation Dialog',
    type: 'modal',
    description: 'Dialog for confirming destructive actions',
    previewComponent: <ConfirmationModalPreview />
  },
  {
    id: 'fullscreen-modal',
    name: 'Fullscreen Modal',
    type: 'modal',
    description: 'Modal that takes the entire screen',
    previewComponent: <FullscreenModalPreview />
  },
  {
    id: 'drawer-modal',
    name: 'Drawer/Sidebar',
    type: 'modal',
    description: 'Side drawer that slides from the edge',
    previewComponent: <DrawerModalPreview />
  },
];
