import BackButton from '../SharedComponents/BackButton';
import FontFormatSection from '../SharedComponents/FontFormatSection';
import SavedButton from '../SharedComponents/SavedButton';
import Intro from '../SharedComponents/Intro';
import Details from '../SharedComponents/Details';
export default function TermsConditions() {
  return (
    <div className="pl-12 pt-12 pr-12 bg-[#FCF7E6]  ml-[300px] w-[1620px] min-h-screen">
                <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                           <BackButton></BackButton>
                            <h2 className="text-[20px] font-[Inter] font-semibold">Terms and Conditions</h2>
                        </div>
    
                        {/* justify end */}
                       <FontFormatSection></FontFormatSection>
                    </div>
    
    
                    {/* Intro */}
                    <div className='mb-4'>
                         <h3 className='font-[Inter] font-medium text-[20px] mb-4'>1. Terms</h3>
                        <Intro></Intro>
                    </div>
    
                    <div>
                        <h3 className='font-[Inter] font-medium text-[20px] mb-4'>2. Condition</h3>
                        <Details></Details>
                    </div>
    
                    {/* Button End */}
                    <div className="flex justify-center mt-24">
                        <SavedButton></SavedButton>
                    </div>
    
                </div>
            </div>
  )
}
