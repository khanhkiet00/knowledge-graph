import React, { useState } from 'react'
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  Database,
  FileJson,
  GitBranch,
  Globe2,
  LayoutGrid,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  SlidersHorizontal,
  Trash2,
  Webhook,
  X,
  Zap,
} from 'lucide-react'
import './index.css'

const nodes = [
  { id: 'trigger', title: 'Lên lịch hằng ngày', subtitle: 'Cron Job', icon: Clock3, color: 'violet', x: 88, y: 226 },
  { id: 'scrape', title: 'Cào Github Trending', subtitle: 'HTTP Request', icon: Globe2, color: 'blue', x: 360, y: 226 },
  { id: 'condition', title: 'Có dữ liệu mới?', subtitle: 'IF', icon: GitBranch, color: 'amber', x: 632, y: 226 },
  { id: 'log', title: 'Ghi log cảnh báo', subtitle: 'System', icon: Bell, color: 'cyan', x: 904, y: 132 },
  { id: 'neo4j', title: 'Lưu vào Neo4j', subtitle: 'Database', icon: Database, color: 'emerald', x: 904, y: 322 },
]

const nav = [
  { label: 'Luồng công việc', icon: Zap, active: true },
  { label: 'Lần chạy', icon: Activity },
  { label: 'Thông tin xác thực', icon: Database },
  { label: 'Biến số', icon: SlidersHorizontal },
]

export default function App() {
  const [selected, setSelected] = useState('neo4j')
  const [running, setRunning] = useState(false)
  const [saved, setSaved] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function runWorkflow() {
    setRunning(true)
    window.setTimeout(() => setRunning(false), 1400)
  }

  return (
    <main className="app-shell">
      {mobileMenuOpen && <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Zap size={16} fill="currentColor" /></div><span>K-Graph</span></div>
        <div className="workspace-switcher"><div className="workspace-avatar">K</div><div><strong>Dữ liệu Knowledge Graph</strong><span>Hệ thống nội bộ</span></div><ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <p className="nav-label">Không gian làm việc</p>
          {nav.map(({ label, icon: Icon, active }) => <button className={`nav-item ${active ? 'active' : ''}`} key={label}><Icon size={17} /><span>{label}</span>{label === 'Lần chạy' && <span className="nav-count">24</span>}</button>)}
          <p className="nav-label section-label">Quản lý</p>
          <button className="nav-item"><LayoutGrid size={17} /><span>Mẫu đồ thị</span></button>
          <button className="nav-item"><Settings2 size={17} /><span>Cài đặt hệ thống</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="usage-head"><span>Tải lượng API tháng này</span><span>42%</span></div><div className="usage-bar"><i style={{width: '42%'}}/></div><p>4.215 trên 10.000 requests</p><div className="help-link"><CircleHelp size={16} /> Tài liệu Neo4j <span>↗</span></div><div className="profile"><div className="profile-avatar">AD</div><div><strong>Admin</strong><span>admin@kg.local</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="breadcrumbs">
            <button className="icon-button mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}><Menu size={17} /></button>
            <span className="breadcrumb-text">Luồng công việc</span><span className="breadcrumb-slash">/</span><strong>Đồng bộ Github Trending</strong><span className="draft-pill">Bản nháp</span>
          </div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Tìm kiếm" onClick={() => setSearchOpen(!searchOpen)}><Search size={17} /></button>
            <button className="icon-button" aria-label="Thông báo"><Bell size={17} /></button>
            <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => setSaved(true)}>{saved ? <Check size={15} /> : null}{saved ? 'Đã lưu' : 'Lưu thay đổi'}</button>
            <button className="run-button" onClick={runWorkflow}><Play size={14} fill="currentColor" />{running ? 'Đang chạy...' : 'Chạy thử luồng'}</button>
          </div>
        </header>
        {searchOpen && <div className="search-popover"><Search size={16} /><input autoFocus placeholder="Tìm kiếm node, luồng..." /></div>}
        <div className="workflow-toolbar">
          <div>
            <h1>Đồng bộ Github Trending</h1>
            <p>Tự động lấy dữ liệu repository đang hot trên Github và đẩy vào database Neo4j.</p>
          </div>
          <div className="toolbar-actions">
            <span className="updated"><Clock3 size={14} /> Đã chỉnh sửa 5 phút trước</span>
            <button className="small-icon"><Copy size={15} /></button>
            <button className="small-icon"><MoreHorizontal size={17} /></button>
          </div>
        </div>
        <div className="canvas-area">
          <div className="canvas-grid" />
          <div className="canvas-controls"><button aria-label="Phóng to">+</button><button aria-label="Thu nhỏ">−</button><button aria-label="Vừa màn hình"><MaximizeIcon /></button></div>
          <div className="minimap"><div className="mini-line line-one" /><div className="mini-line line-two" /><div className="mini-box one" /><div className="mini-box two" /><div className="mini-box three" /><div className="mini-box four" /><div className="mini-box five" /></div>
          <div className="graph-layer">
            <svg className="connections" viewBox="0 0 1120 520" preserveAspectRatio="none" aria-hidden="true"><path d="M246 270 C300 270 306 270 360 270" /><path d="M518 270 C570 270 580 270 632 270" /><path d="M790 270 C850 270 850 175 904 175" /><path d="M790 270 C850 270 850 365 904 365" /><circle cx="850" cy="175" r="4" /><circle cx="850" cy="365" r="4" /></svg>
            {nodes.map(({ id, title, subtitle, icon: Icon, color, x, y }) => <button key={id} className={`workflow-node ${selected === id ? 'selected' : ''}`} style={{ left: x, top: y }} onClick={() => setSelected(id)}><div className={`node-icon ${color}`}><Icon size={17} /></div><div className="node-copy"><strong>{title}</strong><span>{subtitle}</span></div><div className="node-status"><span /></div></button>)}
            <button className="add-node" aria-label="Thêm nút"><Plus size={18} /></button>
          </div>
          <div className="canvas-hint"><span className="key">⌘</span><span>Nhấp vào một node để cấu hình</span></div>
        </div>
      </section>

      <aside className="inspector">
        <div className="inspector-header"><div><span className="eyebrow">Cấu hình node</span><h2>Lưu vào Neo4j</h2></div><button className="close-button"><X size={17} /></button></div>
        <div className="node-preview"><div className="node-icon emerald"><Database size={18} /></div><div><strong>Neo4j Database</strong><span>Cập nhật node và quan hệ</span></div><button><MoreHorizontal size={17} /></button></div>
        <div className="tabs"><button className="tab active">Tham số</button><button className="tab">Mã Python</button></div>
        <div className="inspector-content"><label className="field-label">Cypher Query</label><p className="field-help">Xác định câu lệnh MERGE để ghi đè hoặc thêm mới dữ liệu.</p><div className="condition-card"><div className="condition-row"><span className="condition-index">1</span><select defaultValue="merge_node"><option value="merge_node">MERGE Node</option><option value="merge_rel">MERGE Relationship</option></select><select defaultValue="repository"><option value="repository">Repository</option><option value="developer">Developer</option></select></div><div className="value-row"><input defaultValue="URL" aria-label="Khóa chính" style={{width:'80px'}}/><span className="suffix">làm khóa chính</span><button aria-label="Xóa"><Trash2 size={15} /></button></div></div><button className="add-condition"><Plus size={15} /> Thêm truy vấn con</button><div className="logic-row"><span>Xử lý lô (Batch)</span><button className="logic-select">50 records <ChevronDown size={14} /></button></div><div className="output-section"><label className="field-label">Trạng thái đầu ra</label><div className="output-row"><span className="output-dot green" />Thành công <span className="output-line" /><span>Hoàn tất luồng</span></div><div className="output-row"><span className="output-dot red" />Lỗi kết nối <span className="output-line" /><span>Thử lại sau 5 phút</span></div></div><div className="data-preview"><div className="preview-title"><span><FileJson size={14} /> Dữ liệu mẫu (Từ Github)</span><button>Xem JSON</button></div><pre>{`{\n  "name": "react",\n  "language": "TypeScript",\n  "stars_total": 210000,\n  "url": "https://github/..."\n}`}</pre></div></div>
        <div className="inspector-footer"><button className="delete-node"><Trash2 size={15} /> Xóa node</button><button className="done-button">Áp dụng</button></div>
      </aside>
    </main>
  )
}

function MaximizeIcon() { return <span className="maximize-icon" aria-hidden="true">↗</span> }
