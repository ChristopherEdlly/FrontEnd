function formatDateFromApi(date) {
    if (!date) return "";
    
    if (date.includes('T')) {
        date = date.split('T')[0];
    }
    
    return date;
};

const tables = {
    aluno: document.getElementById("aluno"),
    professor: document.getElementById("professor"),
    disciplina: document.getElementById("disciplina"),
    turma: document.getElementById("turma"),
    matricula: document.getElementById("matricula")
};

const buttons = {
    alunoBtn: "aluno",
    professorBtn: "professor",
    disciplinaBtn: "disciplina",
    turmaBtn: "turma",
    matriculaBtn: "matricula"
};

const tableFunctions = {
    aluno: aluno,
    professor: professor,
    disciplina: disciplina,
    turma: turma,
    matricula: matricula
};

function atualizar() {
    const activeTable = Object.keys(tables).find(key => tables[key].classList.contains("active"));

    if (activeTable && tableFunctions[activeTable]) {
        tableFunctions[activeTable]();
    }
};

function updateTable(activeTable, activeButton) {
    Object.keys(tables).forEach(key => {
        tables[key].classList.toggle("active", key === activeTable);
        tables[key].classList.toggle("disable", key !== activeTable);
    });

    Object.keys(buttons).forEach(btnId => {
        document.getElementById(btnId).classList.toggle("activeBtn", btnId === activeButton);
        document.getElementById(btnId).classList.toggle("disableBtn", btnId === activeButton);
    });
    atualizar();
};

Object.keys(buttons).forEach(btnId => {
    document.getElementById(btnId).addEventListener("click", () => {
        updateTable(buttons[btnId], btnId);
    });
});

function fetchData(url, tableBodyId) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.getElementById(tableBodyId);
            tableBody.innerHTML = "";

            data.forEach((item) => {
                const row = document.createElement("tr");
                if (tableBodyId === "alunoTableBody") {
                    row.innerHTML += `
                <td>${item.id}</td>
                <td><input type="text" class="form-control" value="${item.nome}" disabled></td>
                <td><input type="text" class="form-control" value="${item.apelido}" disabled></td>
                <td><input type="email" class="form-control" value="${item.email}" disabled></td>
                <td><input type="text" class="form-control" value="${item.cpf}" disabled></td>
                <td><input type="date" class="form-control" value="${formatDateFromApi(item.dataNascimento)}" disabled></td>
                <td><input type="tel" class="form-control" value="${item.celular}" disabled></td>
                <td><input type="text" class="form-control" value="${item.matricula}" disabled></td>
                <td class="buttons">
                    <button class="btn btn-warning" onclick="edit(${item.id}, this, '${url}', '${tableBodyId}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${url}', ${item.id})"><i class="bi bi-trash"></i> </button>
                </td>
                `;
                } else if (tableBodyId === "professorTableBody") {
                    row.innerHTML = `
                <td>${item.id}</td>
                <td><input type="text" class="form-control" value="${item.nome}" disabled></td>
                <td><input type="email" class="form-control" value="${item.email}" disabled></td>
                <td><input type="text" class="form-control" value="${item.cpf}" disabled></td>
                <td><input type="date" class="form-control" value="${formatDateFromApi(item.dataNascimento)}" disabled></td>
                <td><input type="tel" class="form-control" value="${item.celular}" disabled></td>
                <td><input type="text" class="form-control" value="${item.matricula}" disabled></td>
                <td class="buttons">
                    <button class="btn btn-warning" onclick="edit(${item.id}, this, '${url}', '${tableBodyId}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${url}', ${item.id
                    })"><i class="bi bi-trash"></i> </button>
                </td>
                `;
                } else if (tableBodyId === "disciplinaTableBody") {
                    row.innerHTML = `
                <td>${item.id}</td>
                <td><input type="text" class="form-control" value="${item.nome}" disabled></td>
                <td><input type="number" class="form-control" value="${item.numeroCreditos}" disabled></td>
                <td class="buttons">
                    <button class="btn btn-warning" onclick="edit(${item.id}, this, '${url}', '${tableBodyId}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${url}', ${item.id})"><i class="bi bi-trash"></i> </button>
                </td>
                `;
                } else if (tableBodyId === "matriculaTableBody") {
                    row.innerHTML = `
                <td>${item.id}</td>
                <td><input type="number" class="form-control" value="${item.idTurma}" disabled></td>
                <td><input type="number" class="form-control" value="${item.idAluno}" disabled></td>
                <td class="buttons">
                    <button class="btn btn-warning" onclick="edit(${item.id}, this, '${url}', '${tableBodyId}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${url}', ${item.id})"><i class="bi bi-trash"></i></button>
                </td>
                `;
                } else if (tableBodyId === "turmaTableBody") {
                    row.innerHTML = `
                <td>${item.id}</td>
                <td><input type="date" class="form-control" value="${formatDateFromApi(item.dataInicio)}" disabled></td>
                <td><input type="date" class="form-control" value="${formatDateFromApi(item.dataFim)}" disabled></td>
                <td><input type="number" class="form-control" value="${item.idProfessor}" disabled></td>
                <td><input type="number" class="form-control" value="${item.idDisciplina}" disabled></td>
                <td class="buttons">
                    <button class="btn btn-warning" onclick="edit(${item.id}, this, '${url}', '${tableBodyId}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${url}', ${item.id})"><i class="bi bi-trash"></i> </button>
                </td>
                `;
                }

                tableBody.appendChild(row);
            });
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
};

function aluno() {
    const addRowButton = document.getElementById("addRowButtonAluno");

    // Chama a função para buscar dados
    fetchData("http://localhost:8080/api/academico/aluno",
        "alunoTableBody"
    );

    if (!addRowButton.hasAttribute('data-event-added')) {
        addRowButton.addEventListener("click", handleAddRow);
        addRowButton.setAttribute('data-event-added', 'true');
    }

    function handleAddRow() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>Novo</td>
        <td><input type="text" class="form-control" placeholder="Nome"></td>
        <td><input type="text" class="form-control" placeholder="Apelido"></td>
        <td><input type="email" class="form-control" placeholder="Email"></td>
        <td><input type="text" class="form-control" placeholder="CPF"></td>
        <td><input type="date" class="form-control"></td>
        <td><input type="tel" class="form-control" placeholder="Telefone"></td>
        <td><input type="text" class="form-control" placeholder="Matrícula"></td>
        <td class="d-flex justify-content-evenly">
        <button class="btn btnSave btn-success w-25 saveButtonAluno"><i class="bi bi-check2"></i></button>
        <button class="btn btnCancel btn-danger w-25 cancelButtonAluno"><i class="bi bi-x-lg"></i></button>
        </td>
        `;

        document.getElementById("alunoTableBody").appendChild(newRow);

        const saveButton = newRow.querySelector(".saveButtonAluno");
        const cancelButton = newRow.querySelector(".cancelButtonAluno");

        saveButton.addEventListener("click", () => {
            const apelido = newRow.querySelector("input[placeholder='Apelido']").value;
            const nome = newRow.querySelector("input[placeholder='Nome']").value;
            const email = newRow.querySelector("input[placeholder='Email']").value;
            const cpf = newRow.querySelector("input[placeholder='CPF']").value;
            const dataNascimento = newRow.querySelector("input[type='date']").value;
            const celular = newRow.querySelector("input[placeholder='Telefone']").value;
            const matricula = parseInt(newRow.querySelector("input[placeholder='Matrícula']").value);

            const data = {
                apelido,
                nome,
                email,
                cpf,
                dataNascimento,
                celular,
                matricula,
            };

            fetch("http://localhost:8080/api/academico/aluno", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(() => {
                    alert("Aluno cadastrado com sucesso!");
                    fetchData("http://localhost:8080/api/academico/aluno", "alunoTableBody");
                })
                .catch((error) => console.error("Erro ao cadastrar Aluno:", error));
        });

        cancelButton.addEventListener("click", () => {
            newRow.remove();
        });
    }
};

function professor() {
    const addRowButton = document.getElementById("addRowButtonProfessor");

    fetchData(
        "http://localhost:8080/api/academico/professor",
        "professorTableBody"
    );

    if (!addRowButton.hasAttribute('data-event-added')) {
        addRowButton.addEventListener("click", handleAddRow);
        addRowButton.setAttribute('data-event-added', 'true');
    }

    function handleAddRow() {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>Novo</td>
            <td><input type="text" class="form-control" id="nomeProfessor" placeholder="Nome"></td>
            <td><input type="email" class="form-control" id="emailProfessor" placeholder="Email"></td>
            <td><input type="text" class="form-control" id="cpfProfessor" placeholder="CPF"></td>
            <td><input type="date" class="form-control" id="dataNascimentoProfessor"></td>
            <td><input type="tel" class="form-control" id="celularProfessor" placeholder="Telefone"></td>
            <td><input type="text" class="form-control" id="matriculaProfessor" placeholder="Matrícula"></td>
            <td class="d-flex justify-content-evenly">
            <button class="btn btnSave btn-success w-25" id="saveButtonProfessor"><i class="bi bi-check2"></i></button>
            <button class="btn btnCancel btn-danger w-25" id="cancelButtonProfessor"><i class="bi bi-x-lg"></i></button>
            </td>
            `;

        document.getElementById("professorTableBody").appendChild(newRow);


        const saveButton = newRow.querySelector("#saveButtonProfessor");
        const cancelButton = newRow.querySelector("#cancelButtonProfessor");
        


        saveButton.addEventListener("click", function () {
            const nome = document.getElementById("nomeProfessor").value;
            const email = document.getElementById("emailProfessor").value;
            const cpf = document.getElementById("cpfProfessor").value;
            const dataNascimento = document.getElementById("dataNascimentoProfessor").value;
            const celular = document.getElementById("celularProfessor").value;
            const matricula = parseInt(document.getElementById("matriculaProfessor").value);
            const data = { nome, email, cpf, dataNascimento, celular, matricula };

            fetch("http://localhost:8080/api/academico/professor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(() => {
                    alert("Professor cadastrado com sucesso!");
                    fetchData(
                        "http://localhost:8080/api/academico/professor",
                        "professorTableBody"
                    );
                })
                .catch((error) =>
                    console.error("Erro ao cadastrar Professor:", error)
                );
        });

        cancelButton.addEventListener("click", function () {
            newRow.remove();
        });
    };
};

function disciplina() {

    const addRowButton = document.getElementById("addRowButtonDisciplina");

    fetchData(
        "http://localhost:8080/api/academico/disciplina",
        "disciplinaTableBody"
    );

    if (!addRowButton.hasAttribute('data-event-added')) {
        addRowButton.addEventListener("click", handleAddRow);
        addRowButton.setAttribute('data-event-added', 'true');
    };

    function handleAddRow() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>Novo</td>
            <td><input type="text" class="form-control" id="nomeDisciplina" placeholder="Nome da Disciplina"></td>
            <td><input type="number" class="form-control" id="numeroCreditos" placeholder="Número de Créditos"></td>
            <td class="d-flex justify-content-evenly">
            <button class="btn btnSave btn-success w-25" id="saveButtonDisciplina"><i class="bi bi-check2"></i></button>
            <button class="btn btnCancel btn-danger w-25" id="cancelButtonDisciplina"><i class="bi bi-x-lg"></i></button>
            </td>
            `;


        document.getElementById("disciplinaTableBody").appendChild(newRow);


        const saveButton = newRow.querySelector("#saveButtonDisciplina");
        const cancelButton = newRow.querySelector("#cancelButtonDisciplina");

        saveButton.addEventListener("click", function () {
            const nome = document.getElementById("nomeDisciplina").value;
            const numeroCreditos = parseInt(document.getElementById("numeroCreditos").value
            );
            const data = { nome, numeroCreditos };

            fetch("http://localhost:8080/api/academico/disciplina", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then(() => {
                    alert("Disciplina cadastrada com sucesso!");
                    fetchData(
                        "http://localhost:8080/api/academico/disciplina",
                        "disciplinaTableBody"
                    );
                })
                .catch((error) =>
                    console.error("Erro ao cadastrar disciplina:", error)
                );
        });

        cancelButton.addEventListener("click", function () {
            newRow.remove();
        });
    };
};

function turma() {
    const turmaTableBody = document.getElementById("turmaTableBody");
    const addRowButton = document.getElementById("addRowButtonTurma");

    // Busca e exibe os dados das turmas
    fetchData("http://localhost:8080/api/academico/turma", "turmaTableBody");

    if (!addRowButton.hasAttribute('data-event-added')) {
        addRowButton.addEventListener("click", handleAddRow);
        addRowButton.setAttribute('data-event-added', 'true');
    }

    function handleAddRow() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>Novo</td>
            <td><input type="date" class="form-control" id="dataInicioTurma"></td>
            <td><input type="date" class="form-control" id="dataFimTurma"></td>
            <td><input type="number" class="form-control" id="idProfessorTurma" placeholder="Id do Professor"></td>
            <td><input type="number" class="form-control" id="idDisciplinaTurma" placeholder="Id da Disciplina"></td>
            <td class="d-flex justify-content-evenly">
                <button class="btn btnSave btn-success w-25" id="saveButtonTurma"><i class="bi bi-check2"></i></button>
                <button class="btn btnCancel btn-danger w-25" id="cancelButtonTurma"><i class="bi bi-x-lg"></i></button>
            </td>
        `;

        turmaTableBody.appendChild(newRow);

        const saveButton = newRow.querySelector("#saveButtonTurma");
        const cancelButton = newRow.querySelector("#cancelButtonTurma");

        saveButton.addEventListener("click", function () {
            const dataInicio = document.getElementById("dataInicioTurma").value;
            const dataFim = document.getElementById("dataFimTurma").value;
            const idProfessor = parseInt(document.getElementById("idProfessorTurma").value);
            const idDisciplina = parseInt(document.getElementById("idDisciplinaTurma").value);

            // Validação simples antes de enviar para a API
            if (!dataInicio || !dataFim || isNaN(idProfessor) || isNaN(idDisciplina)) {
                alert("Preencha todos os campos corretamente!");
                return;
            }

            const data = {
                dataInicio,
                dataFim,
                idProfessor,
                idDisciplina
            };

            // Envio da requisição para a API
            fetch("http://localhost:8080/api/academico/turma", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            throw new Error(errorData.message || "Erro ao cadastrar turma");
                        });
                    }
                    return response.json();
                })
                .then(() => {
                    alert("Turma cadastrada com sucesso!");
                    fetchData("http://localhost:8080/api/academico/turma", "turmaTableBody");
                    newRow.remove();  // Remove a linha de cadastro após salvar com sucesso
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar turma:", error);
                    alert(`Erro: ${error.message}`);
                });
        });

        cancelButton.addEventListener("click", function () {
            newRow.remove();
        });
    }
}


function matricula() {
    const addRowButton = document.getElementById("addRowButtonMatricula");

    // Busca e exibe os dados das matrículas
    fetchData(
        "http://localhost:8080/api/academico/matricula",
        "matriculaTableBody"
    );

    if (!addRowButton.hasAttribute('data-event-added')) {
        addRowButton.addEventListener("click", handleAddRow);
        addRowButton.setAttribute('data-event-added', 'true');
    }

    function handleAddRow() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                <td>Novo</td>
                <td><input type="number" class="form-control" id="idTurmaMatricula" placeholder="ID da Turma"></td>
                <td><input type="number" class="form-control" id="idAlunoMatricula" placeholder="ID do Aluno"></td>
                <td class="d-flex justify-content-evenly">
                <button class="btn btnSave btn-success w-25" id="saveButtonMatricula"><i class="bi bi-check2"></i></button>
                <button class="btn btnCancel btn-danger w-25" id="cancelButtonMatricula"><i class="bi bi-x-lg"></i></button>
                </td>
                `;

        document.getElementById("matriculaTableBody").appendChild(newRow);

        const saveButton = newRow.querySelector("#saveButtonMatricula");
        const cancelButton = newRow.querySelector("#cancelButtonMatricula");

        // Adiciona a lógica de salvar
        saveButton.addEventListener("click", function () {
            const idTurma = parseInt(document.getElementById("idTurmaMatricula").value);
            const idAluno = parseInt(document.getElementById("idAlunoMatricula").value);

            // Validação básica
            if (isNaN(idTurma) || isNaN(idAluno)) {
                alert("Preencha os campos corretamente!");
                return;
            }

            const data = { idTurma, idAluno };

            // Chamada para a API
            fetch("http://localhost:8080/api/academico/matricula", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            throw new Error(errorData.message || "Erro ao cadastrar matrícula");
                        });
                    }
                    return response.json();
                })
                .then(() => {
                    alert("Matrícula cadastrada com sucesso!");
                    fetchData(
                        "http://localhost:8080/api/academico/matricula",
                        "matriculaTableBody"
                    );
                    newRow.remove(); // Remove a linha após o sucesso do cadastro
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar matrícula:", error);
                    alert(`Erro: ${error.message}`);
                });
        });

        // Botão para cancelar a criação da nova matrícula
        cancelButton.addEventListener("click", function () {
            newRow.remove();
        });
    }
}


function edit(id, button, url, tableBodyId) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("td input");

    inputs.forEach((input) => {
        input.disabled = false;
    });

    // Troca o botão de editar para salvar
    button.innerHTML = '<i class="bi bi-check2"></i> Salvar';
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");
    button.setAttribute(
        "onclick",
        `update(${id}, this, '${url}', '${tableBodyId}')`
    );
};

function update(id, button, url, tableBodyId) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("td input");

    let data = {};

    // Verifica qual tabela está sendo editada (aluno, professor, etc.)
    if (tableBodyId === "alunoTableBody") {
        data = {
            nome: inputs[0].value,
            apelido: inputs[1].value,
            email: inputs[2].value,
            cpf: inputs[3].value,
            dataNascimento: inputs[4].value,
            celular: inputs[5].value,
            matricula: parseInt(inputs[6].value),
            soroPositivo: inputs[7] ? inputs[7].checked : false,
        };
    } else if (tableBodyId === "professorTableBody") {
        data = {
            nome: inputs[0].value,
            email: inputs[1].value,
            cpf: inputs[2].value,
            dataNascimento: inputs[3].value,
            celular: inputs[4].value,
            matricula: parseInt(inputs[5].value),
        };
    } else if (tableBodyId === "disciplinaTableBody") {
        data = {
            nome: inputs[0].value,
            numeroCreditos: parseInt(inputs[1].value),
        };
    } else if (tableBodyId === "turmaTableBody") {
        data = {
            dataInicio: inputs[0].value,
            dataFim: inputs[1].value,
            idProfessor: parseInt(inputs[2].value),
            idDisciplina: parseInt(inputs[3].value),
        };
    } else if (tableBodyId === "matriculaTableBody") {
        data = {
            idTurma: parseInt(inputs[0].value),
            idAluno: parseInt(inputs[1].value),
        };
    }

    // Faz a chamada fetch para atualizar o registro
    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                alert("Atualização realizada com sucesso!");
                fetchData(url, tableBodyId); // Atualiza a tabela
            } else {
                return response.json().then((err) => {
                    throw new Error(err.message);
                });
            }
        })
        .catch((error) => console.error("Erro ao atualizar:", error));
};

async function deletar(endpoint, id) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o item: ${response.statusText}`);
        }
        atualizar();
    } catch (error) {
        console.error("Erro:", error);
    }
};
