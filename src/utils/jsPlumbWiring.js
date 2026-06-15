// ==========================================
// TERMINAL DEFINITIONS
// ==========================================
export const POSITIVE_TERMINALS = [
  '1-endpoint', '3-endpoint', '5-endpoint', '8-endpoint', '11-endpoint', 
  '13-endpoint', '15-endpoint', '17-endpoint', '19-endpoint', '21-endpoint', 
  '23-endpoint', '25-endpoint'
]

export const NEGATIVE_TERMINALS = [
  '2-endpoint', '4-endpoint', '6-endpoint', '7-endpoint', '9-endpoint', 
  '10-endpoint', '12-endpoint', '14-endpoint', '16-endpoint', '18-endpoint', 
  '20-endpoint', '22-endpoint', '24-endpoint', '26-endpoint'
]

export const DEFAULT_AUTO_CONNECTIONS = [
  ['1-endpoint', '23-endpoint'],  
  ['2-endpoint', '24-endpoint'],  
  ['3-endpoint', '25-endpoint'],  
  ['4-endpoint', '26-endpoint'],  
  ['5-endpoint', '25-endpoint'],  
  ['6-endpoint', '9-endpoint'],   
  ['9-endpoint', '10-endpoint'],  
  ['7-endpoint', '18-endpoint'],  
  ['8-endpoint', '11-endpoint'],  
  ['11-endpoint', '13-endpoint'], 
  ['13-endpoint', '15-endpoint'], 
  ['12-endpoint', '17-endpoint'], 
  ['18-endpoint', '20-endpoint'], 
  ['14-endpoint', '19-endpoint'], 
  ['16-endpoint', '21-endpoint'], 
  ['20-endpoint', '22-endpoint'], 
  ['26-endpoint', '7-endpoint'],  
]

export const VALID_CONNECTION_SEQUENCE = []

// ==========================================
// CUSTOM CURVINESS OVERRIDES
// ==========================================
const DEFAULT_CURVINESS = 180;

// Helper to create a consistent key regardless of order
const connectionKey = (a, b) => [a, b].sort().join("-");

// Map of specific curviness values for specific connections
const WIRE_CURVE_OVERRIDES = new Map([
  [connectionKey('1-endpoint', '23-endpoint'), 30],
  [connectionKey('2-endpoint', '24-endpoint'), 40],
  [connectionKey('3-endpoint', '25-endpoint'), -40],
  [connectionKey('4-endpoint', '26-endpoint'), -90],
  [connectionKey('5-endpoint', '25-endpoint'), 80],
  [connectionKey('6-endpoint', '9-endpoint'), 60],
  [connectionKey('9-endpoint', '10-endpoint'), 15],
  [connectionKey('7-endpoint', '18-endpoint'), -100],
  [connectionKey('8-endpoint', '11-endpoint'), 60],
  [connectionKey('11-endpoint', '13-endpoint'), 80],
  [connectionKey('13-endpoint', '15-endpoint'), -10],
  [connectionKey('12-endpoint', '17-endpoint'), 35],
  [connectionKey('18-endpoint', '20-endpoint'), -90],
  [connectionKey('14-endpoint', '19-endpoint'), -40],
  [connectionKey('16-endpoint', '21-endpoint'), 90],
  [connectionKey('20-endpoint', '22-endpoint'), -40],
  [connectionKey('26-endpoint', '7-endpoint'), 120],
]);

function getWireCurvinessForConnection(src, tgt) {
  const key = connectionKey(src, tgt);
  return WIRE_CURVE_OVERRIDES.get(key) ?? DEFAULT_CURVINESS;
}

// ==========================================
// CORE JSPLUMB LOGIC
// ==========================================
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

// ==========================================
// PAINT STYLES
// ==========================================
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

const terminalHoverPaintStyles = {
  positive: {
    fill: '#2a7cff',
    outlineStroke: '#ffffff',
    outlineWidth: 2.4,
    stroke: '#082767',
    strokeWidth: 1.6,
  },
  negative: {
    fill: '#ff4a3d',
    outlineStroke: '#ffffff',
    outlineWidth: 2.4,
    stroke: '#81130f',
    strokeWidth: 1.6,
  },
}

const getTerminalNumber = (terminalId) => terminalId.replace('-endpoint', '')

const getCssValue = (styles, propertyName, fallback) => {
  const value = styles.getPropertyValue(propertyName).trim()
  return value || fallback
}

const getCssNumber = (styles, propertyName, fallback) => {
  const value = Number.parseFloat(styles.getPropertyValue(propertyName))
  return Number.isFinite(value) ? value : fallback
}

const getEndpointPaintStyle = (element, type, state = 'default') => {
  const styles = window.getComputedStyle(element)
  const prefix = state === 'hover' ? '--jtk-endpoint-hover' : '--jtk-endpoint'
  const defaults = state === 'hover'
    ? terminalHoverPaintStyles[type]
    : terminalPaintStyles[type]

  return {
    fill: getCssValue(styles, `${prefix}-fill`, defaults.fill),
    outlineStroke: getCssValue(styles, `${prefix}-outline-stroke`, defaults.outlineStroke),
    outlineWidth: getCssNumber(styles, `${prefix}-outline-width`, defaults.outlineWidth),
    stroke: getCssValue(styles, `${prefix}-stroke`, defaults.stroke),
    strokeWidth: getCssNumber(styles, `${prefix}-stroke-width`, defaults.strokeWidth),
  }
}

const getEndpointRadius = (element) => (
  getCssNumber(window.getComputedStyle(element), '--jtk-endpoint-radius', 5)
)

const getEndpointCssClass = (terminalId, type) => {
  const terminalNumber = getTerminalNumber(terminalId)

  return [
    'jtk-endpoint--terminal',
    `jtk-endpoint--terminal-${terminalNumber}`,
    `jtk-endpoint--${terminalId}`,
    `jtk-endpoint--${type}`,
  ].join(' ')
}

export const wirePaintStyles = {
  positive: {
    outlineStroke: '#07306e',
    outlineWidth: 1.15,
    stroke: '#1f73e6',
    strokeWidth: 4.6,
  },
  negative: {
    outlineStroke: '#771914',
    outlineWidth: 1.15,
    stroke: '#dd342d',
    strokeWidth: 4.6,
  },
}

export const wireHoverPaintStyles = {
  positive: {
    outlineStroke: '#052357',
    outlineWidth: 1.35,
    stroke: '#3a8aff',
    strokeWidth: 5,
  },
  negative: {
    outlineStroke: '#5d110d',
    outlineWidth: 1.35,
    stroke: '#f04a42',
    strokeWidth: 5,
  },
}

// ==========================================
// CONNECTION MANAGEMENT
// ==========================================
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
  if (!element) return;

  instance.addEndpoint(element, {
    uuid: terminalId,
    endpoint: ['Dot', { radius: getEndpointRadius(element) }],
    cssClass: getEndpointCssClass(terminalId, type),
    
    // U-Shaped anchor forcing wires downward slightly before curving
    anchor: [0.5, 1, 0, 1], 
    
    isSource: true,
    isTarget: true,
    connectionType: type,
    connectionsDetachable: true,
    connectorStyle: wirePaintStyles[type],
    connectorHoverStyle: wireHoverPaintStyles[type],
    maxConnections: -1, 
    paintStyle: getEndpointPaintStyle(element, type),
    hoverPaintStyle: getEndpointPaintStyle(element, type, 'hover'),
  })
}

export const addAllEndpoints = (instance) => {
  POSITIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'positive')
  })

  NEGATIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'negative')
  })

  // IMPORTANT: Bind event listener to apply custom curviness dynamically when a user draws a wire
  instance.bind("connection", function (info) {
    const customCurviness = getWireCurvinessForConnection(info.sourceId, info.targetId);
    info.connection.setConnector(["Bezier", { curviness: customCurviness }]);
  });
}

export const autoConnectDefaultCircuit = (instance) => {
  DEFAULT_AUTO_CONNECTIONS.forEach(([source, target]) => {
    if (hasConnectionBetween(instance, source, target)) {
      return
    }

    const customCurviness = getWireCurvinessForConnection(source, target);

    instance.connect({
      uuids: [source, target],
      type: isNegativeTerminal(source) ? 'negative' : 'positive',
      // Apply the custom curviness to auto-drawn wires as well
      connector: ["Bezier", { curviness: customCurviness }] 
    })
  })
}

export const validateOldExperimentConnections = (instance) => {
  let matchedCount = 0;

  DEFAULT_AUTO_CONNECTIONS.forEach(([source, target]) => {
    if (hasConnectionBetween(instance, source, target)) {
      matchedCount++;
    }
  });

  const totalConnections = getAllConnections(instance).length;
  const requiredConnections = DEFAULT_AUTO_CONNECTIONS.length;

  return {
    isCorrect: matchedCount === requiredConnections && totalConnections === requiredConnections,
    matchedCount,
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