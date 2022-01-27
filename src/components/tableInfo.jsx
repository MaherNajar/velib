import React from 'react';

const TableInfo = ({ activeMarker: a }) => {
  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th>
            <span> Code de la station</span>
          </th>
          <td>
            <span>{a.codeStation}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Nom de la station</span>
          </th>
          <td>
            <span>{a.nomStation}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Etat de la station</span>
          </th>
          <td>
            <span style={a.etatStation === 'OUI' ? { color: 'green' } : { color: 'red' }}>
              <strong>{a.etatStation === 'OUI' ? 'OK' : 'KO'}</strong>
            </span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Borne de paiement disponible</span>
          </th>
          <td>
            <span style={a.achatCB === 'OUI' ? { color: 'green' } : { color: 'red' }}>
              <strong> {a.achatCB.toLowerCase()}</strong>
            </span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Capacité de la station</span>
          </th>
          <td>
            <span>{a.nbBornesTotal}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Vélos mécaniques disponibles</span>
          </th>
          <td>
            <span>{a.nbVelosMecaniques}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Vélos électriques disponibles</span>
          </th>
          <td>
            <span>{a.nbVelosElectriques}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Bornes disponibles</span>
          </th>
          <td>
            <span>{a.nbBornesDisponibles}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Mis à jour le</span>
          </th>
          <td>
            <span>{a.recordTime}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableInfo;
