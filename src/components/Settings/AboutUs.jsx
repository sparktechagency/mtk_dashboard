
import BackButton from '../SharedComponents/BackButton';
import FontFormatSection from '../SharedComponents/FontFormatSection';
import SavedButton from '../SharedComponents/SavedButton';
import Intro from '../SharedComponents/Intro';
import Details from '../SharedComponents/Details';
import Container from '../SharedComponents/Container';
export default function AboutUs() {
  return (
    <>
            <Container>
              <div className="rounded-[8px] bg-white shadow-lg p-12 ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                       <BackButton></BackButton>
                        <h2 className="text-[20px] font-[Inter] font-semibold">About Us</h2>
                    </div>

                    {/* justify end */}
                   <FontFormatSection></FontFormatSection>
                </div>


                {/* Intro */}
                <div className='mb-4'>
                   <h3 className='font-[Inter] font-medium text-[20px] mb-4'>1. Intro</h3>
                    <Intro></Intro>
                </div>

                <div>
                  <h3 className='font-[Inter] font-medium text-[20px] mb-4'>2. Details</h3>
                    <Details></Details>
                </div>

                {/* Button End */}
                <div className="flex justify-center mt-24">
                    <SavedButton></SavedButton>
                </div>

            </div>
            </Container>
        </>
  )
}
