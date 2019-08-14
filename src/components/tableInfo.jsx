import React from "react";

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
            <span
              style={
                a.etatStation === "Operative"
                  ? { color: "green" }
                  : { color: "red" }
              }
            >
              {a.etatStation}
            </span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Nombre de bornes en station</span>
          </th>
          <td>
            <span>{a.nbBornesTotal}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Nombre de bornes disponibles</span>
          </th>
          <td>
            <span>{a.nbBornesDisponibles}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Nombre de vélos mécaniques</span>
          </th>
          <td>
            <span>{a.nbVelosMecaniques}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Nombre de vélos électriques</span>
          </th>
          <td>
            <span>{a.nbVelosElectriques}</span>
          </td>
        </tr>
        <tr>
          <th>
            <span> Achat possible en station (CB)</span>
          </th>
          <td>
            <span
              style={a.achatCB === "no" ? { color: "red" } : { color: "green" }}
            >
              {a.achatCB}
            </span>
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
