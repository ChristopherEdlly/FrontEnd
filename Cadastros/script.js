function handleAlunoFormSubmit(form) {
    const formData = new FormData(form);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        celular: formData.get('celular'),
        apelido: formData.get('apelido'),
        matricula: parseInt(formData.get('matricula')),
        soroPositivo: formData.get('soroPositivo') === 'true'
    };
    return fetch('http://localhost:8080/api/academico/aluno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function handleProfessorFormSubmit(form) {
    const formData = new FormData(form);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        celular: formData.get('celular'),
        apelido: formData.get('apelido'),
        matricula: parseInt(formData.get('matricula')),
        soroPositivo: formData.get('soroPositivo') === 'true'
    };
    return fetch('http://localhost:8080/api/academico/professor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function handleDisciplinaFormSubmit(form) {
    const formData = new FormData(form);
    const data = {
        nome: formData.get('nome'),
        numeroCreditos: parseInt(formData.get('numeroCreditos')),
    };
    return fetch('http://localhost:8080/api/academico/disciplina', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function handleTurmaFormSubmit(form){
    const formData = new FormData(form);
    const data = {
        dataInicio: formData.get('dataInicio'),
        dataFim: formData.get('dataFim'),
        idDisciplina: parseInt(formData.get('idDisciplina')),
        idProfessor: parseInt(formData.get('idProfessor')),
    };
    return fetch('http://localhost:8080/api/academico/turma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function handleMatriculaFormSubmit(form){
    const formData = new FormData(form);
    const data = {
        idAluno: parseInt(formData.get('idAluno')),
        idTurma: parseInt(formData.get('idTurma')),
    };
    return fetch('http://localhost:8080/api/academico/matricula', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (form.id === 'formCadastroAluno') {
                handleAlunoFormSubmit(form)
                    .then(response => response.json())
                    .then(data => console.log('Aluno cadastrado com sucesso:', data))
                    .catch(error => console.error('Erro ao cadastrar aluno:', error));
            } else if (form.id === 'formCadastroProfessor') {
                handleProfessorFormSubmit(form)
                    .then(response => response.json())
                    .then(data => console.log('Professor cadastrado com sucesso:', data))
                    .catch(error => console.error('Erro ao cadastrar professor:', error));
            } else if (form.id === 'formCadastroDisciplina') {
                handleDisciplinaFormSubmit(form)
                    .then(response => response.json())
                    .then(data => console.log('Disciplina cadastrada com sucesso:', data))
                    .catch(error => console.error('Erro ao cadastrar disciplina:', error));
            } else if (form.id === 'formCadastroTurma') {
                handleTurmaFormSubmit(form)
                    .then(response => response.json())
                    .then(data => console.log('Turma cadastrada com sucesso:', data))
                    .catch(error => console.error('Erro ao cadastrar Turma:', error));
            } else if (form.id === 'formCadastroMatricula') {
                handleMatriculaFormSubmit(form)
                    .then(response => response.json())
                    .then(data => console.log('Matricula cadastrada com sucesso:', data))
                    .catch(error => console.error('Erro ao cadastrar Matricula:', error));
            }
        });
    });
});