
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { STUDENT_MOCK, DISCIPLINES_MOCK, DIPLOMA_VERIFICATION_MOCK } from './constants';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AppContent: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isPortalRoute = location.pathname.startsWith('/portal');

  const handleDownloadHistory = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(0, 121, 106); // #00796a
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PORTAL DO ESTUDANTE - HISTÓRICO ESCOLAR', 105, 13, { align: 'center' });

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    let y = 35;
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO ALUNO', 14, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, 196, y);
    y += 10;

    doc.setFont('helvetica', 'bold');
    doc.text(`Nome:`, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(STUDENT_MOCK.name.toUpperCase(), 35, y);

    doc.setFont('helvetica', 'bold');
    doc.text(`RA:`, 140, y);
    doc.setFont('helvetica', 'normal');
    doc.text(STUDENT_MOCK.registration, 150, y);
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.text(`Curso:`, 14, y);
    doc.setFont('helvetica', 'normal');
    const courseLines = doc.splitTextToSize(STUDENT_MOCK.course, 160);
    doc.text(courseLines, 35, y);

    y += Math.max(7, courseLines.length * 5);

    doc.setFont('helvetica', 'bold');
    doc.text(`Situação:`, 14, y);
    doc.setTextColor(0, 121, 106);
    doc.setFont('helvetica', 'bold');
    doc.text(STUDENT_MOCK.situation, 35, y);

    // Table
    y += 15;
    doc.setTextColor(0, 0, 0);

    const tableColumn = ["Código", "Componente Curricular", "C.H.", "Período", "Grau", "Situação"];
    const tableRows = DISCIPLINES_MOCK.map(d => [
      d.code,
      d.name.toUpperCase(),
      d.ch,
      d.period,
      d.grade,
      d.status
    ]);

    autoTable(doc, {
      startY: y,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 121, 106],
        textColor: [255, 255, 255],
        fontSize: 9,
        halign: 'center',
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        valign: 'middle',
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { cellWidth: 'auto' },
        2: { halign: 'center', cellWidth: 15 },
        3: { halign: 'center', cellWidth: 20 },
        4: { halign: 'center', cellWidth: 15, fontStyle: 'bold', textColor: [0, 121, 106] },
        5: { halign: 'center', cellWidth: 25 },
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 5) {
          if (data.cell.raw === 'APROVADO') {
            data.cell.styles.textColor = [0, 100, 0];
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text('Este documento foi gerado digitalmente pelo Portal do Estudante.', 105, 290, { align: 'center' });
      doc.text(`Página ${i} de ${pageCount}`, 196, 290, { align: 'right' });
    }

    doc.save('historico-escolar.pdf');
  };

  const renderDashboard = () => (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-2">
        <div>
          <h2 className="text-3xl font-black text-[#00796a] lato uppercase tracking-tight">Portal do Estudante</h2>
          <div className="mt-2 text-sm text-gray-600">
            <span className="mr-6">Nome: <strong className="text-gray-900 uppercase">{STUDENT_MOCK.name}</strong></span>
            <span>Matrícula: <strong className="text-gray-900">{STUDENT_MOCK.registration}</strong></span>
          </div>
        </div>
      </div>

      {/* Diploma Alert */}
      <div className="mb-8 mx-2 bg-blue-50 border-l-4 border-[#42a5f5] p-5 rounded-r shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-[#42a5f5] text-white rounded-full p-2 flex-shrink-0 mt-1 sm:mt-0">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <h3 className="text-[#1e88e5] font-black text-sm uppercase mb-1">Conclusão de Curso Detectada</h3>
            <p className="text-blue-700 text-sm font-medium leading-relaxed">
              Parabéns, Lucas! Identificamos que você concluiu todas as disciplinas.
              O seu <span className="font-bold">diploma digital</span> já está disponível para download.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-center ml-12 sm:ml-0">
          <a
            href="/diploma1.pdf"
            download="Diploma_Digital_Lucas_Borges.pdf"
            className="bg-[#1e88e5] hover:bg-blue-700 text-white px-5 py-3 rounded text-xs font-bold uppercase transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-file-pdf text-lg"></i>
            Baixar Diploma
          </a>
          <button
            onClick={() => navigate('/')}
            className="bg-[#00796a] hover:bg-teal-800 text-white px-5 py-3 rounded text-xs font-bold uppercase transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <i className="fa-solid fa-qrcode text-lg"></i>
            Verificar Diploma
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-700 mb-4 px-2">O que deseja fazer?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 mb-10">
        <DashboardCard
          title="Sala virtual"
          icon={<i className="fa-solid fa-laptop-code text-3xl text-purple-700"></i>}
          className="border-b-4 border-purple-700"
        />
        <DashboardCard
          title="Pagamentos"
          icon={<i className="fa-solid fa-barcode text-3xl text-teal-600"></i>}
          className="border-b-4 border-teal-600"
          subtitle={
            <div className="text-[10px] mt-2 space-y-1 text-left w-full pl-4">
              <div className="flex items-center gap-1 text-green-600 font-bold"><i className="fa-solid fa-circle text-[6px]"></i> 0 a vencer</div>
              <div className="flex items-center gap-1 text-green-600 font-bold"><i className="fa-solid fa-circle text-[6px]"></i> 0 em atraso</div>
            </div>
          }
        />
        <DashboardCard
          title="Envio de documentos"
          icon={<i className="fa-solid fa-file-arrow-up text-3xl text-orange-500"></i>}
          className="border-b-4 border-orange-500"
          subtitle={
            <div className="text-[10px] mt-2 space-y-1 text-left w-full pl-4">
              <div className="flex items-center gap-1 text-green-600 font-bold"><i className="fa-solid fa-circle text-[6px]"></i> 0 não enviados</div>
              <div className="flex items-center gap-1 text-green-600 font-bold"><i className="fa-solid fa-circle text-[6px]"></i> 0 invalidados</div>
            </div>
          }
        />
      </div>

      <h3 className="text-lg font-bold text-gray-700 mb-4 px-2">Serviços Aqui</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 mb-12">
        <ServiceCard title="Volte a estudar" icon={<i className="fa-solid fa-rotate-left"></i>} />
        <ServiceCard title="Pacote office" icon={<i className="fa-solid fa-boxes-stacked"></i>} />
        <ServiceCard title="Transferência de modalidade" icon={<i className="fa-solid fa-right-left"></i>} />
        <ServiceCard title="Certidão digital de conclusão" icon={<i className="fa-solid fa-certificate"></i>} />
        <ServiceCard title="Estágio não obrigatório" icon={<i className="fa-solid fa-briefcase"></i>} />
        <ServiceCard title="Estágio obrigatório" icon={<i className="fa-solid fa-user-tie"></i>} />
        <ServiceCard
          title="Histórico escolar"
          icon={<i className="fa-solid fa-list-check"></i>}
          onClick={() => navigate('/portal/historico')}
          highlight
        />
        <ServiceCard title="Atestado de matrícula" icon={<i className="fa-solid fa-file-invoice"></i>} />
        <ServiceCard title="Rematrícula / DP Intensiva" icon={<i className="fa-solid fa-calendar-plus"></i>} />
        <ServiceCard title="Dependências e Optativas" icon={<i className="fa-solid fa-book-open"></i>} />
        <ServiceCard title="Solicitações" icon={<i className="fa-solid fa-circle-question"></i>} />
        <ServiceCard title="Contratos" icon={<i className="fa-solid fa-file-contract"></i>} />
        <ServiceCard title="Atividades complementares" icon={<i className="fa-solid fa-medal"></i>} />
      </div>
    </div>
  );

  const renderHistorico = () => (
    <div className="animate__animated animate__fadeIn">
      <div className="bg-white shadow-md rounded-sm overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h1 className="text-xl font-black lato text-gray-800 tracking-tight uppercase">HISTÓRICO ESCOLAR</h1>
          <button onClick={() => navigate('/portal')} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1">×</button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-3 mb-8 text-sm">
            <span className="text-gray-500 font-bold uppercase text-[11px]">Curso:</span>
            <span className="text-gray-800">{STUDENT_MOCK.course}</span>
            <span className="text-gray-500 font-bold uppercase text-[11px]">Situação:</span>
            <span className="text-[#00796a] font-bold text-base">{STUDENT_MOCK.situation}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 border-t border-gray-100 pt-6">
            <button onClick={() => navigate('/portal')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded text-xs font-bold uppercase transition-colors">
              {'<< Voltar ao Menu'}
            </button>
            <button onClick={handleDownloadHistory} className="bg-[#42a5f5] hover:bg-[#1e88e5] text-white px-6 py-2.5 rounded text-xs font-bold uppercase transition-colors shadow-sm flex items-center gap-2">
              <i className="fa-solid fa-file-pdf"></i>
              Histórico Oficial Digital
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#00796a] text-white">
                  <th colSpan={9} className="p-3 text-center uppercase tracking-widest font-black text-sm">Histórico Detalhado</th>
                </tr>
                <tr className="bg-white border-b border-gray-200 text-[#00796a] text-[10px] font-black uppercase text-center">
                  <th className="p-3 border-r border-gray-200">Código</th>
                  <th className="p-3 border-r border-gray-200 text-left w-[30%]">Componente Curricular</th>
                  <th className="p-3 border-r border-gray-200">C.H.</th>
                  <th className="p-3 border-r border-gray-200">Período</th>
                  <th className="p-3 border-r border-gray-200">Grau</th>
                  <th className="p-3">Situação</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {DISCIPLINES_MOCK.map((d, i) => (
                  <tr key={d.code} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors border-b border-gray-100 text-center`}>
                    <td className="p-3 border-r border-gray-100 font-bold text-teal-800">{d.code}</td>
                    <td className="p-3 border-r border-gray-100 uppercase font-medium text-left">{d.name}</td>
                    <td className="p-3 border-r border-gray-100">{d.ch}</td>
                    <td className="p-3 border-r border-gray-100">{d.period}</td>
                    <td className="p-3 border-r border-gray-100 font-bold text-teal-900">{d.grade}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-full text-[9px] font-bold bg-green-100 text-green-700">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const diploma = DIPLOMA_VERIFICATION_MOCK;

  const renderVerificacao = () => (
    <div className="animate__animated animate__fadeIn max-w-3xl mx-auto">
      {/* Header com selo de verificação */}
      <div className="bg-gradient-to-br from-[#00796a] via-[#00897b] to-[#26a69a] rounded-2xl p-8 text-center mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-white text-[120px] rotate-[-15deg]">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 ring-4 ring-white/30">
            <i className="fa-solid fa-shield-halved text-white text-4xl"></i>
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight lato">Diploma Digital Verificado</h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="bg-green-400 w-3 h-3 rounded-full animate-pulse"></span>
            <span className="text-green-200 text-sm font-bold uppercase tracking-wider">Documento Autêntico</span>
          </div>
          <p className="text-white/70 text-xs mt-3">Verificação realizada em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      {/* Dados da Instituição */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <i className="fa-solid fa-university text-[#00796a] text-lg"></i>
          <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Dados da Instituição</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Instituição</p>
            <p className="text-sm font-bold text-gray-800">{diploma.instituicao}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Mantenedora</p>
            <p className="text-sm text-gray-700">{diploma.mantenedora}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">CNPJ</p>
            <p className="text-sm text-gray-700 font-mono">{diploma.cnpj}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Recredenciamento</p>
            <p className="text-xs text-gray-600 leading-relaxed">{diploma.portariaRecredenciamento}</p>
          </div>
        </div>
      </div>

      {/* Dados do Diploma */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <i className="fa-solid fa-graduation-cap text-[#00796a] text-lg"></i>
          <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Dados do Diploma</h2>
        </div>
        <div className="p-6">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-5 flex items-center gap-3">
            <i className="fa-solid fa-user-graduate text-[#00796a] text-xl"></i>
            <div>
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Diplomado</p>
              <p className="text-lg font-black text-gray-900">{diploma.nomeAluno}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Curso</p>
              <p className="text-sm font-bold text-gray-800">{diploma.curso}</p>
              <p className="text-xs text-gray-500 mt-1">Reconhecido pela {diploma.portariaReconhecimento}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Nº de Registro</p>
              <p className="text-sm text-gray-700 font-mono font-bold">{diploma.registro}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Processo</p>
              <p className="text-sm text-gray-700 font-mono">{diploma.processo}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Livro / Folha</p>
              <p className="text-sm text-gray-700">Livro nº {diploma.livro} / FL {diploma.folha}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Data do Registro</p>
              <p className="text-sm text-gray-700">{diploma.dataRegistro}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assinaturas Digitais */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <i className="fa-solid fa-file-signature text-[#00796a] text-lg"></i>
          <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Assinaturas Digitais</h2>
        </div>
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Este documento foi assinado digitalmente por: <strong>{diploma.assinadoPor.join(', ')}</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diploma.assinaturas.map((sig, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:bg-teal-50/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <i className="fa-solid fa-pen-nib text-[#00796a]"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{sig.name}</p>
                    <p className="text-xs text-[#00796a] font-bold uppercase">{sig.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-id-card text-gray-400"></i>
                  <span className="font-mono">CPF: {sig.cpf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Código de Verificação */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <i className="fa-solid fa-fingerprint text-[#00796a] text-lg"></i>
          <h2 className="text-sm font-black text-gray-700 uppercase tracking-wide">Verificação de Autenticidade</h2>
        </div>
        <div className="p-6 text-center">
          <p className="text-xs text-gray-500 mb-3">Para verificar as assinaturas, acesse o site e utilize o código abaixo:</p>
          <div className="inline-block bg-gray-900 text-green-400 font-mono text-lg md:text-xl font-bold px-8 py-4 rounded-lg tracking-[0.3em] mb-4 shadow-inner">
            {diploma.codigoVerificacao}
          </div>
          <div className="mt-2">
            <a
              href={diploma.urlVerificacao}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00796a] hover:text-teal-800 text-xs font-bold underline underline-offset-4 decoration-teal-300 hover:decoration-teal-500 transition-colors inline-flex items-center gap-1"
            >
              <i className="fa-solid fa-external-link-alt"></i>
              {diploma.urlVerificacao}
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5"></i>
        <p className="text-xs text-amber-800 leading-relaxed">
          Diploma registrado de acordo com o disposto no art. 48 da Lei nº 9.394, de 20 de dezembro de 1996, e na Portaria MEC nº 1.095, de 25 de outubro de 2018. Representação gráfica de Diploma Digital, conforme Instrução Normativa nº 1, de 15 de dezembro de 2020.
        </p>
      </div>

      {/* Botão Voltar */}
      <div className="flex justify-center mb-12">
        {isPortalRoute && (
          <button
            onClick={() => navigate('/portal')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Voltar ao Portal
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col relative overflow-x-hidden">
      {/* Navbar Replicated from HTML - Only shown in Portal */}
      {isPortalRoute && (
        <nav className="bg-white border-b border-gray-200 px-4 md:px-12 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="md:hidden text-gray-600 cursor-pointer p-2">
              <i className="fa fa-bars fa-lg"></i>
            </div>
            <img
              src="https://estudantesuam.ead.br/__shared/img/especifico/anima-v1/uam/logo.png"
              alt="UAM Logo"
              className="h-10 object-contain cursor-pointer"
              onClick={() => navigate('/portal')}
            />
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
              <button onClick={() => navigate('/portal')} className="hover:text-[#00796a] transition-colors border-b-2 border-transparent hover:border-[#00796a] pb-1">Portal do Estudante</button>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-[#00796a]">Serviços <i className="fa-solid fa-chevron-down text-[10px]"></i></button>
              </div>
              <a href="#" className="hover:text-[#00796a]">Central de Ajuda</a>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer hover:scale-110 transition-transform">
              <i className="fa-regular fa-bell text-gray-500 text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-[11px] text-gray-500 font-bold uppercase">Lucas Borges</p>
                <p className="text-[10px] text-gray-400">RA: 2022240707</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 transition-colors">
                <i className="fa fa-user text-lg"></i>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={renderVerificacao()} />
          <Route path="/portal" element={renderDashboard()} />
          <Route path="/portal/historico" element={renderHistorico()} />
        </Routes>
      </main>

      {/* Fale Conosco UI Replicated - Only shown in Portal */}
      {isPortalRoute && (
        <div className="fixed bottom-6 right-6 z-[60]">
          {!showChat ? (
            <button
              onClick={() => setShowChat(true)}
              className="bg-white border-2 border-[#00796a] rounded-full px-5 py-2.5 flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95 group"
            >
              <i className="fa-regular fa-comments text-[#00796a] text-xl group-hover:scale-110 transition-transform"></i>
              <span className="text-[#00796a] font-black text-xs uppercase tracking-wide">Fale conosco</span>
            </button>
          ) : (
            <div className="w-[320px] bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden animate__animated animate__slideInUp animate__faster">
              <div className="bg-[#00796a] text-white p-5 flex flex-col items-center relative">
                <button
                  onClick={() => setShowChat(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white"
                >
                  <i className="fa fa-times"></i>
                </button>
                <span className="text-xl font-black uppercase tracking-wider">Fale conosco</span>
                <span className="text-[11px] font-medium opacity-80 mt-1">Segunda a sexta-feira</span>
                <div className="text-[10px] text-center mt-4 opacity-90 leading-relaxed bg-black/10 p-2 rounded w-full">
                  <p>Suporte geral: 8h às 19h30</p>
                  <p>Trancamento: 8h às 18h</p>
                </div>
              </div>
              <div className="p-8 flex flex-col items-center text-center">
                <p className="text-[11px] text-gray-500 font-bold mb-1">Salve nos seus contatos!</p>
                <p className="font-black text-[#00796a] text-lg mb-6 hover:underline cursor-pointer tracking-tight">+55 (11) 4007-1192</p>

                <div className="bg-green-50 p-4 rounded-full mb-4 cursor-pointer hover:bg-green-100 transition-colors">
                  <img
                    src="https://estudantesuam.ead.br/__shared/img/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-10"
                  />
                </div>

                <span className="font-black text-gray-700 text-[13px] leading-tight">Atendimento exclusivo<br /><span className="text-[#00796a]">via WhatsApp</span></span>

                <button className="mt-8 bg-[#00796a] text-white text-xs font-black py-3 px-10 rounded-full hover:bg-teal-800 transition-all uppercase tracking-widest shadow-md">
                  Iniciar Chat
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DashboardCard: React.FC<{ title: string, icon: React.ReactNode, subtitle?: React.ReactNode, className?: string }> = ({ title, icon, subtitle, className }) => (
  <div className={`bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 ${className}`}>
    <div className="mb-4">{icon}</div>
    <span className="text-sm font-bold text-gray-700 uppercase leading-tight">{title}</span>
    {subtitle}
  </div>
);

const ServiceCard: React.FC<{ title: string, icon: React.ReactNode, onClick?: () => void, highlight?: boolean }> = ({ title, icon, onClick, highlight }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-[#00796a] hover:bg-teal-50 group ${highlight ? 'ring-2 ring-teal-500/20 bg-teal-50/30' : ''}`}
  >
    <div className="text-[#00796a] text-xl group-hover:scale-125 transition-transform">
      {icon}
    </div>
    <span className="text-sm font-bold text-gray-600 group-hover:text-[#00796a] leading-tight uppercase tracking-tight">{title}</span>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
