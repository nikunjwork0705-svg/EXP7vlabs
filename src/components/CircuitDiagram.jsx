import { Fragment, useState } from 'react'

const terminalLabels = [
  // Variac
  {
    id: '11-endpoint',
    label: '11',
    polarity: 'plus',
    maxConnections: 2,
    endpointClassName: 'left-[150px] top-[260px]',
    labelClassName: 'left-[155px] top-[280px]',
  },
  {
    id: '12-endpoint',
    label: '12',
    polarity: 'minus',
    maxConnections: 2,
    endpointClassName: 'left-[190px] top-[260px]',
    labelClassName: 'left-[195px] top-[280px]',
  },
  {
    id: '13-endpoint',
    label: '13',
    polarity: 'plus',
    maxConnections: 2,
    endpointClassName: 'left-[150px] top-[315px]',
    labelClassName: 'left-[155px] top-[335px]',
  },
  {
    id: '14-endpoint',
    label: '14',
    polarity: 'minus',
    maxConnections: 2,
    endpointClassName: 'left-[190px] top-[315px]',
    labelClassName: 'left-[195px] top-[335px]',
  },

  // Fuse
  {
    id: '15-endpoint',
    label: '15',
    polarity: 'plus',
    maxConnections: 2,
    endpointClassName: 'left-[60px] top-[420px]',
    labelClassName: 'left-[65px] top-[440px]',
  },
  {
    id: '16-endpoint',
    label: '16',
    polarity: 'minus',
    maxConnections: 2,
    endpointClassName: 'left-[140px] top-[420px]',
    labelClassName: 'left-[145px] top-[440px]',
  },

  // Switch
  {
    id: '17-endpoint',
    label: '17',
    polarity: 'minus',
    maxConnections: 2,
    endpointClassName: 'left-[260px] top-[360px]',
    labelClassName: 'left-[265px] top-[380px]',
  },
  {
    id: '18-endpoint',
    label: '18',
    polarity: 'plus',
    maxConnections: 2,
    endpointClassName: 'left-[260px] top-[420px]',
    labelClassName: 'left-[265px] top-[440px]',
  },

  // Load
  {
    id: '19-endpoint',
    label: '19',
    polarity: 'plus',
    maxConnections: 2,
    endpointClassName: 'left-[675px] top-[320px]',
    labelClassName: 'left-[680px] top-[345px]',
  },
  {
    id: '20-endpoint',
    label: '20',
    polarity: 'minus',
    maxConnections: 2,
    endpointClassName: 'left-[725px] top-[320px]',
    labelClassName: 'left-[730px] top-[345px]',
  },
]

const CircuitDiagram = ({ className = '' }) => {
  const [selected, setSelected] = useState(null)
  const [connections, setConnections] = useState([])

  //  get terminal data
  const getTerminal = (id) => terminalLabels.find((t) => t.id === id)
  
  //  count existing connections
  const getConnectionCount = (id) =>
    connections.filter((c) => c.from === id || c.to === id).length

  const handleClick = (id) => {
    if (!selected) {
      setSelected(id)
      return
    }

    // Deselect if clicking the same terminal
    if (selected === id) {
      setSelected(null)
      return
    }

    const from = getTerminal(selected)
    const to = getTerminal(id)

    // Parse maxConnections, defaulting to 1 if it doesn't exist
    const fromMax = from.maxConnections ? parseInt(from.maxConnections, 10) : 1;
    const toMax = to.maxConnections ? parseInt(to.maxConnections, 10) : 1;

    // connection limit check
    if (
      getConnectionCount(selected) >= fromMax ||
      getConnectionCount(id) >= toMax
    ) {
      alert('Connection limit reached')
      setSelected(null)
      return
    }

    // add connection
    setConnections([...connections, { from: selected, to: id }])
    setSelected(null)
  }

  return (
    <section className={`circuit-panel ${className}`}>
      <div className="relative w-[900px] h-[500px] border">

        {terminalLabels.map(({ endpointClassName, id, label, labelClassName, polarity }) => (
          <Fragment key={id}>
            <span
              id={id}
              onClick={() => handleClick(id)} 
              className={`connection-terminal connection-terminal--circuit ${endpointClassName} ${selected === id ? 'ring-2 ring-blue-500' : ''}`}
              data-polarity={polarity}
              aria-label={`Circuit terminal ${label}`}
              style={{ cursor: 'pointer' }} 
            />
            <span
              className={`terminal-number-label terminal-number-label--circuit ${labelClassName}`}
              data-terminal-id={id}
            >
              {label}
            </span>
          </Fragment>
        ))}

        {connections.map((conn, index) => (
          <div
            key={index}
            className="absolute bg-green-400 h-[2px]"
            style={{
              top: `${20 + index * 10}px`,
              left: '0px',
              width: '200px',
            }}
          />
        ))}
      </div>
    </section>
  )
} 

export default CircuitDiagram