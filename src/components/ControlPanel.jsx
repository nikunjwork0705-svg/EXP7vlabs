import ObservationTable from './ObservationTable.jsx'
import SectionCard from './SectionCard.jsx'

const ControlPanel = ({ observations }) => (
  <>
    <SectionCard className="h-[212px]" title="FORMULAS">
      <div className="flex flex-col justify-between h-[calc(100%-48px)] px-6 py-4">
        
        <div className="flex flex-col items-center text-center font-bold text-[18px] text-gray-800 mt-2">
          <p>Power Factor = (True Power)/(Apparent Power)</p>
          <p>= cos(Phase angle)</p>
        </div>
        
        <div className="w-full">
          <hr className="border-gray-300/60 mb-2" />
          
          <p className="text-center font-bold text-gray-800 text-[18px]">
            Note :- <span className="ml-1">L1:CFL, L2:Lamp, L3:LED, L4:Tubelight</span>
          </p>
        </div>

      </div>
    </SectionCard>

    <ObservationTable observations={observations} />
  </>
)

export default ControlPanel