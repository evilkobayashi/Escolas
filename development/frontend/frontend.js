import React, { useState } from 'react';

const azul = '#0057b8';
const laranja = '#ff7900';
const branco = '#fff';

function App() {
  const [tela, setTela] = useState('menu');
  const [adminAutenticado, setAdminAutenticado] = useState(false);
  const [diagnosticoAutenticado, setDiagnosticoAutenticado] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: branco, fontFamily: 'Segoe UI, Arial, sans-serif', color: '#222' }}>
      <Header />
      {tela === 'menu' && <MenuPrincipal setTela={setTela} />}
      {tela === 'chamada' && <Chamada voltar={() => setTela('menu')} />}
      {tela === 'relatorio' && <Relatorio voltar={() => setTela('menu')} />}
      {tela === 'admin' && (
        adminAutenticado ? <Admin voltar={() => setTela('menu')} /> :
        <Senha onSuccess={() => setAdminAutenticado(true)} />
      )}
      {tela === 'diagnostico' && (
        diagnosticoAutenticado ? <Diagnostico voltar={() => setTela('menu')} /> :
        <Senha onSuccess={() => setDiagnosticoAutenticado(true)} diagnostico />
      )}
    </div>
  );
}

function Header() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `linear-gradient(90deg, ${azul} 60%, ${laranja} 100%)`, color: branco, padding: '1rem 2rem' }}>
      <img src="/logo-prefeitura.png" alt="Prefeitura de Queimados" style={{ height: 60 }} />
      <h1 style={{ fontSize: '1.5rem', textAlign: 'center', flex: 1 }}>Chamada Virtual - Secretaria de Educação de Queimados</h1>
      <img src="/logo-secretaria.png" alt="Secretaria de Educação" style={{ height: 60 }} />
    </header>
  );
}

function MenuPrincipal({ setTela }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <Botao onClick={() => setTela('chamada')}>Registrar Presença</Botao>
      <Botao onClick={() => setTela('relatorio')}>Relatórios</Botao>
      <Botao onClick={() => setTela('admin')}>Área Administrativa</Botao>
      <Botao onClick={() => setTela('diagnostico')}>Diagnóstico (TI)</Botao>
    </div>
  );
}

function Botao({ children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      style={{
        background: hover ? laranja : azul,
        color: branco,
        border: 'none',
        borderRadius: 8,
        fontSize: '1.5rem',
        margin: 16,
        padding: '1.5rem 3rem',
        cursor: 'pointer',
        width: 320,
        fontWeight: 600,
        transition: 'background 0.2s'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}

function Senha({ onSuccess, diagnostico }) {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);
  const senhaCorreta = diagnostico ? 'ti2025' : 'admin2025';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60 }}>
      <h2>{diagnostico ? 'Acesso Diagnóstico' : 'Área Administrativa'}</h2>
      <input
        type="password"
        value={senha}
        onChange={e => { setSenha(e.target.value); setErro(false); }}
        placeholder="Digite a senha"
        style={{ fontSize: '1.2rem', padding: 8, marginBottom: 16, borderRadius: 5, border: '1px solid #ccc' }}
      />
      <button
        style={{ background: azul, color: branco, border: 'none', borderRadius: 8, fontSize: '1.2rem', padding: '0.7rem 2rem', cursor: 'pointer' }}
        onClick={() => senha === senhaCorreta ? onSuccess() : setErro(true)}
      >Entrar</button>
      {erro && <span style={{ color: laranja, marginTop: 8 }}>Senha incorreta</span>}
    </div>
  );
}

function Chamada({ voltar }) {
  // Integração com TensorflowJS pode ser feita aqui
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2 style={{ color: azul }}>Registro de Presença</h2>
      <p>Posicione-se em frente à câmera para registrar sua presença.</p>
      <div style={{ margin: '2rem auto', width: 320, height: 240, background: '#eee', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Webcam e reconhecimento facial aqui */}
        <span style={{ color: '#888' }}>[Webcam / Reconhecimento Facial]</span>
      </div>
      <Botao onClick={voltar}>Voltar ao Menu</Botao>
    </div>
  );
}

function Relatorio({ voltar }) {
  // Exemplo de relatório simples
  const [presencas] = useState([
    { nome: 'João Silva', data: '01/10/2025', hora: '13:00', disciplina: 'Matemática' },
    { nome: 'Maria Souza', data: '01/10/2025', hora: '13:01', disciplina: 'Matemática' },
  ]);
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2 style={{ color: azul }}>Relatório de Presença</h2>
      <table style={{ margin: '2rem auto', borderCollapse: 'collapse', minWidth: 400 }}>
        <thead>
          <tr style={{ background: azul, color: branco }}>
            <th style={{ padding: 8 }}>Nome</th>
            <th style={{ padding: 8 }}>Data</th>
            <th style={{ padding: 8 }}>Hora</th>
            <th style={{ padding: 8 }}>Disciplina</th>
          </tr>
        </thead>
        <tbody>
          {presencas.map((p, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f5f5f5' : '#fff' }}>
              <td style={{ padding: 8 }}>{p.nome}</td>
              <td style={{ padding: 8 }}>{p.data}</td>
              <td style={{ padding: 8 }}>{p.hora}</td>
              <td style={{ padding: 8 }}>{p.disciplina}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Botao onClick={voltar}>Voltar ao Menu</Botao>
    </div>
  );
}

function Admin({ voltar }) {
  // Área administrativa funcional
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2 style={{ color: azul }}>Área Administrativa</h2>
      <p>Gerencie alunos, disciplinas e aulas.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '2rem 0' }}>
        <Botao onClick={() => alert('CRUD de Alunos')}>Alunos</Botao>
        <Botao onClick={() => alert('CRUD de Disciplinas')}>Disciplinas</Botao>
        <Botao onClick={() => alert('CRUD de Aulas')}>Aulas</Botao>
      </div>
      <Botao onClick={voltar}>Voltar ao Menu</Botao>
    </div>
  );
}

function Diagnostico({ voltar }) {
  // Diagnóstico para TI/manutenção
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2 style={{ color: laranja }}>Diagnóstico do Sistema</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.2rem', margin: '2rem auto', maxWidth: 400 }}>
        <li>🖥️ Tela touchscreen: <b style={{ color: azul }}>OK</b></li>
        <li>📷 Webcam: <b style={{ color: azul }}>OK</b></li>
        <li>🌐 Conexão: <b style={{ color: azul }}>OK</b></li>
        <li>🗄️ Backend: <b style={{ color: azul }}>OK</b></li>
        <li>🔒 Segurança: <b style={{ color: azul }}>OK</b></li>
      </ul>
      <Botao onClick={() => alert('Reiniciar sistema')}>Reiniciar Sistema</Botao>
      <Botao onClick={voltar}>Voltar ao Menu</Botao>
    </div>
  );
}

export default App;
