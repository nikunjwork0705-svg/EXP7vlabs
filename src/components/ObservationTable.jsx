import SectionCard from './SectionCard.jsx'

const OBSERVATION_ROW_COUNT = 1
const emptyRows = Array.from({ length: OBSERVATION_ROW_COUNT })

const ObservationTable = ({ observations }) => (
  <SectionCard className="h-[160px]" icon="table" id="observation-table-panel" title="OBSERVATION TABLE">
    
    <div className="observation-table-wrap" style={{ height: 'fit-content' }}>
      
      <table className="observation-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Voltage (V)</th>
            <th>Current (A)</th>
            <th>
              I<sub>L</sub> (A)
            </th>
            <th>
              I<sub>R</sub> (A)
            </th>
            <th>
              I<sub>C</sub> (A)
            </th>
            <th>Power (W)</th>
          </tr>
        </thead>
        <tbody>
          {emptyRows.map((_, index) => {
            const row = observations[index]

            return (
              <tr key={index}>
                <td>{row?.id ?? ''}</td>
                <td>{row ? row.voltage.toFixed(1) : ''}</td>
                <td>{row ? row.current.toFixed(3) : ''}</td>
                <td>{row ? row.iL.toFixed(2) : ''}</td>
                <td>{row ? row.iR.toFixed(2) : ''}</td>
                <td>{row ? row.iC.toFixed(2) : ''}</td>
                <td>{row ? row.power.toFixed(3) : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </SectionCard>
)
export default ObservationTable