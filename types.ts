
export interface Discipline {
  code: string;
  name: string;
  ch: number;
  credits: number;
  period: string;
  teacher: string;
  degree: string;
  grade: string;
  status: 'APROVADO' | 'PENDENTE' | 'DISPENSADO';
}

export interface StudentProfile {
  name: string;
  registration: string;
  course: string;
  curriculum: string;
  situation: string;
  admissionType: string;
  requiredCH: number;
  accountedCH: number;
}

export interface DigitalSignature {
  name: string;
  role: string;
  cpf: string;
}

export interface DiplomaVerification {
  registro: string;
  livro: string;
  folha: string;
  dataRegistro: string;
  processo: string;
  curso: string;
  nomeAluno: string;
  instituicao: string;
  portariaReconhecimento: string;
  portariaRecredenciamento: string;
  mantenedora: string;
  cnpj: string;
  codigoVerificacao: string;
  urlVerificacao: string;
  assinaturas: DigitalSignature[];
  assinadoPor: string[];
}
