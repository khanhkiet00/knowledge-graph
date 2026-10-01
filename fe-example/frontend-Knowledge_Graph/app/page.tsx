'use client'

import { useState } from 'react'
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Code2,
  Copy,
  Database,
  FileJson,
  GitBranch,
  Globe2,
  LayoutGrid,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Webhook,
  X,
  Zap,
} from 'lucide-react'

const nodes = [
  { id: 'trigger', title: 'Nhận khách hàng tiềm năng mới', subtitle: 'Webhook', icon: Webhook, color: 'violet', x: 88, y: 226 },
  { id: 'enrich', title: 'Làm giàu dữ liệu công ty', subtitle: 'HTTP Request', icon: Globe2, color: 'blue', x: 360, y: 226 },
  { id: 'condition', title: 'Công ty có đủ điều kiện?', subtitle: 'IF', icon: GitBranch, color: 'amber', x: 632, y: 226 },
  { id: 'slack', title: 'Thông báo đội ngũ kinh doanh', subtitle: 'Slack', icon: Bell, color: 'cyan', x: 904, y: 132 },
  { id: 'crm', title: 'Tạo liên hệ CRM', subtitle: 'Postgres', icon: Database, color: 'emerald', x: 904, y: 322 },
]

const nav = [
  { label: 'Luồng công việc', icon: Zap, active: true },
  { label: 'Lần chạy', icon: Activity },
  { label: 'Thông tin xác thực', icon: Database },
  { label: 'Biến', icon: SlidersHorizontal },
]

export default function Page() {
  const [selected, setSelected] = useState('condition')
  const [running, setRunning] = useState(false)
  const [saved, setSaved] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  function runWorkflow() {
    setRunning(true)
    window.setTimeout(() => setRunning(false), 1400)
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Zap size={16} fill="currentColor" /></div><span>flowbase</span></div>
        <div className="workspace-switcher"><div className="workspace-avatar">A</div><div><strong>Không gian làm việc Acme</strong><span>Không gian cá nhân</span></div><ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <p className="nav-label">Không gian làm việc</p>
          {nav.map(({ label, icon: Icon, active }) => <button className={`nav-item ${active ? 'active' : ''}`} key={label}><Icon size={17} /><span>{label}</span>{label === 'Lần chạy' && <span className="nav-count">12</span>}</button>)}
          <p className="nav-label section-label">Quản lý</p>
          <button className="nav-item"><LayoutGrid size={17} /><span>Mẫu</span></button>
          <button className="nav-item"><Settings2 size={17} /><span>Cài đặt</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="usage-head"><span>Mức sử dụng tháng này</span><span>68%</span></div><div className="usage-bar"><i /></div><p>6.842 trên 10.000 lần chạy</p><div className="help-link"><CircleHelp size={16} /> Trung tâm trợ giúp <span>↗</span></div><div className="profile"><div className="profile-avatar">MN</div><div><strong>Minh Nguyen</strong><span>minh@acme.co</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div className="breadcrumbs"><span>Luồng công việc</span><span>/</span><strong>Đánh giá khách hàng tiềm năng</strong><span className="draft-pill">Bản nháp</span></div><div className="top-actions"><button className="icon-button" aria-label="Tìm kiếm" onClick={() => setSearchOpen(!searchOpen)}><Search size={17} /></button><button className="icon-button" aria-label="Thông báo"><Bell size={17} /></button><button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => setSaved(true)}>{saved ? <Check size={15} /> : null}{saved ? 'Đã lưu' : 'Lưu thay đổi'}</button><button className="run-button" onClick={runWorkflow}><Play size={14} fill="currentColor" />{running ? 'Đang chạy...' : 'Chạy thử luồng'}</button></div></header>
        {searchOpen && <div className="search-popover"><Search size={16} /><input autoFocus placeholder="Tìm kiếm nút, luồng công việc..." /></div>}
        <div className="workflow-toolbar"><div><h1>Đánh giá khách hàng tiềm năng</h1><p>Tự động đánh giá khách hàng tiềm năng và thông báo cho đội ngũ kinh doanh.</p></div><div className="toolbar-actions"><span className="updated"><Clock3 size={14} /> Đã chỉnh sửa 2 phút trước</span><button className="small-icon"><Copy size={15} /></button><button className="small-icon"><MoreHorizontal size={17} /></button></div></div>
        <div className="canvas-area">
          <div className="canvas-grid" />
          <div className="canvas-controls"><button aria-label="Phóng to">+</button><button aria-label="Thu nhỏ">−</button><button aria-label="Vừa màn hình"><MaximizeIcon /></button></div>
          <div className="minimap"><div className="mini-line line-one" /><div className="mini-line line-two" /><div className="mini-box one" /><div className="mini-box two" /><div className="mini-box three" /><div className="mini-box four" /><div className="mini-box five" /></div>
          <div className="graph-layer">
            <svg className="connections" viewBox="0 0 1120 520" preserveAspectRatio="none" aria-hidden="true"><path d="M246 270 C300 270 306 270 360 270" /><path d="M518 270 C570 270 580 270 632 270" /><path d="M790 270 C850 270 850 175 904 175" /><path d="M790 270 C850 270 850 365 904 365" /><circle cx="850" cy="175" r="4" /><circle cx="850" cy="365" r="4" /></svg>
            {nodes.map(({ id, title, subtitle, icon: Icon, color, x, y }) => <button key={id} className={`workflow-node ${selected === id ? 'selected' : ''}`} style={{ left: x, top: y }} onClick={() => setSelected(id)}><div className={`node-icon ${color}`}><Icon size={17} /></div><div className="node-copy"><strong>{title}</strong><span>{subtitle}</span></div><div className="node-status"><span /></div></button>)}
            <button className="add-node" aria-label="Thêm nút"><Plus size={18} /></button>
          </div>
          <div className="canvas-hint"><span className="key">⌘</span><span>Nhấp vào một nút để cấu hình</span></div>
        </div>
      </section>

      <aside className="inspector">
        <div className="inspector-header"><div><span className="eyebrow">Cấu hình nút</span><h2>Công ty có đủ điều kiện?</h2></div><button className="close-button"><X size={17} /></button></div>
        <div className="node-preview"><div className="node-icon amber"><GitBranch size={18} /></div><div><strong>IF</strong><span>Điều hướng luồng dựa trên điều kiện</span></div><button><MoreHorizontal size={17} /></button></div>
        <div className="tabs"><button className="tab active">Tham số</button><button className="tab">Cài đặt</button></div>
        <div className="inspector-content"><label className="field-label">Điều kiện</label><p className="field-help">Chỉ tiếp tục khi dữ liệu đầu vào khớp với tất cả quy tắc.</p><div className="condition-card"><div className="condition-row"><span className="condition-index">1</span><select defaultValue="company_size"><option value="company_size">Quy mô công ty</option><option value="industry">Ngành nghề</option></select><select defaultValue="greater"><option value="greater">lớn hơn</option><option value="equals">bằng</option></select></div><div className="value-row"><input defaultValue="50" aria-label="Giá trị điều kiện" /><span className="suffix">nhân viên</span><button aria-label="Xóa điều kiện"><Trash2 size={15} /></button></div></div><button className="add-condition"><Plus size={15} /> Thêm điều kiện</button><div className="logic-row"><span>Kết hợp bằng</span><button className="logic-select">AND <ChevronDown size={14} /></button></div><div className="output-section"><label className="field-label">Đầu ra</label><div className="output-row"><span className="output-dot green" />True <span className="output-line" /><span>Thông báo kinh doanh</span></div><div className="output-row"><span className="output-dot red" />False <span className="output-line" /><span>Bỏ qua khách hàng</span></div></div><div className="data-preview"><div className="preview-title"><span><FileJson size={14} /> Dữ liệu đầu vào</span><button>Xem JSON</button></div><pre>{`{\n  "company_size": 84,\n  "industry": "SaaS",\n  "email": "jane@acme.co"\n}`}</pre></div></div>
        <div className="inspector-footer"><button className="delete-node"><Trash2 size={15} /> Xóa nút</button><button className="done-button">Hoàn tất</button></div>
      </aside>
    </main>
  )
}

function MaximizeIcon() { return <span className="maximize-icon" aria-hidden="true">↗</span> }
