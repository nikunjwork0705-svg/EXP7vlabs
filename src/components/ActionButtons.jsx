import SectionCard from './SectionCard.jsx'
import {
  AddIcon,
  AiGuide,
  AutoConnectIcon,
  CalculateIcon,
  CheckIcon,
  PrintIcon,
  ResetIcon,
  InstructionIcon,
} from './Icons.jsx'

const buttons = [
  {
    label: 'INSTRUCTIONS',
    tone: 'action-button--yellow',
    Icon: InstructionIcon,
    handlerName: 'onInstruction',
    id: 'instruction-button', 
  },
  {
    label: 'AI GUIDE',
    tone: 'action-button--cyan',
    Icon: AiGuide,
    handlerName: 'onAiGuide',
    id: 'ai-guide-button', 
  },
  {
    label: 'CHECK',
    tone: 'action-button--green',
    Icon: CheckIcon,
    handlerName: 'onCheck',
    id: 'check-button', 
  },
  {
    label: 'AUTO CONNECT',
    tone: 'action-button--teal',
    Icon: AutoConnectIcon,
    handlerName: 'onAutoConnect',
    id: 'auto-connect-button', 
  },
  {
    label: 'ADD',
    tone: 'action-button--blue',
    Icon: AddIcon,
    handlerName: 'onAdd',
    id: 'add-button', 
  },
  {
    label: 'CALCULATE',
    tone: 'action-button--grey',
    Icon: CalculateIcon,
    handlerName: 'onCalculate',
    id: 'calculate-button', 
  },
  {
    label: 'RESET',
    tone: 'action-button--red',
    Icon: ResetIcon,
    handlerName: 'onReset',
    id: 'reset-button', 
  },
  {
    label: 'PRINT',
    tone: 'action-button--purple',
    Icon: PrintIcon,
    handlerName: 'onPrint',
    id: 'print-button', 
  },
]

const ActionButtons = ({
  disabledButtons = {},
  onAdd,
  onCheck,
  onPrint,
  onReset,
  onAutoConnect,
  onAiGuide,
  onCalculate,
  onInstruction,
}) => {
  const handlers = {
    onAdd,
    onCheck,
    onPrint,
    onReset,
    onAutoConnect,
    onAiGuide,
    onCalculate,
    onInstruction
  }

  return (
    <SectionCard className="h-[261.5px]" icon="buttons" title="ACTION BUTTONS">
      <div id="action-buttons-panel" className="action-buttons__grid">
        
        {buttons.map(({ label, tone, Icon, handlerName, id }) => (
          <button
            key={label}
            id={id} 
            type="button"
            className={`action-button ${tone}`}
            onClick={handlers[handlerName]}
            disabled={disabledButtons[id]} 
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}

      </div>
    </SectionCard>
  )
}

export default ActionButtons