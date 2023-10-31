import SongInfoBoxPlaceholder from "@/components/SongInfoBoxPlaceholder";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <>
    <SongInfoBoxPlaceholder/>
    <SongInfoBoxPlaceholder/>
    <SongInfoBoxPlaceholder/>
    <div className="h-5 w-5 "> Loading...</div>

    
    </>
   
  }