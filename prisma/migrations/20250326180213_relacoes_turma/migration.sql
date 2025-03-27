-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProfessor" INTEGER NOT NULL,
    "idDisciplina" INTEGER NOT NULL,
    "horarioTurno" TEXT,
    "anoSemestre" TEXT,
    "numVagas" INTEGER NOT NULL,
    CONSTRAINT "Turma_idDisciplina_fkey" FOREIGN KEY ("idDisciplina") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Turma_idProfessor_fkey" FOREIGN KEY ("idProfessor") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Turma" ("anoSemestre", "horarioTurno", "id", "idDisciplina", "idProfessor", "numVagas") SELECT "anoSemestre", "horarioTurno", "id", "idDisciplina", "idProfessor", "numVagas" FROM "Turma";
DROP TABLE "Turma";
ALTER TABLE "new_Turma" RENAME TO "Turma";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
