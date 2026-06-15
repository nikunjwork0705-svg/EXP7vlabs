// import SectionCard from './SectionCard.jsx'

// const ObservationTable = ({ observations = [] }) => {
//   const row = observations.length > 0 ? observations[observations.length - 1] : null

//   return (
//     <SectionCard className="h-[188px]" icon="table" title="OBSERVATION TABLE">
      
//       <div id="observation-table-panel" className="observation-table-wrap" style={{ height: 'fit-content' }}>
//         <table className="observation-table">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Voltage (V)</th>
//               <th>Current (A)</th>
//               <th>I<sub>R</sub> (A)</th>
//               <th>I<sub>L</sub> (A)</th>
//               <th>I<sub>C</sub> (A)</th>
//               <th>Power (W)</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{row?.id ?? ''}</td>
//               <td>{row?.voltage ?? ''}</td>
//               <td>{row?.current != null ? row.current.toFixed(3) : ''}</td>
//               <td>{row?.iR != null ? row.iR.toFixed(3) : ''}</td>
//               <td>{row?.iL != null ? row.iL.toFixed(3) : ''}</td>
//               <td>{row?.iC != null ? row.iC.toFixed(3) : ''}</td>
//               <td>{row?.power != null ? row.power.toFixed(2) : ''}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </SectionCard>
//   )
// }

// export default ObservationTable
import SectionCard from './SectionCard.jsx'

const ObservationTable = ({ observations = [] }) => {
  const row =
    observations.length > 0
      ? observations[observations.length - 1]
      : null

  return (
    <div id="observation-table-panel" className="w-full">
      <SectionCard
        className="h-auto" // ✅ dynamic height
        icon="table"
        title="OBSERVATION TABLE"
      >
        <div className="observation-table-wrap w-full">
          <table className="observation-table w-full">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Voltage (V)</th>
                <th>Current (A)</th>
                <th>I<sub>R</sub> (A)</th>
                <th>I<sub>L</sub> (A)</th>
                <th>I<sub>C</sub> (A)</th>
                <th>Power (W)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{row?.id ?? ''}</td>
                <td>{row?.voltage ?? ''}</td>
                <td>{row?.current != null ? row.current.toFixed(3) : ''}</td>
                <td>{row?.iR != null ? row.iR.toFixed(3) : ''}</td>
                <td>{row?.iL != null ? row.iL.toFixed(3) : ''}</td>
                <td>{row?.iC != null ? row.iC.toFixed(3) : ''}</td>
                <td>{row?.power != null ? row.power.toFixed(2) : ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

export default ObservationTable