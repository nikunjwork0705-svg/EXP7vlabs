import SectionCard from './SectionCard.jsx'

const emptyRows = Array.from({ length:6})

const ObservationTable = ({ observations }) => (
  <SectionCard className="h-[370px]" icon="table" title="OBSERVATION TABLE">
    <div className="observation-table-wrap" /*style={{height:'205px'}}*/>
      <table className="observation-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Volts(V)</th>
            <th>Amps(A)</th>
            <th>Watts(W)</th>
            <th>Power Factor</th>
          </tr>
        </thead>
        <tbody>
          {emptyRows.map((_, index) => {
            const row = observations[index]

            return (
              <tr key={index}>
                <td>{row?.id ?? ''}</td>
                <td>{row ? row.voltage.toFixed(1) : ''}</td>
                <td>{row ? row.i1.toFixed(4) : ''}</td>
                <td>{row ? row.i2.toFixed(4) : ''}</td>
                <td>{row ? row.i3.toFixed(4) : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </SectionCard>
)

export default ObservationTable
