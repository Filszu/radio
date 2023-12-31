interface ISong{
    title:string,
    artist:string,
    duration:number,
    votesPlus?:number,
    votesMinus?:number,
    id:number,
    url:string,
    thumbnail?:string,

}
interface IActionMSG{
    title:string,
    message:string,
    type:"info"|"error"|"success",
    status:number
}
// *** *** **

interface IUserActions{
    postedSongs:number,
    votedSongs:Array<string>,

}