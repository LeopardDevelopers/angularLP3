export const baseUrl = 'http://localhost:9006';

//URL's de Pessoas
export const pessoaSave_POST = '/pessoa/save';
export const pessoaObtemTodas_GET = '/pessoa/all';
export const pessoaDelete_DELETE= '/pessoa/delete/';
//URL's de Tarefas
export const tarefaSave_POST = '/tarefa/save';
export const tarefaObtemTodas_GET = '/tarefa/all';
export const tarefaDelete_DELETE= '/tarefa/delete/';
//URL's de Alocação
export const alocacaoSave_POST = '/alocacao/save';
export const alocacaoDelete_DELETE= '/alocacao/delete/';
export const alocacaoObtemByTarefaId_GET = '/alocacao/tarefa/search/';
export const alocacaoObtemByPessoaId_GET = '/alocacao/pessoa/search/';