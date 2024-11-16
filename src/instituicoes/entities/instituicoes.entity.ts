export class Instituicoes{
  id: number;
  idUsuario: number;
  turmas?: Turma[];
  disciplinas?: Disciplina[];
}

export class Turma{
  id: number;
  nome: string;
  instituicaoId: number;
}

export class Disciplina{
  id: number;
  nome: string;
  instituicaoId: number;
}