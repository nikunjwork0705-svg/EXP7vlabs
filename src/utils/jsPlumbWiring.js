export const POSITIVE_TERMINALS = ['1-endpoint', '3-endpoint', '5-endpoint', '8-endpoint', '11-endpoint', '13-endpoint', '15-endpoint', '18-endpoint', '19-endpoint']

export const NEGATIVE_TERMINALS = ['2-endpoint', '4-endpoint', '6-endpoint', '7-endpoint','9-endpoint', '10-endpoint', '12-endpoint', '14-endpoint', '16-endpoint', '17-endpoint', '20-endpoint']

export const VALID_CONNECTION_SEQUENCE = [
  '1-endpoint', '11-endpoint',
  '2-endpoint', '12-endpoint',

  '3-endpoint', '13-endpoint',
  '4-endpoint', '14-endpoint',

  '13-endpoint', '15-endpoint',
  '16-endpoint', '17-endpoint',

  '5-endpoint', '18-endpoint',
  '6-endpoint', '9-endpoint',

  '9-endpoint', '10-endpoint',
  '8-endpoint', '19-endpoint',

  '7-endpoint', '20-endpoint',
  '7-endpoint', '14-endpoint',
]

export const DEFAULT_AUTO_CONNECTIONS = [
  ['1-endpoint', '11-endpoint'],
  ['2-endpoint', '12-endpoint'],

  ['3-endpoint', '13-endpoint'],
  ['4-endpoint', '14-endpoint'],

  ['13-endpoint', '15-endpoint'],
  ['16-endpoint', '17-endpoint'],

  ['5-endpoint', '18-endpoint'],
  ['6-endpoint', '9-endpoint'],

  ['9-endpoint', '10-endpoint'],
  ['8-endpoint', '19-endpoint'],

  ['7-endpoint', '20-endpoint'],
  ['7-endpoint', '14-endpoint'],
]

export const resolveJsPlumb = (module) => (
  module?.jsPlumb
  || module?.default?.jsPlumb
  || module?.default
  || window.jsPlumb
)

const getAllConnections = (instance) => {
  if (!instance) return []

  if (typeof instance.getAllConnections === 'function') {
    return instance.getAllConnections()
  }

  if (typeof instance.getConnections === 'function') {
    return instance.getConnections()
  }

  return []
}

export const deleteConnectionsForTerminal = (instance, terminalId) => {
  const matchingConnections = getAllConnections(instance).filter((connection) => {
    const sourceId = connection.sourceId || connection.source?.id
    const targetId = connection.targetId || connection.target?.id

    return sourceId === terminalId || targetId === terminalId
  })

  matchingConnections.forEach((connection) => {
    if (typeof instance.deleteConnection === 'function') {
      instance.deleteConnection(connection)
      return
    }

    connection.detach?.()
  })

  return matchingConnections.length
}
const isNegativeTerminal = (terminalId) => (
  NEGATIVE_TERMINALS.includes(terminalId)
)

const terminalPaintStyles = {
  positive: {
    fill: '#0969e8',
    outlineStroke: '#f8fbff',
    outlineWidth: 2,
    stroke: '#062b77',
    strokeWidth: 1.4,
  },
  negative: {
    fill: '#e33024',
    outlineStroke: '#fff8f6',
    outlineWidth: 2,
    stroke: '#8f140e',
    strokeWidth: 1.4,
  },
}

export const wirePaintStyles = {
  positive: {
    outlineStroke: '#0a2c72',
    outlineWidth: 1.2,
    stroke: '#1f6fe6',
    strokeWidth: 4.8,
  },
  negative: {
    outlineStroke: '#7a1812',
    outlineWidth: 1.2,
    stroke: '#df342c',
    strokeWidth: 4.8,
  },
}

export const wireHoverPaintStyles = {
  positive: {
    outlineStroke: '#08265f',
    outlineWidth: 1.5,
    stroke: '#3384ff',
    strokeWidth: 5.4,
  },
  negative: {
    outlineStroke: '#64120d',
    outlineWidth: 1.5,
    stroke: '#f04a40',
    strokeWidth: 5.4,
  },
}

export const getConnectionBetween = (instance, firstId, secondId) => {
  const connections = getAllConnections(instance)

  return connections.find((connection) => {
    const sourceId = connection.sourceId || connection.source?.id
    const targetId = connection.targetId || connection.target?.id

    return (
      (sourceId === firstId && targetId === secondId)
      || (sourceId === secondId && targetId === firstId)
    )
  })
}

export const hasConnectionBetween = (instance, firstId, secondId) => (
  Boolean(getConnectionBetween(instance, firstId, secondId))
)

export const addTerminalEndpoint = (instance, terminalId, type) => {
  const element = document.getElementById(terminalId)

  if (!element) {
    return
  }

  instance.addEndpoint(element, {
    uuid: terminalId,
    endpoint: 'Dot',
    anchor: ['Center'],
    isSource: true,
    isTarget: true,
    connectionType: type,
    connectionsDetachable: true,
    connectorStyle: wirePaintStyles[type],
    connectorHoverStyle: wireHoverPaintStyles[type],
    maxConnections: -1, 
    paintStyle: {
      ...terminalPaintStyles[type],
    },
    hoverPaintStyle: {
      fill: type === 'negative' ? '#ff4a3d' : '#2a7cff',
      outlineStroke: '#ffffff',
      outlineWidth: 2.4,
      stroke: type === 'negative' ? '#81130f' : '#082767',
      strokeWidth: 1.6,
    },
  })
}

export const addAllEndpoints = (instance) => {
  POSITIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'positive')
  })

  NEGATIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'negative')
  })
}

export const autoConnectDefaultCircuit = (instance) => {
  DEFAULT_AUTO_CONNECTIONS.forEach(([source, target]) => {
    if (hasConnectionBetween(instance, source, target)) {
      return
    }

    instance.connect({
      uuids: [source, target],
      type: isNegativeTerminal(source) ? 'negative' : 'positive',
    })
  })
}

export const validateOldExperimentConnections = (instance) => {
  const matchedConnections = []

  for (let i = 0; i < VALID_CONNECTION_SEQUENCE.length - 1; i += 1) {
    const firstTerminal = VALID_CONNECTION_SEQUENCE[i]
    const secondTerminal = VALID_CONNECTION_SEQUENCE[i + 1]

    const matchedConnection = getConnectionBetween(
      instance,
      firstTerminal,
      secondTerminal,
    )

    if (!matchedConnection || i % 2 !== 0) {
      continue
    }

    matchedConnections.push(matchedConnection)

    try {
      const nextPairIsMissing = !hasConnectionBetween(
        instance,
        VALID_CONNECTION_SEQUENCE[i + 2],
        VALID_CONNECTION_SEQUENCE[i + 3],
      )

      if (nextPairIsMissing && i % 4 === 0) {
        matchedConnections.pop()
      }
    } catch {
    }
  }

  const totalConnections = getAllConnections(instance).length
  const requiredConnections = DEFAULT_AUTO_CONNECTIONS.length

  return {
    isCorrect: matchedConnections.length === requiredConnections && totalConnections === requiredConnections,
    matchedCount: matchedConnections.length,
    totalConnections,
  }
}

export const lockJsPlumbCircuit = (instance, containerElement) => {
  getAllConnections(instance).forEach((connection) => {
    connection.setDetachable?.(false)

    connection.endpoints?.forEach((endpoint) => {
      endpoint.setEnabled?.(false)
    })
  })

  containerElement?.classList.add('connection-lab--locked')
}