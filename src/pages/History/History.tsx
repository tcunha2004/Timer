import { HistoryContainer, HistoryList, Status } from "./styles";

function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        {/* Tabela */}
        <table>
          {/* Cabecalho */}
          <thead>
            {/* Linha */}
            <tr>
              {/* Valor */}
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Corpo */}
          <tbody>
            {/* Linha */}
            <tr>
              {/* Valor */}
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="yellow">Em andamento</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="red">Cancelado</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 min</td>
              <td>Há 2 meses</td>
              <td>
                <Status statusColor="green">Concluido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}

export default History;
