import SongInfoBoxPlaceholder from "@/components/SongInfoBoxPlaceholder";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <>

  <section className='w-full flex flex-col gap-2'>
    <SongInfoBoxPlaceholder/>
    <SongInfoBoxPlaceholder/>
    <SongInfoBoxPlaceholder/>
  </section>


    
    </>
   
  }