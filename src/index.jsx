import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CurriculON(){
  return(
    <main>
      <CurriculoForm />
    </main>
  );
}

function CurriculoForm(){
  const dispatch = useDispatch();
  const curriculos = useSelector(state => state.curriculo.curriculos);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [diferencial, setDiferencial] = useState("");
  const [formacaoID, setFormacaoID] = useState("");
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [imagemNome, setImagemNome] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (mensagem){
      const timer = setTimeout(() => {
        setMensagem("");
        }, 3000);
        return () => clearTimeout(timer);
      }
  }, [mensagem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCurriculo = {
      nome: nome,
      cpf: cpf,
      idade: idade,
      email: email,
      telefone: telefone,
      cargo: cargo,
      diferencial: diferencial,
      formacaoID: formacaoID,
      imagemPerfil: imagemPerfil ? URL.createObjectURL(imagemPerfil) : null,
      imagemFile: imagemPerfil
    };
    dispatch({ type: 'ADD_CURRICULO', payload: newCurriculo});
    setMensagem("Seu curriculo foi criado!");
    clearForm();
  };

  const clearForm = () => {
    setNome("");
    setCpf("");
    setIdade("");
    setEmail("");
    setTelefone("");
    setCargo("");
    setDiferencial("");
    setFormacaoID("");
    setImagemPerfil(null);
    setImagemNome("");
    setIsEditing(false);
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_CURRICULO', payload: index});
  };

  const handleEdit = (index) => {
    const curriculoToEdit = curriculos[index];
    setNome(curriculoToEdit.nome);
    setCpf(curriculoToEdit.cpf);
    setIdade(curriculoToEdit.idade);
    setEmail(curriculoToEdit.email);
    setTelefone(curriculoToEdit.telefone);
    setCargo(curriculoToEdit.cargo);
    setDiferencial(curriculoToEdit.diferencial);
    setFormacaoID(curriculoToEdit.FormacaoID);
    setImagemPerfil(curriculoToEdit.imagemFile ? curriculoToEdit.imagemFile : null);
    setImagemNome(curriculoToEdit.imagemFile ? curriculoToEdit.imagemFile.name : "");

    const curriculosCopia = [...curriculos];
    curriculosCopia.splice(index, 1);
    dispatch({ type: 'DELETE_CURRICULO', payload: index});
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedCurriculo = {
      nome,
      cpf,
      idade,
      email,
      telefone,
      cargo,
      diferencial,
      formacaoID,
      imagemPerfil: imagemPerfil instanceof File ? URL.createObjectURL(imagemPerfil) : imagemPerfil,
    };
    dispatch({ type: 'ADD_CURRICULO', payload: updatedCurriculo });
    setMensagem("Curriculo atualizado com sucesso!");
    clearForm();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemNome(file ? file.name : "");
  }

  return(
    <div className="form-curriculos">
    <form onSubmit={isEditing ? handleSave : handleSubmit}>
      <h1>Criador de currículo</h1>
      <div className="field-imagem">
        <strong>Foto</strong>
        <label htmlFor="input-imagem">
          Selecionar foto{imagemNome && <span className="imagem-nome">{imagemNome}</span>}
          <input type="file" id="input-imagem" 
          onChange={(handleImageChange)} accept="image/*" />
          </label>
      </div>
      <div className="field">
        <strong>Nome completo:</strong>
        <input 
        type="text" 
        value={nome}
        onChange={(e) => setNome(e.target.value)} placeholder="Ex: Fulano Pereira da Silva"
        required />
      </div>

      <div className="field">
        <strong>Cpf</strong>
        <input 
        type="text" 
        value={cpf} 
        onChange={(e) => setCpf(e.target.value)} placeholder="Ex: 123.456.789-10"
        required />
      </div>
      
      <div className="field">
        <strong>Idade(anos)</strong>
        <input 
        type="text" 
        value={idade}
        onChange={(e) => setIdade(e.target.value)} placeholder="Ex: 47"
        required />
      </div>
      

      <div className="field">
        <strong>E-mail</strong>
        <input 
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} placeholder="Ex: fulano@gmail.com" 
        required />
      </div>

      <div className="field">
        <strong>Telefone</strong>
        <input 
        type="number" 
        value={telefone} 
        onChange={(e) => setTelefone(e.target.value)} placeholder= "00 987654321 (Opcional)" />
      </div>

      <div className="field">
        <strong>Cargo</strong>
        <input 
        type="text" 
        value={cargo}
        onChange={(e) => setCargo(e.target.value)} placeholder="Ex: Desenvolvedor de software"
        required />
      </div>

      <div className="field">
        <strong>Habilidade(s)</strong>
        <input 
        type="text"
        value={diferencial} 
        onChange={(e) => setDiferencial(e.target.value)} placeholder="Ex: Java avançado, etc."
        required />
      </div>

      <div className="field">
        <strong>Formação(escolaridade)</strong>
        <select 
        value={formacaoID} 
        onChange={(e) => setFormacaoID(e.target.value)} 
        required>
          <option value="">Selecione sua formação</option>
          {formacoes.map((formacao) => (
            <option key={formacao.id} value={formacao.id}>
              {formacao.nome}
            </option>
          ))}
        </select>
      </div>
        {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
        <div className="btn-actions">
          <button type="submit">{isEditing ? "Salvar curriculo" : "Adicionar curriculo"}</button>
        </div>
      </form>
      <CurriculoLista curriculos={curriculos} formacoes={formacoes} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

function CurriculoLista({ curriculos, formacoes, handleDelete, handleEdit}){
return (
  <div className="lista-curriculo">
    <h2>Currículos</h2>
    {curriculos.map((curriculo, index) => (
      <div key={index} className="curriculo-fim">
        {curriculo.imagemPerfil && <img src={curriculo.imagem} alt="Foto de perfil"/>}
        <p><strong>Nome completo:</strong> {curriculo.nome}</p>
        <p><strong>Cpf:</strong> {curriculo.cpf}</p>
        <p><strong>Idade(anos):</strong> {curriculo.idade}</p>
        <p><strong>E-mail:</strong> {curriculo.email}</p>
        <p><strong>Telefone:</strong> {curriculo.telefone}</p>
        <p><strong>Cargo:</strong> {curriculo.cargo}</p>
        <p><strong>Diferencial:</strong> {curriculo.diferencial}</p>
        <p><strong>Formação acadêmica:</strong> {getFormacaoNome(formacoes, curriculo.formacaoID)}</p>
        <button className="delete-btn" onClick={() => handleDelete(index)}>Excluir</button>
        <button className="edite-btn" onClick={() => handleEdit(index)}>Editar</button> 
      </div>
    ))}
  </div>
);
}

function getFormacaoNome(formacoes, formacaoID){
  const formacao = formacoes.find(form => form.id === parseInt(formacaoID));
  return formacao ? formacao.nome : "Nível de formação não econtrado";
}


const formacao = [
  { id: 1, nome: "Fundamental (Incompleto)"},
  { id: 2, nome: "Fundamental (Completo)"},
  { id: 3, nome: "Ensino médio (Incompleto)"},
  { id: 4, nome: "Ensino médio (Completo)"},
  { id: 4, nome: "Superior (Incompleto)"},
  { id: 4, nome: "Superior (Completo)"}
];

export default CurriculON;