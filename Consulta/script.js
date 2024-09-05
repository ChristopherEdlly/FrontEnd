let pesquisa = document.querySelector('.search-input');
let lista = document.querySelector('.list');

pesquisa.addEventListener('input', () => {
    let valorDigitado = pesquisa.value.toLowerCase();
    let items = document.querySelectorAll('.item');
    items.forEach((item) => {
        if (item.textContent.toLowerCase().includes(valorDigitado)) {
            item.style.display = 'table-row'; 
        } else {
            item.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    switch (document.body.id) {
        case 'aluno':
            fetchAluno();
            break;
        case 'professor':
            fetchProfessor();
            break;
        case 'disciplina':
            fetchDisciplina();
            break;
        case 'turma':
            fetchTurma();
            break;
        case 'matricula':
            fetchMatricula();
            break;
    }
});

function fetchAluno() {
    fetch('http://localhost:8080/api/academico/aluno')
        .then(response => response.json())
        .then(data => {
            const alunoTableBody = document.getElementById('alunoTableBody');
            alunoTableBody.innerHTML = '';
            data.forEach(aluno => {
                const row = document.createElement('tr');
                row.classList.add('item'); 
                row.innerHTML = `
                    <td>${aluno.id}</td>
                    <td>${aluno.apelido}
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.cpf}</td
                    <td>${aluno.dataNascimento}</td>
                    <td>${aluno.celular}</td>
                    <td>${aluno.matricula}</td>
                    <td>
                        <button class="btn btn-warning" onclick="edit(this)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-danger" onclick="deletar(${aluno.id})"><i class="bi bi-trash"></i> Deletar</button>
                    </td>
                `;
                alunoTableBody.appendChild(row);
                console.log(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function fetchProfessor() {
    fetch('http://localhost:8080/api/academico/professor')
        .then(response => response.json())
        .then(data => {
            const professorTableBody = document.getElementById('professorTableBody');
            professorTableBody.innerHTML = ''; 
            data.forEach(professor => {
                const row = document.createElement('tr');
                row.classList.add('item'); 
                row.innerHTML = `
                    <td>${professor.id}</td>
                    <td>${professor.nome}</td>
                    <td>${professor.apelido}</td>
                    <td>${professor.email}</td>
                    <td>${professor.cpf}</td
                    <td>${professor.dataNascimento}</td>
                    <td>${professor.celular}</td>
                    <td>${professor.matricula}</td>
                    <td>
                        <button class="btn btn-warning" onclick="edit(this)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-danger" onclick="deletar(${professor.id})"><i class="bi bi-trash"></i> Deletar</button>
                    </td>

                `;
                professorTableBody.appendChild(row);
                console.log(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function fetchDisciplina() {
    fetch('http://localhost:8080/api/academico/disciplina')
        .then(response => response.json())
        .then(data => {
            const disciplinaTableBody = document.getElementById('disciplinaTableBody');
            disciplinaTableBody.innerHTML = '';
            data.forEach(disciplina => {
                const row = document.createElement('tr');
                row.classList.add('item'); 
                row.innerHTML = `
                    <td>${disciplina.id}</td>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.numeroCreditos}</td>
                    <td>
                        <button class="btn btn-warning" onclick="edit(this)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-danger" onclick="deletar('http://localhost:8080/api/academico/disciplina', ${disciplina.id})"><i class="bi bi-trash"></i> Deletar</button>
                    </td>
                `;
                disciplinaTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function fetchTurma() {
    fetch('http://localhost:8080/api/academico/turma')
        .then(response => response.json())
        .then(data => {
            const turmaTableBody = document.getElementById('turmaTableBody');
            turmaTableBody.innerHTML = '';
            data.forEach(turma => {
                const row = document.createElement('tr');
                row.classList.add('item'); 
                row.innerHTML = `
                    <td>${turma.id}</td>
                    <td>${turma.dataInicio}</td>
                    <td>${turma.dataFim}</td>
                    <td>${turma.idProfessor}</td>
                    <td>${turma.idDisciplina}</td>
                    <td>
                        <button class="btn btn-warning" onclick="edit(this)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-danger" onclick="deletar('http://localhost:8080/api/academico/turma', ${turma.id})"><i class="bi bi-trash"></i> Deletar</button>
                    </td>
                `;
                turmaTableBody.appendChild(row);
                console.log(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function fetchMatricula() {
    fetch('http://localhost:8080/api/academico/matricula')
        .then(response => response.json())
        .then(data => {
            const matriculaTableBody = document.getElementById('matriculaTableBody');
            matriculaTableBody.innerHTML = '';
            data.forEach(aluno => {
                const row = document.createElement('tr');
                row.classList.add('item'); 
                row.innerHTML = `
                    <td>${matricula.id}</td>
                    <td>${matricula.idAluno}<td>
                    <td>${matricula.idTurma}<td>
                    <td>
                        <button class="btn btn-warning" onclick="edit(this)"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button class="btn btn-danger" onclick="deletar(${aluno.id})"><i class="bi bi-trash"></i> Deletar</button>
                    </td>
                `;
                alunoTableBody.appendChild(row);
                console.log(row);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}



async function deletar(endpoint, id) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir o item: ${response.statusText}`);
        }

        console.log('Item excluído com sucesso');
        console.log(id);
        fetchTurma();
    } catch (error) {
        console.error('Erro:', error);
    }
}