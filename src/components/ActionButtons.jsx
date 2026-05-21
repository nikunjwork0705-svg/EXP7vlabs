import SectionCard from './SectionCard.jsx'
import {
  AddIcon,
  AiGuide,
  AutoConnectIcon,
  CalculateIcon,
  CheckIcon,
  PrintIcon,
  ResetIcon,
  // DeleteIcon,
} from './Icons.jsx'

const buttons = [
  {
    label: 'CHECK',
    tone: 'action-button--green',
    Icon: CheckIcon,
    handlerName: 'onCheck',
  },
  {
    label: 'ADD',
    tone: 'action-button--blue',
    Icon: AddIcon,
    handlerName: 'onAdd',
  },
  // {
  //   label: 'DELETE', 
  //   tone: 'action-button--yellow', 
  //   Icon: DeleteIcon,
  //   handlerName: 'onDelete',
  // },
  {
    label: 'RESET',
    tone: 'action-button--red',
    Icon: ResetIcon,
    handlerName: 'onReset',
  },
  {
    label: 'PRINT',
    tone: 'action-button--purple',
    Icon: PrintIcon,
    handlerName: 'onPrint',
  },
  {
    label: 'AUTO CONNECT',
    tone: 'action-button--teal',
    Icon: AutoConnectIcon,
    handlerName: 'onAutoConnect',
  },
  {
    label: 'AI GUIDE',
    tone: 'action-button--cyan',
    Icon: AiGuide,
    handlerName: 'onAiGuide',
  },
  {
    label: 'CALCULATE',
    tone: 'action-button--grey',
    Icon: CalculateIcon,
    handlerName: 'onCalculate',
  },
]

const ActionButtons = ({
  onAdd,
  onCheck,
  onPrint,
  onReset,
  onAutoConnect,
  onAiGuide,
  onCalculate,
  // onDelete,
}) => {
  const handlers = {
    onAdd,
    onCheck,
    onPrint,
    onReset,
    onAutoConnect,
    onAiGuide,
    onCalculate
    // onDelete
  }

  return (
    <SectionCard className="h-[195px]" icon="buttons" title="ACTION BUTTONS">
      <div className="action-buttons__grid">
        {buttons.map(({ label, tone, Icon, handlerName }) => (
          <button
            key={label}
            type="button"
            className={`action-button ${tone}`}
            onClick={handlers[handlerName]}
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