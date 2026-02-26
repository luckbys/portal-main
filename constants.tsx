
import { Discipline, StudentProfile, DiplomaVerification } from './types';

export const STUDENT_MOCK: StudentProfile = {
  name: "Lucas Borges",
  registration: "2022240707",
  course: "118 - SUPERIOR DE TECNOLOGIA EM SISTEMAS PARA INTERNET",
  curriculum: "201885 - SISTEMAS PARA INTERNET - 2026.1 - E2A",
  situation: "Concluido",
  admissionType: "Transferência Externa",
  requiredCH: 2030,
  accountedCH: 2030
};

export const DISCIPLINES_MOCK: Discipline[] = [
  {
    code: "EGR0009",
    name: "AMBIENTES COMPUTACIONAIS E CONECTIVIDADE",
    ch: 160,
    credits: 0,
    period: "2022/1",
    teacher: "MARCELO SILVA ARAUJO",
    degree: "DOUTOR",
    grade: "8,50",
    status: "APROVADO"
  },
  {
    code: "EGR0060",
    name: "CORE CURRICULUM",
    ch: 160,
    credits: 0,
    period: "2022/1",
    teacher: "JULIANA MENDES COSTA",
    degree: "DOUTOR",
    grade: "9,00",
    status: "APROVADO"
  },
  {
    code: "EGR0201",
    name: "INOVAÇÃO, SUSTENTABILIDADE E COMPETITIVIDADE EMPRESARIAL",
    ch: 160,
    credits: 0,
    period: "2024/1",
    teacher: "GUILHERME LEITE GAUDERETO",
    degree: "DOUTOR",
    grade: "9,20",
    status: "APROVADO"
  },
  {
    code: "EGR0207",
    name: "INTELIGÊNCIA E OTIMIZAÇÃO DE INTERFACES",
    ch: 160,
    credits: 0,
    period: "2023/2",
    teacher: "RODRIGO ALVES FERREIRA",
    degree: "DOUTOR",
    grade: "8,80",
    status: "APROVADO"
  },
  {
    code: "EGR0228",
    name: "MARKETING DIGITAL E SEO",
    ch: 160,
    credits: 0,
    period: "2023/1",
    teacher: "PATRICIA LIMA SOUZA",
    degree: "DOUTOR",
    grade: "9,50",
    status: "APROVADO"
  },
  {
    code: "EGR0245",
    name: "MODELAGEM DE SOFTWARE",
    ch: 160,
    credits: 0,
    period: "2022/2",
    teacher: "FERNANDO HENRIQUE SANTOS",
    degree: "DOUTOR",
    grade: "7,80",
    status: "APROVADO"
  },
  {
    code: "EGR0295",
    name: "PROGRAMAÇÃO DE SOLUÇÕES COMPUTACIONAIS",
    ch: 160,
    credits: 0,
    period: "2023/1",
    teacher: "ALESSANDRO GOMES",
    degree: "DOUTOR",
    grade: "10,00",
    status: "APROVADO"
  },
  {
    code: "EGR0344",
    name: "SISTEMAS COMPUTACIONAIS E SEGURANÇA",
    ch: 160,
    credits: 0,
    period: "2022/2",
    teacher: "CLARICE MACHADO",
    degree: "DOUTOR",
    grade: "8,20",
    status: "APROVADO"
  },
  {
    code: "EGR0633",
    name: "SISTEMAS DISTRIBUÍDOS",
    ch: 160,
    credits: 0,
    period: "2024/1",
    teacher: "CARLOS ALBERTO JUNIOR",
    degree: "DOUTOR",
    grade: "9,10",
    status: "APROVADO"
  },
  {
    code: "EGR0386",
    name: "UNIDADE CURRICULAR DIGITAL PERSONALIZÁVEL",
    ch: 160,
    credits: 0,
    period: "2023/2",
    teacher: "VALERIA AMORIM",
    degree: "DOUTOR",
    grade: "9,60",
    status: "APROVADO"
  },
  {
    code: "EGR0387",
    name: "USABILIDADE, DESENVOLVIMENTO WEB, MOBILE E JOGOS",
    ch: 160,
    credits: 0,
    period: "2024/2",
    teacher: "BRUNO TEIXEIRA",
    degree: "DOUTOR",
    grade: "9,40",
    status: "APROVADO"
  },
  {
    code: "EGR0388",
    name: "VIDA & CARREIRA",
    ch: 60,
    credits: 0,
    period: "2022/1",
    teacher: "DANIELA MARINS",
    degree: "DOUTOR",
    grade: "10,00",
    status: "APROVADO"
  },
  {
    code: "EXGR210",
    name: "EXTENSÃO - CH 210",
    ch: 210,
    credits: 0,
    period: "2024/2",
    teacher: "COORDENAÇÃO ACADÊMICA",
    degree: "MESTRE",
    grade: "10,00",
    status: "APROVADO"
  }
];

export const DIPLOMA_VERIFICATION_MOCK: DiplomaVerification = {
  registro: "123456.2026.000001.UAM",
  livro: "12",
  folha: "34",
  dataRegistro: "20/02/2026",
  processo: "2026.0220.001",
  curso: "Curso Superior de Tecnologia em Desenvolvimento Web",
  nomeAluno: "LUCAS HENRIQUE BORGES",
  instituicao: "UNIVERSIDADE ANHEMBI MORUMBI",
  portariaReconhecimento: "Portaria nº 107, de 22/02/2019, DOU de 26/02/2019",
  portariaRecredenciamento: "Portaria nº 1055, de 31/08/2018, DOU nº 170, Seção 1, p. 35, de 04/09/2018",
  mantenedora: "ISLA – Instituto Superior de Letras e Artes Ltda.",
  cnpj: "03.636.401/0001-72",
  codigoVerificacao: "60DF-3321-C5EE-2DDD",
  urlVerificacao: "https://anima.portaldeassinaturas.com.br/verificar/",
  assinaturas: [
    {
      name: "ANTONIO AUGUSTO GOMES RODRIGUES",
      role: "Secretário Geral de Ensino",
      cpf: "348.592.176-84"
    },
    {
      name: "CARLOS EDUARDO DA SILVA SANTOS",
      role: "Reitor",
      cpf: "715.209.643-55"
    }
  ],
  assinadoPor: [
    "ANTONIO AUGUSTO GOMES RODRIGUES",
    "CARLOS EDUARDO DA SILVA SANTOS"
  ]
};
